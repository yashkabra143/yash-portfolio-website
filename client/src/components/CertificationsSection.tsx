import { motion } from "framer-motion";
import { certificationsData } from "@/lib/data";
import { Award, Calendar } from "lucide-react";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 bg-muted dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold font-poppins text-center mb-4 text-foreground"
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
              className="bg-card dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-border/40 dark:border-slate-700/40 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4 flex-shrink-0 group-hover:bg-primary/30 transition-colors">
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