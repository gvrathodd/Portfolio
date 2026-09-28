import { useState, useCallback, useRef } from 'react';
import { useSpring } from '@react-spring/web';

export const useTilt = (maxTiltDeg: number = 8, scaleFactor: number = 1.02) => {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const [springStyle, api] = useSpring(() => ({
    xys: [0, 0, 1], // [rotateX, rotateY, scale]
    config: { mass: 1.2, tension: 350, friction: 26 },
  }));

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates from -1 to 1
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;

    // Calculate rotation in degrees (inverted Y for intuitive natural feel)
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
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    transform: springStyle.xys.to((x, y, s) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`),
  };
};
