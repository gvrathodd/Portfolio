import React, { useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  title?: string;
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  title,
  ariaLabel,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [springStyle, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { mass: 0.8, tension: 300, friction: 18 },
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.28;
    const y = (clientY - (top + height / 2)) * 0.28;

    api.start({ x, y, scale: 1.04 });
  };

  const handleMouseLeave = () => {
    api.start({ x: 0, y: 0, scale: 1 });
  };

  const content = (
    <animated.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: springStyle.x.to((x) => `translate3d(${x}px, ${springStyle.y.get()}px, 0px) scale(${springStyle.scale.get()})`),
      }}
      className={className}
    >
      {children}
    </animated.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        title={title}
        aria-label={ariaLabel}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className="inline-block cursor-pointer" role="button" aria-label={ariaLabel}>
      {content}
    </div>
  );
};
