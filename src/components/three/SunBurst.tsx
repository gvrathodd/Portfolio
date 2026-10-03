import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { scrollState } from './scrollState';

/*
 * The day as one object. At dawn a pearl sun heats up, burns away, and pours its light down the page;
 * the shards and light drift through every band; at night they implode back into the moon.
 * Everything moves on the GPU: the CPU only works out a handful of numbers per frame.
 */

const CAM_Z = 10;

/** Per band, in page order: shard tint, and two particle colours chosen to read on that band's sky. */
const palette = [
  { shell: '#ffd2a8', a: '#fff1c9', b: '#ffad6b' }, // dawn
  { shell: '#fff0de', a: '#f39a5c', b: '#e0703f' }, // morning cream: deeper amber to show on cream
  { shell: '#cfe8ff', a: '#2b76c6', b: '#6bb4ec' }, // midday blue
  { shell: '#e2d4f8', a: '#7a5cc4', b: '#a88be0' }, // afternoon lilac
  { shell: '#b6a2e4', a: '#ffc48a', b: '#ffe2bf' }, // dusk: warm light on purple
  { shell: '#eef4ff', a: '#e8f1ff', b: '#b9d3f0' }, // night: moonlight
].map((p) => ({ shell: new THREE.Color(p.shell), a: new THREE.Color(p.a), b: new THREE.Color(p.b) }));

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const ease = (t: number) => t * t * (3 - 2 * t);
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ember = new THREE.Color('#5a2a2a');
const gold = new THREE.Color('#ffd27a');
const goldWhite = new THREE.Color('#fff4d2');

/** Shared GLSL: where a thing lives once it's settled into the drifting field. */
const fieldGLSL = /* glsl */ `
  uniform float uScrollW;
  uniform vec2 uHalf;
  vec3 fieldPos(vec3 f) {
    // f.xy in -1..1, f.z is depth. Further away covers more of the screen and scrolls slower.
    float vs = (${CAM_Z.toFixed(1)} - f.z) / ${CAM_Z.toFixed(1)};
    float range = uHalf.y * 2.0 * vs * 1.3;
    float y = mod(f.y * range * 0.5 + uScrollW + range * 0.5, range) - range * 0.5;
    // Anything close to the camera keeps to the side gutters so it never sits over text
    float near = smoothstep(-4.0, 0.0, f.z);
    float x = mix(f.x, sign(f.x) * mix(0.62, 1.08, abs(f.x)), near);
    return vec3(x * uHalf.x * vs * 1.1, y, f.z);
  }
`;

/* ---------------- Shell: the pearl, which heats up and burns away into light ---------------- */

const shellUniforms = () => ({
  uHeat: { value: 0 },
  uDissolve: { value: 0 },
  uGlow: { value: new THREE.Color('#ffc45e') },
});

/** Smooth 3D value noise, layered: drives both the molten veins and the burn-away holes. */
const noiseGLSL = /* glsl */ `
  float hash3(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float vnoise(vec3 x) {
    vec3 i = floor(x), f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash3(i), hash3(i + vec3(1, 0, 0)), f.x), mix(hash3(i + vec3(0, 1, 0)), hash3(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash3(i + vec3(0, 0, 1)), hash3(i + vec3(1, 0, 1)), f.x), mix(hash3(i + vec3(0, 1, 1)), hash3(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    return 0.55 * vnoise(p) + 0.3 * vnoise(p * 2.03) + 0.15 * vnoise(p * 4.01);
  }
`;

const shellFragmentHeader = /* glsl */ `
  uniform float uHeat, uDissolve;
  uniform vec3 uGlow;
  varying vec3 vObjPos;
  ${noiseGLSL}
`;

// Burn away wherever the noise falls under the threshold, so holes open organically and spread
const shellDiscard = /* glsl */ `
  float burn = fbm(vObjPos * 2.4);
  float threshold = uDissolve * 1.15 - 0.08;
  if (burn < threshold) discard;
`;

// Molten veins before the burst, and a white-hot rim along every burning edge
const shellGlow = /* glsl */ `
  float edge = (1.0 - smoothstep(0.0, 0.07, burn - threshold)) * step(0.001, uDissolve);
  float vein = (1.0 - smoothstep(0.0, 0.045 * uHeat, abs(fbm(vObjPos * 3.3 + 11.0) - 0.5))) * uHeat;
  totalEmissiveRadiance += uGlow * (vein * 4.0 + edge * 5.0) + vec3(1.0, 0.95, 0.85) * edge * edge * 2.5;
`;

/* ---------------- Light: the molten core that spills out as particles ---------------- */

const makeLightGeometry = (count: number, zMin = -9, zMax = 2) => {
  const geo = new THREE.BufferGeometry();
  const dir = new Float32Array(count * 3);
  const rand = new Float32Array(count * 4);
  const field = new Float32Array(count * 3);
  const v = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    v.randomDirection();
    dir.set([v.x, v.y, v.z], i * 3);
    rand.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    field.set([Math.random() * 2 - 1, Math.random() * 2 - 1, zMin + Math.random() * (zMax - zMin)], i * 3);
  }
  // `position` is unused by the shader but three needs it to know the draw count
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geo.setAttribute('aDir', new THREE.BufferAttribute(dir, 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 4));
  geo.setAttribute('aField', new THREE.BufferAttribute(field, 3));
  return geo;
};

const lightVertex = /* glsl */ `
  uniform vec3 uCenter, uMoon;
  uniform float uScale, uBurst, uSpill, uField, uReform, uBokeh, uHot, uMoonR, uTime, uSize, uPixelRatio;
  attribute vec3 aDir, aField;
  attribute vec4 aRand;
  varying float vMix;
  varying float vAlpha;
  varying float vHot;
  ${fieldGLSL}
  float easeOut(float t) { return 1.0 - pow(1.0 - t, 3.0); }
  void main() {
    vec3 core = uCenter + aDir * pow(aRand.x, 0.6) * 0.92 * uScale;
    vec3 burst = uCenter + aDir * uScale * (1.0 + sqrt(aRand.y) * 3.6);
    // Spill: the light pours downward in uneven streams and spreads as it falls
    float s = uSpill;
    burst.y -= s * s * (0.4 + aRand.z * aRand.z * 2.5);
    burst.x += s * aDir.x * (0.3 + aRand.w * 0.6);
    vec3 wobble = vec3(sin(uTime * 0.7 + aRand.w * 40.0), cos(uTime * 0.55 + aRand.x * 40.0), 0.0) * 0.12;
    vec3 p = mix(core, burst + wobble * uBurst, easeOut(uBurst));
    p.y -= uField * uField * (uHalf.y * 2.6 + aRand.z * 5.0);
    // The bokeh set skips all that and just drifts in the gutters, parallaxing with the page
    p = mix(p, fieldPos(aField) + wobble * 2.0, uBokeh);
    // At night the light rises back and sinks into the moon, fading as it arrives
    vec3 moon = uMoon + aDir * uMoonR * 0.85 * aRand.y;
    p = mix(p, moon, smoothstep(0.0, 1.0, uReform));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.35 + aRand.w * aRand.w * 1.4) * (1.0 + uHot * 0.5) * uPixelRatio * (${CAM_Z.toFixed(1)} / -mv.z);
    vMix = aRand.x;
    // Embers leave white-hot and cool at different rates
    vHot = clamp(uHot * (0.55 + 0.6 * aRand.y), 0.0, 1.0);
    float twinkle = 0.55 + 0.45 * sin(uTime * (2.2 + uHot * 6.0) + aRand.y * 60.0);
    vAlpha = smoothstep(0.0, 0.04, uBurst + uReform) * twinkle * (1.0 - smoothstep(0.75, 1.0, uReform));
  }
`;

const lightFragment = /* glsl */ `
  uniform vec3 uColorA, uColorB;
  uniform float uOpacity;
  varying float vMix;
  varying float vAlpha;
  varying float vHot;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 cool = mix(uColorA, uColorB, vMix);
    vec3 hot = mix(vec3(1.0, 0.7, 0.22), vec3(1.0, 0.95, 0.78), vMix * vHot);
    gl_FragColor = vec4(mix(cool, hot, vHot), a * vAlpha * uOpacity);
  }
`;

/* ---------------- Halo: a soft glow behind the sun, which flashes when it bursts ---------------- */

const makeHaloTexture = () => {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.3, 'rgba(255,255,255,0.5)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

/* ---------------- The golden burst: a see-through energy dome, rays and a lens streak ---------------- */

/** A translucent bubble that is only bright at its rim, like a shockwave of light. */
const domeVertex = /* glsl */ `
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const domeFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  void main() {
    float rim = pow(1.0 - abs(dot(vNormalV, vViewDir)), 3.0);
    gl_FragColor = vec4(uColor * (rim * 1.8 + 0.05), (rim + 0.04) * uOpacity);
  }
`;

/** Thin rays of light fanning out from the centre, fading towards their tips. */
const makeRaysTexture = () => {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const mid = size / 2;
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * Math.PI * 2 + rnd() * 0.08;
    const len = mid * (0.45 + rnd() * 0.55);
    const width = 0.006 + rnd() * 0.018;
    const grad = g.createRadialGradient(mid, mid, 0, mid, mid, len);
    grad.addColorStop(0, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(mid, mid);
    g.arc(mid, mid, len, angle - width, angle + width);
    g.closePath();
    g.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

/** A long horizontal flare, the anamorphic streak films get when something very bright flashes. */
const makeStreakTexture = () => {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 32;
  const g = c.getContext('2d')!;
  const across = g.createLinearGradient(0, 0, 512, 0);
  across.addColorStop(0, 'rgba(255,255,255,0)');
  across.addColorStop(0.5, 'rgba(255,255,255,1)');
  across.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = across;
  g.fillRect(0, 0, 512, 32);
  // fade top and bottom so it's a soft line, not a bar
  g.globalCompositeOperation = 'destination-in';
  const down = g.createLinearGradient(0, 0, 0, 32);
  down.addColorStop(0, 'rgba(0,0,0,0)');
  down.addColorStop(0.5, 'rgba(0,0,0,1)');
  down.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = down;
  g.fillRect(0, 0, 512, 32);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

/** A pale moon surface: soft grey seas and scattered craters, painted once to a small canvas. */
const makeMoonTexture = () => {
  const w = 512, h = 256;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  g.fillStyle = '#eef2f9';
  g.fillRect(0, 0, w, h);
  const blot = (x: number, y: number, r: number, color: string) => {
    // draw wrapped around the seam so the sphere has no visible join
    for (const dx of [-w, 0, w]) {
      const grad = g.createRadialGradient(x + dx, y, 0, x + dx, y, r);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grad;
      g.beginPath();
      g.arc(x + dx, y, r, 0, Math.PI * 2);
      g.fill();
    }
  };
  // a fixed seed keeps the moon's face the same on every visit
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 9; i++) blot(rnd() * w, 60 + rnd() * 140, 40 + rnd() * 60, 'rgba(150,162,190,0.35)');
  for (let i = 0; i < 70; i++) {
    const x = rnd() * w, y = 20 + rnd() * (h - 40), r = 3 + rnd() * rnd() * 16;
    blot(x, y, r, 'rgba(120,132,160,0.45)');
    blot(x - r * 0.25, y - r * 0.25, r * 0.6, 'rgba(255,255,255,0.5)');
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

export const SunBurst: React.FC = () => {
  const narrow = useThree((s) => s.size.width < 768);
  const gl = useThree((s) => s.gl);

  const lightGeo = useMemo(() => makeLightGeometry(narrow ? 3500 : 9000), [narrow]);
  const halo = useMemo(makeHaloTexture, []);
  const moonMap = useMemo(makeMoonTexture, []);
  const raysMap = useMemo(makeRaysTexture, []);
  const streakMap = useMemo(makeStreakTexture, []);
  useEffect(() => () => (raysMap.dispose(), streakMap.dispose()), [raysMap, streakMap]);
  const domeMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: domeVertex,
        fragmentShader: domeFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: gold.clone() }, uOpacity: { value: 0 } },
      }),
    [],
  );
  useEffect(() => () => domeMat.dispose(), [domeMat]);
  useEffect(() => () => moonMap.dispose(), [moonMap]);
  useEffect(() => () => lightGeo.dispose(), [lightGeo]);
  useEffect(() => () => halo.dispose(), [halo]);

  const shellU = useMemo(shellUniforms, []);
  const shellMat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: '#ffd2a8',
      roughness: 0.14,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      iridescence: 0.9,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [180, 620],
      sheen: 0.4,
      envMapIntensity: 1.3,
      side: THREE.DoubleSide,
    });
    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, shellU);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vObjPos;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvObjPos = position;');
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>\n${shellFragmentHeader}`)
        .replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>\n${shellDiscard}`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\n${shellGlow}`);
    };
    return m;
  }, [shellU]);

  const lightMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: lightVertex,
        fragmentShader: lightFragment,
        transparent: true,
        depthWrite: false,
        // Additive: thousands of sparks pile up into a blinding core and thin out into embers
        blending: THREE.AdditiveBlending,
        uniforms: {
          uCenter: { value: new THREE.Vector3() },
          uMoon: { value: new THREE.Vector3() },
          uScale: { value: 0 },
          uBurst: { value: 0 },
          uSpill: { value: 0 },
          uField: { value: 0 },
          uReform: { value: 0 },
          uBokeh: { value: 0 },
          uHot: { value: 0 },
          uMoonR: { value: 1 },
          uTime: { value: 0 },
          uSize: { value: 5 },
          uPixelRatio: { value: 1 },
          uScrollW: { value: 0 },
          uHalf: { value: new THREE.Vector2(1, 1) },
          uColorA: { value: new THREE.Color() },
          uColorB: { value: new THREE.Color() },
          uOpacity: { value: 1 },
        },
      }),
    [],
  );
  // A few big soft lights that drift through the daytime bands once the burst has cleared
  const bokehGeo = useMemo(() => makeLightGeometry(narrow ? 16 : 36, -2.5, 1.5), [narrow]);
  const bokehMat = useMemo(() => {
    const m = lightMat.clone();
    m.uniforms.uBokeh.value = 1;
    m.blending = THREE.NormalBlending;
    m.uniforms.uBurst.value = 1;
    return m;
  }, [lightMat]);
  useEffect(() => () => bokehGeo.dispose(), [bokehGeo]);
  useEffect(() => () => (shellMat.dispose(), lightMat.dispose(), bokehMat.dispose()), [shellMat, lightMat, bokehMat]);

  const core = useRef<THREE.Mesh>(null!);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null!);
  const shellMesh = useRef<THREE.Mesh>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const ringMat = useRef<THREE.MeshPhysicalMaterial>(null!);
  const haloSprite = useRef<THREE.Sprite>(null!);
  const waves = useRef<THREE.Mesh[]>([]);
  const dome = useRef<THREE.Mesh>(null!);
  const rays = useRef<THREE.Sprite>(null!);
  const raysMat = useRef<THREE.SpriteMaterial>(null!);
  const streak = useRef<THREE.Sprite>(null!);
  const streakMat = useRef<THREE.SpriteMaterial>(null!);
  const moon = useRef<THREE.Mesh>(null!);
  const moonMat = useRef<THREE.MeshStandardMaterial>(null!);
  const haloMat = useRef<THREE.SpriteMaterial>(null!);

  // Scroll positions where each band is centred on screen, refreshed whenever the page resizes.
  const anchors = useRef<number[]>([]);
  const pointer = useRef({ x: 0, y: 0, sx: 0, sy: 0 });
  const smooth = useRef({ scroll: -1 });
  const tmp = useMemo(() => ({ c: new THREE.Color(), d: new THREE.Color() }), []);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    const bands = Array.from(main.querySelectorAll<HTMLElement>('[data-band]'));
    const measure = () => {
      const vh = window.innerHeight;
      anchors.current = bands.map((band) => {
        const rect = band.getBoundingClientRect();
        return Math.max(0, rect.top + window.scrollY + Math.min(rect.height, vh) / 2 - vh / 2);
      });
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(main);
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  useFrame((state, delta) => {
    const a = anchors.current;
    if (a.length < 6) return;
    const dt = Math.min(delta, 1 / 20);
    const vh = state.size.height;
    const halfW = state.viewport.width / 2;
    const halfH = state.viewport.height / 2;
    const worldPerPx = state.viewport.height / vh;

    // Lenis already eases the scroll; this only irons out the odd uneven frame
    const sm = smooth.current;
    sm.scroll = sm.scroll < 0 ? window.scrollY : mix(sm.scroll, window.scrollY, 1 - Math.exp(-14 * dt));
    const scroll = sm.scroll;

    const ptr = pointer.current;
    const kp = 1 - Math.exp(-3 * dt);
    ptr.sx += ((narrow ? 0 : ptr.x) - ptr.sx) * kp;
    ptr.sy += ((narrow ? 0 : ptr.y) - ptr.sy) * kp;

    // ---- Choreography -------------------------------------------------------------------
    const heroEnd = scrollState.heroEnd || vh * 1.7;
    const p = clamp01(scroll / heroEnd);

    // Dawn: the sun glides to centre stage and grows, its ring swinging open to face you
    const toStage = ease(seg(p, 0, 0.3));
    // It starts in the open sky between the location row and the intro paragraph;
    // on phones, in the gap to the right of the first name
    const sunX = mix(narrow ? 0.64 : 0.45, 0, toStage) * halfW + ptr.sx * 0.25;
    const sunY = mix(narrow ? 0.27 : 0.4, 0.04, toStage) * halfH - ptr.sy * 0.18;
    const sunS = mix(narrow ? 0.3 : 0.6, narrow ? 0.62 : 1.3, toStage);

    // q runs past 1 after the pin releases, so the aftermath keeps settling as the page moves on
    const q = scroll / heroEnd;
    const heat = ease(seg(p, 0.22, 0.38));
    const burstT = seg(p, 0.38, 0.6);
    const dissolve = ease(seg(p, 0.37, 0.47));
    const burst = seg(p, 0.39, 0.6);
    const domeT = seg(p, 0.39, 0.72);
    let spill = ease(seg(p, 0.5, 1));
    let field = ease(seg(p, 0.8, 1));
    let reform = 0;

    // Night: everything implodes back together as the moon over the contact section
    const moonX = (narrow ? 0.5 : 0.62) * halfW + ptr.sx * 0.12;
    const moonY = (narrow ? 0.62 : 0.5) * halfH - ptr.sy * 0.08;
    const moonS = narrow ? 0.38 : 0.52;
    const night = ease(seg(scroll, a[5] - vh * 0.7, a[5]));
    let cx = sunX, cy = sunY, cs = sunS;
    if (night > 0) {
      // The shards are gone for good; the light rises back and condenses into a whole new moon
      reform = night;
      field = 1 - night;
      cx = moonX;
      cy = moonY;
      cs = 0;
    }

    // Colour follows whichever band is on screen
    let i = 0;
    while (i < a.length - 2 && scroll > a[i + 1]) i++;
    const t = ease(clamp01((scroll - a[i]) / Math.max(1, a[i + 1] - a[i])));
    const kc = 1 - Math.exp(-4 * dt);

    // ---- Shell: molten veins, then it burns away from the inside out ----------------------
    const shell = shellMesh.current;
    const shellScale = cs === 0 ? 0 : mix(shell.scale.x, cs, 1 - Math.exp(-8 * dt));
    shell.position.set(cx, cy, 0);
    shell.scale.setScalar(Math.max(shellScale, 1e-4));
    shell.rotation.y = scroll * 0.0004;
    shell.visible = cs > 0 && dissolve < 0.999;
    shellU.uHeat.value = heat;
    shellU.uDissolve.value = dissolve;
    // As it heats, the pearl darkens to ember so the molten veins can glow against it
    tmp.c.copy(palette[i].shell).lerp(palette[i + 1].shell, t).lerp(ember, heat * 0.75);
    shellMat.color.copy(tmp.c);
    shellMat.emissive.copy(palette[0].b);
    shellMat.emissiveIntensity = 0.18 * (1 - heat);

    // ---- Molten core, visible through the burning holes until it bursts -------------------------
    const coreS = cs * 0.95 * (1 - ease(burst)) * (night > 0 ? 0 : 1);
    core.current.position.set(cx, cy, 0);
    core.current.scale.setScalar(Math.max(coreS, 1e-4));
    core.current.visible = coreS > 0.002;
    coreMat.current.color.setRGB(1, mix(0.82, 0.95, heat), mix(0.6, 0.85, heat));

    // ---- Ring: opens toward you, then blasts outward as the shockwave ----------------------
    ring.current.position.set(cx, cy, 0);
    ring.current.scale.setScalar(cs * (1 + easeOutExpo(burstT) * 7));
    ring.current.rotation.set(mix(1.2, 0.18, toStage) + ptr.sy * 0.1, scroll * 0.0006, 0.3 + ptr.sx * 0.1);
    ringMat.current.opacity = night > 0 ? 0 : 1 - ease(seg(p, 0.4, 0.58));
    ring.current.visible = ringMat.current.opacity > 0.01;

    // ---- Halo: warm glow, a flash at the moment of bursting ------------------------------
    // A hard, brief flash on detonation, then a long warm afterglow
    const flash = Math.pow(Math.sin(Math.PI * seg(p, 0.37, 0.5)), 2);
    const afterglow = (1 - ease(seg(p, 0.45, 0.95))) * (p > 0.37 ? 1 : 0);
    const haloOpacity = night > 0 ? 0.75 * night : q < 0.37 ? 0.75 : Math.min(1, 0.55 * afterglow + flash);
    const haloSize = night > 0 ? moonS : sunS;
    haloSprite.current.position.set(cx, cy, -1.5);
    haloSprite.current.scale.setScalar(haloSize * (4.6 + flash * 9 + afterglow * 2));
    haloMat.current.opacity = haloOpacity;
    haloMat.current.color.copy(night > 0 ? palette[5].b : palette[0].b).lerp(goldWhite, flash);

    // ---- Shockwaves: thin rings of light racing outward, the second a beat behind -------------
    waves.current.forEach((w, n) => {
      if (!w) return;
      const wt = seg(p, 0.385 + n * 0.035, 0.6 + n * 0.08);
      w.visible = night === 0 && wt > 0 && wt < 1;
      if (!w.visible) return;
      w.position.set(sunX, sunY, 0.1);
      w.rotation.set(0.25 + n * 0.5, n * 0.4, 0);
      w.scale.setScalar(sunS * (1 + easeOutExpo(wt) * (3.6 - n * 1)));
      (w.material as THREE.MeshBasicMaterial).opacity = (1 - ease(wt)) * (n === 0 ? 0.9 : 0.6);
    });

    // ---- Golden energy dome: a see-through shockwave, bright only at its rim ----------------
    const domeOn = night === 0 && domeT > 0 && domeT < 1;
    dome.current.visible = domeOn;
    if (domeOn) {
      dome.current.position.set(sunX, sunY, 0);
      dome.current.scale.setScalar(sunS * (1 + easeOutExpo(domeT) * 2.4));
      domeMat.uniforms.uOpacity.value = ease(seg(domeT, 0, 0.08)) * (1 - ease(seg(domeT, 0.2, 1)));
    }

    // ---- Rays and the anamorphic streak: the flash itself --------------------------------------
    const raysT = seg(p, 0.37, 0.66);
    rays.current.visible = night === 0 && raysT > 0 && raysT < 1;
    rays.current.position.set(sunX, sunY, 0.3);
    rays.current.scale.setScalar(sunS * (2.5 + easeOutExpo(raysT) * 4));
    raysMat.current.rotation = raysT * 0.6;
    raysMat.current.opacity = ease(seg(raysT, 0, 0.1)) * (1 - ease(seg(raysT, 0.15, 1))) * 0.9;
    streak.current.visible = night === 0 && flash > 0.01;
    streak.current.position.set(sunX, sunY, 0.4);
    streak.current.scale.set(sunS * (4 + flash * 12), sunS * 0.35, 1);
    streakMat.current.opacity = flash * 0.9;

    // ---- Camera shake on detonation --------------------------------------------------------
    const shake = Math.sin(Math.PI * seg(p, 0.37, 0.52)) * (narrow ? 0.05 : 0.09);
    const tt = state.clock.elapsedTime;
    state.camera.position.x = shake * (Math.sin(tt * 53) + Math.sin(tt * 31)) * 0.5;
    state.camera.position.y = shake * (Math.sin(tt * 47) + Math.cos(tt * 29)) * 0.5;

    // ---- Moon: grows out of the gathered light, then turns slowly ---------------------------
    const moonGrow = ease(seg(night, 0.35, 0.9));
    moon.current.visible = moonGrow > 0.001;
    moon.current.position.set(moonX, moonY, 0);
    moon.current.scale.setScalar(Math.max(moonS * moonGrow, 1e-4));
    moon.current.rotation.y += dt * 0.05;
    moonMat.current.emissiveIntensity = mix(1.4, 0.45, moonGrow);

    // ---- Light particles ----------------------------------------------------------------
    const lu = lightMat.uniforms;
    lu.uCenter.value.set(cx, cy, 0);
    lu.uMoon.value.set(moonX, moonY, 0);
    lu.uMoonR.value = moonS;
    lu.uScale.value = night > 0 ? moonS : Math.max(shellScale, 1e-4);
    lu.uBurst.value = night > 0 ? 1 : burst;
    lu.uSpill.value = night > 0 ? 1 : spill;
    lu.uHot.value = night > 0 ? 0 : 1 - ease(seg(p, 0.39, 1)) * 0.6;
    lu.uField.value = field;
    lu.uReform.value = reform;
    lu.uTime.value += dt;
    lu.uScrollW.value = scroll * worldPerPx;
    lu.uHalf.value.set(halfW, halfH);
    lu.uPixelRatio.value = gl.getPixelRatio();
    lu.uSize.value = narrow ? 4.5 : 6;
    tmp.c.copy(palette[i].a).lerp(palette[i + 1].a, t);
    tmp.d.copy(palette[i].b).lerp(palette[i + 1].b, t);
    lu.uColorA.value.lerp(tmp.c, kc);
    lu.uColorB.value.lerp(tmp.d, kc);
    lu.uOpacity.value = night > 0 ? 1 : 1 - ease(seg(p, 0.6, 0.95));

    // ---- Bokeh ---------------------------------------------------------------------------
    const bu = bokehMat.uniforms;
    bu.uTime.value = lu.uTime.value * 0.5;
    bu.uScrollW.value = lu.uScrollW.value;
    bu.uHalf.value.copy(lu.uHalf.value);
    bu.uPixelRatio.value = lu.uPixelRatio.value;
    bu.uSize.value = narrow ? 26 : 46;
    bu.uColorA.value.copy(lu.uColorA.value);
    bu.uColorB.value.copy(lu.uColorB.value);
    bu.uOpacity.value = 0.3 * ease(seg(q, 1, 1.4)) * (1 - night);
  });

  return (
    <>
      <sprite ref={haloSprite} renderOrder={-2}>
        <spriteMaterial ref={haloMat} map={halo} transparent depthWrite={false} opacity={0} />
      </sprite>
      <mesh ref={core} renderOrder={-1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial ref={coreMat} toneMapped={false} />
      </mesh>
      <mesh ref={dome} material={domeMat} visible={false}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
      <sprite ref={rays} visible={false}>
        <spriteMaterial ref={raysMat} map={raysMap} color="#ffd27a" transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0} />
      </sprite>
      <sprite ref={streak} visible={false}>
        <spriteMaterial ref={streakMat} map={streakMap} color="#ffe2a0" transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0} />
      </sprite>
      {[0, 1].map((n) => (
        <mesh
          key={n}
          ref={(el) => {
            if (el) waves.current[n] = el;
          }}
          visible={false}
        >
          <torusGeometry args={[1, 0.012, 8, 180]} />
          <meshBasicMaterial color="#ffd889" transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
      ))}
      <mesh ref={shellMesh} material={shellMat}>
        <sphereGeometry args={[1, 96, 96]} />
      </mesh>
      <mesh ref={moon} visible={false} rotation-x={0.3}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          ref={moonMat}
          map={moonMap}
          emissiveMap={moonMap}
          emissive="#dce8ff"
          roughness={0.92}
          envMapIntensity={0.6}
        />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.62, 0.014, 12, 160]} />
        <meshPhysicalMaterial ref={ringMat} color="#ffffff" metalness={1} roughness={0.18} transparent />
      </mesh>
      <points geometry={lightGeo} material={lightMat} frustumCulled={false} />
      <points geometry={bokehGeo} material={bokehMat} frustumCulled={false} />
    </>
  );
};
