import { motion } from "framer-motion";
import { Code, Bot, ExternalLink, Cog, Cloud, Database } from "lucide-react";
import { skillsData } from "@/lib/data";

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
    <section id="skills" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold font-poppins text-center mb-12 text-foreground"
        >
          Technical Skills
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skillsData.map((skill, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-muted dark:bg-slate-800 rounded-xl p-6 shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
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
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-background dark:bg-slate-700">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
