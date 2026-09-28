import React from 'react';

const marqueeItems = [
  "DEEP LEARNING PIPELINES",
  "DINOv2 ViT-L/14 (307M)",
  "OPTIMAL TRANSPORT (FGW)",
  "60 FPS GRAPH TRAVERSAL",
  "NATIVE C++17 & QT ENGINE",
  "HITL PROCESS AUTOMATION",
  "PADDLEOCR EXTRACTION",
  "AUTONOMOUS VISION RC CAR",
  "RAG & LLM AGENT WORKFLOWS",
  "IIT MANDI SCHOLAR",
];

export const KineticMarquee: React.FC = () => {
  return (
    <div className="w-full border-y border-sky-500/20 bg-slate-950/80 py-3.5 overflow-hidden select-none backdrop-blur-md">
      <div className="animate-marquee flex items-center gap-8 font-mono text-xs sm:text-sm tracking-widest text-slate-300">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="hover:text-sky-300 transition-colors font-medium">
              {item}
            </span>
            <span className="text-sky-400 font-bold text-sm">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
