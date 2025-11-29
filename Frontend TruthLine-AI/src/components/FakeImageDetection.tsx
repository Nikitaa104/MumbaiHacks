import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Image as ImageIcon,
  Upload,
  X,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Share2,
  PlusCircle,
  FileImage,
  Link as LinkIcon,
  Info,
  Clock,
  MapPin,
  Camera,
  Hash,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { GlowingEffect } from "./ui/glowing-effect";
import DatabaseWithRestApi from "./ui/database-with-rest-api";

interface DetectionResult {
  prediction: "Real" | "Fake" | "Unsure";
  confidence: number;
  evidence: string;
  metadata: {
    format: string;
    resolution: string;
    dateCreated?: string;
    location?: string;
    cameraModel?: string;
    edited: boolean;
  };
  technicalAnalysis: {
    compression: string;
    exifData: string;
    pixelAnalysis: string;
    aiSignatures: string;
  };
}

const predictionConfig = {
  Real: {
    icon: CheckCircle2,
    label: "AUTHENTIC",
    color: "bg-[#00E676]", // Neon Green
    textColor: "text-[#00E676]",
    bgColor: "bg-[#00E676]/10",
    borderColor: "border-[#00E676]/30",
    gradient: "from-[#00E676]/10 to-[#00E676]/20",
  },
  Fake: {
    icon: XCircle,
    label: "MANIPULATED",
    color: "bg-[#FF4444]", // Red
    textColor: "text-[#FF4444]",
    bgColor: "bg-[#FF4444]/10",
    borderColor: "border-[#FF4444]/30",
    gradient: "from-[#FF4444]/10 to-[#FF4444]/20",
  },
  Unsure: {
    icon: AlertTriangle,
    label: "UNCERTAIN",
    color: "bg-[#FFA726]", // Orange
    textColor: "text-[#FFA726]",
    bgColor: "bg-[#FFA726]/10",
    borderColor: "border-[#FFA726]/30",
    gradient: "from-[#FFA726]/10 to-[#FFA726]/20",
  },
};

export function FakeImageDetection({ onBack }: { onBack: () => void }) {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
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
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setImageUrl("");
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setImageUrl("");
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleUrlSubmit = useCallback(() => {
    if (imageUrl.trim()) {
      setUploadedImage(imageUrl);
      setResult(null);
    }
  }, [imageUrl]);

  const handleAnalyze = async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Mock result
    const predictions: Array<"Real" | "Fake" | "Unsure"> = ["Real", "Fake", "Unsure"];
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
    
    setResult({
      prediction: randomPrediction,
      confidence: Math.floor(Math.random() * 30) + 70,
      evidence: randomPrediction === "Real" 
        ? "Image shows consistent lighting patterns, natural compression artifacts, and valid EXIF data. No signs of digital manipulation detected."
        : randomPrediction === "Fake"
        ? "Detected inconsistent shadow patterns, cloning artifacts, and missing EXIF data. High probability of AI-generated or edited content."
        : "Image quality is too low for definitive analysis. Some metadata is missing, and compression makes detailed analysis difficult.",
      metadata: {
        format: "JPEG",
        resolution: "1920 x 1080",
        dateCreated: "2024-11-15 14:32:00",
        location: "San Francisco, CA",
        cameraModel: "Canon EOS R5",
        edited: randomPrediction === "Fake",
      },
      technicalAnalysis: {
        compression: randomPrediction === "Fake" ? "Suspicious patterns detected" : "Normal JPEG compression",
        exifData: randomPrediction === "Fake" ? "Missing or tampered" : "Intact and valid",
        pixelAnalysis: randomPrediction === "Real" ? "No anomalies" : "Inconsistencies found",
        aiSignatures: randomPrediction === "Fake" ? "AI generation markers detected" : "No AI signatures",
      },
    });
    
    setIsProcessing(false);
  };

  const clearImage = () => {
    setUploadedImage(null);
    setImageUrl("");
    setResult(null);
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
                  <ImageIcon className="w-6 h-6 text-[#000000]" />
                </div>
                <h2 className="text-[#F2F2F2]">Fake Image Detection</h2>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-6 h-6 text-[#00E676]" />
                </motion.div>
              </div>
              <p className="text-[#A3A3A3]">
                AI-powered image verification to detect manipulation and deepfakes
              </p>
            </div>
            <Button onClick={onBack} variant="outline" className="gap-2 border-[#1F1F1F] text-[#FFFFF] hover:bg-[#121212] hover:border-[#00E676]/50">
              Back to Dashboard
            </Button>
          </motion.div>

          {/* AI Processing Visualization */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center py-4"
          >
            <DatabaseWithRestApi
              className="max-w-md"
              circleText="AI"
              title="AI-powered image analysis pipeline"
              lightColor="#00E676"
              badgeTexts={{
                first: "SCAN",
                second: "ANALYZE",
                third: "VERIFY",
                fourth: "DETECT",
              }}
              buttonTexts={{
                first: "TruthGuard",
                second: "v3_deepfake",
              }}
            />
          </motion.div>

          {/* Upload Section */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="relative overflow-hidden border-[#1F1F1F] hover:shadow-xl hover:shadow-[#00E676]/10 transition-all bg-[#121212]">
              <div className="relative p-8">
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#0F0F0F]">
                    <TabsTrigger value="upload" className="gap-2 text-[#A3A3A3] data-[state=active]:bg-[#00E676]/10 data-[state=active]:text-[#00E676]">
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </TabsTrigger>
                    <TabsTrigger value="url" className="gap-2 text-[#A3A3A3] data-[state=active]:bg-[#00E676]/10 data-[state=active]:text-[#00E676]">
                      <LinkIcon className="w-4 h-4" />
                      Image URL
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-4">
                    {!uploadedImage ? (
                      <motion.div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        whileHover={{ scale: 1.01 }}
                        className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                          isDragging
                            ? "border-[#00E676] bg-[#00E676]/10"
                            : "border-[#1F1F1F] hover:border-[#00E676]/50 hover:bg-[#121212]"
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <motion.div
                          animate={{
                            y: isDragging ? -10 : 0,
                            scale: isDragging ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col items-center gap-4"
                        >
                          <div className="p-4 bg-[#00E676] rounded-full">
                            <FileImage className="w-10 h-10 text-[#000000]" />
                          </div>
                          <div>
                            <p className="text-[#F2F2F2] mb-1">
                              {isDragging
                                ? "Drop your image here"
                                : "Drag & drop your image here"}
                            </p>
                            <p className="text-sm text-[#A3A3A3]">
                              or click to browse (PNG, JPG, WEBP)
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <ImagePreview
                        image={uploadedImage}
                        onClear={clearImage}
                        onAnalyze={handleAnalyze}
                        isProcessing={isProcessing}
                      />
                    )}
                  </TabsContent>

                  <TabsContent value="url" className="space-y-4">
                    <div className="flex gap-3">
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="flex-1 border-[#1F1F1F] focus:border-[#00E676] focus:ring-[#00E676]/20 bg-[#0F0F0F] text-[#F2F2F2] placeholder:text-[#A3A3A3]"
                      />
                      <Button
                        onClick={handleUrlSubmit}
                        disabled={!imageUrl.trim()}
                        className="bg-[#00E676] hover:bg-[#00C853] text-[#000000]"
                      >
                        Load Image
                      </Button>
                    </div>
                    {uploadedImage && (
                      <ImagePreview
                        image={uploadedImage}
                        onClear={clearImage}
                        onAnalyze={handleAnalyze}
                        isProcessing={isProcessing}
                      />
                    )}
                  </TabsContent>
                </Tabs>
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
              >
                <ResultPanel result={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ImagePreview({
  image,
  onClear,
  onAnalyze,
  isProcessing,
}: {
  image: string;
  onClear: () => void;
  onAnalyze: () => void;
  isProcessing: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4"
    >
      <div className="relative rounded-lg overflow-hidden bg-[#0F0F0F] border border-[#1F1F1F]">
        <img
          src={image}
          alt="Preview"
          className="w-full h-64 object-contain"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClear}
          className="absolute top-3 right-3 p-2 bg-[#FF4444] hover:bg-[#FF4444]/80 text-[#F2F2F2] rounded-full shadow-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          size="lg"
          onClick={onAnalyze}
          disabled={isProcessing}
          className="w-full bg-[#00E676] hover:bg-[#00C853] text-[#000000] shadow-lg shadow-[#00E676]/30 transition-all duration-300"
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-5 h-5 mr-2" />
              </motion.div>
              Analyzing Image...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Image for Manipulation
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}

function ResultPanel({ result }: { result: DetectionResult }) {
  const config = predictionConfig[result.prediction];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className={`border-2 ${config.borderColor} overflow-hidden bg-[#121212]`}>
        <div className={`bg-gradient-to-r ${config.gradient} p-8 space-y-6`}>
          {/* Verdict Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`p-3 ${config.color} rounded-xl`}
              >
                <Icon className="w-8 h-8 text-[#000000]" />
              </motion.div>
              <div>
                <Badge className={`${config.bgColor} ${config.textColor} border-0 px-3 py-1 mb-2`}>
                  {config.label}
                </Badge>
                <p className="text-sm text-[#A3A3A3]">Detection complete</p>
              </div>
            </div>
            <div className="text-right">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl text-[#F2F2F2]"
              >
                {result.confidence}%
              </motion.div>
              <p className="text-xs text-[#A3A3A3]">Confidence Level</p>
            </div>
          </div>

          {/* Confidence Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#A3A3A3]">AI Confidence Score</span>
              <span className={config.textColor}>{result.confidence}%</span>
            </div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }}>
              <Progress value={result.confidence} className="h-3" />
            </motion.div>
          </div>

          {/* Evidence Summary */}
          <div className="p-5 bg-[#0F0F0F] backdrop-blur-sm rounded-xl border border-[#1F1F1F]">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-[#00E676]" />
              <h4 className="text-[#F2F2F2]">Evidence Summary</h4>
            </div>
            <p className="text-[#F2F2F2]/90">{result.evidence}</p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetadataItem
              icon={FileImage}
              label="Format & Resolution"
              value={`${result.metadata.format} • ${result.metadata.resolution}`}
            />
            <MetadataItem
              icon={Clock}
              label="Date Created"
              value={result.metadata.dateCreated || "Unknown"}
            />
            <MetadataItem
              icon={Camera}
              label="Camera Model"
              value={result.metadata.cameraModel || "Unknown"}
            />
            <MetadataItem
              icon={MapPin}
              label="Location"
              value={result.metadata.location || "Unknown"}
            />
          </div>

          {/* Technical Analysis */}
          <div className="p-5 bg-[#0F0F0F] backdrop-blur-sm rounded-xl border border-[#1F1F1F]">
            <div className="flex items-center gap-2 mb-4">
              <Hash className="w-5 h-5 text-[#00E676]" />
              <h4 className="text-[#F2F2F2]">Technical Analysis</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <TechnicalDetail label="Compression" value={result.technicalAnalysis.compression} />
              <TechnicalDetail label="EXIF Data" value={result.technicalAnalysis.exifData} />
              <TechnicalDetail label="Pixel Analysis" value={result.technicalAnalysis.pixelAnalysis} />
              <TechnicalDetail label="AI Signatures" value={result.technicalAnalysis.aiSignatures} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button variant="outline" className="w-full gap-2 border-[#1F1F1F] text-[#F2F2F2] hover:bg-[#121212] hover:border-[#00E676]/50">
                <PlusCircle className="w-4 h-4" />
                Add to Dashboard
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button className="w-full gap-2 bg-[#00E676] hover:bg-[#00C853] text-[#000000]">
                <Share2 className="w-4 h-4" />
                Share Results
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function MetadataItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-3 p-3 bg-[#0F0F0F] rounded-lg border border-[#1F1F1F]"
    >
      <div className="p-2 bg-[#121212] rounded-lg">
        <Icon className="w-4 h-4 text-[#00E676]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#A3A3A3] mb-1">{label}</p>
        <p className="text-sm text-[#F2F2F2] truncate">{value}</p>
      </div>
    </motion.div>
  );
}

function TechnicalDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[#1F1F1F] last:border-0">
      <span className="text-sm text-[#A3A3A3]">{label}:</span>
      <span className="text-sm text-[#F2F2F2]">{value}</span>
    </div>
  );
}