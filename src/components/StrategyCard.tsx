import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';

interface Strategy {
  id: string;
  name: string;
  description: string;
  tags: string[];
  return: string;
  returnPercent: string;
  risk: 'Low' | 'Medium' | 'High';
  sparklineData: number[];
}

interface StrategyCardProps {
  strategy: Strategy;
  onClick: () => void;
  isInWatchlist?: boolean;
  onToggleWatchlist?: () => void;
}

function MiniSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 60;
    const y = 20 - ((value - min) / range) * 15;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="60" height="20" className="flex-shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke="#00FFAB"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sparkline-path"
      />
    </svg>
  );
}

export function StrategyCard({ strategy, onClick, isInWatchlist = false, onToggleWatchlist }: StrategyCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWatchlist?.();
  };

  return (
    <Card 
      className="p-4 bg-card border-border cursor-pointer hover:bg-card/80 transition-all duration-200 hover:border-primary/20"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-inter-semibold text-white">{strategy.name}</h3>
            {onToggleWatchlist && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWatchlistClick}
                className="p-1 hover:bg-muted/50"
              >
                <Heart 
                  size={16} 
                  className={`transition-colors ${
                    isInWatchlist ? 'text-primary fill-primary' : 'text-muted-foreground'
                  }`}
                />
              </Button>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground font-inter-normal mb-3 line-clamp-2">
            {strategy.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {strategy.tags.map((tag, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className={`text-xs px-2 py-1 font-inter-normal border ${
                  tag.includes('Risk') 
                    ? getRiskColor(tag.replace(' Risk', '')) 
                    : 'bg-muted/50 text-muted-foreground border-muted/50'
                }`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
          <div className="text-right">
            <div className="text-primary font-inter-semibold text-sm">{strategy.return}</div>
            <div className="text-xs text-muted-foreground font-inter-normal">All-time</div>
          </div>
          <MiniSparkline data={strategy.sparklineData} />
        </div>
      </div>
    </Card>
  );
}