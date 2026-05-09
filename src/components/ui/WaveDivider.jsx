export default function WaveDivider({ fromColor = "#090a0f", toColor = "transparent" }) {
  return (
    <div style={{ position: "relative", background: "var(--color-bg)", marginTop: -2 }}>
      <svg
        viewBox="0 0 1440 72"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 72, display: "block" }}
      >
        <path
          d="M0,0 C480,72 960,0 1440,56 L1440,0 L0,0 Z"
          fill={fromColor}
        />
      </svg>
    </div>
  );
}
