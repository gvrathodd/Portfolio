import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { 
  Cpu, 
  Binary, 
  Layers, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  RefreshCw 
} from 'lucide-react';

export const DeepfakeSimulator: React.FC = () => {
  const [sampleType, setSampleType] = useState<'real' | 'deepfake'>('deepfake');
  const [compressionLevel, setCompressionLevel] = useState<number>(3); // 1 = None, 5 = Heavy

  // Spring animation for anomaly score dial
  const anomalyScore = sampleType === 'deepfake'
    ? Math.min(98, 88 + compressionLevel * 2)
    : Math.max(3, 12 - compressionLevel);

  const dialSpring = useSpring({
    score: anomalyScore,
    config: { tension: 220, friction: 20 },
  });

  return (
    <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-sky-500/30 overflow-hidden shadow-2xl my-10 bg-slate-950/80">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-sky-500/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-sky-400 uppercase tracking-widest mb-1.5">
            <Sparkles className="w-4 h-4" />
            Interactive Research Architecture Demo
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Dual-Branch Multimodal Deepfake Inspector
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Simulate DINOv2 ViT-L/14 patch extraction and Fused Gromov-Wasserstein (FGW) anomaly heatmaps under domain shift compression.
          </p>
        </div>

        {/* Sample Switcher Buttons */}
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-sky-500/20 shrink-0">
          <button
            onClick={() => setSampleType('deepfake')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              sampleType === 'deepfake'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Synthetic Forgery
          </button>
          <button
            onClick={() => setSampleType('real')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              sampleType === 'real'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pristine Face
          </button>
        </div>
      </div>

      {/* Architecture Pipeline Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Stage 1: Input */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-sky-500/15 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">Stage 01</span>
            <h4 className="text-sm font-bold text-white mt-1">Input Sample</h4>
            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-2xl mb-1">{sampleType === 'deepfake' ? '🎭' : '👤'}</div>
              <span className="text-xs font-mono text-slate-300 font-medium">
                {sampleType === 'deepfake' ? 'WildDeepfake Test' : 'Real Dataset'}
              </span>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 font-mono">
            Size: 224×224 RGB
          </div>
        </div>

        {/* Stage 2: Dual Branch Feature Extraction */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-sky-500/15 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">Stage 02</span>
            <h4 className="text-sm font-bold text-white mt-1">Dual-Branch Stream</h4>
            <div className="mt-2 space-y-2">
              <div className="p-2 rounded-lg bg-slate-950 border border-sky-500/20 text-xs">
                <span className="text-sky-300 font-mono font-semibold">DINOv2 ViT-L/14</span>
                <p className="text-[10px] text-slate-400">1024-d patch tokens</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-cyan-500/20 text-xs">
                <span className="text-cyan-300 font-mono font-semibold">SRM Frequency</span>
                <p className="text-[10px] text-slate-400">30 kernels • 128-d noise</p>
              </div>
            </div>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 font-mono">
            Fusion Head: 1153-d
          </div>
        </div>

        {/* Stage 3: Optimal Transport Graph Matching */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-sky-500/15 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">Stage 03</span>
            <h4 className="text-sm font-bold text-white mt-1">Optimal Transport</h4>
            <div className="mt-2 p-2.5 rounded-lg bg-slate-950 border border-indigo-500/20 space-y-1.5 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Solver:</span>
                <span className="text-indigo-300 font-mono">Sinkhorn (20 iter)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Bank:</span>
                <span className="text-indigo-300 font-mono">32 Prototypes</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Patch Graph:</span>
                <span className="text-indigo-300 font-mono">K = 3 Neighbors</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-mono">
            ✓ FGW Converged
          </div>
        </div>

        {/* Stage 4: Anomaly Decision */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between transition-colors ${
          sampleType === 'deepfake'
            ? 'bg-rose-950/30 border-rose-500/30 text-rose-200'
            : 'bg-sky-950/30 border-sky-500/30 text-sky-200'
        }`}>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Stage 04</span>
            <h4 className="text-sm font-bold mt-1">Classification Output</h4>
            <div className="mt-3 text-center">
              <animated.div className="text-3xl font-extrabold font-mono tracking-tight">
                {dialSpring.score.to((n) => `${n.toFixed(1)}%`)}
              </animated.div>
              <span className="text-xs font-mono font-medium block mt-1">
                {sampleType === 'deepfake' ? '⚠️ Forgery Detected' : '✅ Verified Authentic'}
              </span>
            </div>
          </div>

          <div className="mt-3 text-[11px] font-mono opacity-80">
            {sampleType === 'deepfake' ? 'Heatmap: High Entropy' : 'Heatmap: Coherent'}
          </div>
        </div>
      </div>

      {/* Domain Shift Interactive Slider & Metric Benchmark */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="w-full sm:w-1/2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              Domain Shift / Video Compression:
            </span>
            <span className="text-sky-300 font-bold">Level {compressionLevel} / 5</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={compressionLevel}
            onChange={(e) => setCompressionLevel(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>Lossless Raw</span>
            <span>Heavy Web Compression (140k+ samples)</span>
          </div>
        </div>

        {/* Real-world Benchmark Outperformance Comparison */}
        <div className="w-full sm:w-auto flex items-center gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase block">Gaurav's Model</span>
            <span className="text-sm font-bold text-sky-300">0.884 AUC</span>
            <span className="text-[10px] text-emerald-400 block">+5.3% vs base</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase block">XceptionNet Base</span>
            <span className="text-sm font-bold text-slate-400">0.831 AUC</span>
            <span className="text-[10px] text-rose-400 block">-26% Recall</span>
          </div>
        </div>
      </div>
    </div>
  );
};
