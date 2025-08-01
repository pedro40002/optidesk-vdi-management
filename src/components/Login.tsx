
import React, { useState } from 'react';
import { Lock, User, Server, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 grid-cyber opacity-10"></div>
      
      {/* Floating 3D Server Room Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 cyber-glow-blue rounded-xl floating-animation opacity-20">
        <Server className="w-full h-full p-6 text-blue-400" />
      </div>
      <div className="absolute top-20 right-20 w-20 h-20 cyber-glow rounded-lg floating-animation opacity-15" style={{animationDelay: '3s'}}>
        <Shield className="w-full h-full p-4 text-green-400" />
      </div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 cyber-glow rounded-full floating-animation opacity-25" style={{animationDelay: '1s'}}>
        <Lock className="w-full h-full p-3 text-purple-400" />
      </div>

      {/* Central Login Terminal */}
      <div className="relative z-10 w-full max-w-md p-6">
        {/* OptiDesk Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 cyber-glow rounded-2xl rotate-slow bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 mb-4">
            <Server className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white cyber-glow mb-2">OptiDesk</h1>
          <p className="text-green-400 text-sm">Virtual Desktop Infrastructure</p>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Login Card */}
        <Card className="glass-morphism border-green-500/30 cyber-glow">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-white flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>Secure Access Terminal</span>
            </CardTitle>
            <p className="text-gray-400 text-sm">Administrative Portal</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center space-x-2">
                  <User className="w-4 h-4 text-green-400" />
                  <span>Administrator Email</span>
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@optidesk.local"
                    className="bg-slate-800/50 border-green-500/30 text-white placeholder-gray-500 focus:border-green-400 focus:ring-green-400/20"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span>Security Passphrase</span>
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400/20"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full pulse-glow"></div>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 cyber-glow transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Access Terminal</span>
                  </div>
                )}
              </Button>

              {/* Security Info */}
              <div className="text-center pt-4">
                <p className="text-xs text-gray-500">
                  Secured with AES-256 encryption
                </p>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full pulse-glow"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full pulse-glow" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-1 h-1 bg-purple-400 rounded-full pulse-glow" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-6 text-center">
          <div className="glass-morphism border-yellow-500/30 p-4 rounded-lg">
            <p className="text-yellow-400 text-sm font-semibold mb-2">Demo Credentials</p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Email: admin@optidesk.local</p>
              <p>Password: demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
