import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateWelcomeMessage } from '@/services/aiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function WelcomeGenerator() {
  const [visitorName, setVisitorName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [industry, setIndustry] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!visitorName.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter your name to generate a welcome message.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const message = await generateWelcomeMessage(
        visitorName,
        companyName,
        position,
        industry
      );
      setWelcomeMessage(message);
    } catch (error) {
      console.error('Error generating message:', error);
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate a welcome message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-card dark:bg-slate-800 rounded-xl shadow-sm max-w-lg mx-auto"
    >
      <h3 className="text-xl font-semibold mb-4 text-foreground text-center">
        Personalized Welcome Message Generator
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="visitorName" className="text-foreground">Name *</Label>
          <Input
            id="visitorName"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            placeholder="Your name"
            className="bg-background border-input focus:ring-primary"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-foreground">Company</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Your company name"
            className="bg-background border-input focus:ring-primary"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position" className="text-foreground">Position</Label>
            <Input
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Your job title"
              className="bg-background border-input focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-foreground">Industry</Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Your industry"
              className="bg-background border-input focus:ring-primary"
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary text-white hover:bg-primary/90 relative"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="mr-2 animate-pulse">Generating</span>
              <span className="absolute right-1/2 transform translate-x-16">
                <span className="animate-bounce inline-block mx-px h-1 w-1 bg-white rounded-full"></span>
                <span className="animate-bounce inline-block mx-px h-1 w-1 bg-white rounded-full animation-delay-200"></span>
                <span className="animate-bounce inline-block mx-px h-1 w-1 bg-white rounded-full animation-delay-500"></span>
              </span>
            </>
          ) : 'Generate Welcome Message'}
        </Button>
      </form>
      
      {welcomeMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-6 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20 shadow-sm"
        >
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Your Personalized Welcome:</h4>
          <p className="text-foreground font-medium text-lg leading-relaxed">{welcomeMessage}</p>
          <div className="mt-4 text-right text-xs text-muted-foreground">
            <span>Generated by Google's Gemini AI</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
