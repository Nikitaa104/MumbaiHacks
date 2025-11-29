import { Button } from "./ui/button";
import { ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "motion/react";
import { AuroraBackground } from "./ui/aurora-background";

export function Hero({ onDashboardClick }: { onDashboardClick?: () => void }) {
  const { isAuthenticated } = useAuth();
  
  const scrollToDemo = () => {
    if (isAuthenticated && onDashboardClick) {
      onDashboardClick();
    } else {
      const demoSection = document.getElementById('demo-section');
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <AuroraBackground className="relative overflow-hidden h-auto min-h-[90vh]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32"
      >
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Advanced AI Agents</span>
          </div>
          
          {/* Main heading */}
          <h1 className="max-w-4xl mx-auto mb-6">
            <span className="block text-slate-900">
              Combat Misinformation with
            </span>
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Agentic AI Verification
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-slate-600 mb-10">
            Our intelligent AI agents analyze, fact-check, and verify information in real-time. 
            Get instant verdicts on the truthfulness of any claim with comprehensive source verification.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={scrollToDemo}>
              <ShieldCheck className="w-5 h-5 mr-2" />
              {isAuthenticated ? 'Try Demo' : 'View Demo'}
            </Button>
            <Button size="lg" variant="outline" onClick={() => {
              const featuresSection = document.getElementById('features');
              if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              Learn More
            </Button>
          </div>
          
          {/* Hero Image/Illustration */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatusCard 
                    status="verified" 
                    title="TRUE" 
                    description="Claim verified across 15 sources"
                  />
                  <StatusCard 
                    status="false" 
                    title="FALSE" 
                    description="Contradicted by reliable sources"
                  />
                  <StatusCard 
                    status="partial" 
                    title="PARTIAL" 
                    description="Partially accurate, needs context"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

function StatusCard({ status, title, description }: { status: string; title: string; description: string }) {
  const colors = {
    verified: "bg-green-100 text-green-700 border-green-300",
    false: "bg-red-100 text-red-700 border-red-300",
    partial: "bg-yellow-100 text-yellow-700 border-yellow-300"
  };
  
  return (
    <div className={`${colors[status as keyof typeof colors]} border-2 rounded-lg p-4`}>
      <div className="mb-2">{title}</div>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
}