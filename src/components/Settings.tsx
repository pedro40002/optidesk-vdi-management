import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Server, Monitor, Wifi, Database, Bell, Lock, Palette, Globe, Save, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/contexts/SettingsContext';

export const Settings = () => {
  const { settings: globalSettings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(globalSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Sync local settings with global settings
  useEffect(() => {
    setLocalSettings(globalSettings);
  }, [globalSettings]);

  // Check for changes
  useEffect(() => {
    const changed = JSON.stringify(localSettings) !== JSON.stringify(globalSettings);
    setHasChanges(changed);
  }, [localSettings, globalSettings]);

  const handleSettingChange = (key: string, value: boolean | string) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update global settings
      updateSettings(localSettings);
      setHasChanges(false);
      
      toast({
        title: "Settings Saved",
        description: "All system settings have been successfully updated and are now active.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetSettings = () => {
    setLocalSettings(globalSettings);
    toast({
      title: "Changes Discarded",
      description: "All unsaved changes have been reverted.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 grid-cyber opacity-20"></div>
      
      {/* Floating 3D Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 cyber-glow rounded-xl floating-animation opacity-30">
        <SettingsIcon className="w-full h-full p-4 text-blue-400" />
      </div>
      <div className="absolute bottom-20 left-20 w-16 h-16 cyber-glow-blue rounded-lg floating-animation opacity-20" style={{animationDelay: '2s'}}>
        <Server className="w-full h-full p-3 text-green-400" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 cyber-glow rounded-xl rotate-slow bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white cyber-glow">System Settings</h1>
              <p className="text-blue-400">Configure OptiDesk Parameters</p>
            </div>
          </div>
          <div className="flex space-x-3">
            {hasChanges && (
              <Button 
                onClick={handleResetSettings}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500/20"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Discard Changes
              </Button>
            )}
            <Button 
              onClick={handleSaveSettings}
              disabled={!hasChanges || saving}
              className={`${
                hasChanges 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save All Settings'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Configuration */}
          <Card className="glass-morphism border-green-500/30 cyber-glow">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <Server className="w-5 h-5 text-green-400" />
                <span>System Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Automatic Backup</div>
                  <div className="text-gray-400 text-sm">Daily system backup at 2:00 AM</div>
                </div>
                <Switch 
                  checked={localSettings.autoBackup}
                  onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Maintenance Mode</div>
                  <div className="text-gray-400 text-sm">Temporarily disable user access</div>
                </div>
                <Switch 
                  checked={localSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">System Monitoring</div>
                  <div className="text-gray-400 text-sm">Real-time performance tracking</div>
                </div>
                <Switch 
                  checked={localSettings.systemMonitoring}
                  onCheckedChange={(checked) => handleSettingChange('systemMonitoring', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Network Settings */}
          <Card className="glass-morphism border-blue-500/30 cyber-glow-blue">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <Wifi className="w-5 h-5 text-blue-400" />
                <span>Network Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-white block mb-2">Max Concurrent Connections</label>
                <Input
                  value={localSettings.maxConnections}
                  onChange={(e) => handleSettingChange('maxConnections', e.target.value)}
                  className="bg-white/10 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="text-white block mb-2">Session Timeout (minutes)</label>
                <Input
                  value={localSettings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                  className="bg-white/10 border-gray-600 text-white"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Network Optimization</div>
                  <div className="text-gray-400 text-sm">Optimize bandwidth usage</div>
                </div>
                <Switch 
                  checked={localSettings.networkOptimization}
                  onCheckedChange={(checked) => handleSettingChange('networkOptimization', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="glass-morphism border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <Bell className="w-5 h-5 text-purple-400" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Email Alerts</div>
                  <div className="text-gray-400 text-sm">System alerts via email</div>
                </div>
                <Switch 
                  checked={localSettings.emailAlerts}
                  onCheckedChange={(checked) => handleSettingChange('emailAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">System Alerts</div>
                  <div className="text-gray-400 text-sm">Critical system notifications</div>
                </div>
                <Switch 
                  checked={localSettings.systemAlerts}
                  onCheckedChange={(checked) => handleSettingChange('systemAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Maintenance Notifications</div>
                  <div className="text-gray-400 text-sm">Scheduled maintenance alerts</div>
                </div>
                <Switch 
                  checked={localSettings.maintenanceNotifications}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Display & Interface */}
          <Card className="glass-morphism border-green-500/30 cyber-glow">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-green-400" />
                <span>Display & Interface</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Dark Mode</div>
                  <div className="text-gray-400 text-sm">Use dark theme interface</div>
                </div>
                <Switch 
                  checked={localSettings.darkMode}
                  onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Compact View</div>
                  <div className="text-gray-400 text-sm">Reduce spacing and padding</div>
                </div>
                <Switch 
                  checked={localSettings.compactView}
                  onCheckedChange={(checked) => handleSettingChange('compactView', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Animations</div>
                  <div className="text-gray-400 text-sm">Enable UI animations</div>
                </div>
                <Switch 
                  checked={localSettings.animationsEnabled}
                  onCheckedChange={(checked) => handleSettingChange('animationsEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Settings */}
        <Card className="glass-morphism border-red-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Lock className="w-5 h-5 text-red-400" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Two-Factor Authentication</div>
                  <div className="text-gray-400 text-sm">Require 2FA for login</div>
                </div>
                <Switch 
                  checked={localSettings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Auto Lock</div>
                  <div className="text-gray-400 text-sm">Lock after inactivity</div>
                </div>
                <Switch 
                  checked={localSettings.autoLock}
                  onCheckedChange={(checked) => handleSettingChange('autoLock', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Audit Logging</div>
                  <div className="text-gray-400 text-sm">Log all user actions</div>
                </div>
                <Switch 
                  checked={localSettings.auditLogging}
                  onCheckedChange={(checked) => handleSettingChange('auditLogging', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};