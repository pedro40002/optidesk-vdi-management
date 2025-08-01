
import React from 'react';
import { 
  Home, 
  Monitor, 
  Calculator, 
  User, 
  Settings, 
  LogOut,
  Server,
  BarChart3,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  userEmail?: string;
  userName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, onLogout, userEmail, userName }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-green-400' },
    { id: 'vms', label: 'Virtual Machines', icon: Monitor, color: 'text-blue-400' },
    { id: 'calculator', label: 'Cost Calculator', icon: Calculator, color: 'text-purple-400' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-yellow-400' },
    { id: 'profile', label: 'Profile', icon: User, color: 'text-cyan-400' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-orange-400' },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900/95 backdrop-blur-sm border-r border-green-500/30 flex flex-col relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 grid-cyber opacity-10"></div>
      
      {/* Header */}
      <div className="relative z-10 p-6 border-b border-green-500/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 cyber-glow rounded-lg rotate-slow bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
            <Server className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white cyber-glow">OptiDesk</h2>
            <p className="text-xs text-green-400">VDI Control</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              variant="ghost"
              className={`w-full justify-start space-x-3 py-3 px-4 text-left transition-all duration-300 ${
                isActive 
                  ? 'bg-green-500/20 border border-green-500/50 text-white cyber-glow' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-green-400' : item.color}`} />
              <span className="font-medium text-sm sm:text-base">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-green-400 rounded-full pulse-glow flex-shrink-0"></div>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="relative z-10 p-4 border-t border-green-500/30">
        <div className="space-y-3">
          {/* User Info */}
          <div className="flex items-center space-x-3 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {userName || "User"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {userEmail || "user@example.com"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full justify-start space-x-3 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Floating Decoration */}
      <div className="absolute bottom-20 right-4 w-12 h-12 cyber-glow-blue rounded-lg floating-animation opacity-20 hidden lg:block">
        <Monitor className="w-full h-full p-3 text-blue-400" />
      </div>
    </div>
  );
};
