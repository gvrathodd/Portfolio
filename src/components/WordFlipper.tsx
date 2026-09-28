import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';

const roles = [
  "Software Engineer & Systems Builder",
  "AI/ML & Deep Learning Developer",
  "Computer Vision & Agent Architect",
  "IIT Mandi Engineering Scholar",
];

export const WordFlipper: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const transitions = useTransition(index, {
    from: { opacity: 0, transform: 'translate3d(0, 18px, 0) scale(0.96)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0px, 0) scale(1)' },
    leave: { opacity: 0, transform: 'translate3d(0, -18px, 0) scale(0.96)' },
    config: { tension: 340, friction: 24 },
  });

  return (
    <div className="relative h-10 sm:h-12 w-full flex items-center justify-center overflow-hidden my-1">
      {transitions((style, i) => (
        <animated.div
          style={style}
          className="absolute font-bold text-xl sm:text-3xl bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-tight text-center"
        >
          {roles[i]}
        </animated.div>
      ))}
    </div>
  );
};
