import React, { useRef, useEffect } from 'react';

interface CountdownAnimationProps {
  onComplete: () => void;
  isVisible: boolean;
}

const CountdownAnimation: React.FC<CountdownAnimationProps> = ({ onComplete, isVisible }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    const video = videoRef.current;
    
    // Reset video to start
    video.currentTime = 0;
    
    // Play video
    video.play().catch(console.error);

    // Handle video end
    const handleVideoEnd = () => {
      onComplete();
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.pause();
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center z-[99999]" style={{ margin: 0, padding: 0 }}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
      >
        <source src="/videos/countdown.mp4" type="video/mp4" />
        {/* Fallback para caso o vídeo não carregue */}
        <div className="w-full h-full bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="countdown-number text-white text-8xl font-black">5</div>
            <p className="text-white/70 text-lg mt-8 font-medium">
              Preparando o sorteio...
            </p>
          </div>
        </div>
      </video>
    </div>
  );
};

export default CountdownAnimation;