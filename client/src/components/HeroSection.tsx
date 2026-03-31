import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, FileText, ArrowDown, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const SOCIAL_LINKS = [
  {
    icon: Briefcase,
    href: "https://www.upwork.com/freelancers/~01125d841102f61285",
    label: "Upwork",
    upwork: true,
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/yashkabra143/",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/yashkabra143",
    label: "GitHub",
  },
  {
    icon: FileText,
    href: "/attached_assets/Yash_Kabra_QA_Engineer.pdf",
    label: "Resume",
    download: true,
  },
];

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-background"
    >
      {/* SEO */}
      <h1 className="sr-only">Yash Kabra — Senior Quality Assurance Engineer & Test Automation Specialist</h1>

      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

      {/* Floating pill decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -150, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: 12 }}
          transition={{ duration: 2.4, delay: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
          className="absolute left-[-10%] top-[15%] h-[120px] w-[500px]"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <div className="absolute inset-0 rounded-full border-2 border-primary/15 bg-gradient-to-r from-primary/10 to-transparent backdrop-blur-[2px]" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -150, rotate: 15 }}
          animate={{ opacity: 1, y: 0, rotate: -15 }}
          transition={{ duration: 2.4, delay: 0.5, ease: [0.23, 0.86, 0.39, 0.96] }}
          className="absolute right-[-5%] top-[70%] h-[100px] w-[420px]"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <div className="absolute inset-0 rounded-full border-2 border-primary/15 bg-gradient-to-r from-primary/10 to-transparent backdrop-blur-[2px]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">

            {/* Avatar */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex-shrink-0"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-md"
                />
                <Avatar className="relative h-36 w-36 border-4 border-background shadow-2xl ring-1 ring-border md:h-44 md:w-44">
                  <AvatarImage
                    src="/attached_assets/yash-photo-removebg-preview.png"
                    alt="Yash Kabra - Senior QA Engineer"
                    className="object-cover object-top"
                  />
                  <AvatarFallback className="font-display text-4xl font-bold">YK</AvatarFallback>
                </Avatar>
              </div>
            </motion.div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">

              <motion.p
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Senior Quality Assurance Engineer
              </motion.p>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mb-5 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
              >
                Yash Kabra
              </motion.p>

              <motion.p
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg"
              >
                Experienced QA engineer specialising in manual and automation testing. I help teams ship reliable, high‑quality software with confidence.
              </motion.p>

              {/* Social links */}
              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mb-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
              >
                {SOCIAL_LINKS.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.download ? undefined : "_blank"}
                    rel={link.download ? undefined : "noopener noreferrer"}
                    download={link.download || undefined}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={
                      link.upwork
                        ? "group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg"
                        : "group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-all duration-300 hover:border-foreground/30 hover:text-foreground hover:shadow-md"
                    }
                    style={link.upwork ? { backgroundColor: "#14a800" } : undefined}
                  >
                    <link.icon className="h-4 w-4 transition-colors" />
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                custom={5}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <a href="#projects">View My Projects</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.6, duration: 0.6 },
          y: { delay: 1.8, duration: 1.5, repeat: Infinity },
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
