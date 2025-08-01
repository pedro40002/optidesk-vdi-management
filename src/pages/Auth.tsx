import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User } from '@supabase/supabase-js';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        window.location.href = '/';
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        window.location.href = '/';
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      console.log('Attempting sign up...');
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      console.log('Sign up response:', { data, error });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        setMessage('Please check your email for a confirmation link.');
      } else if (data.user) {
        window.location.href = '/';
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      console.log('Attempting sign in...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Sign in response:', { data, error });

      if (error) throw error;

      if (data.user) {
        window.location.href = '/';
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cyber Background Elements */}
      <div className="absolute inset-0 grid-cyber opacity-30"></div>
      
      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 cyber-glow-blue rounded-xl floating-animation opacity-40">
        <div className="w-full h-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-xl"></div>
      </div>
      <div className="absolute bottom-20 right-20 w-16 h-16 cyber-glow rounded-lg floating-animation opacity-30" style={{animationDelay: '2s'}}>
        <div className="w-full h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-lg"></div>
      </div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 cyber-glow rounded-full floating-animation opacity-25" style={{animationDelay: '4s'}}>
        <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
      </div>

      {/* Main Login Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-morphism border border-green-500/30 cyber-glow p-8 rounded-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block w-16 h-16 cyber-glow rounded-xl rotate-slow bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center mb-4">
              <div className="text-2xl font-bold text-white">OD</div>
            </div>
            <h1 className="text-3xl font-bold text-white cyber-glow mb-2">OptiDesk</h1>
            <p className="text-green-400 text-sm">Virtual Desktop Infrastructure</p>
          </div>

          {/* Toggle Between Sign In / Sign Up */}
          <div className="flex mb-6 bg-black/30 rounded-lg p-1">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                !isSignUp 
                  ? 'bg-green-500/20 text-green-400 shadow-lg cyber-glow' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                isSignUp 
                  ? 'bg-blue-500/20 text-blue-400 shadow-lg cyber-glow-blue' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <Alert className="mb-4 border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-400 text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert className="mb-4 border-green-500/50 bg-green-500/10">
              <AlertDescription className="text-green-400 text-sm">{message}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="bg-black/40 border-gray-600/50 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="bg-black/40 border-gray-600/50 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
              </div>
            )}
            
            <div className="relative">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/40 border-gray-600/50 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-300"
              />
            </div>

            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/40 border-gray-600/50 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-300"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isSignUp
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 cyber-glow-blue'
                  : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 cyber-glow'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                </div>
              ) : (
                <span>{isSignUp ? 'Create Account' : 'Access System'}</span>
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          {!isSignUp && (
            <div className="mt-6 p-4 bg-black/30 rounded-lg border border-gray-700/50">
              <p className="text-xs text-gray-400 text-center">
                Demo: Create an account or use your registered credentials
              </p>
            </div>
          )}
        </div>

        {/* Glowing Orbs */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400 rounded-full blur-sm opacity-60 pulse-glow"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-400 rounded-full blur-sm opacity-60 pulse-glow" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

export default Auth;