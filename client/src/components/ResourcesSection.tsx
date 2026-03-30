import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Download, FileText, CheckSquare, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ─── Sticky Scroll Primitives ──────────────────────────────────────────────────
const ContainerScroll = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ perspective: "1000px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  )
);
ContainerScroll.displayName = "ContainerScroll";

interface CardStickyProps extends HTMLMotionProps<"div"> {
  index: number;
  incrementY?: number;
  incrementZ?: number;
}

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  ({ index, incrementY = 60, incrementZ = 5, children, className, style, ...props }, ref) => (
    <motion.div
      ref={ref}
      layout="position"
      style={{ top: index * incrementY, z: index * incrementZ, backfaceVisibility: "hidden", ...style }}
      className={cn("sticky", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
);
CardSticky.displayName = "CardSticky";

// ─── Data ──────────────────────────────────────────────────────────────────────
interface QAResource {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
  icon: React.ReactNode;
  color: string;
}

const QA_RESOURCES: QAResource[] = [
  {
    id: "bug-report",
    title: "QA Bug Report Template",
    description: "A comprehensive bug report template with severity levels, reproduction steps, and environment details. Perfect for effective issue tracking and resolution.",
    fileType: "XLSX",
    fileSize: "2.4 MB",
    fileUrl: "/attached_assets/Shopman_BugReport.xlsx",
    icon: <FileText className="w-6 h-6" />,
    color: "from-red-500 to-orange-500",
  },
  {
    id: "test-cases",
    title: "Test Case Documentation",
    description: "Structured test case suite covering functional, integration, and regression testing scenarios with pass/fail criteria and expected results.",
    fileType: "PDF",
    fileSize: "5.8 MB",
    fileUrl: "/attached_assets/Zega_app_test_cases.pdf",
    icon: <CheckSquare className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "mobile-checklist",
    title: "Mobile App Testing Checklist",
    description: "Essential checklist for testing mobile applications across iOS and Android platforms, covering device compatibility, performance, and UX testing points.",
    fileType: "XLSX",
    fileSize: "1.9 MB",
    fileUrl: "/attached_assets/Mobile_Checklists.xlsx",
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
  },
];

// ─── Resource Card ─────────────────────────────────────────────────────────────
function ResourceCard({ resource, index }: { resource: QAResource; index: number }) {
  return (
    <CardSticky
      index={index}
      incrementY={60}
      incrementZ={5}
      className="w-full overflow-hidden rounded-xl border border-border bg-background shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="relative">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10 transition-opacity duration-300 group-hover:opacity-20", resource.color)} />

        <div className="relative p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className={cn("flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br shadow-lg transition-transform duration-300 hover:scale-110", resource.color)}>
              <span className="text-white">{resource.icon}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-xs font-semibold text-muted-foreground">
              <span>{resource.fileType}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>{resource.fileSize}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">{resource.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{resource.description}</p>

          <Button
            className={cn("w-full bg-gradient-to-r text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300", resource.color)}
            asChild
          >
            <a href={resource.fileUrl} download>
              <Download className="w-4 h-4 mr-2" />
              Download {resource.fileType}
            </a>
          </Button>
        </div>
      </div>
    </CardSticky>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function ResourcesSection() {
  return (
    <section id="resources" className="bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — sticky text panel */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="h-px w-24 bg-primary" />

              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  QA Resources
                </span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-foreground">
                Download My{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Testing Resources
                </span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Access professional QA templates, test cases, and checklists developed and refined through years of software testing experience. Each resource is designed to help maintain high quality standards in your projects.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Free to Download</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Ready to Use</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — sticky cards stack */}
          <div className="lg:min-h-[200vh]">
            <ContainerScroll className="space-y-8 py-8">
              {QA_RESOURCES.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </ContainerScroll>
          </div>
        </div>

      </div>
    </section>
  );
}
