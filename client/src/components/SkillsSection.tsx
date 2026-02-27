import { motion } from "framer-motion";
import { Code, Bot, ExternalLink, Cog, Cloud, Database } from "lucide-react";
import { skillsData } from "@/lib/data";
import SkillsAnimation from "./SkillsAnimation";
import TiltCard from "./TiltCard";
import { Suspense } from "react";

type SkillItem = {
  name: string;
  proficiency: number;
};

export default function SkillsSection() {
  const skillIcons = {
    "Programming Languages": <Code className="text-xl text-primary" />,
    "Automation Frameworks": <Bot className="text-xl text-primary" />,
    "API Testing": <ExternalLink className="text-xl text-primary" />,
    "CI/CD & DevOps": <Cog className="text-xl text-primary" />,
    "Cloud & Virtualization": <Cloud className="text-xl text-primary" />,
    "Database": <Database className="text-xl text-primary" />
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section divider */}
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-12"></div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-foreground"
        >
          Technical Skills
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Suspense fallback={<div className="h-72 flex items-center justify-center">Loading skills animation...</div>}>
            <SkillsAnimation />
          </Suspense>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skillsData.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: -25, y: 30 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12, type: "spring", stiffness: 80 }}
              style={{ perspective: 1000 }}
            >
            <TiltCard
              className="glass-effect rounded-2xl p-7 shadow-lg border border-primary/20 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group h-full"
              glowColor="rgba(99,102,241,0.35)"
              intensity={8}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 dark:from-primary/40 dark:to-accent/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {skillIcons[skill.category as keyof typeof skillIcons]}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{skill.category}</h3>
              <div className="space-y-3">
                {skill.items.map((item: SkillItem, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground dark:text-slate-300">
                        {item.name}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground dark:text-slate-400">
                        {item.proficiency}%
                      </span>
                    </div>
                    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary via-blue-500 to-accent rounded-full shadow-lg shadow-primary/50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
