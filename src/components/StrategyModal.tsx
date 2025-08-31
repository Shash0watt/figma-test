import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { X, TrendingUp, TrendingDown } from 'lucide-react';

interface Strategy {
  id: string;
  name: string;
  description: string;
  tags: string[];
  return: string;
  returnPercent: string;
  risk: 'Low' | 'Medium' | 'High';
  sparklineData: number[];
  assetClass: string;
  instrument: string;
  trigger: string;
  profitScenario: string;
  performance: {
    annualizedReturn: string;
    sharpeRatio: string;
    maxDrawdown: string;
  };
  riskAnalysis: string;
  exampleTrade: string;
  howItWorks: string;
}

interface MarketCorrelation {
  market: string;
  correlation: number;
  description: string;
}

interface StrategyModalProps {
  strategy: Strategy;
  isOpen: boolean;
  onClose: () => void;
}

function PerformanceChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 280;
    const y = 80 - ((value - min) / range) * 60;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-muted/30 rounded-lg p-4 mb-6">
      <svg width="100%" height="80" viewBox="0 0 280 80" className="w-full">
        <polyline
          points={points}
          fill="none"
          stroke="#00FFAB"
          strokeWidth="2"
          className="sparkline-path"
        />
        <circle
          cx={280}
          cy={80 - ((data[data.length - 1] - min) / range) * 60}
          r="3"
          fill="#00FFAB"
        />
      </svg>
    </div>
  );
}

function RiskGauge({ risk }: { risk: string }) {
  const getRiskLevel = (risk: string) => {
    switch (risk) {
      case 'Low': return 1;
      case 'Medium': return 2;
      case 'High': return 3;
      default: return 1;
    }
  };

  const level = getRiskLevel(risk);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-6 rounded-sm ${
              i <= level ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground font-inter-normal">{risk} Risk</span>
    </div>
  );
}

function CorrelationBar({ correlation }: { correlation: MarketCorrelation }) {
  const absCorr = Math.abs(correlation.correlation);
  const isPositive = correlation.correlation > 0;
  const progressValue = absCorr * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-inter-medium">{correlation.market}</span>
          {isPositive ? (
            <TrendingUp size={14} className="text-green-400" />
          ) : (
            <TrendingDown size={14} className="text-red-400" />
          )}
        </div>
        <span className={`text-sm font-inter-medium ${
          isPositive ? 'text-green-400' : 'text-red-400'
        }`}>
          {correlation.correlation > 0 ? '+' : ''}{(correlation.correlation * 100).toFixed(0)}%
        </span>
      </div>
      <div className="relative">
        <Progress 
          value={progressValue} 
          className={`h-2 ${
            isPositive ? '[&>div]:bg-green-400' : '[&>div]:bg-red-400'
          }`}
        />
      </div>
      <p className="text-xs text-muted-foreground font-inter-normal">
        {correlation.description}
      </p>
    </div>
  );
}

function MarketCorrelationSection({ strategyName }: { strategyName: string }) {
  // Mock correlation data based on strategy type
  const getCorrelationData = (name: string): MarketCorrelation[] => {
    switch (name) {
      case 'Earnings Crush':
        return [
          {
            market: 'S&P 500',
            correlation: -0.15,
            description: 'Low negative correlation during earnings seasons'
          },
          {
            market: 'VIX',
            correlation: 0.65,
            description: 'High positive correlation with volatility spikes'
          },
          {
            market: 'NASDAQ',
            correlation: -0.08,
            description: 'Minimal correlation with tech-heavy index'
          },
          {
            market: 'Bitcoin',
            correlation: 0.12,
            description: 'Slight positive correlation during volatility events'
          }
        ];
      case 'Volatility Fade':
        return [
          {
            market: 'S&P 500',
            correlation: 0.25,
            description: 'Moderate positive correlation with market stability'
          },
          {
            market: 'VIX',
            correlation: -0.72,
            description: 'Strong negative correlation with volatility index'
          },
          {
            market: 'NASDAQ',
            correlation: 0.18,
            description: 'Low positive correlation with tech sector'
          },
          {
            market: 'Bitcoin',
            correlation: -0.05,
            description: 'Near-zero correlation with crypto markets'
          }
        ];
      case 'Crypto Momentum Rider':
        return [
          {
            market: 'S&P 500',
            correlation: 0.35,
            description: 'Moderate positive correlation during risk-on periods'
          },
          {
            market: 'VIX',
            correlation: -0.22,
            description: 'Negative correlation with fear index'
          },
          {
            market: 'NASDAQ',
            correlation: 0.48,
            description: 'High correlation with tech and growth stocks'
          },
          {
            market: 'Bitcoin',
            correlation: 0.85,
            description: 'Very high correlation with crypto market leader'
          }
        ];
      default:
        return [];
    }
  };

  const correlations = getCorrelationData(strategyName);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-inter-medium">Market Correlation</CardTitle>
        <p className="text-xs text-muted-foreground font-inter-normal">
          How this strategy moves relative to major market indices
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {correlations.map((correlation, index) => (
          <CorrelationBar key={index} correlation={correlation} />
        ))}
      </CardContent>
    </Card>
  );
}

export function StrategyModal({ strategy, isOpen, onClose }: StrategyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-card border-border max-h-[90vh] p-0 flex flex-col">
        {/* Proper Dialog Header for Accessibility */}
        <DialogHeader className="p-6 pb-4 border-b border-border flex-shrink-0">
          <DialogTitle className="text-lg font-inter-semibold text-left">
            {strategy.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground font-inter-normal text-left mt-1">
            {strategy.description}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 pb-32">
            {/* Performance Chart */}
            <div>
              <h3 className="font-inter-medium mb-3">Performance</h3>
              <PerformanceChart data={strategy.sparklineData} />
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-primary font-inter-medium">{strategy.performance.annualizedReturn}</div>
                  <div className="text-xs text-muted-foreground font-inter-normal">Annual Return</div>
                </div>
                <div>
                  <div className="text-foreground font-inter-medium">{strategy.performance.sharpeRatio}</div>
                  <div className="text-xs text-muted-foreground font-inter-normal">Sharpe Ratio</div>
                </div>
                <div>
                  <div className="text-foreground font-inter-medium">{strategy.performance.maxDrawdown}</div>
                  <div className="text-xs text-muted-foreground font-inter-normal">Max Drawdown</div>
                </div>
              </div>
            </div>

            {/* Market Correlation Section */}
            <MarketCorrelationSection strategyName={strategy.name} />

            {/* How It Works */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-inter-medium">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground font-inter-normal leading-relaxed">
                {strategy.howItWorks}
              </CardContent>
            </Card>

            {/* Key Characteristics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-inter-medium">Key Characteristics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground font-inter-normal">Asset Class:</span>
                  <span className="text-sm font-inter-normal">{strategy.assetClass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground font-inter-normal">Instrument:</span>
                  <span className="text-sm font-inter-normal">{strategy.instrument}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground font-inter-normal">Trade Trigger:</span>
                  <span className="text-sm font-inter-normal">{strategy.trigger}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground font-inter-normal">Profit Scenario:</span>
                  <span className="text-sm font-inter-normal">{strategy.profitScenario}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-inter-normal">Risk Level:</span>
                  <RiskGauge risk={strategy.risk} />
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-inter-medium">Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground font-inter-normal leading-relaxed">
                {strategy.riskAnalysis}
              </CardContent>
            </Card>

            {/* Example Trade */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-inter-medium">Example Trade</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground font-inter-normal leading-relaxed">
                {strategy.exampleTrade}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fixed Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border p-6">
          <div className="space-y-3">
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-inter-medium"
              size="lg"
            >
              Buy Strategy
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/10 font-inter-medium"
              size="lg"
            >
              Add to Watchlist
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}