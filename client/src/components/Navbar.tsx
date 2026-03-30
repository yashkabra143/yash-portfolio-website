import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useActiveSection } from "@/lib/hooks";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#resources", label: "Resources" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSection } = useActiveSection();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleNavClick = (href: string) => {
    const targetElement = document.querySelector(href);
    if (!targetElement) return;

    if (isMenuOpen) setIsMenuOpen(false);

    window.scrollTo({
      top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth"
    });
  };

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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-3 py-1 text-sm font-medium text-primary transition hover:from-primary/20 hover:via-primary/10"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
            YK
          </span>
          <span className="hidden flex-col text-xs text-foreground/80 sm:flex">
            <span className="font-semibold tracking-wide">Yash Kabra</span>
            <span className="text-[11px] text-muted-foreground">
              Senior Quality Assurance Engineer
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-3 rounded-full bg-muted/60 px-3 py-1.5 text-sm shadow-sm shadow-black/5 dark:bg-slate-900/70">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={[
                    "relative rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    "text-muted-foreground hover:text-foreground",
                    isActive &&
                      "text-primary",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isActive && (
                    <span className="absolute inset-x-1.5 bottom-0 h-1 rounded-full bg-primary/15" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 whitespace-nowrap">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground shadow-sm shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90"
            >
              Let&apos;s talk
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground shadow-sm"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-t border-border/60 bg-background/95 px-4 pb-4 pt-2 shadow-lg shadow-black/10 md:hidden"
          >
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={[
                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                      isActive && "bg-primary/10 text-primary",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
              <a
                href="#contact"
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
