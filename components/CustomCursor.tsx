
import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out z-50 hidden md:block"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div
        className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
          isHovering ? 'scale-150 border-white bg-white/20' : 'scale-100 border-white/50'
        }`}
      ></div>
      <div className={`absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  );
};

export default CustomCursor;
