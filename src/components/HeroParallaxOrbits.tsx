import React, { useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { 
  Cpu, 
  Terminal, 
  Binary, 
  Smartphone, 
  Layers, 
  Workflow, 
  Bot, 
  ShieldCheck 
} from 'lucide-react';

interface FloatingPill {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  top: string;
  left?: string;
  right?: string;
  depth: number;
}

const pills: FloatingPill[] = [
  {
    id: 'pytorch',
    label: 'PyTorch + DINOv2',
    sublabel: '307M Vision Transformer',
    icon: <Cpu className="w-3.5 h-3.5 text-sky-400" />,
    top: '12%',
    left: '6%',
    depth: 35,
  },
  {
    id: 'cpp',
    label: 'C++17 Systems',
    sublabel: 'Low Latency & Qt',
    icon: <Terminal className="w-3.5 h-3.5 text-cyan-400" />,
    top: '20%',
    right: '6%',
    depth: 45,
  },
  {
    id: 'ot',
    label: 'Optimal Transport',
    sublabel: 'FGW Sinkhorn Solver',
    icon: <Binary className="w-3.5 h-3.5 text-indigo-400" />,
    top: '68%',
    left: '8%',
    depth: 25,
  },
  {
    id: 'playwright',
    label: 'HITL Automation',
    sublabel: 'Playwright & OCR',
    icon: <Workflow className="w-3.5 h-3.5 text-sky-300" />,
    top: '72%',
    right: '8%',
    depth: 38,
  },
];

export const HeroParallaxOrbits: React.FC = () => {
  const [{ xy }, api] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 2, tension: 200, friction: 32 },
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      api.start({ xy: [dx, dy] });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [api]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block z-10">
      {pills.map((pill) => (
        <animated.div
          key={pill.id}
          style={{
            top: pill.top,
            left: pill.left,
            right: pill.right,
            transform: xy.to(
              (x, y) => `translate3d(${x * pill.depth}px, ${y * pill.depth}px, 0)`
            ),
          }}
          className="absolute pointer-events-auto"
        >
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl glass-panel border border-sky-500/20 hover:border-sky-400/60 shadow-xl shadow-black/50 transition-all duration-300 hover:scale-105 cursor-default backdrop-blur-xl group">
            <div className="p-1.5 rounded-xl bg-slate-900/90 border border-sky-500/20 text-sky-400 group-hover:text-sky-300 transition-colors">
              {pill.icon}
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white group-hover:text-sky-200 transition-colors font-mono">
                {pill.label}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {pill.sublabel}
              </div>
            </div>
          </div>
        </animated.div>
      ))}
    </div>
  );
};
