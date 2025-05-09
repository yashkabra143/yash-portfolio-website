import { motion } from "framer-motion";
import { Mail, Phone, Briefcase, Github, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HeroAnimation from "./HeroAnimation";
import { Suspense } from "react";

const profileData = {
  name: "Yash Kabra",
  title: "Senior Quality Assurance Engineer",
  location: "Indore, MP, India",
  email: "yashkabra143@gmail.com",
  phone: "+91 8370043219",
  about: "Experienced QA professional with 7+ years in Manual and Automation Testing. Proficient in test execution, plan creation, and defect reporting. Seeking a QA role to enhance software quality."
};

export default function HeroSection() {
  return (
    <section id="about" className="pt-10 md:pt-16 pb-20 bg-gradient-to-b from-muted to-background dark:from-slate-900 dark:to-background">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center"
        >
          <div className="md:w-1/3 mb-8 md:mb-0 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-full w-56 h-56 overflow-hidden border-4 border-background shadow-lg dark:shadow-slate-700/30 mb-6"
            >
              <Avatar className="w-full h-full">
                <AvatarImage src="/yash-photo.jpg" alt="Yash Kabra" className="w-full h-full object-cover" />
                <AvatarFallback>YK</AvatarFallback>
              </Avatar>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full mt-6"
            >
              <HeroAnimation />
            </motion.div>
          </div>
          <div className="md:w-2/3 md:pl-12">
            <div className="mb-4">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-block px-3 py-1 text-sm font-medium text-primary bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 rounded-full mb-3"
              >
                {profileData.title}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold font-poppins text-foreground mb-2"
              >
                {profileData.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-lg text-muted-foreground dark:text-slate-400 mb-6"
              >
                {profileData.location}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4 mb-6"
              >
                <a 
                  href={`mailto:${profileData.email}`} 
                  className="flex items-center text-muted-foreground dark:text-slate-400 hover:text-primary transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  <span>{profileData.email}</span>
                </a>
                <a 
                  href={`tel:${profileData.phone}`} 
                  className="flex items-center text-muted-foreground dark:text-slate-400 hover:text-primary transition-colors"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  <span>{profileData.phone}</span>
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-col gap-3 mb-6"
              >
                <h3 className="text-sm font-medium text-muted-foreground">Connect with me:</h3>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://www.linkedin.com/in/yashkabra143/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={16} /> <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                  <a 
                    href="https://github.com/yashkabra143" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-foreground/10 dark:bg-foreground/20 text-foreground hover:bg-foreground/20 dark:hover:bg-foreground/30 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github size={16} /> <span className="text-sm font-medium">GitHub</span>
                  </a>
                  <a 
                    href="https://www.upwork.com/freelancers/~01125d841102f61285" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-600/10 dark:bg-green-600/20 text-green-600 dark:text-green-500 hover:bg-green-600/20 dark:hover:bg-green-600/30 transition-colors"
                    aria-label="Upwork Profile"
                  >
                    <Briefcase size={16} /> <span className="text-sm font-medium">Upwork</span>
                  </a>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold font-poppins mb-3 text-foreground">About Me</h2>
              <p className="text-muted-foreground dark:text-slate-400 leading-relaxed mb-5">
                {profileData.about}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Contact Me
                </a>
                <a 
                  href="/attached_assets/Yash_Kabra_QA_Engineer.pdf" 
                  download
                  className="inline-block px-6 py-3 bg-background text-foreground border border-input font-medium rounded-lg hover:bg-muted transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
