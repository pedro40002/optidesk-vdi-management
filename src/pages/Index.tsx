
import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Dashboard } from '@/components/Dashboard';
import { CostCalculator } from '@/components/CostCalculator';
import { Analytics } from '@/components/Analytics';
import { Profile } from '@/components/Profile';
import { Settings } from '@/components/Settings';
import { Sidebar } from '@/components/Sidebar';
import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<{name: string; email: string} | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Update user profile info when session changes
        if (session?.user) {
          const firstName = session.user.user_metadata?.first_name || '';
          const lastName = session.user.user_metadata?.last_name || '';
          
          // Better display name logic
          let displayName = 'User';
          if (firstName && lastName) {
            displayName = `${firstName} ${lastName}`;
          } else if (firstName) {
            displayName = firstName;
          } else if (lastName) {
            displayName = lastName;
          } else {
            // Use email prefix but make it more readable
            const emailPrefix = session.user.email?.split('@')[0] || 'User';
            displayName = emailPrefix.replace(/[0-9]/g, '').replace(/[-_.]/g, ' ').trim() || emailPrefix;
          }
          
          setUserProfile({
            name: displayName,
            email: session.user.email || 'user@example.com'
          });
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const firstName = session.user.user_metadata?.first_name || '';
        const lastName = session.user.user_metadata?.last_name || '';
        
        // Better display name logic
        let displayName = 'User';
        if (firstName && lastName) {
          displayName = `${firstName} ${lastName}`;
        } else if (firstName) {
          displayName = firstName;
        } else if (lastName) {
          displayName = lastName;
        } else {
          // Use email prefix but make it more readable
          const emailPrefix = session.user.email?.split('@')[0] || 'User';
          displayName = emailPrefix.replace(/[0-9]/g, '').replace(/[-_.]/g, ' ').trim() || emailPrefix;
        }
        
        setUserProfile({
          name: displayName,
          email: session.user.email || 'user@example.com'
        });
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
      case 'vms':
        return <Dashboard />;
      case 'calculator':
        return <CostCalculator />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    window.location.href = '/auth';
    return null;
  }

  return (
    <SettingsProvider>
      <MainContent 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleLogout={handleLogout}
        userProfile={userProfile}
        renderContent={renderContent}
      />
    </SettingsProvider>
  );
};

const MainContent: React.FC<{
  currentPage: string;
  setCurrentPage: (page: string) => void;
  handleLogout: () => void;
  userProfile: any;
  renderContent: () => React.ReactNode;
}> = ({ currentPage, setCurrentPage, handleLogout, userProfile, renderContent }) => {
  const { isMaintenanceMode } = useSettings();

  if (isMaintenanceMode) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center p-8 glass-morphism border-yellow-500/30 rounded-xl max-w-md">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚧</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Maintenance Mode</h1>
          <p className="text-gray-300 mb-4">
            The system is currently under maintenance. Please check back later.
          </p>
          <p className="text-sm text-gray-400">
            If you are an administrator, you can disable maintenance mode in the settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
        userEmail={userProfile?.email}
        userName={userProfile?.name}
      />
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
