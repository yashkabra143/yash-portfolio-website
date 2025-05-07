import { Github, Linkedin, Briefcase } from "lucide-react";
import SocialShareButtons from "./SocialShareButtons";

export default function Footer() {
  return (
    <footer className="bg-[#2D3436] text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Yash <span className="text-[#74B9FF]">Kabra</span></h2>
            <p className="text-gray-400">Senior Quality Assurance Engineer</p>
          </div>
          <div className="flex space-x-4">
            <a 
              href="https://www.linkedin.com/in/yashkabra143/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#74B9FF] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://github.com/yashkabra143" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#74B9FF] transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.upwork.com/freelancers/~01125d841102f61285" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#74B9FF] transition-colors"
              aria-label="Upwork Profile"
            >
              <Briefcase size={20} />
            </a>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        
        <div className="py-4 flex justify-center">
          <SocialShareButtons />
        </div>
        
        <p className="text-center text-gray-400">© {new Date().getFullYear()} Yash Kabra. All rights reserved.</p>
        <p className="text-center text-gray-500 text-xs mt-2">Last updated: May 2025</p>
      </div>
    </footer>
  );
}
