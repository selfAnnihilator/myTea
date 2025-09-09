import React, { useState, useEffect } from 'react';

const StaticRoomBackground: React.FC = () => {
  const [transformStyle, setTransformStyle] = useState({
    transform: 'scale(1.05) translateX(0px)',
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth } = window;
      const { clientX } = e;
      const strength = 40; // Determines the maximum pixel movement
      const moveX = (clientX / innerWidth - 0.5) * strength * -1; // Invert movement for a natural feel

      setTransformStyle({
        transform: `scale(1.05) translateX(${moveX}px)`,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 ease-out blur-sm"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={transformStyle}
      >
        <defs>
          <radialGradient id="sky-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#2e3a59', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#121828', stopOpacity: 1 }} />
          </radialGradient>
          <filter id="monitor-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background sky and floor */}
        <rect width="1920" height="1080" fill="url(#sky-gradient)" />
        <path d="M0 800 H1920 V1080 H0 Z" fill="#222" />

        {/* Stars */}
        <circle cx="200" cy="150" r="2" fill="white" opacity="0.8" />
        <circle cx="450" cy="250" r="1.5" fill="white" opacity="0.6" />
        <circle cx="800" cy="100" r="2.5" fill="white" opacity="0.9" />
        <circle cx="1100" cy="300" r="1" fill="white" opacity="0.5" />
        <circle cx="1500" cy="200" r="2" fill="white" opacity="0.7" />
        <circle cx="1700" cy="400" r="1.5" fill="white" opacity="0.8" />
        <circle cx="600" cy="450" r="1" fill="white" opacity="0.6" />
        <circle cx="950" cy="500" r="2" fill="white" opacity="0.9" />

        {/* Window */}
        <rect x="100" y="50" width="800" height="500" fill="none" stroke="#111" strokeWidth="20" />
        <line x1="500" y1="50" x2="500" y2="550" stroke="#111" strokeWidth="15" />
        <line x1="100" y1="300" x2="900" y2="300" stroke="#111" strokeWidth="15" />

        {/* Desk */}
        <rect x="0" y="780" width="1920" height="40" fill="#4a3b31" />
        <rect x="250" y="820" width="50" height="260" fill="#3d3027" />
        <rect x="1620" y="820" width="50" height="260" fill="#3d3027" />

        {/* Monitors */}
        {/* Left Monitor */}
        <g>
          <rect x="600" y="480" width="400" height="250" rx="10" fill="#111" />
          <foreignObject x="610" y="490" width="380" height="230">
            {/* @ts-ignore */}
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ backgroundColor: '#1a202c', color: '#4ae1a0', fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.2', whiteSpace: 'pre', overflow: 'hidden', padding: '10px', height: '100%', boxSizing: 'border-box' }}>
              <p style={{ margin: 0, color: '#63b3ed' }}>{'import React from "react";'}</p>
              <p style={{ margin: 0 }}>{' '}</p>
              <p style={{ margin: 0 }}><span style={{ color: '#f6ad55' }}>const</span> <span style={{ color: '#9f7aea' }}>Component</span> = () {'=>'} {'{'}</p>
              <p style={{ margin: 0, paddingLeft: '1em' }}><span style={{ color: '#f6ad55' }}>&lt;</span><span style={{ color: '#48bb78' }}>div</span><span style={{ color: '#f6ad55' }}>&gt;</span></p>
              <p style={{ margin: 0, paddingLeft: '2em' }}>Hello, World!</p>
              <p style={{ margin: 0, paddingLeft: '1em' }}><span style={{ color: '#f6ad55' }}>&lt;/</span><span style={{ color: '#48bb78' }}>div</span><span style={{ color: '#f6ad55' }}>&gt;</span></p>
              <p style={{ margin: 0 }}>{'}'};</p>
            </div>
          </foreignObject>
          <rect x="780" y="730" width="40" height="50" fill="#2d3748" />
        </g>

        {/* Center Monitor */}
        <g filter="url(#monitor-glow)">
          <rect x="1050" y="450" width="500" height="280" rx="15" fill="#111" />
           <foreignObject x="1060" y="460" width="480" height="260">
            {/* @ts-ignore */}
             <div xmlns="http://www.w3.org/1999/xhtml" style={{ backgroundColor: '#1a202c', color: '#a0aec0', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.3', whiteSpace: 'pre', overflow: 'hidden', padding: '10px', height: '100%', boxSizing: 'border-box' }}>
                <p style={{ margin: 0, color: '#48bb78' }}>[local@mytea ~]$ <span style={{ color: '#a0aec0' }}>echo "Welcome!"</span></p>
                <p style={{ margin: 0 }}>Welcome!</p>
                <p style={{ margin: 0, color: '#48bb78' }}>[local@mytea ~]$ <span style={{ color: '#a0aec0' }}>ls -l</span></p>
                <p style={{ margin: 0 }}>total 1</p>
                <p style={{ margin: 0 }}>-rw-r--r-- 1 local local 1024 Jan 1 12:00 articles.json</p>
                <p style={{ margin: 0, color: '#48bb78' }}>[local@mytea ~]$ <span className="cursor-blink">_</span></p>
             </div>
          </foreignObject>
          <rect x="1280" y="730" width="40" height="50" fill="#2d3748" />
        </g>

        {/* Keyboard and Mouse */}
        <rect x="850" y="760" width="500" height="20" rx="5" fill="#2d3748" />
        <ellipse cx="1400" cy="770" rx="30" ry="15" fill="#2d3748" />

        {/* Lamp */}
        <path d="M350 780 L380 600 H480 L450 780 Z" fill="#e2e8f0" />
        <rect x="410" y="550" width="20" height="50" fill="#cbd5e0" />
        <path d="M380 600 C 380 550, 480 550, 480 600" fill="#f7fafc" />
        <path d="M350 780 L520 800 L490 780 Z" fill="rgba(251, 211, 141, 0.3)" filter="url(#monitor-glow)" />

        {/* Plant */}
        <path d="M1600 750 C 1580 730, 1620 730, 1600 750" fill="#8d6e63" />
        <path d="M1600 740 C 1580 720, 1570 680, 1600 680 C 1630 680, 1620 720, 1600 740" fill="#4caf50" />
        <path d="M1600 720 C 1620 700, 1640 670, 1620 670 C 1600 670, 1580 700, 1600 720" fill="#66bb6a" />
      </svg>
    </div>
  );
};

export default StaticRoomBackground;