// Hand-drawn SVG mango — no image files needed.
let uid = 0;

export default function Mango({ size = 200, hue = 0, className = '', style }) {
  const id = `m${uid++}`;
  return (
    <svg
      className={className}
      style={{ filter: `hue-rotate(${hue}deg)`, ...style }}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-body`} cx="38%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#fff3a8" />
          <stop offset="28%" stopColor="#ffd23f" />
          <stop offset="62%" stopColor="#ffa41b" />
          <stop offset="88%" stopColor="#f27a1a" />
          <stop offset="100%" stopColor="#c9541a" />
        </radialGradient>
        <radialGradient id={`${id}-blush`} cx="78%" cy="70%" r="45%">
          <stop offset="0%" stopColor="#e8412c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e8412c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6fcf57" />
          <stop offset="100%" stopColor="#1f7a3a" />
        </linearGradient>
      </defs>
      {/* shadow */}
      <ellipse cx="108" cy="188" rx="48" ry="7" fill="#7a3d00" opacity="0.18" />
      {/* body */}
      <path
        d="M104 32C148 36 170 82 162 126C154 168 116 188 84 178C56 170 48 148 56 130C62 116 58 106 50 96C40 78 52 38 104 32z"
        fill={`url(#${id}-body)`}
      />
      <path
        d="M104 32C148 36 170 82 162 126C154 168 116 188 84 178C56 170 48 148 56 130C62 116 58 106 50 96C40 78 52 38 104 32z"
        fill={`url(#${id}-blush)`}
      />
      {/* shine */}
      <ellipse cx="88" cy="68" rx="15" ry="24" fill="#fff" opacity="0.45" transform="rotate(-30 88 68)" />
      <ellipse cx="74" cy="100" rx="5" ry="7" fill="#fff" opacity="0.3" />
      {/* stem */}
      <path d="M104 34c0-8 1-13 4-18" stroke="#5b3a1a" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* leaf */}
      <path d="M106 22c18-16 44-16 58-6-14 16-40 20-58 6z" fill={`url(#${id}-leaf)`} />
      <path d="M108 22c16-6 32-8 52-6" stroke="#cfeec4" strokeWidth="1.5" fill="none" opacity="0.7" />
    </svg>
  );
}
