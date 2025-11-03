import React, { useRef, useEffect, useCallback } from 'react';
import type { Point } from '../types';

// --- Constants ---
const GRID_SPACING = 30; // pixels between grid points
const BULGE_RADIUS = 200; // radius of mouse influence
const BULGE_STRENGTH = 150; // max displacement (z-axis)
const DAMPING = 0.9; // springiness, how quickly it returns to rest (closer to 1 is less bouncy)
const TENSION = 0.01; // spring tension pulling points back to origin

const InteractiveNet: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[][]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animationFrameId = useRef<number | null>(null);

  const initializeGrid = useCallback((width: number, height: number) => {
    const newPoints: Point[][] = [];
    const cols = Math.ceil(width / GRID_SPACING) + 2;
    const rows = Math.ceil(height / GRID_SPACING) + 2;
    
    for (let y = 0; y < rows; y++) {
      const row: Point[] = [];
      for (let x = 0; x < cols; x++) {
        const point: Point = {
          x: (x - 1) * GRID_SPACING,
          y: (y - 1) * GRID_SPACING,
          ox: (x - 1) * GRID_SPACING,
          oy: (y - 1) * GRID_SPACING,
          z: 0,
          vz: 0,
        };
        row.push(point);
      }
      newPoints.push(row);
    }
    pointsRef.current = newPoints;
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;

    const points = pointsRef.current;
    if (points.length === 0) return;

    for (let y = 0; y < points.length; y++) {
      for (let x = 0; x < points[y].length; x++) {
        const p = points[y][x];

        if (x > 0) {
          const prevP = points[y][x - 1];
          ctx.beginPath();
          ctx.moveTo(prevP.x, prevP.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        if (y > 0) {
          const prevP = points[y - 1][x];
          ctx.beginPath();
          ctx.moveTo(prevP.x, prevP.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }
    }
  }, []);

  const update = useCallback(() => {
    const mouse = mouseRef.current;
    const points = pointsRef.current;
    if (points.length === 0) return;

    for (let y = 0; y < points.length; y++) {
      for (let x = 0; x < points[y].length; x++) {
        const p = points[y][x];
        
        const dx = mouse.x - p.ox;
        const dy = mouse.y - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetZ = 0;
        if (dist < BULGE_RADIUS) {
          const falloff = (BULGE_RADIUS - dist) / BULGE_RADIUS;
          targetZ = Math.cos(falloff * Math.PI / 2) * BULGE_STRENGTH;
        }

        // Apply spring physics
        const force = (targetZ - p.z) * TENSION;
        p.vz += force;
        p.vz *= DAMPING;
        p.z += p.vz;
        
        // The x and y positions are also influenced by the bulge
        // This gives the perspective effect
        const perspective = 0.5; // Controls the intensity of perspective shift
        p.x = p.ox + (dx / dist) * p.z * perspective;
        p.y = p.oy + (dy / dist) * p.z * perspective;
      }
    }
  }, []);
  
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    update();
    draw(ctx, canvas.width, canvas.height);

    animationFrameId.current = requestAnimationFrame(animate);
  }, [draw, update]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        initializeGrid(width, height);
      }
    });

    resizeObserver.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleMouseLeave = () => {
        mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, initializeGrid]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default InteractiveNet;
