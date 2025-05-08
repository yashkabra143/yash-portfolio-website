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
        
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line with animation */}
          <motion.div 
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary/30 dark:bg-primary/20 hidden md:block origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {experienceData.map((exp, index) => {
            if (exp.type === "full") {
              // Alternate left and right for timeline layout on desktop
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`mb-10 md:mb-16 relative md:w-1/2 ${isEven ? 'md:ml-auto md:pl-8' : 'md:pr-8'}`}
                >
                  {/* Timeline dot with pulsing animation */}
                  <motion.div 
                    className="hidden md:block absolute w-5 h-5 rounded-full bg-primary top-5 z-10 shadow-lg shadow-primary/20" 
                    style={{ left: isEven ? '-12px' : 'auto', right: isEven ? 'auto' : '-12px' }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: [0, 1.5, 1], opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.3 + (index * 0.2),
                      times: [0, 0.6, 1]
                    }}
                  />
                  
                  {/* Timeline date tag with animation */}
                  <motion.div 
                    className={`hidden md:flex absolute top-4 items-center gap-2 text-sm text-foreground ${isEven ? 'right-full mr-8' : 'left-full ml-8'}`}
                    style={{ width: '140px', justifyContent: isEven ? 'flex-end' : 'flex-start' }}
                    initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.2) }}
                  >
                    <CalendarIcon className={`h-3.5 w-3.5 text-primary ${isEven ? 'order-1' : 'order-0'}`} />
                    <span>{exp.period.split(" - ")[0]}</span>
                  </motion.div>
                  
                  {/* Animated connector line from dot to card */}
                  <motion.div 
                    className="hidden md:block absolute top-5 h-px bg-primary/40 dark:bg-primary/30"
                    style={{ 
                      left: isEven ? '0' : 'auto', 
                      right: isEven ? 'auto' : '0', 
                      width: '8px',
                      transformOrigin: isEven ? 'left' : 'right'
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.2) }}
                  />
                  
                  {/* Card with hover animation */}
                  <motion.div 
                    className="bg-card dark:bg-slate-800 rounded-xl shadow-md border border-border/40 dark:border-slate-700/40 overflow-hidden"
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      borderColor: "rgba(66, 153, 225, 0.5)" 
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {/* Mobile view date */}
                    <div className="md:hidden bg-primary/10 dark:bg-primary/20 p-3 flex items-center justify-between border-b border-border/30 dark:border-slate-700/30">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    {/* Header */}
                    <div className="p-4 border-b border-border/30 dark:border-slate-700/30">
                      <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                        <MapPinIcon className="h-4 w-4 text-primary" />
                        <p>{exp.company}, {exp.location}</p>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">Key Achievements</h4>
                      <ul className="space-y-3">
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
                  </motion.div>
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
                  className="md:w-full mb-8"
                >
                  <motion.div 
                    className="bg-card dark:bg-slate-800 rounded-xl shadow-md border border-border/40 dark:border-slate-700/40 overflow-hidden"
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)" 
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
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
                          whileHover={{ 
                            y: -5, 
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                            borderColor: "rgba(66, 153, 225, 0.5)" 
                          }}
                          className="bg-muted/50 dark:bg-slate-900/50 rounded-lg p-4 border border-border/20 dark:border-slate-700/20 transition-all duration-300"
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
                  </motion.div>
                </motion.div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}