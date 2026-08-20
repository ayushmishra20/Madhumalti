import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Photorealistic Madhumalti Bloom Component
 * Matches the reference image:
 * - Radiating long green pedicels with white & pink buds at the top crown
 * - Thick upper cluster of 5-petaled Madhumalti star blossoms in white -> pink -> crimson red
 * - Woven overlay with "MADHUMALTI BLOOM" typography
 * - Lower cascading vine tapering into green leaves & delicate dangling white/pink star flowers
 * - Swirling green and magenta magic light trails
 */

const Flower = ({ x, y, scale = 1, rotation = 0, stage = 'pink', delay = 0, isKey = false }) => {
  const palettes = {
    white: {
      petalMain: 'url(#petalWhiteGrad)',
      petalShadow: '#fce7f3',
      neck: 'url(#neckWhiteGrad)',
      center: '#fef08a',
      throat: '#f472b6'
    },
    lightPink: {
      petalMain: 'url(#petalLightPinkGrad)',
      petalShadow: '#fb7185',
      neck: 'url(#neckPinkGrad)',
      center: '#fef08a',
      throat: '#e11d48'
    },
    pink: {
      petalMain: 'url(#petalPinkGrad)',
      petalShadow: '#f43f5e',
      neck: 'url(#neckPinkGrad)',
      center: '#fde047',
      throat: '#be123c'
    },
    crimson: {
      petalMain: 'url(#petalCrimsonGrad)',
      petalShadow: '#be123c',
      neck: 'url(#neckCrimsonGrad)',
      center: '#facc15',
      throat: '#881337'
    },
    deepRed: {
      petalMain: 'url(#petalDeepRedGrad)',
      petalShadow: '#881337',
      neck: 'url(#neckCrimsonGrad)',
      center: '#eab308',
      throat: '#4c0519'
    }
  };

  const palette = palettes[stage] || palettes.pink;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <motion.g
        initial={{ scale: 0, rotate: rotation - 45, opacity: 0 }}
        animate={{ 
          scale: [0, 1.22, 1], 
          rotate: rotation, 
          opacity: 1 
        }}
        transition={{
          duration: 1.25,
          delay: delay,
          ease: [0.34, 1.56, 0.64, 1]
        }}
      >
        {/* Soft Radial Ambient Glow */}
        {isKey && (
          <circle 
            cx="0" 
            cy="0" 
            r="46" 
            fill="rgba(244, 114, 182, 0.4)" 
            filter="blur(14px)" 
          />
        )}

        {/* Slender Tubular Neck */}
        <path
          d="M -3.5 10 Q 0 32 -2 50 L 2 50 Q 0 32 3.5 10 Z"
          fill={palette.neck}
          opacity="0.88"
        />

        {/* 5 Star Petals */}
        <g>
          {[0, 72, 144, 216, 288].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle})`}>
              <path
                d="M 0 0 C -14 -20 -18 -36 0 -48 C 18 -36 14 -20 0 0 Z"
                fill={palette.petalShadow}
                opacity="0.6"
                transform="scale(1.06)"
              />
              <path
                d="M 0 0 C -13 -18 -16 -34 0 -46 C 16 -34 13 -18 0 0 Z"
                fill={palette.petalMain}
              />
              <path
                d="M 0 -2 Q 0 -22 0 -38"
                stroke="#ffffff"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity="0.45"
              />
            </g>
          ))}
        </g>

        {/* Center Throat & Stamens */}
        <circle cx="0" cy="0" r="7.5" fill={palette.throat} />
        <circle cx="0" cy="0" r="5" fill="#be123c" opacity="0.6" />

        {[36, 108, 180, 252, 324].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <line x1="0" y1="0" x2="0" y2="-12" stroke="#fef08a" strokeWidth="1.2" opacity="0.95" />
            <circle cx="0" cy="-13" r="1.8" fill="#facc15" />
          </g>
        ))}

        <circle cx="0" cy="0" r="2.8" fill="#86efac" />
      </motion.g>
    </g>
  );
};

// Pedicel + Bud Component radiating at top crown
const TopPedicelBud = ({ x1, y1, x2, y2, color = '#f472b6', delay = 0 }) => (
  <g>
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#15803d"
      strokeWidth="1.8"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.9, delay: delay }}
    />
    <motion.circle
      cx={x2}
      cy={y2}
      r="4.5"
      fill={color}
      stroke="#166534"
      strokeWidth="1"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.6, delay: delay + 0.5 }}
    />
  </g>
);

// Botanical Leaf Component
const Leaf = ({ x, y, scale = 1, rotation = 0, delay = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    <motion.g
      initial={{ scale: 0, rotate: rotation - 30, opacity: 0 }}
      animate={{ scale: [0, 1.18, 1], rotate: rotation, opacity: 1 }}
      transition={{ duration: 1, delay: delay, ease: 'easeOut' }}
    >
      <path
        d="M 0 0 C -20 -22 -24 -50 0 -70 C 24 -50 20 -22 0 0 Z"
        fill="#000000"
        opacity="0.25"
        transform="translate(2, 4)"
      />
      <path
        d="M 0 0 C -18 -20 -22 -46 0 -66 C 22 -46 18 -20 0 0 Z"
        fill="url(#realLeafGrad)"
      />
      <path d="M 0 0 L 0 -64" stroke="#86efac" strokeWidth="1.4" opacity="0.7" strokeLinecap="round" />
      <path d="M 0 -16 L -10 -26 M 0 -30 L -11 -40 M 0 -46 L -7 -54" stroke="#86efac" strokeWidth="0.9" opacity="0.45" />
      <path d="M 0 -16 L 10 -26 M 0 -30 L 11 -40 M 0 -46 L 7 -54" stroke="#86efac" strokeWidth="0.9" opacity="0.45" />
    </motion.g>
  </g>
);

export default function MadhumaltiBloom({ refreshKey }) {
  const sparkles = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      cx: 60 + Math.random() * 400,
      cy: 70 + Math.random() * 620,
      r: 1 + Math.random() * 3,
      color: i % 3 === 0 ? '#86efac' : i % 2 === 0 ? '#f472b6' : '#fef08a',
      delay: Math.random() * 2,
      duration: 2.5 + Math.random() * 3
    }));
  }, [refreshKey]);

  const fallingPetals = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: 160 + Math.random() * 200,
      startY: 180 + Math.random() * 200,
      delay: 1.5 + i * 0.4,
      color: i % 2 === 0 ? '#f472b6' : '#e11d48'
    }));
  }, [refreshKey]);

  return (
    <div className="bloom-stage" key={refreshKey}>
      <div className="swaying-container">
        <svg
          viewBox="0 0 520 760"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full select-none"
          style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.65))' }}
        >
          <defs>
            <linearGradient id="petalWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#fff0f5" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>

            <linearGradient id="petalLightPinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fce7f3" />
              <stop offset="60%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>

            <linearGradient id="petalPinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="70%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>

            <linearGradient id="petalCrimsonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="60%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>

            <linearGradient id="petalDeepRedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="60%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>

            <linearGradient id="neckWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            <linearGradient id="neckPinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            <linearGradient id="neckCrimsonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>

            <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="40%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>

            <linearGradient id="realLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>

            <linearGradient id="swirlGradPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(244, 114, 182, 0.85)" />
              <stop offset="50%" stopColor="rgba(225, 29, 72, 0.6)" />
              <stop offset="100%" stopColor="rgba(244, 114, 182, 0)" />
            </linearGradient>

            <linearGradient id="swirlGradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(134, 239, 172, 0.85)" />
              <stop offset="60%" stopColor="rgba(34, 197, 94, 0.5)" />
              <stop offset="100%" stopColor="rgba(134, 239, 172, 0)" />
            </linearGradient>

            <radialGradient id="centerGlow" cx="50%" cy="32%" r="50%">
              <stop offset="0%" stopColor="rgba(244, 114, 182, 0.65)" />
              <stop offset="50%" stopColor="rgba(225, 29, 72, 0.32)" />
              <stop offset="100%" stopColor="rgba(7, 6, 10, 0)" />
            </radialGradient>
          </defs>

          {/* Central Pink Ambient Glow */}
          <motion.circle
            cx="260"
            cy="280"
            r="240"
            fill="url(#centerGlow)"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0.9], scale: [0.5, 1.12, 1] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />

          {/* Swirling Green & Pink Magic Dust Trails */}
          <motion.path
            d="M 120 280 C 70 360 110 460 210 520 C 270 560 320 500 300 420"
            fill="none"
            stroke="url(#swirlGradGreen)"
            strokeWidth="2.5"
            strokeDasharray="6 8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.85, 0.4] }}
            transition={{ duration: 2.2, delay: 0.3 }}
          />

          <motion.path
            d="M 380 200 C 440 280 400 400 330 470 C 270 530 220 600 240 660"
            fill="none"
            stroke="url(#swirlGradPink)"
            strokeWidth="2.5"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.85, 0.4] }}
            transition={{ duration: 2.5, delay: 0.5 }}
          />

          {/* ================= RADIATING PEDICELS & BUDS AT TOP ================= */}
          <g id="top-pedicels">
            <TopPedicelBud x1={220} y1={180} x2={160} y2={100} color="#ffffff" delay={0.2} />
            <TopPedicelBud x1={235} y1={170} x2={190} y2={85} color="#f472b6" delay={0.25} />
            <TopPedicelBud x1={250} y1={160} x2={225} y2={70} color="#fce7f3" delay={0.3} />
            <TopPedicelBud x1={265} y1={160} x2={260} y2={65} color="#ffffff" delay={0.35} />
            <TopPedicelBud x1={280} y1={165} x2={295} y2={70} color="#f472b6" delay={0.4} />
            <TopPedicelBud x1={295} y1={175} x2={335} y2={85} color="#fda4af" delay={0.45} />
            <TopPedicelBud x1={310} y1={185} x2={370} y2={105} color="#be123c" delay={0.5} />
            <TopPedicelBud x1={325} y1={200} x2={400} y2={135} color="#e11d48" delay={0.55} />
          </g>

          {/* ================= MAIN VINE STEM (S-CURVE DOWNWARD) ================= */}
          <g id="vine-stems">
            <motion.path
              d="M 260 120 Q 280 200 265 290 Q 250 370 270 450 Q 285 520 260 590 T 240 660"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />

            <motion.path
              d="M 260 180 Q 200 190 160 230"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />

            <motion.path
              d="M 270 190 Q 340 200 395 240"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />

            <motion.path
              d="M 265 310 Q 210 350 200 420"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, delay: 0.4 }}
            />

            <motion.path
              d="M 270 450 Q 320 480 335 550"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, delay: 0.5 }}
            />
          </g>

          {/* ================= LEAVES LAYER ================= */}
          <g id="leaves">
            <Leaf x={210} y={150} scale={0.9} rotation={-50} delay={0.2} />
            <Leaf x={310} y={150} scale={0.9} rotation={50} delay={0.25} />
            <Leaf x={170} y={200} scale={0.95} rotation={-80} delay={0.3} />
            <Leaf x={360} y={210} scale={0.95} rotation={80} delay={0.35} />

            <Leaf x={140} y={260} scale={1.0} rotation={-110} delay={0.4} />
            <Leaf x={400} y={270} scale={1.0} rotation={110} delay={0.45} />
            <Leaf x={180} y={300} scale={1.0} rotation={-95} delay={0.5} />
            <Leaf x={350} y={310} scale={1.0} rotation={95} delay={0.55} />

            <Leaf x={220} y={370} scale={0.9} rotation={-85} delay={0.6} />
            <Leaf x={320} y={380} scale={0.9} rotation={85} delay={0.65} />
            <Leaf x={185} y={430} scale={0.85} rotation={-115} delay={0.7} />
            <Leaf x={350} y={450} scale={0.85} rotation={110} delay={0.75} />

            <Leaf x={230} y={490} scale={0.8} rotation={-65} delay={0.8} />
            <Leaf x={310} y={520} scale={0.8} rotation={65} delay={0.85} />
            <Leaf x={235} y={560} scale={0.7} rotation={-45} delay={0.9} />
            <Leaf x={280} y={590} scale={0.65} rotation={40} delay={0.95} />
            <Leaf x={225} y={630} scale={0.55} rotation={-30} delay={1.0} />
          </g>

          {/* ================= THICK UPRIGHT TOP DOME BLOOMS ================= */}
          <g id="top-dense-flowers">
            {/* Top-Left White Blossoms */}
            <Flower x={200} y={160} scale={0.75} rotation={-20} stage="white" delay={0.35} />
            <Flower x={170} y={185} scale={0.8} rotation={-35} stage="white" delay={0.4} />
            <Flower x={230} y={170} scale={0.8} rotation={-10} stage="white" delay={0.42} />

            {/* Top-Middle & Top-Right Pink & Crimson Blossoms */}
            <Flower x={270} y={160} scale={0.85} rotation={10} stage="lightPink" delay={0.45} />
            <Flower x={310} y={170} scale={0.85} rotation={25} stage="pink" delay={0.48} />
            <Flower x={350} y={185} scale={0.85} rotation={40} stage="crimson" delay={0.5} />
            <Flower x={385} y={205} scale={0.8} rotation={55} stage="deepRed" delay={0.52} />

            {/* Dense Upper Core (Thick Mass) */}
            <Flower x={210} y={215} scale={0.95} rotation={-25} stage="white" delay={0.55} isKey />
            <Flower x={250} y={205} scale={1.0} rotation={-5} stage="lightPink" delay={0.58} isKey />
            <Flower x={295} y={210} scale={1.0} rotation={15} stage="pink" delay={0.6} isKey />
            <Flower x={340} y={225} scale={0.95} rotation={35} stage="crimson" delay={0.62} isKey />

            <Flower x={180} y={245} scale={0.95} rotation={-45} stage="lightPink" delay={0.65} />
            <Flower x={225} y={240} scale={1.05} rotation={-15} stage="pink" delay={0.68} isKey />
            <Flower x={275} y={245} scale={1.1} rotation={5} stage="crimson" delay={0.7} isKey />
            <Flower x={325} y={255} scale={1.05} rotation={25} stage="deepRed" delay={0.72} isKey />
            <Flower x={370} y={270} scale={0.9} rotation={45} stage="deepRed" delay={0.75} />

            <Flower x={155} y={290} scale={0.9} rotation={-65} stage="white" delay={0.78} />
            <Flower x={200} y={285} scale={1.05} rotation={-30} stage="pink" delay={0.8} isKey />
            <Flower x={250} y={280} scale={1.15} rotation={-8} stage="crimson" delay={0.82} isKey />
            <Flower x={300} y={290} scale={1.15} rotation={12} stage="deepRed" delay={0.85} isKey />
            <Flower x={345} y={305} scale={0.95} rotation={35} stage="crimson" delay={0.88} />

            {/* Dense Center Section overlapping Title Typography */}
            <Flower x={225} y={325} scale={1.1} rotation={-18} stage="deepRed" delay={0.9} isKey />
            <Flower x={275} y={330} scale={1.2} rotation={8} stage="crimson" delay={0.92} isKey />
            <Flower x={320} y={345} scale={1.0} rotation={28} stage="pink" delay={0.95} isKey />
          </g>

          {/* ================= LOWER CASCADING SPRAY ================= */}
          <g id="lower-trailing-flowers">
            <Flower x={185} y={355} scale={0.9} rotation={-45} stage="pink" delay={0.98} />
            <Flower x={235} y={375} scale={1.0} rotation={-10} stage="white" delay={1.0} isKey />
            <Flower x={285} y={385} scale={0.95} rotation={15} stage="crimson" delay={1.02} />

            <Flower x={210} y={420} scale={0.9} rotation={-25} stage="lightPink" delay={1.05} />
            <Flower x={260} y={435} scale={0.95} rotation={5} stage="deepRed" delay={1.08} isKey />
            <Flower x={310} y={450} scale={0.85} rotation={25} stage="pink" delay={1.1} />

            <Flower x={235} y={485} scale={0.85} rotation={-15} stage="pink" delay={1.15} />
            <Flower x={280} y={505} scale={0.8} rotation={20} stage="white" delay={1.18} />

            <Flower x={250} y={545} scale={0.8} rotation={-5} stage="crimson" delay={1.22} />
            <Flower x={295} y={560} scale={0.75} rotation={25} stage="lightPink" delay={1.25} />

            <Flower x={235} y={600} scale={0.7} rotation={-10} stage="white" delay={1.28} />
            <Flower x={265} y={635} scale={0.65} rotation={10} stage="pink" delay={1.32} />
            <Flower x={240} y={670} scale={0.6} rotation={-5} stage="white" delay={1.35} />
          </g>

          {/* ================= FALLING PETALS ================= */}
          <g id="falling-petals">
            {fallingPetals.map((pt) => (
              <motion.path
                key={pt.id}
                d="M 0 0 C -8 -10 -10 -20 0 -28 C 10 -20 8 -10 0 0 Z"
                fill={pt.color}
                opacity="0.8"
                transform={`translate(${pt.x}, ${pt.startY}) scale(0.65)`}
                initial={{ y: 0, opacity: 0, rotate: 0 }}
                animate={{
                  y: [0, 240],
                  x: [0, (pt.id % 2 === 0 ? 40 : -40)],
                  rotate: [0, 190],
                  opacity: [0, 0.95, 0]
                }}
                transition={{
                  duration: 4.5 + Math.random() * 2,
                  delay: pt.delay,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </g>

          {/* ================= FLOATING SPARKLES ================= */}
          <g id="sparkles">
            {sparkles.map((sp) => (
              <motion.circle
                key={sp.id}
                cx={sp.cx}
                cy={sp.cy}
                r={sp.r}
                fill={sp.color}
                initial={{ opacity: 0, y: 15, scale: 0 }}
                animate={{
                  opacity: [0, 0.95, 0],
                  y: [-10, -45],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: sp.duration,
                  delay: sp.delay + 0.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 1.5,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
