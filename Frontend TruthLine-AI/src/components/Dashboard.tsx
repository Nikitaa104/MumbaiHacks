import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Search,
  TrendingUp,
  BookmarkCheck,
  User,
  Settings,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Calendar,
  Eye,
  LogOut,
  Image as ImageIcon,
  Mail,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { FakeImageDetection } from "./FakeImageDetection";
import { EmailScanner } from "./EmailScanner";
import { MisinformationFeed } from "./MisinformationFeed";
import { UserProfileDetails } from "./UserProfileDetails";
import { ProfileSettings } from "./ProfileSettings";
import { HighlightGroup, HighlighterItem, Particles } from "./ui/highlighter";

interface AnalysisResult {
  verdict: "true" | "false" | "misleading" | "unverified";
  confidence: number;
  claim: string;
  explanation: string;
  sources: string[];
  timestamp: string;
}

interface TrendingClaim {
  id: string;
  claim: string;
  verdict: "true" | "false" | "misleading" | "unverified";
  confidence: number;
  explanation: string;
  views: number;
  date: string;
}

const verdictConfig = {
  true: {
    icon: CheckCircle2,
    label: "TRUE",
    color: "bg-[#00E676]", // Neon Green
    textColor: "text-[#00E676]",
    bgColor: "bg-[#00E676]/10",
    borderColor: "border-[#00E676]/30",
    gradient: "from-[#00E676]/10 to-[#00E676]/20",
  },
  false: {
    icon: XCircle,
    label: "FALSE",
    color: "bg-[#FF4444]", // Red
    textColor: "text-[#FF4444]",
    bgColor: "bg-[#FF4444]/10",
    borderColor: "border-[#FF4444]/30",
    gradient: "from-[#FF4444]/10 to-[#FF4444]/20",
  },
  misleading: {
    icon: AlertTriangle,
    label: "MISLEADING",
    color: "bg-[#FFA726]", // Orange
    textColor: "text-[#FFA726]",
    bgColor: "bg-[#FFA726]/10",
    borderColor: "border-[#FFA726]/30",
    gradient: "from-[#FFA726]/10 to-[#FFA726]/20",
  },
  unverified: {
    icon: HelpCircle,
    label: "UNVERIFIED",
    color: "bg-[#A3A3A3]", // Gray
    textColor: "text-[#A3A3A3]",
    bgColor: "bg-[#A3A3A3]/10",
    borderColor: "border-[#A3A3A3]/30",
    gradient: "from-[#A3A3A3]/10 to-[#A3A3A3]/20",
  },
};

// Sidebar component for reusability
function Sidebar({
  activeNav,
  setActiveNav,
}: {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "checker", label: "Fact Checker", icon: Search },
    { id: "imageDetection", label: "Image Detection", icon: ImageIcon },
    { id: "emailScanner", label: "Email Scanner", icon: Mail },
    { id: "feed", label: "Misinformation Feed", icon: TrendingUp },
    { id: "saved", label: "Saved Analyses", icon: BookmarkCheck },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-64 bg-[#0D0D0D] backdrop-blur-xl border-r border-[#1F1F1F] flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-[#1F1F1F]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#00E676] rounded-xl blur-lg opacity-50" />
            <div className="relative bg-[#00E676] p-2.5 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-[#000000]" />
            </div>
          </div>
          <div>
            <h1 className="text-[#F2F2F2]">TruthGuard AI</h1>
            <p className="text-xs text-[#A3A3A3]">Misinformation Detection</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <motion.button
              key={item.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? "bg-[#00E676]/10 text-[#F2F2F2] border-l-4 border-[#00E676]"
                  : "text-[#A3A3A3] hover:bg-[#121212] hover:text-[#F2F2F2]"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-all duration-300 ${
                  isActive ? "text-[#00E676] scale-110" : "group-hover:scale-110"
                }`}
              />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto"
                >
                  <Sparkles className="w-4 h-4 text-[#00E676]" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* User Profile */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="p-4 border-t border-[#1F1F1F]"
      >
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#121212] border border-[#1F1F1F]">
          <div className="w-10 h-10 rounded-full bg-[#00E676] flex items-center justify-center text-[#000000]">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#F2F2F2] truncate">John Doe</p>
            <p className="text-xs text-[#A3A3A3]">Premium User</p>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}

export function Dashboard({ onExit }: { onExit?: () => void }) {
  const [activeNav, setActiveNav] = useState("home");
  const [claimText, setClaimText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Show Fake Image Detection when activeNav is "imageDetection"
  if (activeNav === "imageDetection") {
    return <FakeImageDetection onBack={() => setActiveNav("home")} />;
  }

  // Show Email Scanner when activeNav is "emailScanner"
  if (activeNav === "emailScanner") {
    return <EmailScanner onBack={() => setActiveNav("home")} />;
  }

  // Show Misinformation Feed when activeNav is "feed"
  if (activeNav === "feed") {
    return (
      <div className="flex h-screen bg-[#0D0D0D] overflow-hidden">
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <main className="flex-1 overflow-y-auto bg-[#0D0D0D]">
          <MisinformationFeed />
        </main>
      </div>
    );
  }

  // Show User Profile Details when activeNav is "profile"
  if (activeNav === "profile") {
    return (
      <div className="flex h-screen bg-[#0D0D0D] overflow-hidden">
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <main className="flex-1 overflow-y-auto">
          <UserProfileDetails />
        </main>
      </div>
    );
  }

  // Show Profile Settings when activeNav is "settings"
  if (activeNav === "settings") {
    return (
      <div className="flex h-screen bg-[#0D0D0D] overflow-hidden">
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <main className="flex-1 overflow-y-auto">
          <ProfileSettings />
        </main>
      </div>
    );
  }

  const handleAnalyze = async () => {
    if (!claimText.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Mock result
    const verdicts: Array<"true" | "false" | "misleading" | "unverified"> = ["true", "false", "misleading", "unverified"];
    const randomVerdict = verdicts[Math.floor(Math.random() * verdicts.length)];
    
    setAnalysisResult({
      verdict: randomVerdict,
      confidence: Math.floor(Math.random() * 30) + 70,
      claim: claimText,
      explanation: "Based on cross-referencing 15+ reliable sources including fact-checking organizations, news databases, and verified scientific journals, this claim has been thoroughly analyzed.",
      sources: [
        "Reuters Fact Check",
        "Associated Press",
        "PolitiFact",
        "Snopes",
        "Science Direct"
      ],
      timestamp: new Date().toISOString(),
    });
    
    setIsAnalyzing(false);
  };

  const trendingClaims: TrendingClaim[] = [
    {
      id: "1",
      claim: "New study shows coffee consumption increases longevity by 15%",
      verdict: "misleading",
      confidence: 68,
      explanation: "Study sample size was limited and results were overstated in headlines",
      views: 12453,
      date: "2 hours ago",
    },
    {
      id: "2",
      claim: "Global temperatures have risen by 1.1°C since pre-industrial times",
      verdict: "true",
      confidence: 96,
      explanation: "Confirmed by multiple climate research organizations and peer-reviewed studies",
      views: 8721,
      date: "5 hours ago",
    },
    {
      id: "3",
      claim: "Vaccines contain microchips for tracking purposes",
      verdict: "false",
      confidence: 99,
      explanation: "No evidence supports this claim; debunked by medical experts worldwide",
      views: 15892,
      date: "1 day ago",
    },
    {
      id: "4",
      claim: "AI will replace 50% of jobs by 2030 according to recent report",
      verdict: "unverified",
      confidence: 45,
      explanation: "Conflicting predictions from different sources; needs more concrete data",
      views: 6234,
      date: "3 hours ago",
    },
  ];

  return (
    <div className="flex h-screen bg-[#0D0D0D] overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-[#F2F2F2]">Welcome back, John</h2>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-6 h-6 text-[#00E676]" />
                </motion.div>
              </div>
              <p className="text-[#A3A3A3]">Verify claims and combat misinformation with AI-powered analysis</p>
            </div>
            {onExit && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  onClick={onExit}
                  variant="outline"
                  className="gap-2 hover:bg-[#121212] border-[#1F1F1F] text-[000000] hover:text-[#F2F2F2] hover:border-[#00E676]/50"
                >
                  <LogOut className="w-4 h-4" />
                  Back to Home
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Primary Section - Claim Checker */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="relative overflow-hidden border-[#1F1F1F] hover:shadow-xl hover:shadow-[#00E676]/10 transition-all bg-[#121212]">
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#00E676] rounded-lg">
                    <Search className="w-5 h-5 text-[#000000]" />
                  </div>
                  <div>
                    <h3 className="text-[#F2F2F2]">Check a Claim</h3>
                    <p className="text-sm text-[#A3A3A3]">Paste text, headline or URL to verify</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Textarea
                      placeholder="Enter the claim you want to verify... (e.g., 'New study shows that...' or paste a URL)"
                      value={claimText}
                      onChange={(e) => setClaimText(e.target.value)}
                      className="min-h-[120px] resize-none border-[#1F1F1F] focus:border-[#00E676] focus:ring-[#00E676]/20 bg-[#0F0F0F] text-[#F2F2F2] placeholder:text-[#A3A3A3]"
                    />
                    {claimText && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3"
                      >
                        <Badge variant="secondary" className="bg-[#00E676]/20 text-[#00E676] border-[#00E676]/30">
                          {claimText.length} chars
                        </Badge>
                      </motion.div>
                    )}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      onClick={handleAnalyze}
                      disabled={!claimText.trim() || isAnalyzing}
                      className="w-full bg-[#00E676] hover:bg-[#00C853] text-[#000000] shadow-lg shadow-[#00E676]/30 transition-all duration-300"
                    >
                      {isAnalyzing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-[#000000]/30 border-t-[#000000] rounded-full mr-2"
                          />
                          Analyzing Truth...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5 mr-2" />
                          Analyze Truth
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>

                {/* Result Card */}
                <AnimatePresence mode="wait">
                  {analysisResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="mt-6"
                    >
                      <ResultCard result={analysisResult} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          {/* Secondary Section - Trending Claims */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#00E676] rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#000000]" />
                </div>
                <div>
                  <h3 className="text-[#F2F2F2]">Trending Claims & Misinformation Tracker</h3>
                  <p className="text-sm text-[#A3A3A3]">Recently analyzed claims by the community</p>
                </div>
              </div>
              <Button variant="outline" className="gap-2 border-[#1F1F1F] text-[#FFFFFF] hover:bg-[#121212] hover:border-[#00E676]/50">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HighlightGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6 col-span-full">
                {trendingClaims.map((claim, index) => (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <TrendingClaimCard claim={claim} />
                  </motion.div>
                ))}
              </HighlightGroup>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function ResultCard({ result }: { result: AnalysisResult }) {
  const config = verdictConfig[result.verdict];
  const Icon = config.icon;

  return (
    <Card className={`border-2 ${config.borderColor} overflow-hidden bg-[#121212]`}>
      <div className={`bg-gradient-to-r ${config.gradient} p-6 space-y-4`}>
        {/* Verdict Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${config.color} rounded-lg`}>
              <Icon className="w-6 h-6 text-[#000000]" />
            </div>
            <div>
              <Badge className={`${config.bgColor} ${config.textColor} border-0`}>
                {config.label}
              </Badge>
              <p className="text-sm text-[#A3A3A3] mt-1">Analysis complete</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl text-[#F2F2F2]">{result.confidence}%</div>
            <p className="text-xs text-[#A3A3A3]">Confidence</p>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#A3A3A3]">Confidence Score</span>
            <span className={config.textColor}>{result.confidence}%</span>
          </div>
          <Progress value={result.confidence} className="h-2" />
        </div>

        {/* Claim */}
        <div className="p-4 bg-[#0F0F0F] rounded-lg border border-[#1F1F1F]">
          <p className="text-sm text-[#A3A3A3] mb-1">Analyzed Claim:</p>
          <p className="text-[#F2F2F2]">{result.claim}</p>
        </div>

        {/* Explanation */}
        <div>
          <p className="text-sm text-[#A3A3A3] mb-2">Explanation:</p>
          <p className="text-[#F2F2F2]">{result.explanation}</p>
        </div>

        {/* Sources */}
        <div>
          <p className="text-sm text-[#A3A3A3] mb-2">Verified Sources:</p>
          <div className="flex flex-wrap gap-2">
            {result.sources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge variant="outline" className="gap-1 hover:bg-[#121212] transition-colors cursor-pointer border-[#1F1F1F] text-[#F2F2F2] hover:border-[#00E676]/50">
                  <ExternalLink className="w-3 h-3" />
                  {source}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 gap-2 border-[#1F1F1F] text-[#F2F2F2] hover:bg-[#121212] hover:border-[#00E676]/50">
            <BookmarkCheck className="w-4 h-4" />
            Save Analysis
          </Button>
          <Button className="flex-1 gap-2 bg-[#00E676] hover:bg-[#00C853] text-[#000000]">
            View Full Report
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function TrendingClaimCard({ claim }: { claim: TrendingClaim }) {
  const config = verdictConfig[claim.verdict];
  const Icon = config.icon;

  return (
    <HighlighterItem>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group h-full"
      >
        <Card className="relative overflow-hidden border-[#1F1F1F] hover:shadow-xl hover:shadow-[#00E676]/20 transition-all duration-300 h-full bg-[#121212]">
          <Particles
            className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            quantity={100}
            color={"#00E676"}
            vy={-0.1}
          />
          <div className="relative p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <Badge className={`${config.bgColor} ${config.textColor} border-0 gap-1`}>
                <Icon className="w-3 h-3" />
                {config.label}
              </Badge>
              <div className="flex items-center gap-3 text-xs text-[#A3A3A3]">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {claim.views.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {claim.date}
                </div>
              </div>
            </div>

            {/* Claim Text */}
            <p className="text-[#F2F2F2] line-clamp-2 min-h-[3rem]">{claim.claim}</p>

            {/* Confidence Score */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#A3A3A3]">Confidence</span>
                <span className={config.textColor}>{claim.confidence}%</span>
              </div>
              <div className="relative">
                <Progress value={claim.confidence} className="h-2" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${claim.confidence}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`absolute top-0 left-0 h-2 ${config.color} rounded-full opacity-50`}
                />
              </div>
            </div>

            {/* Explanation */}
            <p className="text-sm text-[#A3A3A3] line-clamp-2">{claim.explanation}</p>

            {/* Action Button */}
            <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <Button variant="ghost" className="w-full justify-between group-hover:bg-[#0F0F0F] text-[#F2F2F2]">
                View Full Breakdown
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </HighlighterItem>
  );
}