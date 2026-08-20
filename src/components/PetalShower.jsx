import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function PetalShower({ isActive }) {
  // Ultra-lightweight particle count (8 petals) using pure CSS rounded shapes for 60fps on old phones
  const petals = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const colors = [
        'linear-gradient(135deg, #ffffff, #fce7f3)',
        'linear-gradient(135deg, #f472b6, #fb7185)',
        'linear-gradient(135deg, #e11d48, #be123c)'
      ];
      return {
        id: i,
        left: Math.random() * 92 + 4,
        size: 10 + Math.random() * 8,
        bg: colors[i % colors.length],
        duration: 5 + Math.random() * 3,
        delay: Math.random() * 2.5,
        drift: (Math.random() - 0.5) * 60,
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
          className="shower-petal-css"
          style={{
            left: `${pt.left}%`,
            top: `-25px`,
            width: `${pt.size}px`,
            height: `${pt.size * 1.5}px`,
            background: pt.bg,
            position: 'absolute',
            borderRadius: '50% 0 50% 50%',
            opacity: 0.8,
            boxShadow: '0 0 6px rgba(244, 114, 182, 0.4)',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          initial={{ y: -30, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, pt.drift, pt.drift * -0.4],
            rotate: [pt.rotate, pt.rotate + 360],
            opacity: [0, 0.85, 0.85, 0]
          }}
          transition={{
            duration: pt.duration,
            delay: pt.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}
