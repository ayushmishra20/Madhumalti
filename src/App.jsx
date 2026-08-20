import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import MadhumaltiBloom from './components/MadhumaltiBloom';
import SurpriseScreen from './components/SurpriseScreen';
import PetalShower from './components/PetalShower';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('surprise'); // 'surprise' | 'bloom'
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Sparkle burst on refresh when on bloom page
  useEffect(() => {
    if (currentScreen === 'bloom') {
      triggerSparkles();
    }
  }, [refreshKey, currentScreen]);

  // Track cursor position for interactive pollen trail
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleRefresh = () => {
    setIsRotating(true);
    setRefreshKey((prev) => prev + 1);
    setTimeout(() => setIsRotating(false), 800);
  };

  const triggerSparkles = () => {
    confetti({
      particleCount: 35,
      spread: 75,
      origin: { y: 0.45 },
      colors: ['#f472b6', '#fb7185', '#fef08a', '#86efac', '#ffffff'],
      shapes: ['star', 'circle'],
      scalar: 0.85,
      ticks: 150,
      gravity: 0.5,
      drift: 0,
      disableForReducedMotion: true
    });
  };

  return (
    <main className="app-container" onMouseMove={handleMouseMove}>
      {/* Background Ambient Pink Glow Orb */}
      <div className="ambient-pink-orb" aria-hidden="true" />

      {/* Interactive Cursor Pollen Sparkle */}
      <motion.div
        className="cursor-pollen"
        animate={{ x: cursorPos.x - 4, y: cursorPos.y - 4 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.1 }}
      />

      {/* Automatic Delicate Petal Shower Overlay */}
      <PetalShower isActive={currentScreen === 'bloom'} />

      <AnimatePresence mode="wait">
        {currentScreen === 'surprise' ? (
          <SurpriseScreen
            key="surprise-screen"
            onOpenSurprise={() => setCurrentScreen('bloom')}
          />
        ) : (
          <motion.div
            key="bloom-screen"
            className="bloom-screen-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Controls Bar */}
            <div className="controls-bar">
              {/* Back to Surprise Landing */}
              <button
                className="refresh-btn"
                onClick={() => setCurrentScreen('surprise')}
                title="View Surprise Card"
              >
                <Gift size={13} />
                <span>SURPRISE CARD</span>
              </button>

              {/* Refresh Page Button */}
              <button
                className="refresh-btn"
                onClick={handleRefresh}
                title="Re-bloom Madhumalti flowers"
              >
                <RefreshCw
                  size={13}
                  className={isRotating ? 'animate-spin' : ''}
                />
                <span>REFRESH PAGE</span>
              </button>
            </div>

            {/* Centered High-Legibility Title Overlay: "MADHUMALTI" */}
            <div className="title-overlay-container">
              <motion.h1
                className="title-full"
                key={`title-${refreshKey}`}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.3, delay: 0.4, ease: 'easeOut' }}
              >
                MADHUMALTI
              </motion.h1>
            </div>

            {/* Fullscreen Responsive Blooming Stage */}
            <MadhumaltiBloom refreshKey={refreshKey} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
