import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import BlurText from "@/components/BlurText";

const HERO = {
  name: "YASH KABRA",
  title: "Senior Quality Assurance Engineer",
  description:
    "Experienced QA engineer specialising in manual and automation testing. I help teams ship reliable, high‑quality software with confidence.",
  profileImage: "/attached_assets/yash-photo-removebg-preview.png",
} as const;

const [FIRST_NAME, ...lastParts] = HERO.name.split(" ");
const LAST_NAME = lastParts.join(" ");

export default function HeroSection() {

  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden bg-background text-foreground"
    >
      {/* SEO: visually hidden h1 so crawlers see the primary heading */}
      <h1 className="sr-only">Yash Kabra — Senior Quality Assurance Engineer & Test Automation Specialist</h1>

      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <main className="relative flex flex-1 flex-col">
        {/* Huge name + photo */}
        <div className="absolute left-1/2 top-[42%] w-full -translate-x-1/2 -translate-y-1/2 px-4 md:top-[44%]">
          <div className="relative text-center">
            <div>
              <BlurText
                text={FIRST_NAME}
                delay={100}
                animateBy="letters"
                direction="top"
                className="justify-center whitespace-nowrap text-[72px] font-bold leading-[0.75] tracking-tighter text-black sm:text-[110px] md:text-[150px] lg:text-[190px] dark:text-white"
              />
            </div>
            <div>
              <BlurText
                text={LAST_NAME}
                delay={100}
                animateBy="letters"
                direction="top"
                className="justify-center whitespace-nowrap text-[72px] font-bold leading-[0.75] tracking-tighter text-black sm:text-[110px] md:text-[150px] lg:text-[190px] dark:text-white"
              />
            </div>

            {/* Center photo */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="h-[90px] w-[55px] overflow-hidden rounded-full border-4 border-background shadow-2xl transition-transform duration-300 hover:scale-110 sm:h-[120px] sm:w-[70px] md:h-[150px] md:w-[90px] lg:h-[180px] lg:w-[110px]"
              >
                <img
                  src={HERO.profileImage}
                  alt="Yash Kabra - Senior QA Engineer"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Title + description */}
        <div className="absolute left-1/2 top-[69%] w-full -translate-x-1/2 px-6 md:top-[70%] lg:top-[71%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <BlurText
              text={HERO.title}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-center text-[14px] font-semibold sm:text-[18px] md:text-[22px] lg:text-[26px]"
            />
            <BlurText
              text={HERO.description}
              delay={150}
              animateBy="words"
              direction="top"
              className="max-w-2xl text-center text-[12px] text-muted-foreground sm:text-[14px] md:text-[16px]"
            />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.6 },
            y: { delay: 1.5, duration: 1.5, repeat: Infinity },
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </main>
    </section>
  );
}
