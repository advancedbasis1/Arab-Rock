export default function MountainBackdrop() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1400 760"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ridgeFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#201d19" />
          <stop offset="1" stopColor="#121110" />
        </linearGradient>
        <linearGradient id="ridgeMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2620" />
          <stop offset="1" stopColor="#161412" />
        </linearGradient>
        <linearGradient id="ridgeNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#35302a" />
          <stop offset="1" stopColor="#121110" />
        </linearGradient>
        <radialGradient id="glow" cx="78%" cy="8%" r="55%">
          <stop offset="0" stopColor="#d99a2b" stopOpacity="0.16" />
          <stop offset="1" stopColor="#d99a2b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1400" height="760" fill="#121110" />
      <rect width="1400" height="760" fill="url(#glow)" />
      <polygon
        points="0,560 180,380 340,470 520,300 700,460 900,340 1080,480 1260,400 1400,500 1400,760 0,760"
        fill="url(#ridgeFar)"
      />
      <polygon
        points="0,640 220,470 420,560 640,410 860,570 1080,440 1260,560 1400,500 1400,760 0,760"
        fill="url(#ridgeMid)"
      />
      <polygon
        points="0,720 260,560 480,660 760,500 1020,660 1220,560 1400,640 1400,760 0,760"
        fill="url(#ridgeNear)"
      />
      <g stroke="#d99a2b" strokeOpacity="0.5" strokeWidth="2">
        <polyline points="260,560 300,540" fill="none" />
        <polyline points="760,500 800,480" fill="none" />
        <polyline points="1220,560 1258,540" fill="none" />
      </g>
    </svg>
  );
}
