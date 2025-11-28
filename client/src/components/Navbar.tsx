import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/lib/hooks";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#resources", label: "Resources" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSection } = useActiveSection();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      // Close menu if open
      if (isMenuOpen) setIsMenuOpen(false);

      // Scroll to section
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth"
      });
    }
  };

  // Close mobile menu on resize to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md dark:shadow-primary/10 border-b border-primary/10 dark:border-primary/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold font-poppins text-gradient hover:scale-110 transition-transform duration-300">
          YK
        </a>
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link text-foreground dark:text-slate-200 hover:text-primary dark:hover:text-accent font-semibold transition-colors duration-300 ${
                  activeSection === link.href.substring(1) ? "active text-primary dark:text-accent" : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button 
            className="text-foreground" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 bg-background md:hidden overflow-hidden dark:border-t dark:border-slate-700/30"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-foreground hover:text-primary font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
