import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SettingsState {
  // System Settings
  autoBackup: boolean;
  maintenanceMode: boolean;
  systemMonitoring: boolean;
  
  // Network Settings
  maxConnections: string;
  sessionTimeout: string;
  networkOptimization: boolean;
  
  // Notification Settings
  emailAlerts: boolean;
  systemAlerts: boolean;
  maintenanceNotifications: boolean;
  
  // Display Settings
  darkMode: boolean;
  compactView: boolean;
  animationsEnabled: boolean;
  
  // Security Settings
  twoFactorAuth: boolean;
  autoLock: boolean;
  auditLogging: boolean;
}

interface SettingsContextType {
  settings: SettingsState;
  updateSettings: (newSettings: Partial<SettingsState>) => void;
  isMaintenanceMode: boolean;
}

const defaultSettings: SettingsState = {
  // System Settings
  autoBackup: true,
  maintenanceMode: false,
  systemMonitoring: true,
  
  // Network Settings
  maxConnections: '100',
  sessionTimeout: '30',
  networkOptimization: true,
  
  // Notification Settings
  emailAlerts: true,
  systemAlerts: true,
  maintenanceNotifications: true,
  
  // Display Settings
  darkMode: true,
  compactView: false,
  animationsEnabled: true,
  
  // Security Settings
  twoFactorAuth: false,
  autoLock: true,
  auditLogging: true
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('optidesk-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Apply settings to the document/body
  useEffect(() => {
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }

    // Apply compact view
    if (settings.compactView) {
      document.body.classList.add('compact-view');
    } else {
      document.body.classList.remove('compact-view');
    }

    // Apply animations
    if (!settings.animationsEnabled) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }

    // Apply custom CSS variables based on settings
    document.documentElement.style.setProperty(
      '--session-timeout', 
      `${parseInt(settings.sessionTimeout) * 60}s`
    );
    
    document.documentElement.style.setProperty(
      '--max-connections', 
      settings.maxConnections
    );
  }, [settings]);

  // Auto backup simulation
  useEffect(() => {
    if (settings.autoBackup) {
      const interval = setInterval(() => {
        const now = new Date();
        if (now.getHours() === 2 && now.getMinutes() === 0) {
          console.log('🔄 Automatic backup performed at', now.toISOString());
          if (settings.systemAlerts) {
            // In a real app, this would trigger a notification
            console.log('📧 Backup notification sent');
          }
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [settings.autoBackup, settings.systemAlerts]);

  // Auto lock simulation
  useEffect(() => {
    if (settings.autoLock) {
      let timeout: NodeJS.Timeout;
      
      const resetTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          console.log('🔒 Auto-lock triggered after inactivity');
          if (settings.systemAlerts) {
            console.log('📧 Auto-lock notification sent');
          }
        }, parseInt(settings.sessionTimeout) * 60 * 1000);
      };

      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      events.forEach(event => {
        document.addEventListener(event, resetTimeout, true);
      });

      resetTimeout();

      return () => {
        clearTimeout(timeout);
        events.forEach(event => {
          document.removeEventListener(event, resetTimeout, true);
        });
      };
    }
  }, [settings.autoLock, settings.sessionTimeout, settings.systemAlerts]);

  const updateSettings = (newSettings: Partial<SettingsState>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('optidesk-settings', JSON.stringify(updatedSettings));
    
    // Log changes if audit logging is enabled
    if (settings.auditLogging) {
      console.log('📋 Settings changed:', Object.keys(newSettings), 'at', new Date().toISOString());
    }
  };

  const value: SettingsContextType = {
    settings,
    updateSettings,
    isMaintenanceMode: settings.maintenanceMode
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};