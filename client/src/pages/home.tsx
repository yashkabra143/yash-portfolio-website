import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ResourcesSection from "@/components/ResourcesSection";
import ContactSection from "@/components/ContactSection";
import ScrollReveal from "@/components/ScrollReveal";

import AnalyticsTracker from "@/components/AnalyticsTracker";
import SkipToContent from "@/components/SkipToContent";
import Footer from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { useEffect } from "react";
import { useActiveSection } from "@/lib/hooks";

export default function Home() {
  const { setActiveSection } = useActiveSection();

  // Handle scroll for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on page load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setActiveSection]);

  return (
    <>
      <SkipToContent />
      <Navbar />
      <AnalyticsTracker />
      <main id="main" aria-label="Main content">
        <HeroSection />
        <ScrollReveal delay={0.1}>
          <EducationSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ExperienceSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <CertificationsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <SkillsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ProjectsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ResourcesSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <TestimonialsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ContactSection />
        </ScrollReveal>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
