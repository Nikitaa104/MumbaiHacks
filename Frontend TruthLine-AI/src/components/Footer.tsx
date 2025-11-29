import { Shield } from "lucide-react";

export function Footer() {
  const links = {
    product: [
      { label: "Features", href: "#" },
      { label: "How It Works", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "API Documentation", href: "#" }
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" }
    ],
    resources: [
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Research Papers", href: "#" }
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
      { label: "Compliance", href: "#" }
    ]
  };
  
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-white mb-4">
              <Shield className="w-6 h-6 text-blue-500" />
              <span>VerifyAI</span>
            </div>
            <p className="text-slate-400">
              Combating misinformation with intelligent AI verification.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <div className="text-white mb-4">Product</div>
            <ul className="space-y-2">
              {links.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="text-white mb-4">Company</div>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="text-white mb-4">Resources</div>
            <ul className="space-y-2">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="text-white mb-4">Legal</div>
            <ul className="space-y-2">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400">
            © 2025 VerifyAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
