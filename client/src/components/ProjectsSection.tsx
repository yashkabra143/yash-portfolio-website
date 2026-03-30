import * as React from "react";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, HTMLMotionProps, MotionValue } from "framer-motion";
import { Ticket, Baby, Bath, Coins, Cloud, Heart, Puzzle, FlaskConical, ShieldCheck, Sparkles, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { projectsData } from "@/lib/data";

// ─── GradientText ─────────────────────────────────────────────────────────────
function GradientText({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("relative inline-flex overflow-hidden bg-white dark:bg-black", className)}>
      {children}
      <span className="pointer-events-none absolute inset-0 mix-blend-lighten dark:mix-blend-darken">
        <span className="pointer-events-none absolute -top-1/2 h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-1_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-1))] mix-blend-overlay blur-[1rem]" />
        <span className="pointer-events-none absolute right-0 top-0 h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-2_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-2))] mix-blend-overlay blur-[1rem]" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-3_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-3))] mix-blend-overlay blur-[1rem]" />
        <span className="pointer-events-none absolute -bottom-1/2 right-0 h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-4_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-4))] mix-blend-overlay blur-[1rem]" />
      </span>
    </span>
  );
}

// ─── Scroll Gallery ────────────────────────────────────────────────────────────
interface ContainerScrollCtx { scrollYProgress: MotionValue<number> }
const ContainerScrollContext = React.createContext<ContainerScrollCtx | undefined>(undefined);

function useContainerScrollContext() {
  const ctx = React.useContext(ContainerScrollContext);
  if (!ctx) throw new Error("Must be used within ContainerScroll");
  return ctx;
}

function ContainerScroll({ children, className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative", className)}
        style={{ perspective: "1000px", perspectiveOrigin: "center top", transformStyle: "preserve-3d", ...style }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
}

function ContainerSticky({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("sticky left-0 top-0 w-full overflow-x-hidden", className)}
      style={{ perspective: "1000px", perspectiveOrigin: "center top", transformStyle: "preserve-3d", transformOrigin: "50% 50%", ...style }}
      {...props}
    />
  );
}

function GalleryContainer({ children, className, style, ...props }: React.HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">) {
  const { scrollYProgress } = useContainerScrollContext();
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.97, 1]);
  return (
    <motion.div
      className={cn("relative grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-2xl", className)}
      style={{ rotateX, scale, transformStyle: "preserve-3d", perspective: "1000px", ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const DEFAULT_Y_RANGE = ["0%", "-10%"] as const;

function GalleryCol({ className, style, yRange = DEFAULT_Y_RANGE as unknown as string[], ...props }: HTMLMotionProps<"div"> & { yRange?: string[] }) {
  const { scrollYProgress } = useContainerScrollContext();
  const y = useTransform(scrollYProgress, [0.5, 1], yRange);
  return (
    <motion.div
      className={cn("relative flex w-full flex-col gap-6", className)}
      style={{ y, ...style }}
      {...props}
    />
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
const projectGradients: Record<string, string> = {
  ticket:     "from-blue-600 via-cyan-500 to-teal-500",
  baby:       "from-pink-500 via-rose-400 to-fuchsia-500",
  skincare:   "from-teal-500 via-emerald-400 to-green-500",
  crypto:     "from-amber-500 via-yellow-400 to-orange-500",
  cloud:      "from-indigo-600 via-blue-500 to-cyan-500",
  sirius:     "from-rose-600 via-red-500 to-pink-500",
  wordbop:    "from-violet-600 via-purple-500 to-fuchsia-500",
  potionpop:  "from-emerald-600 via-green-500 to-teal-400",
  compliance: "from-slate-600 via-gray-500 to-zinc-500",
  radiant:    "from-rose-400 via-pink-400 to-fuchsia-400",
  calendar:   "from-sky-500 via-blue-500 to-indigo-500",
};

const projectIconMap: Record<string, React.ReactNode> = {
  ticket:     <Ticket className="w-14 h-14 text-white drop-shadow-lg" />,
  baby:       <Baby className="w-14 h-14 text-white drop-shadow-lg" />,
  skincare:   <Bath className="w-14 h-14 text-white drop-shadow-lg" />,
  crypto:     <Coins className="w-14 h-14 text-white drop-shadow-lg" />,
  cloud:      <Cloud className="w-14 h-14 text-white drop-shadow-lg" />,
  sirius:     <Heart className="w-14 h-14 text-white drop-shadow-lg" />,
  wordbop:    <Puzzle className="w-14 h-14 text-white drop-shadow-lg" />,
  potionpop:  <FlaskConical className="w-14 h-14 text-white drop-shadow-lg" />,
  compliance: <ShieldCheck className="w-14 h-14 text-white drop-shadow-lg" />,
  radiant:    <Sparkles className="w-14 h-14 text-white drop-shadow-lg" />,
  calendar:   <Calendar className="w-14 h-14 text-white drop-shadow-lg" />,
};

type Project = (typeof projectsData)[number] & { url?: string; image?: string };

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const gradient = projectGradients[project.icon] ?? "from-primary to-primary/60";
  const icon = projectIconMap[project.icon];
  const hasUrl = Boolean(project.url);
  const hasImage = Boolean(project.image);

  const cardContent = (
    <>
      {/* Banner */}
      <div className={`relative aspect-video overflow-hidden ${hasImage ? "bg-muted" : `bg-gradient-to-br ${gradient} flex items-center justify-center`}`}>
        {hasImage ? (
          <img
            src={project.image}
            alt={`${project.name} screenshot`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <motion.div whileHover={{ scale: 1.15 }} transition={{ duration: 0.6 }}>
            {icon}
          </motion.div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 right-4">
          <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        {hasUrl && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1 bg-white/90 dark:bg-black/80 text-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
              View Project ↗
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 space-y-3">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-sm font-medium text-muted-foreground">{project.domain}</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
          ))}
        </div>

        <div className="pt-2 border-t border-border flex flex-wrap gap-1">
          {project.testingType.map((type) => (
            <span key={type} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{type}</span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.04] rounded-2xl`} />
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {hasUrl ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-500 block cursor-pointer"
        >
          {cardContent}
        </a>
      ) : (
        <div className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-500">
          {cardContent}
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const splitProjects = useMemo(() => {
    const cols = 3;
    const result: Project[][] = Array.from({ length: cols }, () => []);
    projectsData.forEach((project, index) => result[index % cols].push(project));
    return result;
  }, []);

  return (
    <section id="projects" className="bg-background">
      <div className="container mx-auto px-6 pt-10 pb-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="h-px w-24 bg-primary mx-auto" />
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Featured <GradientText>Projects</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world QA projects showcasing automation frameworks, testing strategies, and quality engineering at scale.
          </p>
        </motion.div>
      </div>

      {/* Scroll Gallery — full bleed so sticky works correctly */}
      <ContainerScroll className="h-[350vh]">
        <ContainerSticky className="min-h-screen py-8">
          <GalleryContainer className="px-6 pb-16">
            <GalleryCol yRange={["-3%", "3%"]}>
              {splitProjects[0]?.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </GalleryCol>
            <GalleryCol yRange={["5%", "-5%"]} className="hidden md:flex">
              {splitProjects[1]?.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </GalleryCol>
            <GalleryCol yRange={["-3%", "3%"]} className="hidden lg:flex">
              {splitProjects[2]?.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  );
}
