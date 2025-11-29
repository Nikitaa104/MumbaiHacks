import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { DemoSection } from "./components/DemoSection";
import { Stats } from "./components/Stats";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { LoginModal } from "./components/LoginModal";
import { SignupModal } from "./components/SignupModal";
import { AdminDashboard } from "./components/AdminDashboard";
import { Dashboard } from "./components/Dashboard";
import { useAuth } from "./contexts/AuthContext";

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const { isAuthenticated } = useAuth();

  // Quick test: Show dashboard directly (remove this later or add a test button)
  // Uncomment the line below to see the dashboard immediately:
  // useState(() => setShowUserDashboard(true));

  return (
    <>
      {showUserDashboard ? (
        <Dashboard onExit={() => setShowUserDashboard(false)} />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          <Navbar 
            onLoginClick={() => setShowLogin(true)}
            onSignupClick={() => setShowSignup(true)}
            onDashboardClick={() => {
              if (isAuthenticated) {
                setShowUserDashboard(true);
              } else {
                setShowDashboard(true);
              }
            }}
          />
          
          <div className="pt-16">
            <Hero onDashboardClick={() => setShowUserDashboard(true)} />
            <Stats />
            <div id="features">
              <Features />
            </div>
            <div id="how-it-works">
              <HowItWorks />
            </div>
            <DemoSection />
            <CTA />
            <Footer />
          </div>

          <LoginModal 
            open={showLogin}
            onClose={() => setShowLogin(false)}
            onSwitchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />

          <SignupModal 
            open={showSignup}
            onClose={() => setShowSignup(false)}
            onSwitchToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />

          {showDashboard && (
            <AdminDashboard onClose={() => setShowDashboard(false)} />
          )}
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}