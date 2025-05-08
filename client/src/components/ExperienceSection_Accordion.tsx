import { motion } from "framer-motion";
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
            <Accordion type="single" collapsible defaultValue={fullExperiences[0].company} className="space-y-4">
              {fullExperiences.map((exp, index) => (
                <AccordionItem 
                  key={index} 
                  value={exp.company}
                  className="bg-card dark:bg-slate-800 rounded-xl shadow-md border border-border/40 dark:border-slate-700/40 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 dark:hover:bg-slate-700/20 data-[state=open]:bg-primary/10 dark:data-[state=open]:bg-primary/20 border-b border-border/30 dark:border-slate-700/30 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-2 text-left">
                      <div className="flex items-center gap-2">
                        <BriefcaseIcon className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                          <p className="text-sm text-muted-foreground">{exp.company}, {exp.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground md:pl-6">
                        <CalendarIcon className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-4 pb-6">
                    <div className="mt-2 space-y-4">
                      <h4 className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">Key Achievements</h4>
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
                  </AccordionContent>
                </AccordionItem>
              ))}
              
              {/* Earlier Experience */}
              <AccordionItem 
                value="earlier"
                className="bg-card dark:bg-slate-800 rounded-xl shadow-md border border-border/40 dark:border-slate-700/40 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 dark:hover:bg-slate-700/20 data-[state=open]:bg-primary/10 dark:data-[state=open]:bg-primary/20 border-b border-border/30 dark:border-slate-700/30 transition-all">
                  <div className="flex items-center gap-2 w-full text-left">
                    <BriefcaseIcon className="h-5 w-5 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-foreground">Earlier Experience</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-4 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    {earlierExp?.positions?.map((position, idx) => (
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}