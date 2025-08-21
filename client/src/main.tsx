import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ActiveSectionProvider } from "@/lib/hooks";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import N8nChat from "@/components/N8nChat";


createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <ActiveSectionProvider>
          <App />
          <SpeedInsights />
          <Analytics />
          <N8nChat />
        </ActiveSectionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
 
 