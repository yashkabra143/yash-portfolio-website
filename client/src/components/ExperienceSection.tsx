import { motion } from "framer-motion";
import { experienceData } from "@/lib/data";
import { BriefcaseIcon, CalendarIcon, MapPinIcon, CheckCircleIcon } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 bg-muted dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold font-poppins text-center mb-12 text-foreground"
        >
          Professional Experience
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          {experienceData.map((exp, index) => {
            // Different styling for full vs earlier entries
            if (exp.type === "full") {
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`mb-10 relative`}
                >
                  {/* Card with drop shadow and border */}
                  <div className="bg-card dark:bg-slate-800 rounded-xl shadow-md border border-border/40 dark:border-slate-700/40 overflow-hidden transition-all duration-300 hover:shadow-lg">
                    {/* Top bar with period */}
                    <div className="bg-primary/10 dark:bg-primary/20 p-3 flex items-center justify-between border-b border-border/30 dark:border-slate-700/30">
                      <div className="flex items-center gap-2">
                        <BriefcaseIcon className="h-4 w-4 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPinIcon className="h-4 w-4 text-primary" />
                        <p className="text-foreground font-medium">{exp.company}, {exp.location}</p>
                      </div>
                      
                      {/* Responsibilities with improved bullets */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Key Achievements & Responsibilities</h4>
                        <ul className="space-y-4">
                          {exp.responsibilities?.map((responsibility, idx) => (
                            <motion.li 
                              key={idx} 
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.1 + (idx * 0.1) }}
                              className="flex items-start gap-3 text-foreground"
                            >
                              <CheckCircleIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{responsibility}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            } else {
              // Earlier experience style
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="bg-card dark:bg-slate-800 rounded-xl shadow-md border border-border/40 dark:border-slate-700/40 overflow-hidden">
                    <div className="bg-primary/10 dark:bg-primary/20 p-3 border-b border-border/30 dark:border-slate-700/30">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <BriefcaseIcon className="h-4 w-4 text-primary" />
                        Earlier Experience
                      </h3>
                    </div>
                    
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {exp.positions?.map((position, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 + (idx * 0.1) }}
                          className="bg-muted/50 dark:bg-slate-900/50 rounded-lg p-4 border border-border/20 dark:border-slate-700/20 hover:shadow-md transition-all duration-300"
                        >
                          <h4 className="text-base font-semibold mb-2 text-foreground">{position.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-primary mb-2">
                            <MapPinIcon className="h-3.5 w-3.5" />
                            <span>{position.company}, {position.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{position.period}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
