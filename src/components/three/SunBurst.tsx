import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { scrollState } from './scrollState';

/*
 * The day as one object. At dawn a pearl sun cracks, bursts, and pours its light down the page;
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
  vec3 rotAxis(vec3 v, vec3 k, float a) {
    float c = cos(a), s = sin(a);
    return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c);
  }
`;

/* ---------------- Shell: the pearl, split into triangles that can fly apart ---------------- */

const makeShellGeometry = (detail: number) => {
  const ico = new THREE.IcosahedronGeometry(1, detail);
  const geo = ico.index ? ico.toNonIndexed() : ico;
  const pos = geo.getAttribute('position');
  // Smooth normals so the assembled sphere reads as one glossy pearl
  geo.setAttribute('normal', pos.clone());
  const n = pos.count;
  const centroid = new Float32Array(n * 3);
  const axis = new Float32Array(n * 3);
  const rand = new Float32Array(n * 3);
  const v = new THREE.Vector3();
  for (let f = 0; f < n; f += 3) {
    const cx = (pos.getX(f) + pos.getX(f + 1) + pos.getX(f + 2)) / 3;
    const cy = (pos.getY(f) + pos.getY(f + 1) + pos.getY(f + 2)) / 3;
    const cz = (pos.getZ(f) + pos.getZ(f + 1) + pos.getZ(f + 2)) / 3;
    v.randomDirection();
    const r = [Math.random(), Math.random(), Math.random()];
    for (let k = 0; k < 3; k++) {
      const i = (f + k) * 3;
      centroid.set([cx, cy, cz], i);
      axis.set([v.x, v.y, v.z], i);
      rand.set(r, i);
    }
  }
  geo.setAttribute('aCentroid', new THREE.BufferAttribute(centroid, 3));
  geo.setAttribute('aAxis', new THREE.BufferAttribute(axis, 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 3));
  return geo;
};

const shellUniforms = () => ({
  uCenter: { value: new THREE.Vector3() },
  uScale: { value: 0 },
  uCrack: { value: 0 },
  uExplode: { value: 0 },
  uScrollW: { value: 0 },
  uHalf: { value: new THREE.Vector2(1, 1) },
  uTime: { value: 0 },
});

const shellHeader = /* glsl */ `
  uniform vec3 uCenter;
  uniform float uScale, uCrack, uExplode, uTime;
  attribute vec3 aCentroid, aAxis, aRand;
  ${fieldGLSL}
  float shardAngle() {
    return uExplode * (3.0 + aRand.x * 9.0) + uScrollW * (aRand.x - 0.5) * 0.25 + uTime * 0.25 * step(0.99, uExplode) * (aRand.y - 0.5);
  }
`;

const shellVertex = /* glsl */ `
  float e1 = clamp(uExplode * 2.0, 0.0, 1.0);
  float e2 = smoothstep(0.0, 1.0, clamp(uExplode * 2.0 - 1.0, 0.0, 1.0));
  // Before bursting, cracks open a hair so the molten core glows through the seams
  vec3 assembled = uCenter + aCentroid * uScale * (1.0 + uCrack * (0.05 + aRand.y * 0.07));
  // The burst throws shards outward and some straight past the camera
  vec3 burst = uCenter + aCentroid * uScale * (1.8 + aRand.y * 5.5);
  burst.z += (aRand.z - 0.3) * 9.0;
  burst.z = min(burst.z, 8.4);
  vec3 c = mix(assembled, burst, e1);
  // ...then keep going, out past the edges and the camera, shrinking away to nothing
  c += (burst - uCenter) * e2 * 1.6;
  c.z = min(c.z + e2 * aRand.z * 6.0, 9.0);
  float size = uScale * (1.0 - e2);
  vec3 transformed = c + rotAxis((position - aCentroid) * size, aAxis, shardAngle());
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
  uniform float uScale, uBurst, uSpill, uField, uReform, uBokeh, uMoonR, uTime, uSize, uPixelRatio;
  attribute vec3 aDir, aField;
  attribute vec4 aRand;
  varying float vMix;
  varying float vAlpha;
  ${fieldGLSL}
  float easeOut(float t) { return 1.0 - pow(1.0 - t, 3.0); }
  void main() {
    vec3 core = uCenter + aDir * pow(aRand.x, 0.6) * 0.92 * uScale;
    vec3 burst = uCenter + aDir * uScale * (1.0 + sqrt(aRand.y) * 4.8);
    // Spill: the light pours downward in uneven streams and spreads as it falls
    float s = uSpill;
    burst.y -= s * s * (1.0 + aRand.z * aRand.z * 7.0);
    burst.x += s * aDir.x * (0.6 + aRand.w * 1.6);
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
    gl_PointSize = uSize * (0.35 + aRand.w * aRand.w * 1.4) * uPixelRatio * (${CAM_Z.toFixed(1)} / -mv.z);
    vMix = aRand.x;
    float twinkle = 0.65 + 0.35 * sin(uTime * 2.2 + aRand.y * 60.0);
    vAlpha = smoothstep(0.0, 0.04, uBurst + uReform) * twinkle * (1.0 - smoothstep(0.75, 1.0, uReform));
  }
`;

const lightFragment = /* glsl */ `
  uniform vec3 uColorA, uColorB;
  uniform float uOpacity;
  varying float vMix;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    gl_FragColor = vec4(mix(uColorA, uColorB, vMix), a * vAlpha * uOpacity);
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

  const shellGeo = useMemo(() => makeShellGeometry(narrow ? 2 : 3), [narrow]);
  const lightGeo = useMemo(() => makeLightGeometry(narrow ? 3500 : 9000), [narrow]);
  const halo = useMemo(makeHaloTexture, []);
  const moonMap = useMemo(makeMoonTexture, []);
  useEffect(() => () => moonMap.dispose(), [moonMap]);
  useEffect(() => () => shellGeo.dispose(), [shellGeo]);
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
        .replace('#include <common>', `#include <common>\n${shellHeader}`)
        .replace('#include <beginnormal_vertex>', 'vec3 objectNormal = rotAxis(normal, aAxis, shardAngle());')
        .replace('#include <begin_vertex>', shellVertex);
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
        uniforms: {
          uCenter: { value: new THREE.Vector3() },
          uMoon: { value: new THREE.Vector3() },
          uScale: { value: 0 },
          uBurst: { value: 0 },
          uSpill: { value: 0 },
          uField: { value: 0 },
          uReform: { value: 0 },
          uBokeh: { value: 0 },
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
    m.uniforms.uBurst.value = 1;
    return m;
  }, [lightMat]);
  useEffect(() => () => bokehGeo.dispose(), [bokehGeo]);
  useEffect(() => () => (shellMat.dispose(), lightMat.dispose(), bokehMat.dispose()), [shellMat, lightMat, bokehMat]);

  const core = useRef<THREE.Mesh>(null!);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const ringMat = useRef<THREE.MeshPhysicalMaterial>(null!);
  const haloSprite = useRef<THREE.Sprite>(null!);
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
    const heroEnd = scrollState.heroEnd || vh * 2.2;
    const p = clamp01(scroll / heroEnd);

    // Dawn: the sun glides to centre stage and grows, its ring swinging open to face you
    const toStage = ease(seg(p, 0, 0.3));
    // It starts in the open sky between the location row and the intro paragraph;
    // on phones, in the gap to the right of the first name
    const sunX = mix(narrow ? 0.64 : 0.45, 0, toStage) * halfW + ptr.sx * 0.25;
    const sunY = mix(narrow ? 0.27 : 0.4, 0.04, toStage) * halfH - ptr.sy * 0.18;
    const sunS = mix(narrow ? 0.3 : 0.6, narrow ? 0.62 : 1.3, toStage);

    const crack = ease(seg(p, 0.24, 0.38));
    const burstT = seg(p, 0.37, 0.62);
    let explode = 0.5 * easeOutExpo(burstT) + 0.5 * ease(seg(p, 0.62, 1));
    let burst = seg(p, 0.37, 0.6);
    let spill = ease(seg(p, 0.45, 0.95));
    let field = ease(seg(p, 0.7, 1));
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
      explode = 0;
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

    // ---- Shell --------------------------------------------------------------------------
    shellU.uCenter.value.set(cx, cy, 0);
    // Snap rather than ease when it hides for the night, so it never shrinks across the page
    shellU.uScale.value = cs === 0 ? 0 : mix(shellU.uScale.value, cs, 1 - Math.exp(-8 * dt));
    shellU.uCrack.value = night > 0 ? 0 : crack;
    shellU.uExplode.value = explode;
    shellU.uScrollW.value = scroll * worldPerPx;
    shellU.uHalf.value.set(halfW, halfH);
    shellU.uTime.value += dt;
    tmp.c.copy(palette[i].shell).lerp(palette[i + 1].shell, t);
    shellMat.color.lerp(tmp.c, kc);
    // The sun heats up as it cracks; the moon keeps a cool inner light
    shellMat.emissive.copy(palette[0].b);
    shellMat.emissiveIntensity = night > 0 ? 0.25 * night : 0.18 + crack * 0.9;

    // ---- Molten core, visible through the cracks until it bursts -------------------------
    const coreS = cs * 0.95 * (1 - ease(burst)) * (night > 0 ? 0 : 1);
    core.current.position.set(cx, cy, 0);
    core.current.scale.setScalar(Math.max(coreS, 1e-4));
    core.current.visible = coreS > 0.002;
    coreMat.current.color.setRGB(1, mix(0.82, 0.95, crack), mix(0.6, 0.85, crack));

    // ---- Ring: opens toward you, then shatters away with the shell -----------------------
    ring.current.position.set(cx, cy, 0);
    ring.current.scale.setScalar(cs * (1 + ease(burstT) * 2.5));
    ring.current.rotation.set(mix(1.2, 0.18, toStage) + ptr.sy * 0.1, scroll * 0.0006, 0.3 + ptr.sx * 0.1);
    ringMat.current.opacity = night > 0 ? 0 : 1 - ease(seg(p, 0.36, 0.5));
    ring.current.visible = ringMat.current.opacity > 0.01;

    // ---- Halo: warm glow, a flash at the moment of bursting ------------------------------
    const flash = Math.sin(Math.PI * seg(p, 0.33, 0.62));
    const haloOpacity = night > 0 ? 0.75 * night : mix(0.75, 0, field) + flash * 0.6;
    haloSprite.current.position.set(cx, cy, -1.5);
    haloSprite.current.scale.setScalar(cs * (4.6 + flash * 7));
    haloMat.current.opacity = haloOpacity;
    haloMat.current.color.copy(night > 0 ? palette[5].b : palette[0].b);

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
    lu.uScale.value = night > 0 ? moonS : shellU.uScale.value;
    lu.uBurst.value = night > 0 ? 1 : burst;
    lu.uSpill.value = night > 0 ? 1 : spill;
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
    lu.uOpacity.value = 1 - 0.6 * field;

    // ---- Bokeh ---------------------------------------------------------------------------
    const bu = bokehMat.uniforms;
    bu.uTime.value = lu.uTime.value * 0.5;
    bu.uScrollW.value = lu.uScrollW.value;
    bu.uHalf.value.copy(lu.uHalf.value);
    bu.uPixelRatio.value = lu.uPixelRatio.value;
    bu.uSize.value = narrow ? 26 : 46;
    bu.uColorA.value.copy(lu.uColorA.value);
    bu.uColorB.value.copy(lu.uColorB.value);
    bu.uOpacity.value = 0.3 * ease(seg(p, 0.85, 1)) * (1 - night);
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
      <mesh geometry={shellGeo} material={shellMat} frustumCulled={false} />
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
