import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

/**
 * Photorealistic Madhumalti Flower Component
 * Ultra-Optimized & 100% Lag-Free for Low-End / Older Phone Devices
 */

// Animated Glowing Butterfly Component - Hardware Accelerated CSS Orbit
const AnimatedButterfly = () => {
  return (
    <g className="butterfly-group">
      <g transform="scale(0.55)">
        {/* Left Wing */}
        <path
          d="M 0 0 C -25 -25 -40 -15 -35 10 C -30 30 -10 20 0 0 Z"
          fill="url(#butterflyWingGrad)"
          className="butterfly-wing-left"
        />
        {/* Right Wing */}
        <path
          d="M 0 0 C 25 -25 40 -15 35 10 C 30 30 10 20 0 0 Z"
          fill="url(#butterflyWingGrad)"
          className="butterfly-wing-right"
        />
        {/* Lower Left Wing */}
        <path
          d="M 0 0 C -20 10 -30 30 -15 38 C 0 40 -5 15 0 0 Z"
          fill="url(#butterflyLowerGrad)"
          className="butterfly-wing-left"
        />
        {/* Lower Right Wing */}
        <path
          d="M 0 0 C 20 10 30 30 15 38 C 0 40 5 15 0 0 Z"
          fill="url(#butterflyLowerGrad)"
          className="butterfly-wing-right"
        />
        {/* Body & Antenna */}
        <ellipse cx="0" cy="8" rx="2.5" ry="12" fill="#f8fafc" />
        <path d="M -1 -2 Q -8 -15 -12 -18" stroke="#fef08a" strokeWidth="1.2" fill="none" />
        <path d="M 1 -2 Q 8 -15 12 -18" stroke="#fef08a" strokeWidth="1.2" fill="none" />
        <circle cx="-13" cy="-19" r="1.5" fill="#fef08a" />
        <circle cx="13" cy="-19" r="1.5" fill="#fef08a" />
      </g>
    </g>
  );
};

// Interactive Flower Component - Lightweight GPU Scaled
const Flower = ({ x, y, scale = 1, rotation = 0, stage = 'pink', delay = 0, isKey = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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

  const handleClick = (e) => {
    e.stopPropagation();
    setIsClicked(true);

    const svgEl = e.currentTarget.ownerSVGElement;
    if (svgEl) {
      const rect = svgEl.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width;
      const normY = (e.clientY - rect.top) / rect.height;

      confetti({
        particleCount: 10,
        spread: 35,
        origin: { x: normX, y: normY },
        colors: ['#fef08a', '#f472b6', '#ffffff'],
        shapes: ['circle'],
        scalar: 0.55,
        ticks: 45,
        gravity: 0.9,
        disableForReducedMotion: true
      });
    }

    setTimeout(() => setIsClicked(false), 400);
  };

  return (
    <g 
      transform={`translate(${x}, ${y}) scale(${scale})`}
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ willChange: 'transform' }}
    >
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isClicked ? [1.25, 1.05] : isHovered ? 1.15 : 1, 
          opacity: 1 
        }}
        transition={{
          duration: isClicked || isHovered ? 0.2 : 0.8,
          delay: isClicked || isHovered ? 0 : delay,
          ease: 'easeOut'
        }}
      >
        {/* Soft Radial Ambient Glow */}
        {(isKey || isHovered || isClicked) && (
          <circle 
            cx="0" 
            cy="0" 
            r={isClicked ? "46" : "38"} 
            fill={isClicked ? "rgba(254, 240, 138, 0.5)" : "rgba(244, 114, 182, 0.3)"} 
          />
        )}

        {/* Slender Tubular Neck */}
        <path
          d="M -3.5 10 Q 0 32 -2 50 L 2 50 Q 0 32 3.5 10 Z"
          fill={palette.neck}
          opacity="0.85"
        />

        {/* 5 Star Petals */}
        <g transform={`rotate(${rotation})`}>
          {[0, 72, 144, 216, 288].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle})`}>
              <path
                d="M 0 0 C -13 -18 -16 -34 0 -46 C 16 -34 13 -18 0 0 Z"
                fill={palette.petalMain}
              />
              <path
                d="M 0 -2 Q 0 -22 0 -38"
                stroke="#ffffff"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity="0.35"
              />
            </g>
          ))}
        </g>

        {/* Center Throat & Stamens */}
        <circle cx="0" cy="0" r="7" fill={palette.throat} />

        {[36, 108, 180, 252, 324].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <line x1="0" y1="0" x2="0" y2="-11" stroke="#fef08a" strokeWidth="1.1" opacity="0.9" />
            <circle cx="0" cy="-12" r="1.6" fill="#facc15" />
          </g>
        ))}

        <circle cx="0" cy="0" r="2.5" fill="#86efac" />
      </motion.g>
    </g>
  );
};

// Pedicel + Bud Component
const TopPedicelBud = ({ x1, y1, x2, y2, color = '#f472b6', delay = 0 }) => (
  <g>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#15803d"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <motion.circle
      cx={x2}
      cy={y2}
      r="4.5"
      fill={color}
      stroke="#166534"
      strokeWidth="1"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: delay }}
    />
  </g>
);

// Botanical Leaf Component
const Leaf = ({ x, y, scale = 1, rotation = 0, delay = 0 }) => {
  return (
    <g 
      transform={`translate(${x}, ${y}) scale(${scale})`}
      style={{ willChange: 'transform' }}
    >
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
      >
        <path
          d="M 0 0 C -18 -20 -22 -46 0 -66 C 22 -46 18 -20 0 0 Z"
          fill="url(#realLeafGrad)"
          transform={`rotate(${rotation})`}
        />
      </motion.g>
    </g>
  );
};

export default function MadhumaltiBloom({ refreshKey }) {
  // Ultra-lightweight particle counts for 60fps on old phone devices
  const sparkles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      cx: 80 + Math.random() * 360,
      cy: 100 + Math.random() * 550,
      r: 1.2 + Math.random() * 2,
      color: i % 2 === 0 ? '#f472b6' : '#fef08a',
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
  }, [refreshKey]);

  const fireflies = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      startX: 100 + Math.random() * 320,
      startY: 160 + Math.random() * 420,
      r: 2,
      delay: i * 0.5,
      duration: 6 + Math.random() * 2
    }));
  }, [refreshKey]);

  return (
    <div className="bloom-stage" key={refreshKey}>
      {/* Subtle Hint Text */}
      <motion.p
        className="touch-hint-text"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        Touch any flower to make it sparkle
      </motion.p>

      <div className="swaying-container">
        <svg
          viewBox="0 0 520 760"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full select-none"
        >
          <defs>
            <linearGradient id="butterflyWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>

            <linearGradient id="butterflyLowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>

            <linearGradient id="petalWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>

            <linearGradient id="petalLightPinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fce7f3" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>

            <linearGradient id="petalPinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>

            <linearGradient id="petalCrimsonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>

            <linearGradient id="petalDeepRedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e11d48" />
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
              <stop offset="50%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>

            <linearGradient id="realLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>

            <radialGradient id="centerGlow" cx="50%" cy="32%" r="50%">
              <stop offset="0%" stopColor="rgba(244, 114, 182, 0.45)" />
              <stop offset="100%" stopColor="rgba(7, 6, 10, 0)" />
            </radialGradient>
          </defs>

          {/* Central Pink Ambient Glow */}
          <circle cx="260" cy="280" r="230" fill="url(#centerGlow)" />

          {/* ================= RADIATING PEDICELS & BUDS AT TOP ================= */}
          <g id="top-pedicels">
            <TopPedicelBud x1={220} y1={180} x2={160} y2={100} color="#ffffff" delay={0.1} />
            <TopPedicelBud x1={235} y1={170} x2={190} y2={85} color="#f472b6" delay={0.15} />
            <TopPedicelBud x1={250} y1={160} x2={225} y2={70} color="#fce7f3" delay={0.2} />
            <TopPedicelBud x1={265} y1={160} x2={260} y2={65} color="#ffffff" delay={0.25} />
            <TopPedicelBud x1={280} y1={165} x2={295} y2={70} color="#f472b6" delay={0.3} />
            <TopPedicelBud x1={295} y1={175} x2={335} y2={85} color="#fda4af" delay={0.35} />
            <TopPedicelBud x1={310} y1={185} x2={370} y2={105} color="#be123c" delay={0.4} />
          </g>

          {/* ================= MAIN VINE STEM (S-CURVE DOWNWARD) ================= */}
          <g id="vine-stems">
            <path
              d="M 260 120 Q 280 200 265 290 Q 250 370 270 450 Q 285 520 260 590 T 240 660"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M 260 180 Q 200 190 160 230"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 270 190 Q 340 200 395 240"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 265 310 Q 210 350 200 420"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* ================= LEAVES LAYER ================= */}
          <g id="leaves">
            <Leaf x={210} y={150} scale={0.9} rotation={-50} delay={0.1} />
            <Leaf x={310} y={150} scale={0.9} rotation={50} delay={0.15} />
            <Leaf x={170} y={200} scale={0.95} rotation={-80} delay={0.2} />
            <Leaf x={360} y={210} scale={0.95} rotation={80} delay={0.25} />

            <Leaf x={140} y={260} scale={1.0} rotation={-110} delay={0.3} />
            <Leaf x={400} y={270} scale={1.0} rotation={110} delay={0.35} />
            <Leaf x={180} y={300} scale={1.0} rotation={-95} delay={0.4} />
            <Leaf x={350} y={310} scale={1.0} rotation={95} delay={0.45} />

            <Leaf x={220} y={370} scale={0.9} rotation={-85} delay={0.5} />
            <Leaf x={320} y={380} scale={0.9} rotation={85} delay={0.55} />
            <Leaf x={185} y={430} scale={0.85} rotation={-115} delay={0.6} />

            <Leaf x={230} y={490} scale={0.8} rotation={-65} delay={0.65} />
            <Leaf x={310} y={520} scale={0.8} rotation={65} delay={0.7} />
          </g>

          {/* ================= THICK UPRIGHT TOP DOME BLOOMS ================= */}
          <g id="top-dense-flowers">
            <Flower x={200} y={160} scale={0.75} rotation={-20} stage="white" delay={0.2} />
            <Flower x={170} y={185} scale={0.8} rotation={-35} stage="white" delay={0.25} />
            <Flower x={230} y={170} scale={0.8} rotation={-10} stage="white" delay={0.28} />

            <Flower x={270} y={160} scale={0.85} rotation={10} stage="lightPink" delay={0.3} />
            <Flower x={310} y={170} scale={0.85} rotation={25} stage="pink" delay={0.32} />
            <Flower x={350} y={185} scale={0.85} rotation={40} stage="crimson" delay={0.35} />

            <Flower x={210} y={215} scale={0.95} rotation={-25} stage="white" delay={0.4} isKey />
            <Flower x={250} y={205} scale={1.0} rotation={-5} stage="lightPink" delay={0.42} isKey />
            <Flower x={295} y={210} scale={1.0} rotation={15} stage="pink" delay={0.45} isKey />
            <Flower x={340} y={225} scale={0.95} rotation={35} stage="crimson" delay={0.48} isKey />

            <Flower x={180} y={245} scale={0.95} rotation={-45} stage="lightPink" delay={0.5} />
            <Flower x={225} y={240} scale={1.05} rotation={-15} stage="pink" delay={0.52} isKey />
            <Flower x={275} y={245} scale={1.1} rotation={5} stage="crimson" delay={0.55} isKey />
            <Flower x={325} y={255} scale={1.05} rotation={25} stage="deepRed" delay={0.58} isKey />

            <Flower x={200} y={285} scale={1.05} rotation={-30} stage="pink" delay={0.6} isKey />
            <Flower x={250} y={280} scale={1.15} rotation={-8} stage="crimson" delay={0.62} isKey />
            <Flower x={300} y={290} scale={1.15} rotation={12} stage="deepRed" delay={0.65} isKey />

            <Flower x={225} y={325} scale={1.1} rotation={-18} stage="deepRed" delay={0.68} isKey />
            <Flower x={275} y={330} scale={1.2} rotation={8} stage="crimson" delay={0.7} isKey />
          </g>

          {/* ================= LOWER CASCADING SPRAY ================= */}
          <g id="lower-trailing-flowers">
            <Flower x={185} y={355} scale={0.9} rotation={-45} stage="pink" delay={0.72} />
            <Flower x={235} y={375} scale={1.0} rotation={-10} stage="white" delay={0.75} isKey />
            <Flower x={285} y={385} scale={0.95} rotation={15} stage="crimson" delay={0.78} />

            <Flower x={210} y={420} scale={0.9} rotation={-25} stage="lightPink" delay={0.8} />
            <Flower x={260} y={435} scale={0.95} rotation={5} stage="deepRed" delay={0.82} isKey />

            <Flower x={235} y={485} scale={0.85} rotation={-15} stage="pink" delay={0.85} />
            <Flower x={280} y={505} scale={0.8} rotation={20} stage="white" delay={0.88} />

            <Flower x={250} y={545} scale={0.8} rotation={-5} stage="crimson" delay={0.9} />
            <Flower x={235} y={600} scale={0.7} rotation={-10} stage="white" delay={0.92} />
            <Flower x={240} y={660} scale={0.6} rotation={-5} stage="white" delay={0.95} />
          </g>

          {/* ================= ANIMATED FLUTTERING BUTTERFLY ================= */}
          <g id="animated-butterfly">
            <AnimatedButterfly />
          </g>

          {/* ================= FLOATING FIREFLIES ================= */}
          <g id="fireflies">
            {fireflies.map((ff) => (
              <circle
                key={ff.id}
                cx={ff.startX}
                cy={ff.startY}
                r={ff.r}
                fill="#fef08a"
                className="firefly-particle"
                style={{ animationDelay: `${ff.delay}s`, animationDuration: `${ff.duration}s` }}
              />
            ))}
          </g>

          {/* ================= FLOATING SPARKLES ================= */}
          <g id="sparkles">
            {sparkles.map((sp) => (
              <circle
                key={sp.id}
                cx={sp.cx}
                cy={sp.cy}
                r={sp.r}
                fill={sp.color}
                className="sparkle-particle"
                style={{ animationDelay: `${sp.delay}s`, animationDuration: `${sp.duration}s` }}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
