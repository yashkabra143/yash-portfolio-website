import { motion } from "framer-motion";
import { certificationsData } from "@/lib/data";
import { Award, Calendar } from "lucide-react";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6">
        {/* Section divider */}
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-12"></div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-4 text-foreground"
        >
          Certifications
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
        >
          Professional certifications and educational achievements
        </motion.p>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificationsData.map((certification, index) => (
            <motion.div
              key={certification.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glass-effect rounded-2xl shadow-lg overflow-hidden border-2 border-gradient-to-r from-primary/20 to-accent/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 group"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 dark:from-primary/40 dark:to-accent/30 flex items-center justify-center text-primary mr-4 flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{certification.name}</h3>
                    <p className="text-primary">{certification.issuer}</p>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Calendar size={14} className="mr-1" />
                      <span>{certification.date}</span>
                    </div>
                    <p className="mt-3 text-muted-foreground">{certification.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary/10 dark:bg-primary/20 text-primary">
            <span className="text-sm">Continually expanding my knowledge through additional certifications and courses</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
