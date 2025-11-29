import { Button } from "./ui/button";
import { ArrowRight, Code2 } from "lucide-react";

export function CTA() {
  return (
    <div className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white mb-4">
          Ready to Combat Misinformation?
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of organizations using our MERN-powered platform to verify information 
          and protect against false claims. Get started with our API today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-slate-100"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            <Code2 className="w-5 h-5 mr-2" />
            View API Docs
          </Button>
        </div>
        
        <div className="mt-12 pt-12 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div>
              <div className="mb-2">MongoDB</div>
              <p className="text-blue-100">Scalable data storage for millions of verified claims</p>
            </div>
            <div>
              <div className="mb-2">Express & Node.js</div>
              <p className="text-blue-100">High-performance backend API for real-time verification</p>
            </div>
            <div>
              <div className="mb-2">React</div>
              <p className="text-blue-100">Modern, responsive interface for seamless user experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
