import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Calendar, Settings, Edit3, Save, X, Key, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: 'User',
    department: '',
    joinDate: '',
    lastLogin: ''
  });

  const [editProfile, setEditProfile] = useState({ ...profile });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (user) {
        const firstName = user.user_metadata?.first_name || '';
        const lastName = user.user_metadata?.last_name || '';
        const displayName = firstName && lastName ? `${firstName} ${lastName}` : user.email?.split('@')[0] || 'User';
        
        const userProfile = {
          name: displayName,
          email: user.email || '',
          role: 'User',
          department: user.user_metadata?.department || 'Not specified',
          joinDate: user.created_at || '',
          lastLogin: user.last_sign_in_at || user.created_at || ''
        };
        
        setProfile(userProfile);
        setEditProfile(userProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile information",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: editProfile.name.split(' ')[0] || '',
          last_name: editProfile.name.split(' ').slice(1).join(' ') || '',
          department: editProfile.department
        }
      });

      if (error) throw error;

      setProfile({ ...editProfile });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditProfile({ ...profile });
    setIsEditing(false);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setPasswordDialog(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 grid-cyber opacity-20"></div>
      
      {/* Floating 3D Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 cyber-glow rounded-xl floating-animation opacity-30">
        <User className="w-full h-full p-4 text-green-400" />
      </div>
      <div className="absolute bottom-20 left-20 w-16 h-16 cyber-glow-blue rounded-lg floating-animation opacity-20" style={{animationDelay: '2s'}}>
        <Shield className="w-full h-full p-3 text-blue-400" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 cyber-glow rounded-xl rotate-slow bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white cyber-glow">User Profile</h1>
              <p className="text-green-400">Account Settings & Information</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button 
                  onClick={handleCancel}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/20"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-morphism border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center space-x-2">
                  <User className="w-5 h-5 text-green-400" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
                    {isEditing ? (
                      <Input
                        value={editProfile.name}
                        onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                        className="bg-white/10 border-gray-600 text-white"
                      />
                    ) : (
                      <div className="text-white text-lg">{profile.name}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
                    {isEditing ? (
                      <Input
                        value={editProfile.email}
                        onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                        className="bg-white/10 border-gray-600 text-white"
                      />
                    ) : (
                      <div className="text-white text-lg">{profile.email}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Department</label>
                    {isEditing ? (
                      <Input
                        value={editProfile.department}
                        onChange={(e) => setEditProfile({...editProfile, department: e.target.value})}
                        className="bg-white/10 border-gray-600 text-white"
                      />
                    ) : (
                      <div className="text-white text-lg">{profile.department}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Role</label>
                    <div className="text-white text-lg">{profile.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Activity */}
            <Card className="glass-morphism border-blue-500/30 cyber-glow-blue">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span>Account Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-gray-700">
                    <div>
                      <div className="text-white">Join Date</div>
                      <div className="text-gray-400 text-sm">
                        {profile.joinDate ? new Date(profile.joinDate).toLocaleDateString() : 'Not available'}
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-400">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-gray-700">
                    <div>
                      <div className="text-white">Last Login</div>
                      <div className="text-gray-400 text-sm font-mono">
                        {profile.lastLogin ? new Date(profile.lastLogin).toLocaleString() : 'Not available'}
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Security */}
          <div className="space-y-6">
            <Card className="glass-morphism border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span>Account Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <span className="text-white">Email Verified</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <span className="text-white">Two-Factor Auth</span>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <span className="text-white">Session Active</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-morphism border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-green-400" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={passwordDialog} onOpenChange={setPasswordDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/20">
                      <Key className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Change Password</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Enter your new password below. It must be at least 6 characters long.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">New Password</label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Confirm Password</label>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={handlePasswordChange}
                          disabled={loading || !newPassword || !confirmPassword}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {loading ? 'Updating...' : 'Update Password'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setPasswordDialog(false)}
                          className="border-slate-600 text-slate-400"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};