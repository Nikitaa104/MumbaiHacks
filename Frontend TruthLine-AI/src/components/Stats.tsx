import { CheckCircle2, Shield, Database, Zap } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: CheckCircle2,
      value: "99.2%",
      label: "Accuracy Rate",
      color: "text-green-600"
    },
    {
      icon: Shield,
      value: "10M+",
      label: "Claims Verified",
      color: "text-blue-600"
    },
    {
      icon: Database,
      value: "500K+",
      label: "Trusted Sources",
      color: "text-purple-600"
    },
    {
      icon: Zap,
      value: "<2s",
      label: "Avg Response Time",
      color: "text-orange-600"
    }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-3">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="text-slate-900 mb-1">{stat.value}</div>
            <div className="text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
