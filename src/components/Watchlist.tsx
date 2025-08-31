import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Heart, Search, TrendingUp, TrendingDown, Plus, Trash2 } from 'lucide-react';

interface WatchlistItem {
  id: string;
  name: string;
  description: string;
  return: string;
  returnPercent: number;
  risk: 'Low' | 'Medium' | 'High';
  tags: string[];
  sparklineData: number[];
  dateAdded: string;
}

const watchlistItems: WatchlistItem[] = [
  {
    id: '4',
    name: 'Bond Arbitrage Pro',
    description: 'Exploits price differences between government bonds.',
    return: '+8.4%',
    returnPercent: 8.4,
    risk: 'Low',
    tags: ['Bonds', 'Low Risk', 'Arbitrage'],
    sparklineData: [5, 6, 7, 8, 8.2, 8.4, 8.3],
    dateAdded: '2 days ago'
  },
  {
    id: '5',
    name: 'AI Sentiment Scanner',
    description: 'Uses AI to analyze market sentiment from social media.',
    return: '+28.6%',
    returnPercent: 28.6,
    risk: 'High',
    tags: ['AI', 'High Risk', 'Sentiment'],
    sparklineData: [15, 18, 22, 26, 28, 29, 28.6],
    dateAdded: '1 week ago'
  },
  {
    id: '6',
    name: 'REIT Dividend Hunter',
    description: 'Focuses on high-dividend real estate investment trusts.',
    return: '+6.8%',
    returnPercent: 6.8,
    risk: 'Medium',
    tags: ['REITs', 'Medium Risk', 'Dividends'],
    sparklineData: [4, 5, 5.5, 6, 6.5, 6.8, 6.7],
    dateAdded: '3 weeks ago'
  }
];

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

export function Watchlist() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(watchlistItems);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const removeFromWatchlist = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header */}
      <div className="p-6 pt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-inter-semibold mb-2">Watchlist</h1>
            <p className="text-sm text-muted-foreground font-inter-normal">
              Monitor strategies you're interested in
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Heart size={24} className="text-primary fill-primary" />
            <span className="text-sm font-inter-medium text-primary">{items.length}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search watchlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border font-inter-normal"
          />
        </div>
      </div>

      {/* Watchlist Summary Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-3">
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-inter-normal">Total Items</p>
              <p className="text-lg font-inter-semibold text-primary">{items.length}</p>
            </div>
          </Card>
          <Card className="p-3">
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-inter-normal">Avg Return</p>
              <p className="text-lg font-inter-semibold text-green-400">
                +{(items.reduce((sum, item) => sum + item.returnPercent, 0) / items.length).toFixed(1)}%
              </p>
            </div>
          </Card>
          <Card className="p-3">
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-inter-normal">Best</p>
              <p className="text-lg font-inter-semibold text-green-400">
                +{Math.max(...items.map(item => item.returnPercent)).toFixed(1)}%
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Watchlist Items */}
      <div className="px-6">
        {filteredItems.length > 0 ? (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="p-4 hover:bg-card/80 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-inter-semibold">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromWatchlist(item.id)}
                        className="p-1 h-auto text-muted-foreground hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground font-inter-normal mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {item.tags.map((tag, index) => (
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
                    <p className="text-xs text-muted-foreground font-inter-normal">
                      Added {item.dateAdded}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-primary font-inter-semibold text-sm">{item.return}</div>
                      <div className="text-xs text-muted-foreground font-inter-normal">Projected</div>
                    </div>
                    <MiniSparkline data={item.sparklineData} />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-inter-medium" size="sm">
                    Buy Strategy
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-inter-medium" size="sm">
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            {searchQuery ? (
              <>
                <Search size={32} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-inter-normal">
                  No strategies found matching "{searchQuery}"
                </p>
              </>
            ) : (
              <>
                <Heart size={32} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-inter-normal mb-2">Your watchlist is empty</p>
                <p className="text-sm text-muted-foreground font-inter-normal">
                  Add strategies you're interested in to track their performance
                </p>
                <Button className="mt-4" variant="outline">
                  <Plus size={16} className="mr-2" />
                  Browse Strategies
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}