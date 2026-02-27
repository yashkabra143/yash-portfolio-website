import { motion } from "framer-motion";
import { Ticket, Baby, Bath, Coins, Cloud, Filter, RotateCcw, Layers, Building2, Zap } from "lucide-react";
import { projectsData, projectFilters } from "@/lib/data";
import { useState, useEffect, Suspense } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProjectsAnimation from "./ProjectsAnimation";
import TiltCard from "./TiltCard";

export default function ProjectsSection() {
  const projectIcons = {
    "ticket": <Ticket className="text-4xl text-white" size={48} />,
    "baby": <Baby className="text-4xl text-white" size={48} />,
    "skincare": <Bath className="text-4xl text-white" size={48} />,
    "crypto": <Coins className="text-4xl text-white" size={48} />,
    "cloud": <Cloud className="text-4xl text-white" size={48} />
  };

  // State for filters
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [testingTypeFilter, setTestingTypeFilter] = useState("All Testing Types");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  
  // Apply filters whenever they change
  useEffect(() => {
    let result = projectsData;
    
    // Apply Category filter
    if (categoryFilter !== "All Categories") {
      result = result.filter(project => project.category === categoryFilter);
    }
    
    // Apply Industry filter
    if (industryFilter !== "All Industries") {
      result = result.filter(project => project.industry === industryFilter);
    }
    
    // Apply Testing Type filter (this is an array, so we need to check if it includes)
    if (testingTypeFilter !== "All Testing Types") {
      result = result.filter(project => project.testingType.includes(testingTypeFilter));
    }
    
    setFilteredProjects(result);
  }, [categoryFilter, industryFilter, testingTypeFilter]);

  // Reset all filters
  const resetFilters = () => {
    setCategoryFilter("All Categories");
    setIndustryFilter("All Industries");
    setTestingTypeFilter("All Testing Types");
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section divider */}
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-12"></div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-foreground"
        >
          Projects
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <Suspense fallback={<div className="h-72 flex items-center justify-center">Loading projects animation...</div>}>
            <ProjectsAnimation />
          </Suspense>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-5xl mx-auto mb-10"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl">
            {/* Animated background elements */}
            <motion.div
              className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Filter className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Filter Projects</h3>
                    <p className="text-sm text-muted-foreground">Refine by category, industry, or testing type</p>
                  </div>
                </div>

                {/* Active filters indicator */}
                {(categoryFilter !== "All Categories" || industryFilter !== "All Industries" || testingTypeFilter !== "All Testing Types") && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    Filters Active
                  </motion.div>
                )}
              </div>

              {/* Filters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {/* Category Filter */}
                <motion.div whileHover={{ y: -2 }} className="group">
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    Category
                  </label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-11 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg hover:border-primary/50 dark:hover:border-primary/50 transition-all group-hover:shadow-lg group-hover:shadow-primary/10">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectFilters.category.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Industry Filter */}
                <motion.div whileHover={{ y: -2 }} className="group">
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    Industry
                  </label>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="h-11 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg hover:border-primary/50 dark:hover:border-primary/50 transition-all group-hover:shadow-lg group-hover:shadow-primary/10">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectFilters.industry.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Testing Type Filter */}
                <motion.div whileHover={{ y: -2 }} className="group">
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Testing Type
                  </label>
                  <Select value={testingTypeFilter} onValueChange={setTestingTypeFilter}>
                    <SelectTrigger className="h-11 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg hover:border-primary/50 dark:hover:border-primary/50 transition-all group-hover:shadow-lg group-hover:shadow-primary/10">
                      <SelectValue placeholder="Select testing type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectFilters.testingType.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              {/* Reset Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={resetFilters}
                  className="w-full md:w-auto h-11 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset All Filters
                </Button>
              </motion.div>
            </div>
          </div>

          {/* No results message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <p className="text-lg text-muted-foreground">No projects match the selected filters.</p>
            </motion.div>
          )}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
            <TiltCard
              className="project-card glass-effect rounded-2xl overflow-hidden shadow-lg border border-primary/20 transition-all duration-300 group h-full"
              glowColor="rgba(116,185,255,0.35)"
              intensity={10}
            >
              <motion.div
                className="h-48 bg-gradient-to-br from-primary via-blue-500 to-accent flex items-center justify-center group-hover:shadow-inner transition-all duration-300"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {projectIcons[project.icon as keyof typeof projectIcons]}
              </motion.div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-muted-foreground mb-2">{project.domain}</p>
                <div className="mb-2">
                  <span className="text-xs font-medium text-muted-foreground/80 px-2 py-0.5 bg-muted/40 dark:bg-slate-700/40 rounded-full">
                    {project.industry}
                  </span>
                </div>
                <p className="text-muted-foreground dark:text-slate-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-1">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-muted dark:bg-slate-700 rounded text-xs font-medium text-muted-foreground dark:text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-border/20 dark:border-slate-700/20">
                  <div className="flex flex-wrap gap-1">
                    {project.testingType.map((type, idx) => (
                      <span key={idx} className="text-xs px-1.5 py-0.5 bg-primary/5 dark:bg-primary/10 text-primary/90 dark:text-primary/80 rounded">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
