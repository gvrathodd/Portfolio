import { useState, useCallback, useRef } from 'react';
import { useSpring } from '@react-spring/web';

export const useTilt = (maxTiltDeg: number = 7, scaleFactor: number = 1.018) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Damped, flowy spring configuration with natural physics
  const [springStyle, api] = useSpring(() => ({
    xys: [0, 0, 1], // [rotateX, rotateY, scale]
    config: { mass: 1.1, tension: 260, friction: 24 },
  }));

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Percentage for glare sheen (0 to 100%)
    setGlarePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });

    // Normalize coordinates from -1 to 1
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;

    // Calculate rotation in degrees
    const rotateX = -py * maxTiltDeg;
    const rotateY = px * maxTiltDeg;

    api.start({
      xys: [rotateX, rotateY, scaleFactor],
    });
  }, [api, maxTiltDeg, scaleFactor]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    api.start({
      xys: [0, 0, 1],
    });
  }, [api]);

  return {
    elementRef,
    isHovered,
    glarePos,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    transform: springStyle.xys.to((x, y, s) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`),
  };
};
