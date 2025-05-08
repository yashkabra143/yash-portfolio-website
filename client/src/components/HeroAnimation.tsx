import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useTheme } from './ThemeProvider';

export default function HeroAnimation() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Colors based on theme
  const primaryColor = theme === 'dark' ? '#74B9FF' : '#0984E3';
  const secondaryColor = theme === 'dark' ? '#2D3436' : '#FFFFFF';
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="h-64 md:h-72 lg:h-80 w-full max-w-sm mx-auto rounded-xl overflow-hidden relative">
      {/* Interactive Atom-like 3D animation using SVG and Framer Motion */}
      <div className="relative w-full h-full">
        {/* Central nucleus */}
        <motion.div 
          className="absolute left-1/2 top-1/2 w-16 h-16 -ml-8 -mt-8 rounded-full"
          style={{ backgroundColor: primaryColor }}
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              `0 0 20px ${primaryColor}50`,
              `0 0 30px ${primaryColor}80`,
              `0 0 20px ${primaryColor}50`
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        {/* Orbiting electrons */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute left-1/2 top-1/2 w-full h-full -ml-1/2 -mt-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <motion.div 
              className="absolute"
              style={{ 
                width: '6px', 
                height: '6px', 
                borderRadius: '50%', 
                backgroundColor: primaryColor,
                top: '10px',
                left: 'calc(50% - 3px)',
                boxShadow: `0 0 10px ${primaryColor}`
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <svg className="absolute w-full h-full top-0 left-0">
              <motion.ellipse 
                cx="50%" 
                cy="50%" 
                rx="45%" 
                ry="20%" 
                fill="none"
                stroke={primaryColor}
                strokeWidth="1"
                strokeDasharray="3,3"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute left-1/2 top-1/2 w-full h-full -ml-1/2 -mt-1/2"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <motion.div 
              className="absolute"
              style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: primaryColor,
                bottom: '20px',
                right: 'calc(50% - 4px)',
                boxShadow: `0 0 10px ${primaryColor}`
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <svg className="absolute w-full h-full top-0 left-0">
              <motion.ellipse 
                cx="50%" 
                cy="50%" 
                rx="30%" 
                ry="40%" 
                fill="none"
                stroke={primaryColor}
                strokeWidth="1"
                strokeDasharray="5,3"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute left-1/2 top-1/2 w-full h-full -ml-1/2 -mt-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <motion.div 
              className="absolute"
              style={{ 
                width: '7px', 
                height: '7px', 
                borderRadius: '50%', 
                backgroundColor: primaryColor,
                top: '50%',
                left: '15px',
                boxShadow: `0 0 10px ${primaryColor}`
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <svg className="absolute w-full h-full top-0 left-0">
              <motion.ellipse 
                cx="50%" 
                cy="50%" 
                rx="40%" 
                ry="25%" 
                transform="rotate(60 50% 50%)"
                fill="none"
                stroke={primaryColor}
                strokeWidth="1"
                strokeDasharray="3,2"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        </div>
        
        {/* Glowing particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              backgroundColor: primaryColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              x: Math.random() * 40 - 20,
              y: Math.random() * 40 - 20,
              scale: [1, Math.random() + 1, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    </div>
  );
}