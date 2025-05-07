// src/app/components/WaveDivider.tsx
export default function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div style={{ overflow: "hidden", lineHeight: 0 }}>
      <svg
        viewBox="0 0 500 80"
        preserveAspectRatio="none"
        style={{
          height: "80px",
          width: "100%",
          transform: flip ? "rotate(180deg)" : "",
        }}
      >
        <path
          d="M0,30 C150,80 350,0 500,30 L500,00 L0,0 Z"
          style={{ stroke: "none", fill: "#fff6f0" }}
        />
      </svg>
    </div>
  );
}
