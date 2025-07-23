import { Button } from "@/components/ui/button";
import { Bot, Menu } from "lucide-react";
import { useLocation } from "wouter";

export default function Navigation() {
  const [, setLocation] = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-secondary-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setLocation("/")}>
            <Bot className="text-accent-gold w-8 h-8" />
            <span className="text-xl font-bold text-accent-gold">SmartFlow AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => {
                const element = document.getElementById('features');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setLocation("/#features");
                }
              }}
              className="text-neutral-gray hover:text-accent-gold transition-colors bg-transparent border-none cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('pricing');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setLocation("/#pricing");
                }
              }}
              className="text-neutral-gray hover:text-accent-gold transition-colors bg-transparent border-none cursor-pointer"
            >
              Pricing
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('marketplace');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setLocation("/#marketplace");
                }
              }}
              className="text-neutral-gray hover:text-accent-gold transition-colors bg-transparent border-none cursor-pointer"
            >
              Marketplace
            </button>
            <Button 
              onClick={() => setLocation("/dashboard")}
              className="bg-rich-brown text-gold-trim border border-accent-gold font-semibold hover:bg-accent-gold hover:text-primary-black transition-all"
            >
              Dashboard
            </Button>
          </div>
          <div className="md:hidden">
            <Menu className="text-accent-gold w-6 h-6" />
          </div>
        </div>
      </div>
    </nav>
  );
}
