import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: Event) => {
      if (e.target instanceof HTMLElement && e.target.closest('a, button')) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: Event) => {
      if (e.target instanceof HTMLElement && e.target.closest('a, button')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    // Use `mouseover` and `mouseout` to detect hover on interactive elements
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  const cursorSize = isHovering ? 40 : 12;

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.9)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
        zIndex: 999999,
        backdropFilter: isHovering ? 'blur(2px)' : 'none',
      }}
      aria-hidden="true"
    />
  );
};

export default CustomCursor;
