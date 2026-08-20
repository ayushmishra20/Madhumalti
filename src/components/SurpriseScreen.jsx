import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SurpriseScreen({ onOpenSurprise }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);

    // Trigger magic sparkle confetti burst
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#fb7185', '#fef08a', '#86efac', '#ffffff', '#e11d48'],
      shapes: ['star', 'circle'],
      scalar: 1.1,
      ticks: 200,
      gravity: 0.4
    });

    setTimeout(() => {
      onOpenSurprise();
    }, 1200);
  };

  return (
    <motion.div
      className="surprise-fullscreen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Ambient Pink Orb */}
      <div className="ambient-pink-orb" aria-hidden="true" />

      {/* Surprise Card Container */}
      <motion.div
        className="surprise-card"
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Pulsing Gift Icon Badge */}
        <motion.div
          className="surprise-icon-wrapper"
          animate={isOpening ? { scale: [1, 1.4, 0], rotate: [0, 15, -15, 0] } : { y: [-5, 5, -5] }}
          transition={isOpening ? { duration: 1 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="surprise-glow-ring" />
          <Gift size={48} className="surprise-icon" />
        </motion.div>

        {/* Personalized Surprise Message */}
        <motion.h1
          className="surprise-subtitle-hindi"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ 
            fontSize: 'clamp(2rem, 5vw, 2.8rem)', 
            color: '#ffffff', 
            textShadow: '0 0 20px rgba(244, 114, 182, 0.7), 0 0 40px rgba(225, 29, 72, 0.4)',
            margin: '0.8rem 0'
          }}
        >
          For you 
        </motion.h1>

        {/* Open Surprise Action Button */}
        <motion.button
          className="surprise-open-btn"
          onClick={handleOpen}
          disabled={isOpening}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Sparkles size={18} className="animate-spin-slow" />
          <span>{isOpening ? 'OPENING SURPRISE...' : 'Click Me...'}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
