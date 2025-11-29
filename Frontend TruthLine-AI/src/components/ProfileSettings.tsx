import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Calendar,
  MapPin,
  ShieldCheck,
  Edit,
  Save,
  X,
  CheckCircle2,
  TrendingUp,
  Eye,
  Award,
  Sparkles,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { GlowingEffect } from "./ui/glowing-effect";
import { WorldMap } from "./ui/world-map";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  location: string;
  verifiedTexts: number;
  accountCreated: string;
  accuracyRate: number;
}

export function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dob: "1990-05-15",
    location: "San Francisco, CA",
    verifiedTexts: 1247,
    accountCreated: "2023-06-15",
    accuracyRate: 94,
  });

  const [editData, setEditData] = useState<ProfileData>(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const stats = [
    {
      icon: ShieldCheck,
      label: "Texts Verified",
      value: profileData.verifiedTexts.toLocaleString(),
      color: "from-[#007CF0] to-[#4BC9FF]",
      textColor: "text-[#4BC9FF]",
      bgColor: "bg-[#4BC9FF]/10",
    },
    {
      icon: TrendingUp,
      label: "Accuracy Rate",
      value: `${profileData.accuracyRate}%`,
      color: "from-[#6DFFB8] to-[#007CF0]",
      textColor: "text-[#6DFFB8]",
      bgColor: "bg-[#6DFFB8]/10",
    },
    {
      icon: Award,
      label: "Trust Score",
      value: "Excellent",
      color: "from-[#FF1B9B] to-[#FFB200]",
      textColor: "text-[#FF1B9B]",
      bgColor: "bg-[#FF1B9B]/10",
    },
    {
      icon: Eye,
      label: "Member Since",
      value: new Date(profileData.accountCreated).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      color: "from-[#090979] to-[#007CF0]",
      textColor: "text-[#007CF0]",
      bgColor: "bg-[#007CF0]/10",
    },
  ];

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
            <h2 className="text-[#EAF6FF]">Profile Settings</h2>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-6 h-6 text-[#007CF0]" />
            </motion.div>
          </div>
          <p className="text-[#8B9BB8]">
            Manage your personal information and view your verification statistics
          </p>
        </div>
        {!isEditing ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setIsEditing(true)}
              className="gap-2 bg-gradient-to-r from-[#007CF0] to-[#FF1B9B] hover:from-[#007CF0]/80 hover:to-[#FF1B9B]/80 text-[#EAF6FF] shadow-lg shadow-[#007CF0]/30"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          </motion.div>
        ) : (
          <div className="flex gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleCancel}
                variant="outline"
                className="gap-2 border-[#4BC9FF]/30 text-[#EAF6FF] hover:bg-[#090979]/30"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleSave}
                className="gap-2 bg-gradient-to-r from-[#6DFFB8] to-[#007CF0] hover:from-[#6DFFB8]/80 hover:to-[#007CF0]/80 text-[#010102] shadow-lg shadow-[#6DFFB8]/30"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <Card className="relative overflow-hidden border-[#4BC9FF]/30 hover:shadow-xl hover:shadow-[#007CF0]/20 transition-all duration-300">
                <GlowingEffect
                  spread={40}
                  glow={false}
                  disabled={false}
                  proximity={80}
                  inactiveZone={0.3}
                  borderWidth={2}
                />
                <div className="relative p-6 space-y-3 bg-gradient-to-br from-[#0C0F19] to-[#090979]/30">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-[#EAF6FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8B9BB8]">{stat.label}</p>
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

      {/* Profile Information */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Card className="relative overflow-hidden border-[#4BC9FF]/30 shadow-2xl shadow-[#007CF0]/10">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={100}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <div className="relative bg-gradient-to-br from-[#0C0F19] via-[#090979]/20 to-[#0C0F19] p-8">
            {/* Profile Header */}
            <div className="flex items-start gap-6 mb-8 pb-8 border-b border-[#4BC9FF]/20">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#007CF0] to-[#FF1B9B] rounded-2xl blur-lg opacity-70" />
                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[#007CF0] to-[#FF1B9B] flex items-center justify-center text-3xl text-[#EAF6FF]">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-[#EAF6FF] mb-1">{profileData.name}</h3>
                <p className="text-[#8B9BB8] mb-3">{profileData.email}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#007CF0]/20 text-[#4BC9FF] border-[#4BC9FF]/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified User
                  </Badge>
                  <Badge className="bg-[#6DFFB8]/20 text-[#6DFFB8] border-[#6DFFB8]/30">
                    <Award className="w-3 h-3 mr-1" />
                    Premium Member
                  </Badge>
                </div>
              </div>
            </div>

            {/* Profile Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="space-y-2"
              >
                <Label className="flex items-center gap-2 text-[#EAF6FF]">
                  <User className="w-4 h-4 text-[#007CF0]" />
                  Full Name
                </Label>
                <Input
                  value={isEditing ? editData.name : profileData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className="border-[#4BC9FF]/30 focus:border-[#007CF0] focus:ring-[#007CF0]/20 bg-[#0C0F19]/80 backdrop-blur-sm text-[#EAF6FF] disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="space-y-2"
              >
                <Label className="flex items-center gap-2 text-[#EAF6FF]">
                  <Mail className="w-4 h-4 text-[#007CF0]" />
                  Email Address
                </Label>
                <Input
                  type="email"
                  value={isEditing ? editData.email : profileData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className="border-[#4BC9FF]/30 focus:border-[#007CF0] focus:ring-[#007CF0]/20 bg-[#0C0F19]/80 backdrop-blur-sm text-[#EAF6FF] disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="space-y-2"
              >
                <Label className="flex items-center gap-2 text-[#EAF6FF]">
                  <Phone className="w-4 h-4 text-[#007CF0]" />
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  value={isEditing ? editData.phone : profileData.phone}
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className="border-[#4BC9FF]/30 focus:border-[#007CF0] focus:ring-[#007CF0]/20 bg-[#0C0F19]/80 backdrop-blur-sm text-[#EAF6FF] disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </motion.div>

              {/* Date of Birth */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.4 }}
                className="space-y-2"
              >
                <Label className="flex items-center gap-2 text-[#EAF6FF]">
                  <Calendar className="w-4 h-4 text-[#007CF0]" />
                  Date of Birth
                </Label>
                <Input
                  type="date"
                  value={isEditing ? editData.dob : profileData.dob}
                  onChange={(e) =>
                    setEditData({ ...editData, dob: e.target.value })
                  }
                  disabled={!isEditing}
                  className="border-[#4BC9FF]/30 focus:border-[#007CF0] focus:ring-[#007CF0]/20 bg-[#0C0F19]/80 backdrop-blur-sm text-[#EAF6FF] disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="space-y-2"
              >
                <Label className="flex items-center gap-2 text-[#EAF6FF]">
                  <MapPin className="w-4 h-4 text-[#007CF0]" />
                  Location
                </Label>
                <Input
                  value={isEditing ? editData.location : profileData.location}
                  onChange={(e) =>
                    setEditData({ ...editData, location: e.target.value })
                  }
                  disabled={!isEditing}
                  className="border-[#4BC9FF]/30 focus:border-[#007CF0] focus:ring-[#007CF0]/20 bg-[#0C0F19]/80 backdrop-blur-sm text-[#EAF6FF] disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </motion.div>

              {/* Verified Texts (Read-only) */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.4 }}
                className="space-y-2"
              >
                <Label className="flex items-center gap-2 text-[#EAF6FF]">
                  <ShieldCheck className="w-4 h-4 text-[#007CF0]" />
                  Number of Texts Verified
                </Label>
                <div className="relative">
                  <Input
                    value={profileData.verifiedTexts.toLocaleString()}
                    disabled
                    className="border-[#4BC9FF]/30 bg-[#0C0F19]/40 backdrop-blur-sm text-[#EAF6FF] disabled:opacity-100"
                  />
                  <Badge className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#6DFFB8]/20 text-[#6DFFB8] border-0">
                    Read-only
                  </Badge>
                </div>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Activity Summary */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Card className="relative overflow-hidden border-[#4BC9FF]/30">
          <GlowingEffect
            spread={50}
            glow={false}
            disabled={false}
            proximity={90}
            inactiveZone={0.2}
            borderWidth={2}
          />
          <div className="relative bg-gradient-to-br from-[#0C0F19] to-[#090979]/30 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-[#FF1B9B] to-[#007CF0] rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#EAF6FF]" />
              </div>
              <div>
                <h3 className="text-[#EAF6FF]">Activity Summary</h3>
                <p className="text-sm text-[#8B9BB8]">
                  Your verification statistics and achievements
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="p-6 rounded-xl bg-[#010102]/40 backdrop-blur-sm border border-[#4BC9FF]/20"
              >
                <p className="text-sm text-[#8B9BB8] mb-2">This Week</p>
                <p className="text-2xl text-[#4BC9FF]">87</p>
                <p className="text-xs text-[#8B9BB8] mt-1">Verifications completed</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.4 }}
                className="p-6 rounded-xl bg-[#010102]/40 backdrop-blur-sm border border-[#4BC9FF]/20"
              >
                <p className="text-sm text-[#8B9BB8] mb-2">This Month</p>
                <p className="text-2xl text-[#6DFFB8]">342</p>
                <p className="text-xs text-[#8B9BB8] mt-1">Verifications completed</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="p-6 rounded-xl bg-[#010102]/40 backdrop-blur-sm border border-[#4BC9FF]/20"
              >
                <p className="text-sm text-[#8B9BB8] mb-2">All Time</p>
                <p className="text-2xl text-[#FF1B9B]">
                  {profileData.verifiedTexts.toLocaleString()}
                </p>
                <p className="text-xs text-[#8B9BB8] mt-1">Total verifications</p>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* World Map Location */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Card className="relative overflow-hidden border-[#4BC9FF]/30">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={100}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <div className="relative bg-gradient-to-br from-[#0C0F19] via-[#090979]/20 to-[#0C0F19] p-8">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-2 bg-gradient-to-br from-[#007CF0] to-[#6DFFB8] rounded-lg"
              >
                <Globe className="w-5 h-5 text-[#EAF6FF]" />
              </motion.div>
              <div>
                <h3 className="text-[#EAF6FF]">Your Location</h3>
                <p className="text-sm text-[#8B9BB8]">
                  Global presence on the world map
                </p>
              </div>
            </div>

            <WorldMap location={profileData.location} className="w-full" />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}