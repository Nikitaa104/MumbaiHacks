import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Upload,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  FileText,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  Flag,
  Clock,
  User,
  MessageSquare,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";

interface EmailAnalysisResult {
  spamProbability: number;
  classification: string[];
  warningFlags: string[];
  detectedLinks: {
    url: string;
    riskLevel: "safe" | "suspicious" | "dangerous";
    domainAuthenticity: boolean;
  }[];
  emailHeaders: {
    spf: "Pass" | "Fail" | "None";
    dkim: "Pass" | "Fail" | "None";
    dmarc: "Pass" | "Fail" | "None";
    rawHeaders: string;
  };
}

const riskConfig = {
  safe: {
    icon: CheckCircle2,
    label: "SAFE",
    color: "bg-[#00E676]",
    textColor: "text-[#00E676]",
    bgColor: "bg-[#00E676]/10",
    borderColor: "border-[#00E676]/30",
  },
  suspicious: {
    icon: AlertTriangle,
    label: "SUSPICIOUS",
    color: "bg-[#FFA726]",
    textColor: "text-[#FFA726]",
    bgColor: "bg-[#FFA726]/10",
    borderColor: "border-[#FFA726]/30",
  },
  dangerous: {
    icon: XCircle,
    label: "DANGEROUS",
    color: "bg-[#FF4C4C]",
    textColor: "text-[#FF4C4C]",
    bgColor: "bg-[#FF4C4C]/10",
    borderColor: "border-[#FF4C4C]/30",
  },
};

export function EmailScanner({ onBack }: { onBack: () => void }) {
  const [emailContent, setEmailContent] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subjectLine, setSubjectLine] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<EmailAnalysisResult | null>(null);
  const [showHeaders, setShowHeaders] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".eml") || file.name.endsWith(".txt"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setEmailContent(content);
        setUploadedFile(file.name);
        setResult(null);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith(".eml") || file.name.endsWith(".txt"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setEmailContent(content);
        setUploadedFile(file.name);
        setResult(null);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!emailContent.trim()) return;

    setIsAnalyzing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Mock result
    const spamLevel = Math.random();
    const classifications = [
      "Phishing",
      "Job Scam",
      "Fake Bank Alert",
      "OTP Fraud",
      "Marketing Spam",
      "Malware Risk",
    ];

    const selectedClassifications = classifications
      .filter(() => Math.random() > 0.6)
      .slice(0, 3);

    const warningFlags = [
      "Suspicious links detected",
      "Spoofed sender domain",
      "Urgent language patterns",
      "Suspicious attachments",
      "Fake promotional offers",
      "Grammar inconsistencies",
    ]
      .filter(() => Math.random() > 0.5)
      .slice(0, 4);

    const mockLinks = [
      {
        url: "https://secure-payment-verify.com/login",
        riskLevel: "dangerous" as const,
        domainAuthenticity: false,
      },
      {
        url: "https://paypal.com",
        riskLevel: "safe" as const,
        domainAuthenticity: true,
      },
      {
        url: "https://bit.ly/3xYz9Qw",
        riskLevel: "suspicious" as const,
        domainAuthenticity: false,
      },
    ];

    setResult({
      spamProbability: Math.floor(spamLevel * 100),
      classification: selectedClassifications,
      warningFlags,
      detectedLinks: mockLinks,
      emailHeaders: {
        spf: Math.random() > 0.5 ? "Pass" : "Fail",
        dkim: Math.random() > 0.5 ? "Pass" : "Fail",
        dmarc: Math.random() > 0.5 ? "Pass" : "Fail",
        rawHeaders: `Received: from mail.example.com (mail.example.com [192.0.2.1])
\tby mx.google.com with ESMTP id abc123
\tfor <user@example.com>; ${new Date().toUTCString()}
Authentication-Results: mx.google.com;
\tspf=pass smtp.mailfrom=sender@example.com;
\tdkim=pass header.i=@example.com;
\tdmarc=pass (policy=reject)
From: sender@example.com
To: user@example.com
Subject: ${subjectLine || "Important Security Alert"}
Date: ${new Date().toUTCString()}
Message-ID: <abc123@example.com>`,
      },
    });

    setIsAnalyzing(false);
  };

  const getRiskLevel = (
    probability: number
  ): "safe" | "suspicious" | "dangerous" => {
    if (probability < 30) return "safe";
    if (probability < 70) return "suspicious";
    return "dangerous";
  };

  return (
    <div className="flex h-screen bg-[#0D0D0D] overflow-hidden">
      <div className="flex-1 overflow-y-auto bg-[#0D0D0D]">
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
                  <Mail className="w-6 h-6 text-[#000000]" />
                </div>
                <h2 className="text-[#F2F2F2]">Email Scanner</h2>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-6 h-6 text-[#00E676]" />
                </motion.div>
              </div>
              <p className="text-[#A3A3A3]">
                Detect spam, phishing, and fraudulent emails with AI-powered analysis
              </p>
            </div>
            <Button
              onClick={onBack}
              variant="outline"
              className="gap-2 border-[#1F1F1F] text-[#FFFFFF] hover:bg-[#121212] hover:border-[#00E676]/50"
            >
              Back to Dashboard
            </Button>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="relative overflow-hidden border-[#1F1F1F] hover:shadow-xl hover:shadow-[#00E676]/10 transition-all bg-[#121212]">
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#00E676] rounded-lg">
                    <MessageSquare className="w-5 h-5 text-[#000000]" />
                  </div>
                  <div>
                    <h3 className="text-[#F2F2F2]">Email Analysis</h3>
                    <p className="text-sm text-[#A3A3A3]">
                      Paste email content or upload a file to analyze
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Optional Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-[#A3A3A3] flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Sender Email (Optional)
                      </label>
                      <Input
                        placeholder="sender@example.com"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="border-[#1F1F1F] focus:border-[#00E676] focus:ring-[#00E676]/20 bg-[#0F0F0F] text-[#F2F2F2] placeholder:text-[#A3A3A3]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-[#A3A3A3] flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Subject Line (Optional)
                      </label>
                      <Input
                        placeholder="Email subject"
                        value={subjectLine}
                        onChange={(e) => setSubjectLine(e.target.value)}
                        className="border-[#1F1F1F] focus:border-[#00E676] focus:ring-[#00E676]/20 bg-[#0F0F0F] text-[#F2F2F2] placeholder:text-[#A3A3A3]"
                      />
                    </div>
                  </div>

                  {/* Email Content Textarea */}
                  <div className="relative">
                    <label className="text-sm text-[#A3A3A3] mb-2 block">
                      Email Content
                    </label>
                    <Textarea
                      placeholder="Paste email content here..."
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      className="min-h-[200px] resize-none border-[#1F1F1F] focus:border-[#00E676] focus:ring-[#00E676]/20 bg-[#0F0F0F] text-[#F2F2F2] placeholder:text-[#A3A3A3]"
                    />
                    {emailContent && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-3"
                      >
                        <Badge
                          variant="secondary"
                          className="bg-[#00E676]/20 text-[#00E676] border-[#00E676]/30"
                        >
                          {emailContent.length} chars
                        </Badge>
                      </motion.div>
                    )}
                  </div>

                  {/* Upload Box */}
                  <div className="relative">
                    <label className="text-sm text-[#A3A3A3] mb-2 block">
                      Or Upload Email File
                    </label>
                    <motion.div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      whileHover={{ scale: 1.01 }}
                      className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                        isDragging
                          ? "border-[#00E676] bg-[#00E676]/10"
                          : "border-[#1F1F1F] hover:border-[#00E676]/50 hover:bg-[#121212]"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".eml,.txt"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <motion.div
                        animate={{
                          y: isDragging ? -10 : 0,
                          scale: isDragging ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="p-3 bg-[#00E676] rounded-full">
                          <FileText className="w-6 h-6 text-[#000000]" />
                        </div>
                        <div>
                          <p className="text-[#F2F2F2] mb-1">
                            {uploadedFile
                              ? `Uploaded: ${uploadedFile}`
                              : isDragging
                              ? "Drop your file here"
                              : "Upload .eml or .txt email file"}
                          </p>
                          <p className="text-sm text-[#A3A3A3]">
                            {!uploadedFile && "Drag & drop or click to browse"}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Analyze Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      onClick={handleAnalyze}
                      disabled={!emailContent.trim() || isAnalyzing}
                      className="w-full bg-[#00E676] hover:bg-[#00C853] text-[#000000] shadow-lg shadow-[#00E676]/30 transition-all duration-300"
                    >
                      {isAnalyzing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Loader2 className="w-5 h-5 mr-2" />
                          </motion.div>
                          Analyzing Email...
                        </>
                      ) : (
                        <>
                          <Shield className="w-5 h-5 mr-2" />
                          Analyze Email
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Section */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Main Results Card */}
                <Card className="border-[#1F1F1F] overflow-hidden bg-[#121212]">
                  <div className="p-8 space-y-6">
                    {/* Spam Probability */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className={`p-3 ${
                              riskConfig[getRiskLevel(result.spamProbability)]
                                .color
                            } rounded-xl`}
                          >
                            {React.createElement(
                              riskConfig[getRiskLevel(result.spamProbability)]
                                .icon,
                              { className: "w-8 h-8 text-[#000000]" }
                            )}
                          </motion.div>
                          <div>
                            <h3 className="text-[#F2F2F2] mb-1">
                              Spam Analysis Result
                            </h3>
                            <Badge
                              className={`${
                                riskConfig[
                                  getRiskLevel(result.spamProbability)
                                ].bgColor
                              } ${
                                riskConfig[
                                  getRiskLevel(result.spamProbability)
                                ].textColor
                              } border-0`}
                            >
                              {
                                riskConfig[getRiskLevel(result.spamProbability)]
                                  .label
                              }
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl text-[#F2F2F2]"
                          >
                            {result.spamProbability}%
                          </motion.div>
                          <p className="text-xs text-[#A3A3A3]">
                            Spam Probability
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#A3A3A3]">Risk Level</span>
                          <span
                            className={
                              riskConfig[getRiskLevel(result.spamProbability)]
                                .textColor
                            }
                          >
                            {result.spamProbability}%
                          </span>
                        </div>
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1 }}
                        >
                          <Progress
                            value={result.spamProbability}
                            className="h-3"
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Classification Chips */}
                    {result.classification.length > 0 && (
                      <div>
                        <h4 className="text-[#F2F2F2] mb-3 flex items-center gap-2">
                          <Flag className="w-5 h-5 text-[#00E676]" />
                          Threat Classifications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.classification.map((classification, index) => (
                            <motion.div
                              key={index}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Badge className="bg-[#FF4C4C]/10 text-[#FF4C4C] border border-[#FF4C4C]/30 px-3 py-1">
                                {classification}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Warning Flags */}
                    {result.warningFlags.length > 0 && (
                      <div className="p-5 bg-[#0F0F0F] rounded-xl border border-[#1F1F1F]">
                        <h4 className="text-[#F2F2F2] mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-[#FFA726]" />
                          Warning Flags Detected
                        </h4>
                        <div className="space-y-2">
                          {result.warningFlags.map((flag, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 text-[#F2F2F2]"
                            >
                              <div className="w-2 h-2 bg-[#FFA726] rounded-full" />
                              <span className="text-sm">{flag}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Detected Links Panel */}
                {result.detectedLinks.length > 0 && (
                  <Card className="border-[#1F1F1F] overflow-hidden bg-[#121212]">
                    <div className="p-8">
                      <h4 className="text-[#F2F2F2] mb-4 flex items-center gap-2">
                        <LinkIcon className="w-5 h-5 text-[#00E676]" />
                        Detected Links
                      </h4>
                      <div className="space-y-3">
                        {result.detectedLinks.map((link, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 bg-[#0F0F0F] rounded-lg border border-[#1F1F1F] hover:border-[#00E676]/30 transition-colors"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <ExternalLink
                                className={`w-5 h-5 flex-shrink-0 ${
                                  riskConfig[link.riskLevel].textColor
                                }`}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-[#F2F2F2] truncate text-sm">
                                  {link.url}
                                </p>
                                <p className="text-xs text-[#A3A3A3]">
                                  Domain {link.domainAuthenticity ? "verified" : "unverified"}
                                </p>
                              </div>
                            </div>
                            <Badge
                              className={`${
                                riskConfig[link.riskLevel].bgColor
                              } ${
                                riskConfig[link.riskLevel].textColor
                              } border-0 flex-shrink-0`}
                            >
                              {riskConfig[link.riskLevel].label}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                )}

                {/* Raw Email Header Viewer */}
                <Card className="border-[#1F1F1F] overflow-hidden bg-[#121212]">
                  <div className="p-8">
                    <button
                      onClick={() => setShowHeaders(!showHeaders)}
                      className="w-full flex items-center justify-between text-[#F2F2F2] hover:text-[#00E676] transition-colors"
                    >
                      <h4 className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#00E676]" />
                        Email Authentication & Headers
                      </h4>
                      {showHeaders ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>

                    <AnimatePresence>
                      {showHeaders && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-4 overflow-hidden"
                        >
                          {/* Authentication Results */}
                          <div className="grid grid-cols-3 gap-3">
                            <AuthBadge
                              label="SPF"
                              status={result.emailHeaders.spf}
                            />
                            <AuthBadge
                              label="DKIM"
                              status={result.emailHeaders.dkim}
                            />
                            <AuthBadge
                              label="DMARC"
                              status={result.emailHeaders.dmarc}
                            />
                          </div>

                          {/* Raw Headers */}
                          <div className="p-4 bg-[#0F0F0F] rounded-lg border border-[#1F1F1F] overflow-x-auto">
                            <pre className="text-xs text-[#00E676] font-mono whitespace-pre-wrap">
                              {result.emailHeaders.rawHeaders}
                            </pre>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function AuthBadge({
  label,
  status,
}: {
  label: string;
  status: "Pass" | "Fail" | "None";
}) {
  const config = {
    Pass: { color: "text-[#00E676]", bg: "bg-[#00E676]/10" },
    Fail: { color: "text-[#FF4C4C]", bg: "bg-[#FF4C4C]/10" },
    None: { color: "text-[#A3A3A3]", bg: "bg-[#A3A3A3]/10" },
  };

  return (
    <div
      className={`p-3 ${config[status].bg} rounded-lg border border-[#1F1F1F] text-center`}
    >
      <p className="text-xs text-[#A3A3A3] mb-1">{label}</p>
      <p className={`text-sm ${config[status].color}`}>{status}</p>
    </div>
  );
}
