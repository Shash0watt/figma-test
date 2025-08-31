import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PerformanceChart } from './PerformanceChart';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3 } from 'lucide-react';

const portfolioData = [
  { month: 'JAN', value: 85000 },
  { month: 'FEB', value: 88000 },
  { month: 'MAR', value: 82000 },
  { month: 'APR', value: 91000 },
  { month: 'MAY', value: 95000 },
  { month: 'JUN', value: 98081 }
];

const positions = [
  {
    id: '1',
    name: 'Earnings Crush',
    allocation: 45,
    value: 44136.79,
    return: '+8.2%',
    returnAmount: '+$3,341',
    isPositive: true,
    status: 'active'
  },
  {
    id: '2',
    name: 'Volatility Fade',
    allocation: 30,
    value: 29424.53,
    return: '+12.8%',
    returnAmount: '+$3,340',
    isPositive: true,
    status: 'active'
  },
  {
    id: '3',
    name: 'Crypto Momentum Rider',
    allocation: 25,
    value: 24520.43,
    return: '-2.1%',
    returnAmount: '-$524',
    isPositive: false,
    status: 'active'
  }
];

const portfolioStats = [
  { label: 'Total Value', value: '$98,081.75', change: '+9.77%', icon: DollarSign },
  { label: 'Active Strategies', value: '3', change: null, icon: PieChart },
  { label: 'Monthly Return', value: '+$3,081', change: '+3.24%', icon: TrendingUp },
  { label: 'Best Performer', value: 'Volatility Fade', change: '+12.8%', icon: BarChart3 }
];

export function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header */}
      <div className="p-6 pt-8">
        <h1 className="text-2xl font-inter-semibold mb-2">Portfolio</h1>
        <p className="text-sm text-muted-foreground font-inter-normal">
          Track your strategy performance and allocations
        </p>
      </div>

      {/* Performance Chart */}
      <div className="px-6 mb-8">
        <PerformanceChart data={portfolioData} />
      </div>

      {/* Portfolio Stats Grid */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          {portfolioStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground font-inter-normal">{stat.label}</p>
                    <p className="font-inter-semibold text-sm">{stat.value}</p>
                    {stat.change && (
                      <p className={`text-xs font-inter-medium ${
                        stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stat.change}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Active Positions */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-inter-medium">Active Positions</h2>
          <Button variant="outline" size="sm" className="text-xs">
            Rebalance
          </Button>
        </div>

        <div className="space-y-4">
          {positions.map((position) => (
            <Card key={position.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-inter-medium">{position.name}</h3>
                    <Badge variant={position.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                      {position.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-inter-normal">
                    {position.allocation}% allocation
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-inter-medium">${position.value.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    {position.isPositive ? (
                      <TrendingUp size={12} className="text-green-400" />
                    ) : (
                      <TrendingDown size={12} className="text-red-400" />
                    )}
                    <span className={`text-xs font-inter-medium ${
                      position.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {position.return}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Allocation Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${position.allocation}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground font-inter-normal">
                <span>P&L: {position.returnAmount}</span>
                <span>{position.allocation}% of portfolio</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}