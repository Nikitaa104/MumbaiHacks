import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role?: 'user' | 'admin') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('jwt_token');
    const storedUser = localStorage.getItem('user_data');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call to MERN backend
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication - in production, this would call your Express API
        if (email && password) {
          // Generate mock JWT token
          const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ 
            email, 
            role: email.includes('admin') ? 'admin' : 'user',
            exp: Date.now() + 86400000 
          }))}.mockSignature`;
          
          const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
            role: email.includes('admin') ? 'admin' : 'user'
          };

          localStorage.setItem('jwt_token', mockToken);
          localStorage.setItem('user_data', JSON.stringify(mockUser));
          
          setToken(mockToken);
          setUser(mockUser);
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string, role: 'user' | 'admin' = 'user') => {
    // Simulate API call to MERN backend
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          // Generate mock JWT token
          const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ 
            email, 
            role,
            exp: Date.now() + 86400000 
          }))}.mockSignature`;
          
          const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            role
          };

          localStorage.setItem('jwt_token', mockToken);
          localStorage.setItem('user_data', JSON.stringify(mockUser));
          
          setToken(mockToken);
          setUser(mockUser);
          resolve();
        } else {
          reject(new Error('All fields are required'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    signup,
    logout,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
