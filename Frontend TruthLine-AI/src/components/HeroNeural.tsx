import NeuralNetworkHero from "./ui/neural-network-hero";
import { useAuth } from "../contexts/AuthContext";
import { ShieldCheck } from "lucide-react";

export function HeroNeural() {
  const { isAuthenticated } = useAuth();
  
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <NeuralNetworkHero
      title="Combat Misinformation with AI-Powered Verification"
      description="Our intelligent AI agents analyze, fact-check, and verify information in real-time. Get instant verdicts on the truthfulness of any claim with comprehensive source verification."
      badgeText="Powered by Advanced AI Agents"
      badgeLabel="NEW"
      ctaButtons={[
        { 
          text: isAuthenticated ? "Try Live Demo" : "View Demo", 
          href: "#demo", 
          primary: true,
          onClick: scrollToDemo
        },
        { 
          text: "Explore Features", 
          href: "#features",
          onClick: scrollToFeatures
        }
      ]}
      microDetails={["Real-time Analysis", "Multi-source Verification", "MERN Stack"]}
    />
  );
}
