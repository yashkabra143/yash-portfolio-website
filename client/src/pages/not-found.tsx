import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    // Add page title for SEO
    document.title = "Page Not Found | Yash Kabra Portfolio";
  }, []);
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background dark:bg-gray-900">
      <Card className="w-full max-w-md mx-4 border-primary/20 bg-card dark:bg-slate-800 dark:border-slate-700/40">
        <CardContent className="pt-8 pb-8 px-6">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-14 w-14 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">404 Page Not Found</h1>
            <p className="text-muted-foreground">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              variant="default" 
              className="flex-1"
              onClick={() => setLocation("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
