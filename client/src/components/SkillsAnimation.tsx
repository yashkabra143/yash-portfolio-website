import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useTheme } from './ThemeProvider';

// Skill cube component using CSS transforms for 3D effect
function SkillCube({ skill, index }: { skill: string, index: number }) {
  const { theme } = useTheme();
  const primaryColor = theme === 'dark' ? '#74B9FF' : '#0984E3';
  const textColor = theme === 'dark' ? '#FFFFFF' : '#2D3436';
  
  // Position each cube in a different corner
  const positions = [
    { top: '20%', left: '25%' },
    { top: '20%', right: '25%' },
    { bottom: '20%', left: '25%' },
    { bottom: '20%', right: '25%' }
  ];
  
  const position = positions[index % positions.length];
  
  return (
    <motion.div
      className="absolute w-24 h-24 md:w-32 md:h-32"
      style={{
        ...position,
        perspective: '1000px'
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -10, 0],
        rotateY: [0, 360],
        rotateX: [0, 10, 0]
      }}
      transition={{
        y: { repeat: Infinity, duration: 2 + index },
        rotateY: { repeat: Infinity, duration: 10 + index * 2, ease: "linear" },
        rotateX: { repeat: Infinity, duration: 5 + index, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }}
    >
      <div 
        className="relative w-full h-full rounded-2xl text-center flex items-center justify-center font-semibold"
        style={{ 
          backgroundColor: `${primaryColor}99`, 
          color: textColor,
          boxShadow: `0 0 20px ${primaryColor}50`,
          border: `1px solid ${primaryColor}`,
          transform: 'rotateY(0deg) rotateX(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {skill}
        <div className="absolute inset-0 rounded-2xl border border-white/20 backdrop-blur-sm"></div>
      </div>
    </motion.div>
  );
}

// Creating a skill sphere with animated connections
function SkillNetwork() {
  const { theme } = useTheme();
  const primaryColor = theme === 'dark' ? '#74B9FF' : '#0984E3';
  const lineColor = theme === 'dark' ? `${primaryColor}60` : `${primaryColor}40`;
  
  return (
    <div className="absolute inset-0">
      {/* Center Node */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center text-xs md:text-sm font-medium"
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: primaryColor,
          color: 'white',
          left: 'calc(50% - 30px)',
          top: 'calc(50% - 30px)',
          zIndex: 10,
          boxShadow: `0 0 15px ${primaryColor}`
        }}
        animate={{
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        QA
      </motion.div>
      
      {/* Connecting lines and secondary nodes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const distance = 120 + Math.random() * 40;
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return (
          <React.Fragment key={i}>
            <motion.div
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: primaryColor,
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                zIndex: 5
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <svg 
              className="absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
              style={{ zIndex: 1 }}
            >
              <motion.line 
                x1="50%" 
                y1="50%" 
                x2={`calc(50% + ${x}px)`} 
                y2={`calc(50% + ${y}px)`} 
                stroke={lineColor} 
                strokeWidth="1"
                strokeDasharray="5,3"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </svg>
          </React.Fragment>
        );
      })}
      
      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            backgroundColor: primaryColor,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
}

export default function SkillsAnimation() {
  const [mounted, setMounted] = useState(false);
  
  // Top skills
  const topSkills = ['Automation', 'QA', 'Testing', 'Selenium'];
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="h-72 md:h-96 w-full rounded-xl overflow-hidden relative my-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:via-transparent dark:to-primary/10"></div>
      
      {/* Skill network */}
      <SkillNetwork />
      
      {/* Skill cubes */}
      {topSkills.map((skill, i) => (
        <SkillCube key={skill} skill={skill} index={i} />
      ))}
    </div>
  );
}