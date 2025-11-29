import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Eye,
  Calendar,
  MessageSquare,
  Share2,
  Bookmark,
  Filter,
  Search,
  Sparkles,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";

interface FeedItem {
  id: string;
  claim: string;
  verdict: "true" | "false" | "misleading" | "unverified";
  confidence: number;
  explanation: string;
  category: string;
  views: number;
  comments: number;
  shares: number;
  likes: number;
  date: string;
  source: string;
  trending: boolean;
}

const verdictConfig = {
  true: {
    icon: CheckCircle2,
    label: "TRUE",
    color: "bg-[#00E676]",
    textColor: "text-[#00E676]",
    bgColor: "bg-[#00E676]/10",
    borderColor: "border-[#00E676]/30",
  },
  false: {
    icon: XCircle,
    label: "FALSE",
    color: "bg-[#FF4444]",
    textColor: "text-[#FF4444]",
    bgColor: "bg-[#FF4444]/10",
    borderColor: "border-[#FF4444]/30",
  },
  misleading: {
    icon: AlertTriangle,
    label: "MISLEADING",
    color: "bg-[#FFA726]",
    textColor: "text-[#FFA726]",
    bgColor: "bg-[#FFA726]/10",
    borderColor: "border-[#FFA726]/30",
  },
  unverified: {
    icon: HelpCircle,
    label: "UNVERIFIED",
    color: "bg-[#A3A3A3]",
    textColor: "text-[#A3A3A3]",
    bgColor: "bg-[#A3A3A3]/10",
    borderColor: "border-[#A3A3A3]/30",
  },
};

export function MisinformationFeed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const feedItems: FeedItem[] = [
    {
      id: "1",
      claim: "New study shows coffee consumption increases longevity by 15%",
      verdict: "misleading",
      confidence: 68,
      explanation: "Study sample size was limited and results were overstated in headlines. Actual increase is closer to 3-5% in specific populations.",
      category: "Health",
      views: 12453,
      comments: 234,
      shares: 89,
      likes: 567,
      date: "2 hours ago",
      source: "Social Media",
      trending: true,
    },
    {
      id: "2",
      claim: "Global temperatures have risen by 1.1°C since pre-industrial times",
      verdict: "true",
      confidence: 96,
      explanation: "Confirmed by multiple climate research organizations including NASA, NOAA, and peer-reviewed studies.",
      category: "Climate",
      views: 8721,
      comments: 156,
      shares: 234,
      likes: 892,
      date: "5 hours ago",
      source: "News Article",
      trending: true,
    },
    {
      id: "3",
      claim: "Vaccines contain microchips for tracking purposes",
      verdict: "false",
      confidence: 99,
      explanation: "No evidence supports this claim. Debunked by medical experts, fact-checkers, and vaccine manufacturers worldwide.",
      category: "Health",
      views: 15892,
      comments: 432,
      shares: 123,
      likes: 234,
      date: "1 day ago",
      source: "Social Media",
      trending: true,
    },
    {
      id: "4",
      claim: "AI will replace 50% of jobs by 2030 according to recent report",
      verdict: "unverified",
      confidence: 45,
      explanation: "Conflicting predictions from different sources. Estimates range from 20% to 60% depending on methodology and assumptions.",
      category: "Technology",
      views: 6234,
      comments: 187,
      shares: 45,
      likes: 312,
      date: "3 hours ago",
      source: "Blog Post",
      trending: false,
    },
    {
      id: "5",
      claim: "Eating organic food prevents all types of cancer",
      verdict: "false",
      confidence: 92,
      explanation: "While organic foods may have health benefits, no scientific evidence supports the claim that they prevent all cancers.",
      category: "Health",
      views: 9456,
      comments: 278,
      shares: 67,
      likes: 445,
      date: "6 hours ago",
      source: "Advertisement",
      trending: false,
    },
    {
      id: "6",
      claim: "Electric vehicles produce more emissions than gasoline cars when accounting for battery production",
      verdict: "misleading",
      confidence: 74,
      explanation: "While battery production does have emissions, lifecycle analysis shows EVs still produce significantly fewer emissions overall.",
      category: "Environment",
      views: 7892,
      comments: 345,
      shares: 156,
      likes: 523,
      date: "8 hours ago",
      source: "News Article",
      trending: false,
    },
  ];

  const filteredItems = feedItems.filter((item) => {
    const matchesSearch = item.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || item.verdict === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
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
            <div className="p-2 bg-[#00E676] rounded-lg">
              <TrendingUp className="w-6 h-6 text-[#000000]" />
            </div>
            <h2 className="text-[#F2F2F2]">Misinformation Feed</h2>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-6 h-6 text-[#00E676]" />
            </motion.div>
          </div>
          <p className="text-[#A3A3A3]">
            Real-time feed of analyzed claims and misinformation from across the web
          </p>
        </div>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card className="border-[#1F1F1F] bg-[#121212]">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3]" />
                <Input
                  placeholder="Search claims or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#1F1F1F] focus:border-[#00E676] focus:ring-[#00E676]/20 bg-[#0F0F0F] text-[#F2F2F2] placeholder:text-[#A3A3A3]"
                />
              </div>

              {/* Filter Tabs */}
              <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-5 bg-[#0F0F0F]">
                  <TabsTrigger value="all" className="text-[#A3A3A3] data-[state=active]:bg-[#00E676]/10 data-[state=active]:text-[#00E676]">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="true" className="text-[#A3A3A3] data-[state=active]:bg-[#00E676]/10 data-[state=active]:text-[#00E676]">
                    True
                  </TabsTrigger>
                  <TabsTrigger value="false" className="text-[#A3A3A3] data-[state=active]:bg-[#FF4444]/10 data-[state=active]:text-[#FF4444]">
                    False
                  </TabsTrigger>
                  <TabsTrigger value="misleading" className="text-[#A3A3A3] data-[state=active]:bg-[#FFA726]/10 data-[state=active]:text-[#FFA726]">
                    Misleading
                  </TabsTrigger>
                  <TabsTrigger value="unverified" className="text-[#A3A3A3] data-[state=active]:bg-[#A3A3A3]/10 data-[state=active]:text-[#A3A3A3]">
                    Unverified
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <StatCard label="Total Claims" value="1,247" icon={MessageSquare} />
        <StatCard label="Trending Now" value="23" icon={TrendingUp} />
        <StatCard label="Total Views" value="156K" icon={Eye} />
        <StatCard label="Active Users" value="8.9K" icon={CheckCircle2} />
      </motion.div>

      {/* Feed Items */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="space-y-4"
      >
        {filteredItems.length === 0 ? (
          <Card className="border-[#1F1F1F] bg-[#121212]">
            <div className="p-12 text-center">
              <Search className="w-16 h-16 text-[#A3A3A3] mx-auto mb-4" />
              <p className="text-[#F2F2F2] mb-2">No claims found</p>
              <p className="text-[#A3A3A3]">Try adjusting your search or filter</p>
            </div>
          </Card>
        ) : (
          filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
            >
              <FeedCard item={item} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <Card className="border-[#1F1F1F] bg-[#121212] hover:border-[#00E676]/30 transition-all">
      <div className="p-4 flex items-center gap-3">
        <div className="p-2 bg-[#00E676]/10 rounded-lg">
          <Icon className="w-5 h-5 text-[#00E676]" />
        </div>
        <div>
          <p className="text-2xl text-[#F2F2F2]">{value}</p>
          <p className="text-xs text-[#A3A3A3]">{label}</p>
        </div>
      </div>
    </Card>
  );
}

function FeedCard({ item }: { item: FeedItem }) {
  const config = verdictConfig[item.verdict];
  const Icon = config.icon;

  return (
    <Card className={`border-[#1F1F1F] hover:border-[#00E676]/30 bg-[#121212] transition-all group`}>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={`p-2 ${config.color} rounded-lg flex-shrink-0`}>
              <Icon className="w-5 h-5 text-[#000000]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge className={`${config.bgColor} ${config.textColor} border-0`}>
                  {config.label}
                </Badge>
                <Badge variant="outline" className="border-[#1F1F1F] text-[#A3A3A3]">
                  {item.category}
                </Badge>
                {item.trending && (
                  <Badge className="bg-[#00E676]/10 text-[#00E676] border-0 gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </Badge>
                )}
              </div>
              <p className="text-[#F2F2F2] mb-2 line-clamp-2">{item.claim}</p>
              <p className="text-sm text-[#A3A3A3] line-clamp-2">{item.explanation}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl text-[#F2F2F2]">{item.confidence}%</p>
            <p className="text-xs text-[#A3A3A3]">Confidence</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={item.confidence} className="h-2" />
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-[#A3A3A3]">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {item.date}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {item.views.toLocaleString()} views
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            {item.comments} comments
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="w-3 h-3" />
            {item.shares} shares
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#1F1F1F]">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2 text-[#A3A3A3] hover:text-[#F2F2F2] hover:bg-[#0F0F0F]"
          >
            <ThumbsUp className="w-4 h-4" />
            {item.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2 text-[#A3A3A3] hover:text-[#F2F2F2] hover:bg-[#0F0F0F]"
          >
            <MessageSquare className="w-4 h-4" />
            Comment
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2 text-[#A3A3A3] hover:text-[#F2F2F2] hover:bg-[#0F0F0F]"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-[#A3A3A3] hover:text-[#00E676] hover:bg-[#00E676]/10"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-[#00E676] hover:bg-[#00E676]/10"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
