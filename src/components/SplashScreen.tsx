import { useEffect, useState, useCallback } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState(0);
  const [blink, setBlink] = useState(false);

  const stableOnComplete = useCallback(onComplete, []);

  useEffect(() => {
    // 0.0–0.5s → Background fade
    const t1 = setTimeout(() => setPhase(1), 50);
    // 0.5–1.2s → Piggy outline draws
    const t2 = setTimeout(() => setPhase(2), 500);
    // 1.2–1.6s → Coin falls + chart grows
    const t3 = setTimeout(() => setPhase(3), 1200);
    // 1.6–2.0s → Text finishes + blink
    const t4 = setTimeout(() => setPhase(4), 1600);
    // Blink at 1.7s
    const t5 = setTimeout(() => setBlink(true), 1700);
    const t6 = setTimeout(() => setBlink(false), 1850);
    // Navigate at 2.2s
    const t7 = setTimeout(stableOnComplete, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [stableOnComplete]);

  const piggyPath =
    // Body - large round shape
    'M 68 120 ' +
    'C 68 120 42 118 32 100 ' +
    'C 22 82 28 58 55 50 ' +
    'C 70 45 90 44 110 46 ' +
    'C 130 48 152 56 158 72 ' +
    'C 164 88 160 108 148 118 ' +
    'C 140 125 120 128 100 128 ' +
    'C 85 128 68 126 68 120 Z ' +
    // Snout
    'M 155 82 ' +
    'C 155 74 170 70 174 78 ' +
    'C 178 86 172 92 164 90 ' +
    'C 158 88 155 86 155 82 Z ' +
    // Ear
    'M 120 46 ' +
    'C 122 32 132 22 140 28 ' +
    'C 148 34 144 48 138 50 ' +
    // Tail
    'M 32 100 ' +
    'C 24 96 18 88 22 82 ' +
    'C 16 80 12 86 14 92 ';

  const legPaths = [
    'M 62 122 L 58 148 C 58 152 66 152 66 148 L 68 124',
    'M 82 126 L 80 150 C 80 154 88 154 88 150 L 88 128',
    'M 112 128 L 112 150 C 112 154 120 154 120 150 L 118 126',
    'M 134 124 L 136 148 C 136 152 144 152 144 148 L 140 120',
  ];

  const totalPathLength = 800;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #0d3b8f 0%, #0a1e52 50%, #050e2a 100%)',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 42%, rgba(40,100,220,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Main SVG area */}
      <div className="relative" style={{ width: 280, height: 220 }}>
        <svg viewBox="0 0 200 170" width="280" height="220" className="absolute inset-0">
          <defs>
            {/* Coin gradients */}
            <linearGradient id="splashCoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE566" />
              <stop offset="30%" stopColor="#FFD700" />
              <stop offset="70%" stopColor="#F0B800" />
              <stop offset="100%" stopColor="#CC9900" />
            </linearGradient>
            <radialGradient id="splashCoinShine" cx="35%" cy="30%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            {/* Shadow */}
            <radialGradient id="splashShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.2)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse
            cx="100" cy="158" rx="60" ry="6"
            fill="url(#splashShadow)"
            style={{
              opacity: phase >= 2 ? 0.6 : 0,
              transition: 'opacity 0.5s ease-out',
            }}
          />

          {/* Piggy body - outline draw effect */}
          <path
            d={piggyPath}
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: totalPathLength,
              strokeDashoffset: phase >= 2 ? 0 : totalPathLength,
              transition: 'stroke-dashoffset 0.7s ease-out',
            }}
          />

          {/* Legs - drawn with body */}
          {legPaths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: phase >= 2 ? 0 : 100,
                transition: `stroke-dashoffset 0.5s ease-out ${0.3 + i * 0.08}s`,
              }}
            />
          ))}

          {/* Coin slot */}
          <rect
            x="102" y="38" width="18" height="3" rx="1.5"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.5"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transition: 'opacity 0.3s ease-out 0.5s',
            }}
          />

          {/* Eye */}
          <circle
            cx="140" cy="70" r="3"
            fill="rgba(255,255,255,0.9)"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transition: 'opacity 0.3s ease-out 0.6s',
              transform: blink ? 'scaleY(0.1)' : 'scaleY(1)',
              transformOrigin: '140px 70px',
              transitionDuration: blink ? '0.08s' : '0.1s',
            }}
          />

          {/* Nostrils */}
          <circle
            cx="165" cy="81" r="1.5"
            fill="rgba(255,255,255,0.6)"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transition: 'opacity 0.3s ease-out 0.6s',
            }}
          />
          <circle
            cx="171" cy="81" r="1.5"
            fill="rgba(255,255,255,0.6)"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transition: 'opacity 0.3s ease-out 0.6s',
            }}
          />

          {/* Bar chart - behind piggy body right side */}
          {[30, 42, 55, 68, 85].map((h, i) => (
            <rect
              key={i}
              x={126 + i * 12}
              y={phase >= 3 ? 150 - h : 150}
              width={9}
              height={phase >= 3 ? h : 0}
              rx={1.5}
              fill={`rgba(60, 120, 220, ${0.2 + i * 0.08})`}
              stroke="rgba(100, 160, 255, 0.15)"
              strokeWidth="0.5"
              style={{
                transition: `y 0.4s ease-out ${i * 0.06}s, height 0.4s ease-out ${i * 0.06}s`,
              }}
            />
          ))}

          {/* Arrow going up over chart */}
          <path
            d="M 128 130 C 140 120, 155 110, 170 85 L 180 68"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: phase >= 3 ? 0 : 100,
              transition: 'stroke-dashoffset 0.4s ease-out 0.2s',
            }}
          />
          {/* Arrow head */}
          <path
            d="M 176 74 L 182 66 L 186 76"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transition: 'opacity 0.2s ease-out 0.5s',
            }}
          />

          {/* Falling coin */}
          <g
            style={{
              transform: phase >= 3 ? 'translateY(0px)' : 'translateY(-50px)',
              opacity: phase >= 3 ? 1 : 0,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.2s ease-out',
            }}
          >
            <ellipse cx="112" cy="26" rx="10" ry="11" fill="url(#splashCoinGrad)" stroke="#B8860B" strokeWidth="1.2" />
            <ellipse cx="112" cy="26" rx="10" ry="11" fill="url(#splashCoinShine)" />
            {/* Dollar sign */}
            <text x="112" y="31" textAnchor="middle" fontSize="12" fill="#8B6914" fontWeight="bold">$</text>
            {/* Coin stripe details */}
            <line x1="106" y1="20" x2="108" y2="32" stroke="rgba(255,215,0,0.4)" strokeWidth="0.8" />
            <line x1="116" y1="18" x2="118" y2="30" stroke="rgba(255,215,0,0.4)" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      {/* Progressive text */}
      <div
        className="mt-2 text-center"
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '1.15rem',
          fontWeight: 300,
          letterSpacing: '0.02em',
          color: 'rgba(255,255,255,0.9)',
          minHeight: 30,
        }}
      >
        <span
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          Contas,{' '}
        </span>
        <span
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transition: 'opacity 0.3s ease-out 0.1s',
          }}
        >
          gastos{' '}
        </span>
        <span
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transition: 'opacity 0.3s ease-out 0.25s',
          }}
        >
          e investimentos
        </span>
      </div>
    </div>
  );
}
