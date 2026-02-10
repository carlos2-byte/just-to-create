import { useEffect, useCallback, useRef } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const stableOnComplete = useCallback(onComplete, []);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timeout = setTimeout(stableOnComplete, 4300);
    return () => clearTimeout(timeout);
  }, [stableOnComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="w-full h-full object-cover block"
        style={{ objectFit: 'cover', background: 'black' }}
      >
        <source src="/splash-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
