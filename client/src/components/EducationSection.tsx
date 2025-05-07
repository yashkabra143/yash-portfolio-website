import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = {
  degree: "Bachelor's in Information Technology",
  institution: "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
  period: "2013 - 2017"
};

export default function EducationSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold font-poppins text-center mb-12 text-foreground"
        >
          Education
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-muted dark:bg-slate-800 rounded-xl shadow-sm p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-lg bg-sky-100 dark:bg-sky-900 flex items-center justify-center mb-3">
                <GraduationCap className="text-2xl text-primary" size={28} />
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-1 text-foreground">{education.degree}</h3>
              <p className="text-muted-foreground dark:text-slate-400 mb-2">{education.institution}</p>
              <p className="text-muted-foreground/80 dark:text-slate-500 mb-3">{education.period}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
