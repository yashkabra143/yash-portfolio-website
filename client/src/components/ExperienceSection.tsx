import { motion, AnimatePresence } from "framer-motion";
import { experienceData } from "@/lib/data";
import { 
  BriefcaseIcon, 
  CalendarIcon, 
  MapPinIcon, 
  CheckCircleIcon,
  ChevronDownIcon
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

export default function ExperienceSection() {
  // Filter full experiences
  const fullExperiences = experienceData.filter(exp => exp.type === "full");
  const earlierExp = experienceData.find(exp => exp.type === "earlier");
  
  return (
    <section id="experience" className="py-16 bg-muted dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold font-poppins text-center mb-8 text-foreground"
        >
          Professional Experience
        </motion.h2>
        
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Accordion type="single" collapsible defaultValue={fullExperiences[0]?.company} className="space-y-4">
              {fullExperiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                >
                  <AccordionItem 
                    value={exp.company || `experience-${index}`}
                    className="bg-card dark:bg-slate-800 rounded-xl shadow-md border border-border/40 dark:border-slate-700/40 overflow-hidden group"
                  >
                    <motion.div
                      whileHover={{ 
                        backgroundColor: "rgba(66, 153, 225, 0.05)"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 dark:hover:bg-slate-700/20 data-[state=open]:bg-primary/10 dark:data-[state=open]:bg-primary/20 border-b border-border/30 dark:border-slate-700/30 transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-2 text-left">
                          <div className="flex items-center gap-2">
                            <motion.div
                              initial={{ rotate: 0 }}
                              whileHover={{ rotate: 15, scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                              className="flex-shrink-0"
                            >
                              <BriefcaseIcon className="h-5 w-5 text-primary flex-shrink-0" />
                            </motion.div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                              <p className="text-sm text-muted-foreground">{exp.company}, {exp.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground md:pl-6 transition-opacity group-hover:text-primary">
                            <CalendarIcon className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                    </motion.div>
                    <AccordionContent className="px-6 pt-4 pb-6 overflow-hidden">
                      <AnimatePresence>
                        <motion.div 
                          className="mt-2 space-y-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.h4 
                            className="text-sm font-medium text-primary mb-3 uppercase tracking-wider"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            Key Achievements
                          </motion.h4>
                          <ul className="space-y-4">
                            {exp.responsibilities?.map((responsibility, idx) => (
                              <motion.li 
                                key={idx} 
                                initial={{ opacity: 0, x: -10, y: 5 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ 
                                  duration: 0.4, 
                                  delay: 0.2 + (idx * 0.07),
                                  type: "spring"
                                }}
                                whileHover={{ x: 3 }}
                                className="flex items-start gap-3 text-foreground group/item"
                              >
                                <motion.div
                                  whileHover={{ 
                                    rotate: 10, 
                                    scale: 1.1,
                                    color: "rgba(66, 153, 225, 1)"
                                  }}
                                  transition={{ duration: 0.2 }}
                                  className="flex-shrink-0"
                                >
                                  <CheckCircleIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 transition-colors group-hover/item:text-primary/90" />
                                </motion.div>
                                <span className="text-muted-foreground group-hover/item:text-muted-foreground/90">{responsibility}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </AnimatePresence>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
              
              {/* Earlier Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: fullExperiences.length * 0.1,
                  type: "spring",
                  stiffness: 50
                }}
              >
                <AccordionItem 
                  value="earlier"
                  className="bg-card dark:bg-slate-800 rounded-xl shadow-md border border-border/40 dark:border-slate-700/40 overflow-hidden"
                >
                  <motion.div
                    whileHover={{ 
                      backgroundColor: "rgba(66, 153, 225, 0.05)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 dark:hover:bg-slate-700/20 data-[state=open]:bg-primary/10 dark:data-[state=open]:bg-primary/20 border-b border-border/30 dark:border-slate-700/30 transition-all group">
                      <div className="flex items-center gap-2 w-full text-left">
                        <motion.div
                          initial={{ rotate: 0 }}
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <BriefcaseIcon className="h-5 w-5 text-primary flex-shrink-0" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-foreground/90">Earlier Experience</h3>
                      </div>
                    </AccordionTrigger>
                  </motion.div>
                  
                  <AccordionContent className="px-6 pt-4 pb-6 overflow-hidden">
                    <AnimatePresence>
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {earlierExp?.positions?.map((position, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: 0.1 + (idx * 0.1),
                              type: "spring",
                              stiffness: 100 
                            }}
                            whileHover={{ 
                              y: -5, 
                              scale: 1.03,
                              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                              borderColor: "rgba(66, 153, 225, 0.5)"
                            }}
                            className="bg-muted/50 dark:bg-slate-900/50 rounded-lg p-4 border border-border/20 dark:border-slate-700/20 transition-all duration-300"
                          >
                            <h4 className="text-base font-semibold mb-2 text-foreground">{position.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-primary mb-2">
                              <MapPinIcon className="h-3.5 w-3.5" />
                              <span>{position.company || ""}, {position.location || ""}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <CalendarIcon className="h-3 w-3" />
                              <span>{position.period || ""}</span>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}