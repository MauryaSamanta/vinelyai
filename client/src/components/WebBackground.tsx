import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";

const NODE_COUNT = 60; // Number of moving points

const WebBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodes = useRef<{ x: number; y: number; dx: number; dy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Initialize moving nodes
    nodes.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 1.2, // Horizontal speed
      dy: (Math.random() - 0.5) * 1.2, // Vertical speed
    }));

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and move nodes
      nodes.current.forEach((node, index) => {
        node.x += node.dx;
        node.y += node.dy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.dx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.dy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();

        // Connect to other nearby nodes
        for (let j = index + 1; j < nodes.current.length; j++) {
          const other = nodes.current[j];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 120})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "black", // Keep black base
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", width: "100%", height: "100%" }} />
    </Box>
  );
};

export default WebBackground;
