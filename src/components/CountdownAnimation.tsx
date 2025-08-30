import React, { useState, useEffect } from 'react';

interface CountdownAnimationProps {
  onComplete: () => void;
  isVisible: boolean;
}

const CountdownAnimation: React.FC<CountdownAnimationProps> = ({ onComplete, isVisible }) => {
  const [currentNumber, setCurrentNumber] = useState(5);

  useEffect(() => {
    if (!isVisible) {
      setCurrentNumber(5);
      return;
    }

    if (currentNumber > 0) {
      const timer = setTimeout(() => {
        if (currentNumber === 1) {
          onComplete();
        } else {
          setCurrentNumber(prev => prev - 1);
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentNumber, isVisible, onComplete]);

  // Reset when becoming visible
  useEffect(() => {
    if (isVisible) {
      setCurrentNumber(5);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-[9999] countdown-bg">
      <div className="text-center w-full">
        <div 
          key={currentNumber}
          className="countdown-number animate-countdown"
        >
          {currentNumber}
        </div>
        <p className="text-white/70 text-lg mt-8 font-medium">
          Preparando o sorteio...
        </p>
      </div>
    </div>
  );
};

export default CountdownAnimation;