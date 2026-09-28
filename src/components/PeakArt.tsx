export default function PeakArt() {
  return (
    <svg
      viewBox="0 0 520 430"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="peakGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0b545" />
          <stop offset="1" stopColor="#d99a2b" />
        </linearGradient>
        <linearGradient id="peakStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a352d" />
          <stop offset="1" stopColor="#221f1a" />
        </linearGradient>
      </defs>
      <g opacity="0.9">
        <polygon
          points="40,360 150,150 200,230 260,110 330,240 380,170 480,360"
          fill="url(#peakStone)"
          stroke="rgba(243,239,232,.08)"
          strokeWidth="1"
        />
        <polygon points="150,150 190,205 130,255" fill="url(#peakGold)" />
        <polygon points="260,110 300,175 225,220" fill="url(#peakGold)" />
        <polygon
          points="330,240 355,275 300,300"
          fill="url(#peakGold)"
          opacity="0.85"
        />
      </g>
      <g fill="#f3efe8" fillOpacity="0.05">
        <circle cx="90" cy="330" r="10" />
        <circle cx="440" cy="300" r="14" />
        <circle cx="260" cy="360" r="8" />
        <circle cx="400" cy="200" r="6" />
      </g>
    </svg>
  );
}
