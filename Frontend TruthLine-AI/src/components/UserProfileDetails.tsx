import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Award,
  Eye,
  Clock,
  Activity,
  Sparkles,
  ChevronRight,
  Globe,
  Navigation,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SimpleMap } from "./ui/simple-map";

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  joinDate: string;
  lastActive: string;
  verifiedTexts: number;
  accuracyRate: number;
  trustScore: string;
  timezone: string;
  country: string;
}

interface ActivityItem {
  id: string;
  type: "verification" | "achievement" | "login";
  description: string;
  timestamp: string;
  icon: any;
  color: string;
}

export function UserProfileDetails() {
  const [userData] = useState<UserData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, California",
    coordinates: [37.7749, -122.4194], // San Francisco coordinates
    joinDate: "2023-06-15",
    lastActive: new Date().toISOString(),
    verifiedTexts: 1247,
    accuracyRate: 94,
    trustScore: "Excellent",
    timezone: "PST (UTC-8)",
    country: "United States",
  });

  const [recentActivity] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "verification",
      description: "Verified claim about climate change statistics",
      timestamp: "2 hours ago",
      icon: ShieldCheck,
      color: "text-[#00E676]",
    },
    {
      id: "2",
      type: "achievement",
      description: "Reached 1,000 verifications milestone",
      timestamp: "1 day ago",
      icon: Award,
      color: "text-[#FFA726]",
    },
    {
      id: "3",
      type: "verification",
      description: "Analyzed image authenticity",
      timestamp: "2 days ago",
      icon: Eye,
      color: "text-[#00E676]",
    },
    {
      id: "4",
      type: "login",
      description: "Logged in from new device",
      timestamp: "3 days ago",
      icon: Activity,
      color: "text-[#A3A3A3]",
    },
  ]);

  const stats = [
    {
      icon: ShieldCheck,
      label: "Texts Verified",
      value: userData.verifiedTexts.toLocaleString(),
      color: "bg-[#00E676]",
      textColor: "text-[#00E676]",
      bgColor: "bg-[#00E676]/10",
    },
    {
      icon: TrendingUp,
      label: "Accuracy Rate",
      value: `${userData.accuracyRate}%`,
      color: "bg-[#00E676]",
      textColor: "text-[#00E676]",
      bgColor: "bg-[#00E676]/10",
    },
    {
      icon: Award,
      label: "Trust Score",
      value: userData.trustScore,
      color: "bg-[#00E676]",
      textColor: "text-[#00E676]",
      bgColor: "bg-[#00E676]/10",
    },
    {
      icon: Clock,
      label: "Member Since",
      value: new Date(userData.joinDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      color: "bg-[#00E676]",
      textColor: "text-[#00E676]",
      bgColor: "bg-[#00E676]/10",
    },
  ];

  // Map markers for user location
  const mapMarkers = [
    {
      id: 1,
      position: userData.coordinates,
      color: "green",
      size: "large",
      popup: {
        title: userData.location,
        content: `${userData.name}'s registered location`,
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 bg-[#0D0D0D]">
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
              <User className="w-6 h-6 text-[#000000]" />
            </div>
            <h2 className="text-[#F2F2F2]">User Profile</h2>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-6 h-6 text-[#00E676]" />
            </motion.div>
          </div>
          <p className="text-[#A3A3A3]">
            Complete profile overview and location information
          </p>
        </div>
      </motion.div>

      {/* Profile Header Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card className="relative overflow-hidden border-[#1F1F1F] hover:shadow-xl hover:shadow-[#00E676]/10 transition-all bg-[#121212]">
          <div className="relative p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[#00E676] rounded-2xl blur-xl opacity-70" />
                <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-[#00E676] to-[#00C853] flex items-center justify-center text-4xl text-[#000000]">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </motion.div>

              {/* User Info */}
              <div className="flex-1">
                <h3 className="text-[#F2F2F2] mb-2">{userData.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[#A3A3A3]">
                    <Mail className="w-4 h-4 text-[#00E676]" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A3A3A3]">
                    <Phone className="w-4 h-4 text-[#00E676]" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A3A3A3]">
                    <MapPin className="w-4 h-4 text-[#00E676]" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A3A3A3]">
                    <Globe className="w-4 h-4 text-[#00E676]" />
                    <span>{userData.timezone}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#00E676]/20 text-[#00E676] border-[#00E676]/30">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Verified User
                  </Badge>
                  <Badge className="bg-[#00E676]/20 text-[#00E676] border-[#00E676]/30">
                    <Award className="w-3 h-3 mr-1" />
                    Premium Member
                  </Badge>
                  <Badge className="bg-[#00E676]/20 text-[#00E676] border-[#00E676]/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Top Contributor
                  </Badge>
                </div>
              </div>

              {/* Last Active */}
              <div className="text-right">
                <p className="text-sm text-[#A3A3A3] mb-1">Last Active</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00E676] rounded-full animate-pulse" />
                  <p className="text-[#F2F2F2]">Online Now</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            >
              <Card className="relative overflow-hidden border-[#1F1F1F] hover:shadow-xl hover:shadow-[#00E676]/20 transition-all duration-300 bg-[#121212]">
                <div className="relative p-6 space-y-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-[#000000]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#A3A3A3]">{stat.label}</p>
                    <p className={`text-2xl ${stat.textColor} mt-1`}>
                      {stat.value}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Location Map and Account Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Location Map */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="relative overflow-hidden border-[#1F1F1F] hover:shadow-xl hover:shadow-[#00E676]/10 transition-all bg-[#121212]">
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#00E676] rounded-lg">
                  <Navigation className="w-5 h-5 text-[#000000]" />
                </div>
                <div>
                  <h3 className="text-[#F2F2F2]">Location</h3>
                  <p className="text-sm text-[#A3A3A3]">
                    Your current registered location
                  </p>
                </div>
              </div>

              {/* Interactive Map Container */}
              <div className="h-[400px]">
                <SimpleMap
                  center={userData.coordinates}
                  zoom={13}
                  location={userData.location}
                />
              </div>

              {/* Location Details */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-[#0F0F0F] backdrop-blur-sm border border-[#1F1F1F]">
                  <p className="text-xs text-[#A3A3A3] mb-1">Coordinates</p>
                  <p className="text-sm text-[#00E676]">
                    {userData.coordinates[0].toFixed(4)}°N,{" "}
                    {Math.abs(userData.coordinates[1]).toFixed(4)}°W
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#0F0F0F] backdrop-blur-sm border border-[#1F1F1F]">
                  <p className="text-xs text-[#A3A3A3] mb-1">Country</p>
                  <p className="text-sm text-[#00E676]">{userData.country}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Account Details */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="relative overflow-hidden border-[#1F1F1F] hover:shadow-xl hover:shadow-[#00E676]/10 transition-all bg-[#121212]">
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#00E676] rounded-lg">
                  <User className="w-5 h-5 text-[#000000]" />
                </div>
                <div>
                  <h3 className="text-[#F2F2F2]">Account Details</h3>
                  <p className="text-sm text-[#A3A3A3]">
                    Your account information
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Account Info Items */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="p-4 rounded-xl bg-[#0F0F0F] backdrop-blur-sm border border-[#1F1F1F]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#00E676]" />
                      <p className="text-sm text-[#A3A3A3]">Joined</p>
                    </div>
                    <p className="text-[#F2F2F2]">
                      {new Date(userData.joinDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="text-xs text-[#A3A3A3]">
                    Member for{" "}
                    {Math.floor(
                      (new Date().getTime() -
                        new Date(userData.joinDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </p>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                  className="p-4 rounded-xl bg-[#0F0F0F] backdrop-blur-sm border border-[#1F1F1F]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#00E676]" />
                      <p className="text-sm text-[#A3A3A3]">Account Status</p>
                    </div>
                    <Badge className="bg-[#00E676]/20 text-[#00E676] border-0">
                      Active & Verified
                    </Badge>
                  </div>
                  <p className="text-xs text-[#A3A3A3]">
                    All security checks passed
                  </p>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="p-4 rounded-xl bg-[#0F0F0F] backdrop-blur-sm border border-[#1F1F1F]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#00E676]" />
                      <p className="text-sm text-[#A3A3A3]">Trust Level</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < 4
                              ? "bg-[#00E676]"
                              : "bg-[#A3A3A3]/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#A3A3A3]">
                    Level 4 - Highly Trusted
                  </p>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.75, duration: 0.4 }}
                  className="p-4 rounded-xl bg-[#0F0F0F] backdrop-blur-sm border border-[#1F1F1F]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#00E676]" />
                      <p className="text-sm text-[#A3A3A3]">Membership Type</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-[#00E676] to-[#00C853] text-[#000000] border-0">
                      Premium
                    </Badge>
                  </div>
                  <p className="text-xs text-[#A3A3A3]">
                    Unlimited verifications & priority support
                  </p>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Card className="relative overflow-hidden border-[#1F1F1F] bg-[#121212]">
          <div className="relative p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#00E676] rounded-lg">
                  <Activity className="w-5 h-5 text-[#000000]" />
                </div>
                <div>
                  <h3 className="text-[#F2F2F2]">Recent Activity</h3>
                  <p className="text-sm text-[#A3A3A3]">
                    Your latest actions and achievements
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="gap-2 border-[#1F1F1F] text-[#FFFFFF] hover:bg-[#121212] hover:border-[#00E676]/50"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-[#0F0F0F] backdrop-blur-sm border border-[#1F1F1F] hover:border-[#00E676]/50 transition-all duration-300 group"
                  >
                    <div
                      className={`p-2 rounded-lg bg-[#121212] border border-[#1F1F1F]`}
                    >
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#F2F2F2] mb-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-[#A3A3A3]" />
                        <p className="text-xs text-[#A3A3A3]">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#A3A3A3] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}