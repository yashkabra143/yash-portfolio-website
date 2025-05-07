import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ActiveSectionProvider } from "@/lib/hooks";
import { ThemeProvider } from "@/components/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <ActiveSectionProvider>
        <App />
      </ActiveSectionProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
