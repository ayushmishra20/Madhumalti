import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function PetalShower({ isActive }) {
  // Reduced density to 20 delicate cascading petals for maximum aesthetic elegance
  const petals = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const colors = ['#ffffff', '#fce7f3', '#f472b6', '#fb7185', '#e11d48', '#be123c'];
      return {
        id: i,
        left: Math.random() * 96 + 2, // percentage across screen
        scale: 0.45 + Math.random() * 0.5,
        color: colors[i % colors.length],
        duration: 4.5 + Math.random() * 4,
        delay: Math.random() * 3.5,
        drift: (Math.random() - 0.5) * 90, // subtle horizontal sway
        rotate: Math.random() * 360
      };
    });
  }, []);

  if (!isActive) return null;

  return (
    <div className="petal-shower-overlay" aria-hidden="true">
      {petals.map((pt) => (
        <motion.div
          key={pt.id}
          className="shower-petal"
          style={{
            left: `${pt.left}%`,
            top: `-40px`,
            position: 'absolute'
          }}
          initial={{ y: -50, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, pt.drift, pt.drift * -0.5, pt.drift * 0.8],
            rotate: [pt.rotate, pt.rotate + 360],
            opacity: [0, 0.85, 0.85, 0]
          }}
          transition={{
            duration: pt.duration,
            delay: pt.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg
            width={20 * pt.scale}
            height={28 * pt.scale}
            viewBox="0 0 24 32"
            fill="none"
          >
            <path
              d="M 12 0 C 4 10 0 20 12 32 C 24 20 20 10 12 0 Z"
              fill={pt.color}
              opacity="0.8"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
