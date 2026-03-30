import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinIcon, CalendarIcon, ChevronDownIcon, ExternalLinkIcon } from "lucide-react";

export interface Experience {
  position: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  companyUrl?: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const hasDetails = (exp.responsibilities && exp.responsibilities.length > 0) || exp.description;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-8"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background z-10">
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
      </div>

      <div
        className={`rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md ${hasDetails ? "cursor-pointer" : ""}`}
        onClick={() => hasDetails && setExpanded(!expanded)}
      >
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-foreground leading-tight">{exp.position}</h3>
                {exp.companyUrl && (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Visit ${exp.company}`}
                  >
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold text-foreground">{exp.company}</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPinIcon className="h-3 w-3" />
                  {exp.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <CalendarIcon className="h-3 w-3" />
                {exp.period}
              </span>
              {hasDetails && (
                <ChevronDownIcon
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
              )}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {expanded && hasDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-5 pt-5 border-t border-border space-y-4">
                  {exp.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  )}

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                        Key Contributions
                      </p>
                      <ul className="space-y-2.5">
                        {exp.responsibilities.map((r, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            {r}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-10 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="h-px w-24 bg-primary mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-foreground">Professional Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-5">
            {experiences.map((exp, index) => (
              <ExperienceCard key={`${exp.company}-${index}`} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
