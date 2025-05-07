import { useEffect, useState } from "react";

/**
 * A component that provides a skip-to-content link for keyboard users
 * to bypass the navigation and go directly to the main content
 */
export default function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show the skip link on Tab press
      if (e.key === "Tab") {
        setIsVisible(true);
      }
      
      // Hide the skip link when Escape is pressed
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const skipToContent = () => {
    const main = document.querySelector("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus();
      window.scrollTo(0, 0);
      
      // Reset tabindex after focus
      setTimeout(() => main.removeAttribute("tabindex"), 1000);
    }
    setIsVisible(false);
  };

  return (
    <a
      href="#main"
      onClick={(e) => {
        e.preventDefault();
        skipToContent();
      }}
      className={`
        fixed top-0 left-0 z-50 p-3 bg-primary text-white
        transition-transform duration-200 transform
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
      `}
    >
      Skip to content
    </a>
  );
}
