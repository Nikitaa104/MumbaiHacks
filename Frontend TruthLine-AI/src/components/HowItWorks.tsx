import { FileText, Cpu, CheckCircle2, Bell } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Submit a Claim",
      description: "Enter any text, article, or statement you want to verify through our API or web interface."
    },
    {
      icon: Cpu,
      title: "AI Agent Analysis",
      description: "Multiple specialized agents analyze the claim, checking facts, sources, and context using Node.js and Express backend."
    },
    {
      icon: CheckCircle2,
      title: "Get Verification",
      description: "Receive a detailed verdict (TRUE/FALSE/PARTIAL) with confidence scores and supporting evidence from MongoDB."
    },
    {
      icon: Bell,
      title: "Track & Monitor",
      description: "Save verified claims to your dashboard and get alerts when similar misinformation appears."
    }
  ];
  
  return (
    <div className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our streamlined verification process leverages the full MERN stack for optimal performance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />
              )}
              
              <div className="relative bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 relative z-10">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-4 left-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">{index + 1}</span>
                  </div>
                  <h3 className="text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
