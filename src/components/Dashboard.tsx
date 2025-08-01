
import React, { useState, useEffect } from 'react';
import { Monitor, Cpu, HardDrive, Activity, Users, Play, Square, RotateCcw, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface VM {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'starting' | 'stopping';
  ip: string;
  cpu: number;
  memory: number;
}

export const Dashboard = () => {
  const [vms, setVms] = useState<VM[]>([
    { id: '1', name: 'Desktop-001', status: 'running', ip: '192.168.1.101', cpu: 45, memory: 67 },
    { id: '2', name: 'Desktop-002', status: 'stopped', ip: '192.168.1.102', cpu: 0, memory: 0 },
    { id: '3', name: 'Desktop-003', status: 'running', ip: '192.168.1.103', cpu: 23, memory: 43 },
    { id: '4', name: 'Desktop-004', status: 'running', ip: '192.168.1.104', cpu: 78, memory: 89 },
  ]);

  const [systemStats, setSystemStats] = useState({
    cpuUsage: 67,
    ramUsage: 54,
    activeVMs: 3,
    totalVMs: 4
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time CPU/RAM fluctuation
      setSystemStats(prev => ({
        ...prev,
        cpuUsage: Math.max(30, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        ramUsage: Math.max(20, Math.min(95, prev.ramUsage + (Math.random() - 0.5) * 8))
      }));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleVMAction = (id: string, action: 'start' | 'stop' | 'reset') => {
    setVms(prev => prev.map(vm => 
      vm.id === id 
        ? { 
            ...vm, 
            status: action === 'stop' ? 'stopped' : 'running',
            cpu: action === 'stop' ? 0 : Math.floor(Math.random() * 80) + 10,
            memory: action === 'stop' ? 0 : Math.floor(Math.random() * 70) + 20
          }
        : vm
    ));
    
    // Update active VMs count immediately
    setSystemStats(prev => ({
      ...prev,
      activeVMs: action === 'stop' 
        ? Math.max(0, prev.activeVMs - 1)
        : action === 'start' 
        ? Math.min(4, prev.activeVMs + 1)
        : prev.activeVMs
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-400';
      case 'stopped': return 'text-red-400';
      case 'starting': return 'text-yellow-400';
      case 'stopping': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return '●';
      case 'stopped': return '●';
      case 'starting': return '⟳';
      case 'stopping': return '⟳';
      default: return '●';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 grid-cyber opacity-20"></div>
      
      {/* Floating 3D Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 cyber-glow-blue rounded-xl floating-animation opacity-30 hidden lg:block">
        <Server className="w-full h-full p-4 text-blue-400" />
      </div>
      <div className="absolute bottom-20 left-20 w-16 h-16 cyber-glow rounded-lg floating-animation opacity-20 hidden md:block" style={{animationDelay: '2s'}}>
        <Monitor className="w-full h-full p-3 text-green-400" />
      </div>

      <div className="relative z-10 p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 cyber-glow rounded-xl rotate-slow bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <Server className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white cyber-glow">OptiDesk</h1>
              <p className="text-green-400 text-sm md:text-base">Virtual Desktop Infrastructure</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xl md:text-2xl font-mono text-white">{currentTime.toLocaleTimeString()}</div>
            <div className="text-sm text-gray-400">{currentTime.toLocaleDateString()}</div>
          </div>
        </div>

        {/* System Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="glass-morphism border-green-500/30 cyber-glow slide-in-right">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">CPU Usage</CardTitle>
              <Cpu className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemStats.cpuUsage.toFixed(1)}%</div>
              <Progress value={systemStats.cpuUsage} className="mt-2 h-2" />
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
                <span className="text-xs text-gray-400">Real-time monitoring</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-blue-500/30 cyber-glow-blue slide-in-right" style={{animationDelay: '0.1s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">RAM Usage</CardTitle>
              <HardDrive className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemStats.ramUsage.toFixed(1)}%</div>
              <Progress value={systemStats.ramUsage} className="mt-2 h-2" />
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full pulse-glow"></div>
                <span className="text-xs text-gray-400">16GB Total</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-green-500/30 cyber-glow slide-in-right" style={{animationDelay: '0.2s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active VMs</CardTitle>
              <Activity className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemStats.activeVMs}</div>
              <p className="text-xs text-gray-400 mt-2">of {systemStats.totalVMs} total</p>
              <div className="flex space-x-1 mt-2">
                {Array.from({length: systemStats.totalVMs}).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full ${i < systemStats.activeVMs ? 'bg-green-400 pulse-glow' : 'bg-gray-600'}`}
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-purple-500/30 slide-in-right" style={{animationDelay: '0.3s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Connected Users</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-gray-400 mt-2">Peak: 18 today</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full pulse-glow"></div>
                <span className="text-xs text-gray-400">Live sessions</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Virtual Machines Table */}
        <Card className="glass-morphism border-green-500/30 cyber-glow">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Monitor className="w-5 h-5 text-green-400" />
              <span>Virtual Machines</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300">Name</th>
                    <th className="text-left py-3 px-4 text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 text-gray-300">IP Address</th>
                    <th className="text-left py-3 px-4 text-gray-300">CPU</th>
                    <th className="text-left py-3 px-4 text-gray-300">Memory</th>
                    <th className="text-left py-3 px-4 text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vms.map((vm) => (
                    <tr key={vm.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{vm.name}</td>
                      <td className="py-4 px-4">
                        <span className={`flex items-center space-x-2 ${getStatusColor(vm.status)}`}>
                          <span className={vm.status.includes('ing') ? 'animate-spin' : ''}>{getStatusIcon(vm.status)}</span>
                          <span className="capitalize">{vm.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300 font-mono">{vm.ip}</td>
                      <td className="py-4 px-4 text-gray-300">{vm.cpu}%</td>
                      <td className="py-4 px-4 text-gray-300">{vm.memory}%</td>
                      <td className="py-4 px-4">
                         <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVMAction(vm.id, 'start')}
                              className="border-green-500 text-green-400 hover:bg-green-500/20"
                            >
                              <Play className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVMAction(vm.id, 'stop')}
                              className="border-red-500 text-red-400 hover:bg-red-500/20"
                            >
                              <Square className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVMAction(vm.id, 'reset')}
                              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/20"
                            >
                              <RotateCcw className="w-3 h-3" />
                            </Button>
                          </div>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
