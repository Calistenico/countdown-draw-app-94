import React, { useState } from 'react';
import Header from '@/components/Header';
import NumberDrawer from '@/components/NumberDrawer';
import CountdownAnimation from '@/components/CountdownAnimation';
import ResultDisplay from '@/components/ResultDisplay';
import { useSorteador } from '@/contexts/SorteadorContext';

const Sorteador = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [drawRange, setDrawRange] = useState({ min: 1, max: 100 });
  const { predefinedResult } = useSorteador();

  const handleStartDraw = (min: number, max: number) => {
    setDrawRange({ min, max });
    setIsDrawing(true);
    setResult(null);
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    
    // Always use predefined result if it exists, otherwise random
    let finalResult: number;
    
    if (predefinedResult !== null) {
      finalResult = predefinedResult;
    } else {
      finalResult = Math.floor(Math.random() * (drawRange.max - drawRange.min + 1)) + drawRange.min;
    }
    
    setResult(finalResult);
    setIsDrawing(false);
  };

  const handleNewDraw = () => {
    setResult(null);
    setIsDrawing(false);
    setShowCountdown(false);
  };

  return (
    <div className="min-h-screen particles-bg">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-8">
          
          {/* Logo central */}
          <div className="text-center mb-8">
            <h1 className="text-6xl font-black text-primary mb-4">
              SORTEADOR
            </h1>
            <p className="text-lg text-muted-foreground">
              Sorteador de números aleatórios gratuito!
            </p>
          </div>

          {/* Conteúdo principal */}
          {!result ? (
            <NumberDrawer 
              onStartDraw={handleStartDraw}
              isDrawing={isDrawing}
            />
          ) : (
            <ResultDisplay 
              result={result}
              onNewDraw={handleNewDraw}
            />
          )}

          {/* Footer info */}
          <div className="text-center text-sm text-muted-foreground mt-12">
            <p>Sorteador de números aleatórios de 1 até 10.000</p>
          </div>
        </div>
      </main>

      {/* Countdown overlay */}
      <CountdownAnimation
        isVisible={showCountdown}
        onComplete={handleCountdownComplete}
      />
    </div>
  );
};

export default Sorteador;