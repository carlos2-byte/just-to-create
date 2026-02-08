import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 0: mount (bg fade)
    const t1 = setTimeout(() => setPhase(1), 100);   // start bg fade
    const t2 = setTimeout(() => setPhase(2), 600);   // start pig draw
    const t3 = setTimeout(() => setPhase(3), 1400);  // coin + chart + text
    const t4 = setTimeout(onComplete, 2200);          // navigate

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #0a1a3a 0%, #0d2a5c 40%, #102e6a 70%, #0a1a3a 100%)',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      {/* Soft center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 48%, rgba(60,130,246,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Main content area */}
      <div className="relative flex items-center justify-center" style={{ width: 280, height: 200 }}>
        {/* Piggy bank outline - drawn effect */}
        <svg
          viewBox="0 0 160 140"
          className="absolute"
          style={{ width: 160, height: 140, left: 20, top: 20 }}
        >
          {/* Pig body */}
          <ellipse
            cx="70" cy="75" rx="42" ry="34"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 240,
              strokeDashoffset: phase >= 2 ? 0 : 240,
              transition: 'stroke-dashoffset 0.8s ease-out',
            }}
          />
          {/* Head bump */}
          <path
            d="M 95 55 Q 115 35 120 55 Q 122 65 110 72"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: phase >= 2 ? 0 : 100,
              transition: 'stroke-dashoffset 0.8s ease-out 0.1s',
            }}
          />
          {/* Snout */}
          <ellipse
            cx="122" cy="62" rx="10" ry="8"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              strokeDasharray: 60,
              strokeDashoffset: phase >= 2 ? 0 : 60,
              transition: 'stroke-dashoffset 0.6s ease-out 0.2s',
            }}
          />
          {/* Nostrils */}
          <circle cx="119" cy="62" r="1.5" fill="white"
            style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.3s ease-out 0.5s' }} />
          <circle cx="125" cy="62" r="1.5" fill="white"
            style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.3s ease-out 0.5s' }} />
          {/* Eye */}
          <circle cx="105" cy="50" r="2.5" fill="white"
            style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.3s ease-out 0.4s' }} />
          {/* Ear */}
          <path
            d="M 85 42 Q 80 28 90 35"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 30,
              strokeDashoffset: phase >= 2 ? 0 : 30,
              transition: 'stroke-dashoffset 0.5s ease-out 0.15s',
            }}
          />
          {/* Legs */}
          <rect x="40" y="100" width="10" height="16" rx="5" fill="none" stroke="white" strokeWidth="2"
            style={{
              strokeDasharray: 50,
              strokeDashoffset: phase >= 2 ? 0 : 50,
              transition: 'stroke-dashoffset 0.5s ease-out 0.3s',
            }}
          />
          <rect x="58" y="100" width="10" height="16" rx="5" fill="none" stroke="white" strokeWidth="2"
            style={{
              strokeDasharray: 50,
              strokeDashoffset: phase >= 2 ? 0 : 50,
              transition: 'stroke-dashoffset 0.5s ease-out 0.35s',
            }}
          />
          <rect x="76" y="100" width="10" height="16" rx="5" fill="none" stroke="white" strokeWidth="2"
            style={{
              strokeDasharray: 50,
              strokeDashoffset: phase >= 2 ? 0 : 50,
              transition: 'stroke-dashoffset 0.5s ease-out 0.4s',
            }}
          />
          <rect x="94" y="100" width="10" height="16" rx="5" fill="none" stroke="white" strokeWidth="2"
            style={{
              strokeDasharray: 50,
              strokeDashoffset: phase >= 2 ? 0 : 50,
              transition: 'stroke-dashoffset 0.5s ease-out 0.45s',
            }}
          />
          {/* Tail */}
          <path
            d="M 28 68 Q 18 58 22 72 Q 26 82 18 76"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 40,
              strokeDashoffset: phase >= 2 ? 0 : 40,
              transition: 'stroke-dashoffset 0.5s ease-out 0.5s',
            }}
          />
          {/* Coin slot */}
          <line x1="60" y1="40" x2="80" y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round"
            style={{
              strokeDasharray: 20,
              strokeDashoffset: phase >= 2 ? 0 : 20,
              transition: 'stroke-dashoffset 0.4s ease-out 0.6s',
            }}
          />
        </svg>

        {/* Bar chart - right side */}
        <div
          className="absolute flex items-end gap-1"
          style={{
            right: 0,
            bottom: 30,
            height: 70,
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
          }}
        >
          {[28, 42, 35, 55, 65].map((h, i) => (
            <div
              key={i}
              className="rounded-sm"
              style={{
                width: 8,
                height: phase >= 3 ? h : 0,
                background: `rgba(60, 130, 246, ${0.25 + i * 0.08})`,
                border: '1px solid rgba(100, 160, 255, 0.3)',
                transition: `height 0.5s ease-out ${i * 0.08}s`,
              }}
            />
          ))}
          {/* Arrow up */}
          <svg
            viewBox="0 0 20 30"
            className="absolute"
            style={{
              width: 16,
              height: 24,
              right: -2,
              top: -18,
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.3s ease-out 0.3s, transform 0.3s ease-out 0.3s',
            }}
          >
            <path d="M 10 28 L 10 6 M 4 12 L 10 4 L 16 12" stroke="rgba(100,180,255,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Falling coin */}
        <div
          className="absolute"
          style={{
            left: 82,
            top: phase >= 3 ? 42 : -20,
            opacity: phase >= 3 ? 1 : 0,
            transition: 'top 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.2s ease-out',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#F6C544" />
                <stop offset="100%" stopColor="#D4A22A" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill="url(#coinGrad)" stroke="#B8860B" strokeWidth="1.5" />
            <text x="12" y="16" textAnchor="middle" fontSize="11" fill="#8B6914" fontWeight="bold">$</text>
          </svg>
        </div>
      </div>

      {/* App name */}
      <h1
        className="mt-4 text-3xl font-bold tracking-tight"
        style={{
          color: 'rgba(255,255,255,0.95)',
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s',
        }}
      >
        Controle$
      </h1>

      {/* Tagline */}
      <p
        className="mt-3 text-sm tracking-wide"
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease-out 0.35s, transform 0.5s ease-out 0.35s',
        }}
      >
        Contas, gastos e investimentos
      </p>
    </div>
  );
}
