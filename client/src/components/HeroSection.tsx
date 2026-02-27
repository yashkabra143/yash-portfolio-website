import { motion } from "framer-motion";
import { Mail, Phone, Briefcase, Github, Linkedin, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HeroAnimation from "./HeroAnimation";
import { Suspense } from "react";

const profileData = {
  name: "Yash Kabra",
  title: "Senior Quality Assurance Engineer",
  location: "Indore, MP, India",
  email: "yashkabra143@gmail.com",
  phone: "+91 8370043219",
  about: "Experienced QA professional with 8+ years in Manual and Automation Testing. Proficient in test execution, plan creation, and defect reporting. Seeking a QA role to enhance software quality."
};

export default function HeroSection() {
  return (
    <section 
      id="about" 
      className="pt-10 md:pt-20 pb-20 relative overflow-hidden"
      itemScope 
      itemType="https://schema.org/Person"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 pointer-events-none"></div>
      
      {/* Floating gradient blobs with enhanced animations */}
      <motion.div 
        className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl opacity-50 dark:opacity-30 pointer-events-none"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-t from-accent/20 to-primary/10 rounded-full blur-3xl opacity-40 dark:opacity-20 pointer-events-none"
        animate={{
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl opacity-30 dark:opacity-15 pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
        >
          {/* Left Column - Profile Image & Animation */}
          <div className="md:w-1/3 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative mb-8"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-blue-400 opacity-75 blur-lg dark:opacity-50 animate-pulse"></div>
              
              {/* Profile Image */}
              <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl dark:shadow-primary/20">
                <Avatar className="w-full h-full">
                  <AvatarImage src="/attached_assets/yash-photo.jpg" alt="Yash Kabra" className="w-full h-full object-cover" />
                  <AvatarFallback>YK</AvatarFallback>
                </Avatar>
              </div>
            </motion.div>
            
            {/* Hero Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full"
            >
              <Suspense fallback={<div className="h-32"></div>}>
                <HeroAnimation />
              </Suspense>
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <div className="md:w-2/3 flex flex-col">
            {/* Title Badge */}
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block w-fit px-4 py-2 text-sm font-semibold text-primary bg-gradient-to-r from-primary/10 via-blue-500/5 to-accent/10 dark:from-primary/20 dark:via-blue-500/10 dark:to-accent/20 rounded-full mb-6 border border-primary/20 dark:border-primary/40 shadow-sm"
            >
              {profileData.title}
            </motion.span>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-gradient mb-3 leading-tight"
              itemProp="name"
            >
              {profileData.name}
            </motion.h1>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-muted-foreground dark:text-slate-300 mb-8 font-medium"
              itemProp="address"
            >
              📍 {profileData.location}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap items-center gap-6 mb-8"
            >
              <a 
                href={`mailto:${profileData.email}`} 
                className="flex items-center gap-2 text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-accent transition-colors duration-300 group"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm md:text-base">{profileData.email}</span>
              </a>
              <a 
                href={`tel:${profileData.phone}`} 
                className="flex items-center gap-2 text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-accent transition-colors duration-300 group"
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm md:text-base">{profileData.phone}</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-4 mb-8"
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Connect with me</h3>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://www.linkedin.com/in/yashkabra143/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/80 to-blue-500/80 dark:from-primary dark:to-blue-400 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group hover:-translate-y-1"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} className="group-hover:scale-110 transition-transform" /> 
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/yashkabra143" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 group hover:-translate-y-1"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} className="group-hover:scale-110 transition-transform" /> 
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://www.upwork.com/freelancers/~01125d841102f61285" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/80 to-emerald-600/80 dark:from-green-500 dark:to-emerald-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 group hover:-translate-y-1"
                  aria-label="Upwork Profile"
                >
                  <Briefcase size={18} className="group-hover:scale-110 transition-transform" /> 
                  <span>Upwork</span>
                </a>
              </div>
            </motion.div>

            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">About Me</h2>
              <p className="text-muted-foreground dark:text-slate-300 leading-relaxed text-lg" itemProp="description">
                {profileData.about}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:scale-105"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Contact Me
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/attached_assets/Yash_Kabra_QA_Engineer.pdf" 
                download
                className="inline-flex items-center gap-2 px-7 py-3 bg-white dark:bg-slate-800 text-foreground border-2 border-primary dark:border-primary font-semibold rounded-lg hover:bg-primary/5 dark:hover:bg-primary/20 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
              >
                Download Resume
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
