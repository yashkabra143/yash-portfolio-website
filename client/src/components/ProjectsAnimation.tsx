import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const projectTypes = [
  { name: 'Web Testing', color: 'from-blue-500 to-cyan-500', description: 'End-to-end web application testing' },
  { name: 'Mobile Testing', color: 'from-purple-500 to-pink-500', description: 'iOS and Android app testing' },
  { name: 'API Testing', color: 'from-green-500 to-emerald-500', description: 'REST API and integration testing' },
  { name: 'Performance', color: 'from-orange-500 to-red-500', description: 'Load and performance testing' },
  { name: 'Security Testing', color: 'from-indigo-500 to-blue-500', description: 'Security vulnerability testing' },
  { name: 'Automation', color: 'from-pink-500 to-rose-500', description: 'Test automation frameworks' }
];

export default function ProjectsAnimation() {
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
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, x: 0 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full py-8">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projectTypes.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -10,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            }}
            className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-300"
          >
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300`}
            />

            {/* Animated top border accent */}
            <motion.div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />

            {/* Content */}
            <div className="relative p-6 md:p-7">
              <motion.div
                className={`w-14 h-14 rounded-lg bg-gradient-to-br ${project.color} mb-4 shadow-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                whileHover={{ scale: 1.05 }}
              />

              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {project.name}
              </h3>

              <p className="text-sm text-muted-foreground dark:text-slate-400">
                {project.description}
              </p>

              {/* Hover indicator */}
              <motion.div
                className="absolute bottom-0 right-0 w-20 h-20 rounded-full opacity-0 group-hover:opacity-10 bg-primary blur-2xl transition-all duration-300"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
