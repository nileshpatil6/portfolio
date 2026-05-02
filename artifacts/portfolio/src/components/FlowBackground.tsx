import { useEffect, useRef } from "react";

export default function FlowBackground() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll("path.flow");
    if (!paths) return;
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.0008;
      paths.forEach((path, i) => {
        const phase = i * (Math.PI * 2) / paths.length;
        const amp = 60 + i * 20;
        const freq = 0.6 + i * 0.15;
        const y1 = 300 + Math.sin(t * freq + phase) * amp;
        const y2 = 300 + Math.cos(t * freq * 1.3 + phase) * amp;
        const y3 = 300 + Math.sin(t * freq * 0.7 + phase + 1) * amp;
        const cx1 = 300 + Math.cos(t + phase) * 50;
        const cx2 = 900 + Math.sin(t * 0.8 + phase) * 80;
        path.setAttribute(
          "d",
          `M -100 ${y1} C ${cx1} ${y1 - 80}, ${cx2} ${y2 + 80}, 1700 ${y3}`
        );
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="flow-svg"
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {[0,1,2,3,4,5,6,7].map((i) => (
        <path
          key={i}
          className="flow"
          fill="none"
          stroke="currentColor"
          strokeWidth={i % 2 === 0 ? "0.8" : "0.4"}
          d={`M -100 ${200 + i * 30} C 400 ${100 + i * 20}, 800 ${500 - i * 20}, 1700 ${300 + i * 25}`}
        />
      ))}
    </svg>
  );
}
