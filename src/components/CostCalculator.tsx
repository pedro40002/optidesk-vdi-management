
import React, { useState } from 'react';
import { Calculator, DollarSign, Download, TrendingDown, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const CostCalculator = () => {
  const [users, setUsers] = useState(50);
  const [physicalCost, setPhysicalCost] = useState(1200);
  const [thinClientCost, setThinClientCost] = useState(300);

  const calculateSavings = () => {
    const totalPhysicalCost = users * physicalCost;
    const totalThinClientCost = users * thinClientCost;
    const savings = totalPhysicalCost - totalThinClientCost;
    const savingsPercentage = (savings / totalPhysicalCost) * 100;

    return {
      totalPhysicalCost,
      totalThinClientCost,
      savings,
      savingsPercentage
    };
  };

  const results = calculateSavings();

  const handleDownloadReport = async () => {
    // Create properly structured CSV data
    const csvData = [
      // Main header
      ['OptiDesk VDI Cost Analysis Report'],
      [`Generated: ${new Date().toLocaleDateString()}`],
      [''],
      
      // Configuration section with bold-style headers
      ['CONFIGURATION', 'VALUE'],
      ['Number of Users', users.toString()],
      ['Cost per Physical Desktop', `$${physicalCost.toLocaleString()}`],
      ['Cost per Thin Client', `$${thinClientCost.toLocaleString()}`],
      [''],
      
      // Cost analysis section with bold-style headers
      ['COST ANALYSIS', 'AMOUNT'],
      ['Total Physical Desktop Cost', `$${results.totalPhysicalCost.toLocaleString()}`],
      ['Total Thin Client Cost', `$${results.totalThinClientCost.toLocaleString()}`],
      ['Total Savings', `$${results.savings.toLocaleString()}`],
      ['Savings Percentage', `${results.savingsPercentage.toFixed(1)}%`],
      [''],
      
      // Additional benefits section with bold-style headers
      ['ADDITIONAL BENEFITS', 'PERCENTAGE'],
      ['Power Usage Reduction', '80%'],
      ['Faster Deployment', '90%'],
      ['Reduced Maintenance', '95%'],
      ['Uptime Guarantee', '99%']
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    try {
      // Try to use the modern File System Access API for better save dialog
      if ('showSaveFilePicker' in window) {
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: 'optidesk-cost-analysis.csv',
          types: [{
            description: 'CSV files',
            accept: { 'text/csv': ['.csv'] }
          }]
        });
        
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
      } else {
        // Fallback for older browsers
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'optidesk-cost-analysis.csv';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      // User cancelled or error occurred, fallback to regular download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'optidesk-cost-analysis.csv';
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden p-6">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 grid-cyber opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 cyber-glow-blue rounded-xl floating-animation opacity-30">
        <Calculator className="w-full h-full p-4 text-blue-400" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white cyber-glow mb-4">Cost Savings Calculator</h1>
          <p className="text-green-400 text-lg">Discover the financial benefits of OptiDesk VDI</p>
          <div className="w-48 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="glass-morphism border-green-500/30 cyber-glow">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-green-400" />
                <span>Configuration Parameters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-300 flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Number of Users</span>
                </Label>
                <Input
                  type="number"
                  value={users}
                  onChange={(e) => setUsers(parseInt(e.target.value) || 0)}
                  className="bg-slate-800/50 border-blue-500/30 text-white"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-red-400" />
                  <span>Cost per Physical Desktop</span>
                </Label>
                <Input
                  type="number"
                  value={physicalCost}
                  onChange={(e) => setPhysicalCost(parseInt(e.target.value) || 0)}
                  className="bg-slate-800/50 border-red-500/30 text-white"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span>Cost per Thin Client</span>
                </Label>
                <Input
                  type="number"
                  value={thinClientCost}
                  onChange={(e) => setThinClientCost(parseInt(e.target.value) || 0)}
                  className="bg-slate-800/50 border-green-500/30 text-white"
                  min="0"
                />
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleDownloadReport}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white cyber-glow"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Cost Analysis Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* Savings Summary */}
            <Card className="glass-morphism border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center space-x-2">
                  <TrendingDown className="w-5 h-5 text-green-400" />
                  <span>Total Projected Savings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-400 cyber-glow mb-2">
                    ${results.savings.toLocaleString()}
                  </div>
                  <div className="text-2xl text-white mb-4">
                    {results.savingsPercentage.toFixed(1)}% Cost Reduction
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-red-500/20 p-3 rounded-lg border border-red-500/30">
                      <div className="text-red-400 font-semibold">Physical Desktops</div>
                      <div className="text-white text-lg">${results.totalPhysicalCost.toLocaleString()}</div>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30">
                      <div className="text-green-400 font-semibold">Thin Clients</div>
                      <div className="text-white text-lg">${results.totalThinClientCost.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Comparison Chart */}
            <Card className="glass-morphism border-blue-500/30 cyber-glow-blue">
              <CardHeader>
                <CardTitle className="text-xl text-white">Cost Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Physical Desktops</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-4 bg-red-500/30 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-red-400 font-semibold">${results.totalPhysicalCost.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Thin Clients</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-4 bg-green-500/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(results.totalThinClientCost / results.totalPhysicalCost) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-green-400 font-semibold">${results.totalThinClientCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Benefits */}
            <Card className="glass-morphism border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-lg text-white">Additional Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-purple-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">80%</div>
                    <div className="text-gray-300">Less Power Usage</div>
                  </div>
                  <div className="text-center p-3 bg-blue-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">90%</div>
                    <div className="text-gray-300">Faster Deployment</div>
                  </div>
                  <div className="text-center p-3 bg-green-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">95%</div>
                    <div className="text-gray-300">Reduced Maintenance</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">99%</div>
                    <div className="text-gray-300">Uptime Guarantee</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
