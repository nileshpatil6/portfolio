"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const COLORS = ["#00d4ff", "#7c3aed", "#00ff88", "#00d4ff", "#00d4ff"];

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Init particles
    const count = 120;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particlesRef.current.forEach((p, i) => {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // Velocity damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Twinkle
        const twinkle = Math.sin(frame * 0.02 + i) * 0.15;
        const opacity = Math.max(0.05, Math.min(0.7, p.opacity + twinkle));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const q = particlesRef.current[j];
          const qx = p.x - q.x;
          const qy = p.y - q.y;
          const d = Math.sqrt(qx * qx + qy * qy);
          if (d < 100) {
            const lineOpacity = ((100 - d) / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,212,255,${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      // Draw rotating wireframe shapes (pure 2D)
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const t = frame * 0.003;

      // Rotating hexagon
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + t;
        const px = cx - 300 + Math.cos(angle) * 80;
        const py = cy - 100 + Math.sin(angle) * 80;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0,212,255,${0.08 + Math.sin(t * 2) * 0.03})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Rotating triangle
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2 - t * 1.5;
        const px = cx + 280 + Math.cos(angle) * 60;
        const py = cy + 100 + Math.sin(angle) * 60;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(124,58,237,${0.1 + Math.sin(t * 3) * 0.04})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Rotating octagon
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + t * 0.7;
        const px = cx + 100 + Math.cos(angle) * 50;
        const py = cy + 200 + Math.sin(angle) * 50;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0,255,136,${0.06 + Math.sin(t * 1.5) * 0.03})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}

