
import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Dashboard } from '@/components/Dashboard';
import { CostCalculator } from '@/components/CostCalculator';
import { Analytics } from '@/components/Analytics';
import { Profile } from '@/components/Profile';
import { Settings } from '@/components/Settings';
import { Sidebar } from '@/components/Sidebar';
import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<{name: string; email: string} | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get current page from URL
  const getCurrentPage = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
      case '/dashboard':
        return 'dashboard';
      case '/analytics':
        return 'analytics';
      case '/cost-calculator':
        return 'cost-calculator';
      case '/profile':
        return 'profile';
      case '/settings':
        return 'settings';
      default:
        return 'dashboard';
    }
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPage());

  // Update currentPage when URL changes
  useEffect(() => {
    setCurrentPage(getCurrentPage());
  }, [location.pathname]);

  // Function to handle navigation with URL update
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
    const routeMap: { [key: string]: string } = {
      'dashboard': '/dashboard',
      'analytics': '/analytics',
      'cost-calculator': '/cost-calculator',
      'profile': '/profile',
      'settings': '/settings'
    };
    navigate(routeMap[page] || '/dashboard');
  };

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
      navigate('/auth');
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
    navigate('/auth');
    return null;
  }

  return (
    <SettingsProvider>
      <MainContent 
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        handleLogout={handleLogout}
        userProfile={userProfile}
        renderContent={renderContent}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
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
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}> = ({ currentPage, setCurrentPage, handleLogout, userProfile, renderContent, isMobileMenuOpen, setIsMobileMenuOpen }) => {
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
    <div className="flex min-h-screen bg-slate-900 relative">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-sm border-b border-green-500/30 flex items-center justify-between px-4 z-30 lg:hidden">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 cyber-glow rounded-lg bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
            <span className="text-sm font-bold text-white">OD</span>
          </div>
          <h1 className="text-lg font-bold text-white">OptiDesk</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:bg-white/10"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar - Desktop: always visible, Mobile: slide-in overlay */}
      <div className={`
        fixed lg:static top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out lg:transform-none lg:z-auto
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          onLogout={handleLogout}
          userEmail={userProfile?.email}
          userName={userProfile?.name}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
