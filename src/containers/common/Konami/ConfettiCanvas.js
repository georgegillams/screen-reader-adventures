import React, { useEffect } from 'react';
import ConfettiGenerator from 'confetti-js';

const ConfettiCanvas = () => {
  const setupConfetti = () => {
    // Require confetti-generator here so that it is only loaded when required
    const confettiSettings = { target: 'confetti-holder' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  };

  useEffect(() => {
    setupConfetti();
  }, []);

  return (
    <canvas
      aria-hidden="true"
      id="confetti-holder"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ConfettiCanvas;
