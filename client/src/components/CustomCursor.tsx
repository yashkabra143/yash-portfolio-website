import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export default function CustomCursor() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX    = useMotionValue(-100);
  const dotY    = useMotionValue(-100);
  const isHoveringRef = useRef(false);

  const springConfig = { damping: 22, stiffness: 380, mass: 0.4 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const dotSpringConfig = { damping: 35, stiffness: 800, mass: 0.2 };
  const dotSpringX = useSpring(dotX, dotSpringConfig);
  const dotSpringY = useSpring(dotY, dotSpringConfig);

  const scaleVal = useMotionValue(1);
  const scaleSpring = useSpring(scaleVal, { damping: 20, stiffness: 400 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 18);
      cursorY.set(e.clientY - 18);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const enter = () => { scaleVal.set(1.8); isHoveringRef.current = true; };
    const leave = () => { scaleVal.set(1.0); isHoveringRef.current = false; };

    const interactables = 'a, button, [role="button"], input, textarea, select, label, .cursor-pointer';

    window.addEventListener('mousemove', move);

    const attach = () => {
      document.querySelectorAll(interactables).forEach(el => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  const ring   = isDark ? 'rgba(116,185,255,0.6)'  : 'rgba(9,132,227,0.5)';
  const dot    = isDark ? '#74B9FF'                 : '#0984E3';
  const glow   = isDark ? 'rgba(116,185,255,0.25)' : 'rgba(9,132,227,0.15)';

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: springX, y: springY,
          width: 36, height: 36,
          border: `1.5px solid ${ring}`,
          boxShadow: `0 0 12px ${glow}`,
          scale: scaleSpring,
          mixBlendMode: isDark ? 'screen' : 'multiply',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotSpringX, y: dotSpringY,
          width: 8, height: 8,
          background: dot,
          boxShadow: `0 0 8px ${dot}`,
        }}
      />
    </>
  );
}
