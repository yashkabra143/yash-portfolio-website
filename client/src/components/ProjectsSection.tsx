import { motion } from "framer-motion";
import { Ticket, Baby, Bath, Coins, Cloud, Filter } from "lucide-react";
import { projectsData, projectFilters } from "@/lib/data";
import { useState, useEffect, Suspense } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProjectsAnimation from "./ProjectsAnimation";

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
    <section id="projects" className="py-16 bg-muted dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold font-poppins text-center mb-6 text-foreground"
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
          className="max-w-5xl mx-auto mb-10 p-4 bg-card dark:bg-slate-800 rounded-xl shadow-sm border border-border/40 dark:border-slate-700/40"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2 md:mb-0">
              <Filter size={16} />
              <span>Filter Projects:</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {projectFilters.category.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  {projectFilters.industry.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={testingTypeFilter} onValueChange={setTestingTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Testing Type" />
                </SelectTrigger>
                <SelectContent>
                  {projectFilters.testingType.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFilters}
              className="md:ml-2 whitespace-nowrap"
            >
              Reset Filters
            </Button>
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              <p>No projects match the selected filters.</p>
            </div>
          )}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" 
              }}
              className="project-card bg-card dark:bg-slate-800 text-card-foreground rounded-xl overflow-hidden shadow-sm transition-all duration-300"
            >
              <motion.div 
                className="h-48 bg-gradient-to-r from-[#0984E3] to-[#74B9FF] flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
