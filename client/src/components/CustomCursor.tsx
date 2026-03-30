import { useEffect, useRef, useState, useCallback } from 'react';

interface Pixel {
  id: number;
  x: number;
  y: number;
  opacity: number;
  age: number;
}

const PIXEL_SIZE = 12;
const TRAIL_LENGTH = 40;
const FADE_SPEED = 0.04;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const pixelIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const trailAnimRef = useRef<number | undefined>(undefined);
  const [visible, setVisible] = useState(false);
  const positionRef = useRef({ x: -40, y: -40 });
  const smoothPosRef = useRef({ x: -40, y: -40 });
  const rafRef = useRef<number | undefined>(undefined);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  const createPixel = useCallback((x: number, y: number): Pixel => ({
    id: pixelIdRef.current++,
    x,
    y,
    opacity: 1,
    age: 0,
  }), []);

  // Smooth cursor animation loop
  const animateCursor = useCallback(() => {
    if (!cursorRef.current) return;
    const target = positionRef.current;
    const current = smoothPosRef.current;

    const newX = current.x + (target.x - current.x) * 0.18;
    const newY = current.y + (target.y - current.y) * 0.18;
    smoothPosRef.current = { x: newX, y: newY };

    cursorRef.current.style.transform = `translate(${newX - 20}px, ${newY - 20}px)`;
    rafRef.current = requestAnimationFrame(animateCursor);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setVisible(true);
      positionRef.current = { x: e.clientX, y: e.clientY };

      const x = e.clientX;
      const y = e.clientY;
      const dx = x - lastPositionRef.current.x;
      const dy = y - lastPositionRef.current.y;

      if (Math.sqrt(dx * dx + dy * dy) > PIXEL_SIZE) {
        setPixels(prev => [...prev.slice(-TRAIL_LENGTH), createPixel(x, y)]);
        lastPositionRef.current = { x, y };
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.body.style.cursor = 'none';

    rafRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = 'auto';
    };
  }, [animateCursor, createPixel]);

  // Pixel fade loop
  useEffect(() => {
    const fadePixels = () => {
      setPixels(prev =>
        prev
          .map(p => ({ ...p, opacity: p.opacity - FADE_SPEED, age: p.age + 1 }))
          .filter(p => p.opacity > 0)
      );
      trailAnimRef.current = requestAnimationFrame(fadePixels);
    };
    trailAnimRef.current = requestAnimationFrame(fadePixels);
    return () => { if (trailAnimRef.current) cancelAnimationFrame(trailAnimRef.current); };
  }, []);

  return (
    <>
      {/* Inverted circle cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-opacity duration-300"
        style={{
          width: 40,
          height: 40,
          backgroundColor: 'white',
          mixBlendMode: 'exclusion',
          willChange: 'transform',
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Pixel trail */}
      {pixels.map(pixel => {
        const sizeMultiplier = Math.max(0.3, 1 - pixel.age / 100);
        const size = PIXEL_SIZE * sizeMultiplier;
        return (
          <div
            key={pixel.id}
            aria-hidden="true"
            className="fixed pointer-events-none bg-foreground z-[9998]"
            style={{
              left: pixel.x - size / 2,
              top: pixel.y - size / 2,
              width: size,
              height: size,
              opacity: pixel.opacity,
            }}
          />
        );
      })}
    </>
  );
}
