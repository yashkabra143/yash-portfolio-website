import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => {
    const lenis = (window as Window & { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-24 right-6 z-50",
        "flex items-center justify-center",
        "h-10 w-10 rounded-full",
        "bg-black dark:bg-white text-white dark:text-black",
        "shadow-lg ring-1 ring-white/10 dark:ring-black/10",
        "hover:opacity-80 hover:scale-110",
        "transition-all duration-200",
        "animate-in fade-in slide-in-from-bottom-4"
      )}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
