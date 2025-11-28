import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Code, Bot, ExternalLink, Cog, Cloud, Database } from "lucide-react";

const skillCategories = [
  { name: 'Programming Languages', icon: Code },
  { name: 'Automation Frameworks', icon: Bot },
  { name: 'API Testing', icon: ExternalLink },
  { name: 'CI/CD & DevOps', icon: Cog },
  { name: 'Cloud & Virtualization', icon: Cloud },
  { name: 'Database', icon: Database }
];

export default function SkillsAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(9, 132, 227, 0.2)",
              }}
              className="group p-4 md:p-6 rounded-xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 transition-all duration-300 cursor-pointer"
            >
              <motion.div
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-blue-500/20 dark:from-primary/30 dark:to-blue-500/30 flex items-center justify-center mb-3 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors duration-300">
                {category.name}
              </h3>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
