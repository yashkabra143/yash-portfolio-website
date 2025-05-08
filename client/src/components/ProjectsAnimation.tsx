import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useTheme } from './ThemeProvider';
import { Ticket, Baby, Bath, Coins } from "lucide-react";

// Project card animation 
function ProjectCard({ project, icon, index }: { project: string, icon: React.ReactNode, index: number }) {
  const { theme } = useTheme();
  const primaryColor = theme === 'dark' ? '#74B9FF' : '#0984E3';
  const textColor = theme === 'dark' ? '#FFFFFF' : '#2D3436';
  
  // Calculate positions in a circle
  const angle = (index * Math.PI / 2) + (Math.PI / 4); // Evenly space 4 items
  const radius = 120; // Distance from center
  
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center"
      style={{
        left: `calc(50% + ${x}px - 75px)`, // Center the 150px wide card
        top: `calc(50% + ${y}px - 60px)`,  // Center the 120px tall card
        width: '150px',
        height: '120px',
        perspective: '1000px'
      }}
      initial={{ opacity: 0, scale: 0.6, rotateY: 30 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotateY: [30, 0, 30],
        y: [0, -10, 0]
      }}
      transition={{
        rotateY: { repeat: Infinity, duration: 6 + index, ease: "easeInOut" },
        y: { repeat: Infinity, duration: 3 + index * 0.5, ease: "easeInOut" },
        opacity: { duration: 0.8 },
        scale: { duration: 0.8 }
      }}
    >
      <div
        className="w-full h-full rounded-xl overflow-hidden flex flex-col"
        style={{ 
          backgroundColor: `${primaryColor}`,
          boxShadow: `0 10px 30px ${primaryColor}60`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="h-2/3 flex items-center justify-center">
          <div className="text-white">
            {icon}
          </div>
        </div>
        <div 
          className="h-1/3 bg-white dark:bg-slate-800 flex items-center justify-center font-medium text-sm px-2 text-center"
          style={{ color: textColor }}
        >
          {project}
        </div>
      </div>
    </motion.div>
  );
}

// 3D Rotating Cube in center
function CentralCube() {
  const { theme } = useTheme();
  const primaryColor = theme === 'dark' ? '#74B9FF' : '#0984E3';
  
  // CSS to create a 3D cube
  const faces = [
    { transform: 'rotateY(0deg) translateZ(40px)', bg: `${primaryColor}90`, label: 'QA' },
    { transform: 'rotateY(90deg) translateZ(40px)', bg: `${primaryColor}90`, label: 'Test' },
    { transform: 'rotateY(180deg) translateZ(40px)', bg: `${primaryColor}90`, label: 'Plan' },
    { transform: 'rotateY(270deg) translateZ(40px)', bg: `${primaryColor}90`, label: 'Debug' },
    { transform: 'rotateX(90deg) translateZ(40px)', bg: `${primaryColor}90`, label: 'Verify' },
    { transform: 'rotateX(-90deg) translateZ(40px)', bg: `${primaryColor}90`, label: 'Report' }
  ];
  
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20"
      style={{ perspective: '1000px' }}
      animate={{ scale: [0.9, 1, 0.9] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: 360, rotateX: [0, 15, 0] }}
        transition={{ 
          rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {faces.map((face, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center font-bold border border-white/30 rounded-lg text-white"
            style={{ 
              transform: face.transform, 
              background: face.bg,
              backfaceVisibility: 'hidden'
            }}
          >
            {face.label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// Connecting lines
function ConnectionLines() {
  const { theme } = useTheme();
  const primaryColor = theme === 'dark' ? '#74B9FF' : '#0984E3';
  
  // Create a circular pattern for 4 connections
  return (
    <svg className="absolute inset-0 w-full h-full">
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i * Math.PI / 2) + (Math.PI / 4);
        const radius = 120;
        
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.line
            key={i}
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${x}px)`}
            y2={`calc(50% + ${y}px)`}
            stroke={primaryColor}
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              pathLength: { duration: 1.5, delay: i * 0.2 },
              opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" }
            }}
          />
        );
      })}
    </svg>
  );
}

// Floating particles
function Particles() {
  const { theme } = useTheme();
  const primaryColor = theme === 'dark' ? '#74B9FF' : '#0984E3';
  
  return (
    <>
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            backgroundColor: primaryColor,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            zIndex: 0
          }}
          animate={{
            x: Math.random() * 60 - 30,
            y: Math.random() * 60 - 30,
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </>
  );
}

export default function ProjectsAnimation() {
  const [mounted, setMounted] = useState(false);
  
  // Project types with matching icons
  const projects = [
    { name: 'Web Testing', icon: <Ticket size={32} /> },
    { name: 'Mobile Testing', icon: <Baby size={32} /> },
    { name: 'API Testing', icon: <Bath size={32} /> },
    { name: 'Performance', icon: <Coins size={32} /> }
  ];
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="h-72 md:h-96 w-full rounded-xl overflow-hidden relative my-8">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent"></div>
      
      {/* Particles in background */}
      <Particles />
      
      {/* Connection lines */}
      <ConnectionLines />
      
      {/* Central interactive cube */}
      <CentralCube />
      
      {/* Project cards */}
      {projects.map((project, i) => (
        <ProjectCard 
          key={project.name} 
          project={project.name} 
          icon={project.icon} 
          index={i} 
        />
      ))}
    </div>
  );
}