import { motion } from "framer-motion";
import { Share2, Linkedin, Facebook, Twitter, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SocialShareButtons() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const portfolioTitle = "Yash Kabra | QA Engineer Portfolio";
  const portfolioDescription = "Check out Yash Kabra's QA Engineering portfolio showcasing testing expertise and projects!";
  
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4 mr-2" />,
      color: "bg-[#0077B5] hover:bg-[#0077B5]/90",
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4 mr-2" />,
      color: "bg-[#1877F2] hover:bg-[#1877F2]/90",
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4 mr-2" />,
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(portfolioTitle + " - " + portfolioDescription)}&url=${encodeURIComponent(currentUrl)}`
    }
  ];
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Portfolio URL copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-12 mb-6 text-center"
    >
      <div className="inline-flex items-center mb-4 text-muted-foreground">
        <Share2 className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">Share this portfolio</span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {socialLinks.map((socialLink, index) => (
          <Button 
            key={index}
            size="sm"
            className={`${socialLink.color} text-white`}
            onClick={() => window.open(socialLink.shareUrl, '_blank')}
          >
            {socialLink.icon}
            {socialLink.name}
          </Button>
        ))}
        
        <Button 
          size="sm"
          variant="outline"
          onClick={copyToClipboard}
          className="border-primary text-primary hover:bg-primary/10"
        >
          <Link className="h-4 w-4 mr-2" />
          {copied ? "Copied!" : "Copy URL"}
        </Button>
      </div>
    </motion.div>
  );
}