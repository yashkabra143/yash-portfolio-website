import { motion } from "framer-motion";
import {
  Code2, Terminal, Globe, Layers, Bot, Server,
  Cog, GitBranch, Monitor, Database, Zap
} from "lucide-react";
import { skillsData } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Icon lookup by skill name
const skillIconMap: Record<string, React.ReactNode> = {
  Python:           <Terminal className="w-4 h-4" />,
  Java:             <Code2 className="w-4 h-4" />,
  JavaScript:       <Globe className="w-4 h-4" />,
  Selenium:         <Bot className="w-4 h-4" />,
  PyTest:           <Zap className="w-4 h-4" />,
  Behave:           <Layers className="w-4 h-4" />,
  Cucumber:         <Layers className="w-4 h-4" />,
  TestNG:           <Code2 className="w-4 h-4" />,
  Postman:          <Zap className="w-4 h-4" />,
  "REST Assured":   <Server className="w-4 h-4" />,
  "Python Requests":<Globe className="w-4 h-4" />,
  Jenkins:          <Cog className="w-4 h-4" />,
  "GitHub Actions": <GitBranch className="w-4 h-4" />,
  BrowserStack:     <Monitor className="w-4 h-4" />,
  LambdaTest:       <Monitor className="w-4 h-4" />,
  "Sauce Labs":     <Monitor className="w-4 h-4" />,
  MySQL:            <Database className="w-4 h-4" />,
  PostgreSQL:       <Database className="w-4 h-4" />,
};

// Category metadata
const categoryMeta: Record<string, { description: string; color: string; Icon: React.ElementType }> = {
  "Programming Languages": {
    description: "Core scripting languages for automation",
    color: "from-blue-500 to-cyan-500",
    Icon: Terminal,
  },
  "Automation Frameworks": {
    description: "End-to-end test automation suites",
    color: "from-violet-500 to-purple-500",
    Icon: Bot,
  },
  "API Testing": {
    description: "REST & API validation tools",
    color: "from-green-500 to-emerald-500",
    Icon: Server,
  },
  "CI/CD & DevOps": {
    description: "Pipeline automation and deployment",
    color: "from-orange-500 to-amber-500",
    Icon: Cog,
  },
  "Cloud & Virtualization": {
    description: "Cross-browser cloud testing platforms",
    color: "from-sky-500 to-indigo-500",
    Icon: Monitor,
  },
  Database: {
    description: "Database querying and management",
    color: "from-rose-500 to-pink-500",
    Icon: Database,
  },
};

const stats = [
  { value: "8+", label: "Years in QA", color: "text-blue-500", bg: "bg-blue-500/10" },
  { value: "5+", label: "Companies Served", color: "text-green-500", bg: "bg-green-500/10" },
  { value: "15+", label: "Technologies Mastered", color: "text-purple-500", bg: "bg-purple-500/10" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-10 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 space-y-3"
        >
          <div className="h-px w-24 bg-primary mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-foreground">Technical Skills</h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            A comprehensive overview of my technical capabilities and proficiency levels
            across QA automation, testing frameworks, and DevOps tools.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, categoryIndex) => {
            const meta = categoryMeta[skill.category] ?? {
              description: "",
              color: "from-primary to-primary/60",
              Icon: Code2,
            };
            const { description, color, Icon } = meta;

            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-border overflow-hidden h-full">
                  {/* Coloured top stripe */}
                  <div className={`h-1 bg-gradient-to-r ${color}`} />

                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {skill.category}
                    </CardTitle>
                    {description && (
                      <CardDescription className="text-xs">{description}</CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {skill.items.map((item, skillIndex) => (
                      <div key={skillIndex} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            {skillIconMap[item.name] ?? <Code2 className="w-4 h-4" />}
                            <span className="text-sm font-medium text-foreground">{item.name}</span>
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {item.proficiency}%
                          </span>
                        </div>
                        {/* Animated progress bar */}
                        <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: skillIndex * 0.07, ease: "easeOut" }}
                            className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, i) => (
            <Card key={i} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <Zap className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
