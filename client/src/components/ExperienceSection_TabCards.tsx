import { useState } from "react";
import { motion } from "framer-motion";
import { experienceData } from "@/lib/data";
import { BriefcaseIcon, CalendarIcon, MapPinIcon, CheckCircleIcon, ChevronRightIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<string>(experienceData[0].company);
  
  // Filter out just full experiences for the tabs
  const fullExperiences = experienceData.filter(exp => exp.type === "full");
  const earlierExperiences = experienceData.find(exp => exp.type === "earlier");
  
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
        
        <div className="max-w-5xl mx-auto">
          <Tabs 
            defaultValue={fullExperiences[0].company} 
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <TabsList className="h-auto flex-col space-y-2 bg-transparent hidden md:flex">
                {fullExperiences.map((exp, index) => (
                  <TabsTrigger 
                    key={index}
                    value={exp.company}
                    className={`relative w-64 flex items-start gap-3 pl-4 pr-2 py-4 justify-between rounded-lg border-l-4 text-base
                      ${activeTab === exp.company ? 
                        "border-l-primary bg-card dark:bg-slate-800 shadow-md" : 
                        "border-l-muted-foreground/20 hover:border-l-muted-foreground/50"
                      }`
                    }
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-left">{exp.company}</span>
                      <span className="text-xs text-muted-foreground/80">{exp.title}</span>
                    </div>
                    <ChevronRightIcon className={`h-5 w-5 transition-transform ${activeTab === exp.company ? "text-primary rotate-90" : "text-muted-foreground"}`} />
                  </TabsTrigger>
                ))}
                
                {/* Earlier Experiences Tab */}
                <TabsTrigger 
                  value="earlier"
                  className={`relative w-64 flex items-start gap-3 pl-4 pr-2 py-4 justify-between rounded-lg border-l-4 text-base
                    ${activeTab === "earlier" ? 
                      "border-l-primary bg-card dark:bg-slate-800 shadow-md" : 
                      "border-l-muted-foreground/20 hover:border-l-muted-foreground/50"
                    }`
                  }
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-left">Earlier Experience</span>
                    <span className="text-xs text-muted-foreground/80">Previous Roles</span>
                  </div>
                  <ChevronRightIcon className={`h-5 w-5 transition-transform ${activeTab === "earlier" ? "text-primary rotate-90" : "text-muted-foreground"}`} />
                </TabsTrigger>
              </TabsList>
              
              {/* Mobile View Tabs */}
              <TabsList className="h-auto space-x-2 bg-transparent md:hidden mb-6 overflow-x-auto p-1 flex flex-nowrap">
                {fullExperiences.map((exp, index) => (
                  <TabsTrigger 
                    key={index}
                    value={exp.company}
                    className={`flex-shrink-0 border-b-2 rounded-none px-3 py-2
                      ${activeTab === exp.company ? 
                        "border-b-primary text-primary" : 
                        "border-b-transparent hover:border-b-muted-foreground/30"
                      }`
                    }
                  >
                    {exp.company}
                  </TabsTrigger>
                ))}
                <TabsTrigger 
                  value="earlier"
                  className={`flex-shrink-0 border-b-2 rounded-none px-3 py-2
                    ${activeTab === "earlier" ? 
                      "border-b-primary text-primary" : 
                      "border-b-transparent hover:border-b-muted-foreground/30"
                    }`
                  }
                >
                  Earlier
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1">
                {/* Full experiences content */}
                {fullExperiences.map((exp, index) => (
                  <TabsContent key={index} value={exp.company} className="mt-0 w-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card dark:bg-slate-800 rounded-xl shadow-md border border-border/40 dark:border-slate-700/40 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="bg-primary/10 dark:bg-primary/20 p-4 border-b border-border/30 dark:border-slate-700/30">
                        <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 justify-between">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPinIcon className="h-4 w-4 text-primary" />
                            <p>{exp.company}, {exp.location}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h4 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">Key Achievements & Responsibilities</h4>
                        <ul className="space-y-4">
                          {exp.responsibilities?.map((responsibility, idx) => (
                            <motion.li 
                              key={idx} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              className="flex items-start gap-3 text-foreground"
                            >
                              <CheckCircleIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{responsibility}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
                
                {/* Earlier experiences content */}
                <TabsContent value="earlier" className="mt-0 w-full">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card dark:bg-slate-800 rounded-xl shadow-md border border-border/40 dark:border-slate-700/40 overflow-hidden"
                  >
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 border-b border-border/30 dark:border-slate-700/30">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <BriefcaseIcon className="h-4 w-4 text-primary" />
                        Earlier Experience
                      </h3>
                    </div>
                    
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {earlierExperiences?.positions?.map((position, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
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
                  </motion.div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}