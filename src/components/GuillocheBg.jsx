import React from 'react';

/**
 * Guilloche & Geometric Line Pattern Background
 * Recreates the subtle technical/mathematical wireframe geometry curves 
 * visible in the background corners of the reference poster card.
 */
export default function GuillocheBg() {
  return (
    <svg 
      className="guilloche-bg" 
      viewBox="0 0 480 720" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="rgba(244, 114, 182, 0.25)" strokeWidth="0.5" fill="none">
        {/* Top Right Curved Geometry Array */}
        {Array.from({ length: 28 }).map((_, i) => (
          <path
            key={`tr-${i}`}
            d={`M 200 0 Q ${480 - i * 12} ${i * 18} 480 ${250 + i * 15}`}
          />
        ))}

        {/* Bottom Left Curved Geometry Array */}
        {Array.from({ length: 28 }).map((_, i) => (
          <path
            key={`bl-${i}`}
            d={`M 0 ${400 + i * 10} Q ${i * 14} ${720 - i * 10} ${280 + i * 8} 720`}
          />
        ))}

        {/* Outer Fine Guilloche Ellipses */}
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={`el-${i}`}
            cx="240"
            cy="360"
            rx={200 + i * 15}
            ry={300 + i * 22}
            stroke="rgba(244, 114, 182, 0.08)"
            strokeWidth="0.4"
            transform={`rotate(${i * 6} 240 360)`}
          />
        ))}
      </g>
    </svg>
  );
}
