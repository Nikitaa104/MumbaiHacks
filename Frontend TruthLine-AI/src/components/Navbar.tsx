import { useState } from 'react';
import { Button } from "./ui/button";
import { Shield, Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
  onDashboardClick?: () => void;
}

export function Navbar({ onLoginClick, onSignupClick, onDashboardClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 text-slate-900">
            <Shield className="w-6 h-6 text-blue-600" />
            <span>VerifyAI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">
              How It Works
            </a>
            <button onClick={scrollToDemo} className="text-slate-600 hover:text-slate-900 transition-colors">
              Demo
            </button>
            
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    onClick={onDashboardClick}
                    className="text-slate-600 hover:text-slate-900"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <User className="w-4 h-4" />
                      {user?.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{user?.name}</span>
                        <span className="text-xs text-slate-500 font-normal">{user?.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={onDashboardClick}>
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={onLoginClick}>
                  Login
                </Button>
                <Button onClick={onSignupClick} className="bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-600 hover:text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">
                How It Works
              </a>
              <button onClick={scrollToDemo} className="text-slate-600 hover:text-slate-900 transition-colors text-left">
                Demo
              </button>
              
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onDashboardClick?.();
                        setMobileMenuOpen(false);
                      }}
                      className="justify-start"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  )}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-sm text-slate-900 mb-1">{user?.name}</div>
                    <div className="text-xs text-slate-500 mb-4">{user?.email}</div>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
                  <Button variant="outline" onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}>
                    Login
                  </Button>
                  <Button onClick={() => {
                    onSignupClick();
                    setMobileMenuOpen(false);
                  }} className="bg-blue-600 hover:bg-blue-700">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
