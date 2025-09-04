import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 text-white/80" role="status" aria-live="polite">
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Cup */}
            <path d="M6 12h10v3.5c0 1.933-1.567 3.5-3.5 3.5h-3C7.567 19 6 17.433 6 15.5V12z" />
            <path d="M16 12h2.5c1.38 0 2.5-1.12 2.5-2.5v-1C21 7.12 19.88 6 18.5 6H16v6z" />
            
            {/* Steam using SMIL animation */}
            <g>
              <path d="M8.5,11 Q9,9.5 9.5,11 T 10.5,11">
                <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6" dur="3s" repeatCount="indefinite" begin="0s" />
                <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="0s" />
              </path>
              <path d="M11.5,11 Q12,9.5 12.5,11 T 13.5,11">
                <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6" dur="3s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
              </path>
              <path d="M14.5,11 Q15,9.5 15.5,11 T 16.5,11">
                <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6" dur="3s" repeatCount="indefinite" begin="2s" />
                <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="2s" />
              </path>
            </g>
        </g>
      </svg>
      <p className="text-2xl font-semibold mt-4">Brewing the freshest articles...</p>
    </div>
  );
};

export default LoadingSpinner;