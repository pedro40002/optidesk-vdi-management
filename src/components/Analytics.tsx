import React from 'react';
import { BarChart3, TrendingUp, Users, Activity, Server, Monitor, Clock, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const Analytics = () => {
  const analyticsData = {
    totalSessions: 1247,
    avgSessionTime: '4h 32m',
    peakUsers: 89,
    systemUptime: '99.8%',
    dataTransferred: '2.3TB',
    costSavings: '$45,320'
  };

  const weeklyStats = [
    { day: 'Mon', sessions: 65, usage: 78 },
    { day: 'Tue', sessions: 89, usage: 85 },
    { day: 'Wed', sessions: 92, usage: 88 },
    { day: 'Thu', sessions: 78, usage: 82 },
    { day: 'Fri', sessions: 95, usage: 90 },
    { day: 'Sat', sessions: 34, usage: 45 },
    { day: 'Sun', sessions: 28, usage: 38 }
  ];

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 grid-cyber opacity-20"></div>
      
      {/* Floating 3D Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 cyber-glow-blue rounded-xl floating-animation opacity-30">
        <BarChart3 className="w-full h-full p-4 text-blue-400" />
      </div>
      <div className="absolute bottom-20 left-20 w-16 h-16 cyber-glow rounded-lg floating-animation opacity-20" style={{animationDelay: '2s'}}>
        <TrendingUp className="w-full h-full p-3 text-green-400" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 cyber-glow rounded-xl rotate-slow bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white cyber-glow">Analytics Dashboard</h1>
              <p className="text-blue-400">Performance & Usage Insights</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Last Updated</div>
            <div className="text-lg font-mono text-white">{new Date().toLocaleTimeString()}</div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card className="glass-morphism border-blue-500/30 cyber-glow-blue slide-in-right">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Sessions</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.totalSessions}</div>
              <p className="text-xs text-green-400 mt-1">+12% from last week</p>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-green-500/30 cyber-glow slide-in-right" style={{animationDelay: '0.1s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Session</CardTitle>
              <Clock className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.avgSessionTime}</div>
              <p className="text-xs text-green-400 mt-1">+8% increase</p>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-purple-500/30 slide-in-right" style={{animationDelay: '0.2s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Peak Users</CardTitle>
              <Activity className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.peakUsers}</div>
              <p className="text-xs text-gray-400 mt-1">Today at 2:30 PM</p>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-green-500/30 cyber-glow slide-in-right" style={{animationDelay: '0.3s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">System Uptime</CardTitle>
              <Server className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.systemUptime}</div>
              <p className="text-xs text-green-400 mt-1">99 days running</p>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-blue-500/30 cyber-glow-blue slide-in-right" style={{animationDelay: '0.4s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Data Transfer</CardTitle>
              <Database className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.dataTransferred}</div>
              <p className="text-xs text-gray-400 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-green-500/30 cyber-glow slide-in-right" style={{animationDelay: '0.5s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Cost Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.costSavings}</div>
              <p className="text-xs text-green-400 mt-1">vs. traditional PCs</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Usage Chart */}
        <Card className="glass-morphism border-blue-500/30 cyber-glow-blue">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span>Weekly Usage Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyStats.map((stat, index) => (
                <div key={stat.day} className="flex items-center space-x-4">
                  <div className="w-12 text-gray-300 font-mono">{stat.day}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Sessions: {stat.sessions}</span>
                      <span className="text-gray-400">Usage: {stat.usage}%</span>
                    </div>
                    <Progress value={stat.usage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Activity */}
        <Card className="glass-morphism border-green-500/30 cyber-glow">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Monitor className="w-5 h-5 text-green-400" />
              <span>Real-time Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '14:32:15', event: 'User john.doe logged into Desktop-003', type: 'login' },
                { time: '14:31:42', event: 'Desktop-001 CPU usage spike detected', type: 'warning' },
                { time: '14:30:18', event: 'Backup completed successfully', type: 'success' },
                { time: '14:29:55', event: 'New user session started on Desktop-004', type: 'login' },
                { time: '14:28:33', event: 'System maintenance completed', type: 'success' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-gray-700">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'login' ? 'bg-blue-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' :
                    'bg-green-400'
                  } pulse-glow`}></div>
                  <div className="font-mono text-sm text-gray-400">{activity.time}</div>
                  <div className="text-white flex-1">{activity.event}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};