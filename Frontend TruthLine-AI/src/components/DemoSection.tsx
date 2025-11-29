import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Loader2, CheckCircle, XCircle, AlertCircle, ExternalLink, Lock } from "lucide-react";
import { Badge } from "./ui/badge";
import { useAuth } from "../contexts/AuthContext";
import { Alert, AlertDescription } from "./ui/alert";
import SearchComponent from "./ui/animated-glowing-search-bar";

export function DemoSection() {
  const [claim, setClaim] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const { isAuthenticated } = useAuth();
  
  const handleAnalyze = async () => {
    if (!claim.trim()) return;
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowLoginWarning(true);
      return;
    }
    
    setShowLoginWarning(false);
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate API call to MERN backend
    setTimeout(() => {
      const mockResults = [
        {
          verdict: "TRUE",
          confidence: 94,
          summary: "This claim has been verified as accurate based on multiple reliable sources.",
          sources: [
            { name: "Reuters Fact Check", url: "#", reliability: 95 },
            { name: "Associated Press", url: "#", reliability: 98 },
            { name: "Scientific Journal", url: "#", reliability: 92 }
          ],
          icon: CheckCircle,
          color: "green"
        },
        {
          verdict: "FALSE",
          confidence: 89,
          summary: "This claim contradicts verified information from authoritative sources.",
          sources: [
            { name: "Snopes", url: "#", reliability: 94 },
            { name: "FactCheck.org", url: "#", reliability: 96 },
            { name: "PolitiFact", url: "#", reliability: 91 }
          ],
          icon: XCircle,
          color: "red"
        },
        {
          verdict: "PARTIALLY TRUE",
          confidence: 76,
          summary: "The claim contains some accurate information but lacks important context.",
          sources: [
            { name: "BBC Fact Check", url: "#", reliability: 93 },
            { name: "The Washington Post", url: "#", reliability: 89 },
            { name: "NPR", url: "#", reliability: 90 }
          ],
          icon: AlertCircle,
          color: "yellow"
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
    }, 2500);
  };
  
  return (
    <div className="py-20 bg-white" id="demo-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 mb-4">
            Try It Yourself
          </h2>
          <p className="text-slate-600 mb-8">
            Enter any claim or statement to see our AI agents in action
          </p>
        </div>
        
        <Card className="p-8">
          {showLoginWarning && (
            <Alert className="mb-6 bg-yellow-50 border-yellow-200">
              <Lock className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Please log in to use the live demo. This feature is only available to registered users.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mb-6">
            <label htmlFor="claim-input" className="block text-slate-900 mb-2">
              Enter a claim to verify
            </label>
            <Textarea
              id="claim-input"
              placeholder="Example: The moon landing in 1969 was filmed by NASA astronauts..."
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>
          
          <Button 
            onClick={handleAnalyze} 
            disabled={!claim.trim() || isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing with AI Agents...
              </>
            ) : (
              <>
                {!isAuthenticated && <Lock className="w-5 h-5 mr-2" />}
                Verify Claim
              </>
            )}
          </Button>
          
          {result && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`border-2 rounded-lg p-6 ${
                result.color === 'green' ? 'border-green-300 bg-green-50' :
                result.color === 'red' ? 'border-red-300 bg-red-50' :
                'border-yellow-300 bg-yellow-50'
              }`}>
                <div className="flex items-start gap-4 mb-4">
                  <result.icon className={`w-8 h-8 flex-shrink-0 ${
                    result.color === 'green' ? 'text-green-600' :
                    result.color === 'red' ? 'text-red-600' :
                    'text-yellow-600'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`${
                        result.color === 'green' ? 'text-green-900' :
                        result.color === 'red' ? 'text-red-900' :
                        'text-yellow-900'
                      }`}>
                        {result.verdict}
                      </h3>
                      <Badge variant="secondary">
                        {result.confidence}% Confidence
                      </Badge>
                    </div>
                    <p className={`${
                      result.color === 'green' ? 'text-green-700' :
                      result.color === 'red' ? 'text-red-700' :
                      'text-yellow-700'
                    }`}>
                      {result.summary}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-current/20">
                  <div className="mb-3 text-slate-900">Verified Sources:</div>
                  <div className="space-y-2">
                    {result.sources.map((source: any, index: number) => (
                      <div key={index} className="flex items-center justify-between bg-white rounded p-3">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-900">{source.name}</span>
                        </div>
                        <Badge variant="outline">
                          {source.reliability}% reliable
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}