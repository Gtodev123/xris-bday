import { useEffect, useRef } from "react";

export default function Confetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      w: 5 + Math.random() * 5,
      h: 8 + Math.random() * 8,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      speed: 0.5 + Math.random() * 1.5, // по-бавно падане
      drift: (Math.random() - 0.5) * 0.5, // ляво/дясно люлеене
      rotation: Math.random() * 360, // начален ъгъл
      rotationSpeed: (Math.random() - 0.5) * 2, // скорост на въртене
    }));

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((c) => {
        c.y += c.speed;
        c.x += Math.sin(c.y / 20) * 0.5 + c.drift;
        c.rotation += c.rotationSpeed;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();

        if (c.y > canvas.height) {
          c.y = -10;
          c.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(update);
    }

    update();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}