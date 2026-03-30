import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";

interface EducationSectionProps {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
  achievements?: string[];
  variant?: "default" | "minimal";
}

export default function EducationSection({
  degree,
  institution,
  location,
  period,
  achievements,
  description,
}: EducationSectionProps) {
  return (
    <section id="education" className="py-10 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <div className="h-px w-24 bg-primary mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-foreground">Education</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
            {/* Left accent stripe */}
            <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-sm" />

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground leading-tight">{degree}</h3>
                </div>
                <p className="pl-[52px] text-base font-medium text-muted-foreground">{institution}</p>
                {description && (
                  <p className="pl-[52px] text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/20 ml-[52px] pl-4 mt-3">
                    {description}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 lg:items-end shrink-0">
                <div className="flex items-center gap-1.5 font-mono text-sm font-semibold text-primary">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{period}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            {achievements && achievements.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Achievements
                  </span>
                </div>
                <ul className="space-y-2">
                  {achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
