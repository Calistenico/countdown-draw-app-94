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
    <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center z-[99999] countdown-bg" style={{ margin: 0, padding: 0 }}>
      <div className="text-center w-full h-full flex flex-col items-center justify-center">
        <div 
          key={currentNumber}
          className="countdown-number animate-countdown mb-8"
        >
          {currentNumber}
        </div>
        <p className="text-white/70 text-lg font-medium">
          Preparando o sorteio...
        </p>
      </div>
    </div>
  );
};

export default CountdownAnimation;