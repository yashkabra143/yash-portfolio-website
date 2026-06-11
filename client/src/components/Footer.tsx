import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, Briefcase, Code2, FileText, Award } from "lucide-react";
import SocialShareButtons from "./SocialShareButtons";

// ─── Animated Wrapper ──────────────────────────────────────────────────────────
function AnimatedContainer({ className, delay = 0.1, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  {
    label: "Portfolio",
    links: [
      { title: "Projects", href: "#projects", icon: Code2 },
      { title: "Experience", href: "#experience", icon: Briefcase },
      { title: "Certifications", href: "#certifications", icon: Award },
      { title: "Resources", href: "#resources", icon: FileText },
    ],
  },
  {
    label: "Connect",
    links: [
      { title: "About", href: "#about", icon: undefined },
      { title: "Skills", href: "#skills", icon: undefined },
    ],
  },
];

const SOCIAL_LINKS = [
  { title: "LinkedIn", href: "https://www.linkedin.com/in/yashkabra143/", icon: Linkedin },
  { title: "GitHub", href: "https://github.com/yashkabra143", icon: Github },
  { title: "Upwork", href: "https://www.upwork.com/freelancers/~01125d841102f61285", icon: Briefcase },
  { title: "Email", href: "mailto:yashkabra143@gmail.com", icon: Mail },
];

// ─── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-background border-t border-border">
      <div className="container mx-auto px-6 py-10">
        <div className="grid w-full gap-12 lg:grid-cols-3">
          {/* Brand */}
          <AnimatedContainer className="space-y-6 lg:col-span-1">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Yash <span className="text-primary">Kabra</span>
              </h2>
              <p className="text-muted-foreground text-sm">Senior Quality Assurance Engineer</p>
            </div>

            <a
              href="mailto:yashkabra143@gmail.com"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
            >
              <Mail className="size-4" />
              yashkabra143@gmail.com
            </a>

            <div className="flex items-center gap-4 pt-2">
              {SOCIAL_LINKS.map(({ title, href, icon: Icon }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={title}
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </AnimatedContainer>

          {/* Nav columns */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
            {NAV_SECTIONS.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.2 + index * 0.1}>
                <h3 className="mb-4 text-sm font-semibold">{section.label}</h3>
                <ul className="space-y-3">
                  {section.links.map(({ title, href, icon: Icon }) => (
                    <li key={title}>
                      <button
                        onClick={() => handleNavClick(href)}
                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
                      >
                        {Icon && <Icon className="size-4" />}
                        {title}
                      </button>
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Share + bottom bar */}
        <AnimatedContainer delay={0.4}>
          <div className="mt-12 border-t border-border pt-8 space-y-6">
            <div className="flex justify-center">
              <SocialShareButtons />
            </div>
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-muted-foreground text-xs">
                © {new Date().getFullYear()} Yash Kabra. All rights reserved.
              </p>
              <p className="text-muted-foreground text-xs">Last updated: June 2026</p>
            </div>
          </div>
        </AnimatedContainer>
      </div>

    </footer>
  );
}
