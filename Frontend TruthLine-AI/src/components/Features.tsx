import { Brain, Search, Network, BarChart3, Clock, Lock } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "Multi-Agent AI System",
      description: "Specialized AI agents work together to analyze claims from multiple angles, ensuring comprehensive verification."
    },
    {
      icon: Search,
      title: "Source Verification",
      description: "Cross-references information against thousands of reliable databases and fact-checking organizations."
    },
    {
      icon: Network,
      title: "Contextual Analysis",
      description: "Understands nuance and context to provide accurate verdicts beyond simple true/false classifications."
    },
    {
      icon: BarChart3,
      title: "Confidence Scoring",
      description: "Provides detailed confidence metrics and evidence breakdown for every verification."
    },
    {
      icon: Clock,
      title: "Real-Time Detection",
      description: "Instant analysis and verification of claims as they emerge, staying ahead of misinformation spread."
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Enterprise-grade security with MongoDB encryption, ensuring your data remains protected."
    }
  ];
  
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-slate-900 mb-4">
            Powered by Advanced AI Technology
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our MERN-based platform combines cutting-edge AI agents with robust backend infrastructure 
            to deliver unparalleled misinformation detection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative min-h-[16rem]"
            >
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-200 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-white p-6 shadow-sm">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border-[0.75px] border-slate-200 bg-blue-50 p-2">
                      <feature.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-slate-900">{feature.title}</h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}