import React from 'react';

const marqueeItems = [
  "Deep Learning Architectures",
  "DINOv2 ViT-L/14 Vision Model",
  "Optimal Transport (FGW)",
  "60 FPS Graph Traversal Engine",
  "High-Performance C++17 & Qt",
  "HITL Process Automation",
  "Autonomous Computer Vision",
  "Full-Stack Web & Android",
  "IIT Mandi Engineering Scholar",
];

export const KineticMarquee: React.FC = () => {
  return (
    <div className="w-full border-y border-sky-400/15 bg-sky-950/25 py-4 overflow-hidden select-none backdrop-blur-xl">
      <div className="animate-marquee flex items-center gap-10 text-xs sm:text-sm font-medium tracking-wide text-sky-200/80">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-10 shrink-0">
            <span className="hover:text-white transition-colors cursor-default">
              {item}
            </span>
            <span className="text-sky-400 font-bold text-xs opacity-75">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
