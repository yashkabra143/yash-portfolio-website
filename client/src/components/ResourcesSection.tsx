import { motion } from "framer-motion";
import { File, FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceItem {
  id: number;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  fileType: "document" | "spreadsheet" | "pdf";
  downloadable: boolean;
}

const resourcesData: ResourceItem[] = [
  {
    id: 1,
    title: "QA Bug Report Template",
    description: "A comprehensive bug report template for effective issue tracking and resolution.",
    fileName: "QA_Bug_Report_Template.xlsx",
    fileUrl: "/downloads/bug_report.xlsx",
    fileType: "spreadsheet",
    downloadable: true
  },
  {
    id: 2,
    title: "Test Case Documentation Template",
    description: "Structured template for creating detailed test cases with expected results and steps.",
    fileName: "Test_Case_Template.xlsx",
    fileUrl: "/downloads/test_cases_report.xlsx",
    fileType: "spreadsheet",
    downloadable: true
  },
  {
    id: 3,
    title: "Mobile App Testing Checklist",
    description: "Comprehensive checklist for testing mobile applications across different platforms and devices.",
    fileName: "Mobile_Testing_Checklist.pdf",
    fileUrl: "/downloads/Mobile_Testing_Checklist.pdf",
    fileType: "pdf",
    downloadable: true
  }
];

export default function ResourcesSection() {
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "document":
        return <FileText className="h-10 w-10 text-blue-500" />;
      case "spreadsheet":
        return <FileText className="h-10 w-10 text-green-500" />;
      case "pdf":
        return <File className="h-10 w-10 text-red-500" />;
      default:
        return <File className="h-10 w-10 text-gray-500" />;
    }
  };

  return (
    <section id="resources" className="py-16 bg-background dark:bg-background">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold font-poppins text-center mb-4 text-foreground"
        >
          QA Resources
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
        >
          Download free QA testing templates and resources that I've created
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {resourcesData.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * resource.id }}
              className="bg-card dark:bg-slate-800 rounded-xl shadow-md p-6 border border-border/40 dark:border-slate-700/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="mr-4">
                    {getFileIcon(resource.fileType)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-muted-foreground/80 flex items-center">
                  <File className="h-3.5 w-3.5 mr-1" />
                  <span>{resource.fileName}</span>
                </div>
              </div>
              
              <div className="mt-6 flex">
                {resource.downloadable ? (
                  <Button 
                    variant="default" 
                    className="w-full" 
                    size="sm"
                    asChild
                  >
                    <a href={resource.fileUrl} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    asChild
                  >
                    <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Resource
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-muted-foreground">
            These resources are free to use for personal and professional projects.
            <br />
            If you find them helpful, please consider sharing my portfolio with others.
          </p>
        </motion.div>
      </div>
    </section>
  );
}