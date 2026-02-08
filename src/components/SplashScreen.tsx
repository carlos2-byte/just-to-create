import { useEffect, useCallback } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const stableOnComplete = useCallback(onComplete, []);

  useEffect(() => {
    // Max 2 seconds then redirect
    const timeout = setTimeout(stableOnComplete, 2000);
    return () => clearTimeout(timeout);
  }, [stableOnComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      <video
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onEnded={stableOnComplete}
      >
        <source src="/splash-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
