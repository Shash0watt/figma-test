import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { StrategyCard } from './StrategyCard';
import { StrategyModal } from './StrategyModal';
import { PerformanceChart } from './PerformanceChart';
import { FilterModal } from './FilterModal';
import { NotificationPanel } from './NotificationPanel';
import { Portfolio } from './Portfolio';
import { Watchlist } from './Watchlist';
import { Profile } from './Profile';
import { User, Home, TrendingUp, Settings, Filter, Bell, Heart } from 'lucide-react';

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

interface FilterOptions {
  riskLevels: string[];
  assetClasses: string[];
  returnRange: [number, number];
  instruments: string[];
  maxDrawdownRange: [number, number];
  sharpeRatioRange: [number, number];
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  strategyName?: string;
  amount?: string;
  isRead: boolean;
}

const strategies: Strategy[] = [
  {
    id: '1',
    name: 'Algo-1',
    description: 'Bets against extreme price moves after company earnings.',
    tags: ['Stocks', 'High Risk', 'Options'],
    return: '+24.5%',
    returnPercent: '24.5',
    risk: 'High',
    sparklineData: [10, 15, 12, 18, 22, 25, 24],
    assetClass: 'US FinTech & Consumer Stocks',
    instrument: 'Options (Short Straddles)',
    trigger: 'High implied volatility pre-earnings',
    profitScenario: 'The stock price stays within a calculated range.',
    performance: {
      annualizedReturn: '18.5%',
      sharpeRatio: '1.2',
      maxDrawdown: '-22%'
    },
    riskAnalysis: '⚠️ High Risk. While this strategy has a high win rate, a single unexpected, massive price swing in a stock can lead to significant, theoretically unlimited losses.',
    exampleTrade: 'Before $FIN Corp reported earnings, the market expected a 15% price move. The algo initiated a trade betting it would move less than that. The stock only moved 8%, and the position was closed for a profit two days later.',
    howItWorks: 'Focus on capitalizing
elevated volatility by shorting
straddles on FinTech and
Consumer US Single Stocks
before earnings
announcements, monetizing
post-event gamma reversion.
4 Day Holding Period.
'
  },
  {
    id: '2',
    name: 'Volatility Fade',
    description: 'Profits from the predictable drop in volatility after earnings.',
    tags: ['Stocks', 'Medium Risk', 'Options'],
    return: '+12.8%',
    returnPercent: '12.8',
    risk: 'Medium',
    sparklineData: [8, 10, 9, 11, 13, 12, 13],
    assetClass: 'US/EU Small & Mid-Cap Stocks',
    instrument: 'Options (Double Diagonals)',
    trigger: 'Post-earnings implied volatility (IV) crush',
    profitScenario: 'The stock price trades within a wide range over the next month.',
    performance: {
      annualizedReturn: '12%',
      sharpeRatio: '0.9',
      maxDrawdown: '-15%'
    },
    riskAnalysis: '✅ Defined Risk. Your maximum possible loss is limited to the initial amount you invest in the trade, making it a more controlled strategy.',
    exampleTrade: 'After $CSM Inc. reported earnings, its volatility dropped 50%. The algo bought a spread designed to profit if the stock stayed between $40 and $55 for the next 30 days.',
    howItWorks: 'After earnings are released, market uncertainty (and thus option prices) tends to "crush." This strategy enters after that crush, using a complex options spread (a double diagonal) to profit from time decay while volatility stays low. It\'s a bet that the stock will remain relatively stable in the weeks following the announcement.'
  },
  {
    id: '3',
    name: 'Crypto Momentum Rider',
    description: 'Buys into the hottest, trending crypto tokens weekly.',
    tags: ['Crypto', 'High Risk', 'Momentum'],
    return: '+45.2%',
    returnPercent: '45.2',
    risk: 'High',
    sparklineData: [5, 8, 12, 20, 35, 42, 45],
    assetClass: 'High-Volume Crypto Tokens',
    instrument: 'Spot Crypto (direct ownership)',
    trigger: 'Sustained positive price momentum and volume',
    profitScenario: 'The purchased token continues its upward trend for the week.',
    performance: {
      annualizedReturn: '45%',
      sharpeRatio: '0.7',
      maxDrawdown: '-55%'
    },
    riskAnalysis: '⚠️ High Risk. Crypto is extremely volatile. Momentum can reverse instantly, leading to sharp and sudden losses. This strategy can experience significant drawdowns.',
    exampleTrade: 'When $TKN showed a 60% price increase on high volume, the algo bought it. It rode the trend for another 25% gain before selling it at the end of the week to buy the next emerging leader.',
    howItWorks: 'This strategy constantly scans the market for crypto tokens that are showing strong upward price trends. It identifies assets gaining significant "buzz" and retail interest, buys them, and holds for one week to capture the peak of the momentum before rotating into the next leading token.'
  }
];

const portfolioData = [
  { month: 'JAN', value: 85000 },
  { month: 'FEB', value: 88000 },
  { month: 'MAR', value: 82000 },
  { month: 'APR', value: 91000 },
  { month: 'MAY', value: 95000 },
  { month: 'JUN', value: 98081 }
];

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Strategy Performance Update',
    message: 'Earnings Crush strategy has gained +2.4% this week, outperforming expectations.',
    timestamp: '2 hours ago',
    strategyName: 'Earnings Crush',
    amount: '+$2,400',
    isRead: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Risk Alert',
    message: 'Crypto Momentum Rider experiencing higher than usual volatility. Consider reviewing position size.',
    timestamp: '5 hours ago',
    strategyName: 'Crypto Momentum Rider',
    isRead: false
  },
  {
    id: '3',
    type: 'info',
    title: 'Market Update',
    message: 'Earnings season begins next week. Your strategies are positioned to capitalize on volatility.',
    timestamp: '1 day ago',
    isRead: true
  }
];

export function Dashboard() {
  const [selectedRisk, setSelectedRisk] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<FilterOptions>({
    riskLevels: [],
    assetClasses: [],
    returnRange: [0, 100],
    instruments: [],
    maxDrawdownRange: [0, 100],
    sharpeRatioRange: [0, 3]
  });

  const applyFilters = (strategy: Strategy): boolean => {
    if (selectedRisk !== 'All' && strategy.risk !== selectedRisk) {
      return false;
    }
    
    if (filters.riskLevels.length > 0 && !filters.riskLevels.includes(strategy.risk)) {
      return false;
    }
    
    if (filters.assetClasses.length > 0) {
      const hasMatchingAssetClass = filters.assetClasses.some(assetClass => 
        strategy.tags.includes(assetClass)
      );
      if (!hasMatchingAssetClass) return false;
    }
    
    const returnPercent = parseFloat(strategy.returnPercent);
    if (returnPercent < filters.returnRange[0] || returnPercent > filters.returnRange[1]) {
      return false;
    }
    
    return true;
  };

  const filteredStrategies = strategies.filter(applyFilters);
  const riskLevels = ['All', 'Low', 'Medium', 'High'] as const;
  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const toggleWatchlist = (strategyId: string) => {
    setWatchlist(prev => 
      prev.includes(strategyId) 
        ? prev.filter(id => id !== strategyId)
        : [...prev, strategyId]
    );
  };

  // Handle notifications view
  if (showNotifications) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="p-6 pt-8 pb-24">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => setShowNotifications(false)}
              className="text-sm font-inter-medium"
            >
              ← Back
            </Button>
          </div>
          <NotificationPanel
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onClearAll={handleClearAllNotifications}
          />
        </div>
      </div>
    );
  }

  // Render different tabs based on activeTab
  if (activeTab === 'portfolio') {
    return (
      <div className="min-h-screen bg-background">
        <Portfolio />
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
          <div className="flex justify-around py-3">
            {[
              { icon: Home, id: 'home', label: 'Home' },
              { icon: TrendingUp, id: 'portfolio', label: 'Portfolio' },
              { icon: Heart, id: 'watchlist', label: 'Watchlist' },
              { icon: User, id: 'profile', label: 'Profile' }
            ].map(({ icon: Icon, id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center gap-1 p-2 transition-colors font-inter-normal ${
                  activeTab === id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'watchlist') {
    return (
      <div className="min-h-screen bg-background">
        <Watchlist />
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
          <div className="flex justify-around py-3">
            {[
              { icon: Home, id: 'home', label: 'Home' },
              { icon: TrendingUp, id: 'portfolio', label: 'Portfolio' },
              { icon: Heart, id: 'watchlist', label: 'Watchlist' },
              { icon: User, id: 'profile', label: 'Profile' }
            ].map(({ icon: Icon, id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center gap-1 p-2 transition-colors font-inter-normal ${
                  activeTab === id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'profile') {
    return (
      <div className="min-h-screen bg-background">
        <Profile />
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
          <div className="flex justify-around py-3">
            {[
              { icon: Home, id: 'home', label: 'Home' },
              { icon: TrendingUp, id: 'portfolio', label: 'Portfolio' },
              { icon: Heart, id: 'watchlist', label: 'Watchlist' },
              { icon: User, id: 'profile', label: 'Profile' }
            ].map(({ icon: Icon, id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center gap-1 p-2 transition-colors font-inter-normal ${
                  activeTab === id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default home tab
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-8">
        <div className="flex-1">
          <h1 className="text-base text-muted-foreground font-inter-normal mb-1">Good Morning, James</h1>
          <div className="mb-1">
            <span className="text-3xl font-inter-semibold">$98,081.75</span>
          </div>
          <span className="text-primary text-sm font-inter-medium">+1700.254 (9.77%)</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotifications(true)}
            className="relative p-2"
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-inter-medium text-primary-foreground">
                  {unreadNotifications}
                </span>
              </div>
            )}
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-white text-black font-inter-medium">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Performance Chart - Much larger */}
      <div className="px-6 mb-8">
        <PerformanceChart data={portfolioData} />
      </div>

      {/* Your Strategies Section */}
      <div className="px-6 pb-24">
        <h2 className="text-lg font-inter-medium mb-4">Your Strategies</h2>
        
        {/* Risk Filter Pills with Filter Button */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-2 flex-1 overflow-x-auto">
            {riskLevels.map((risk) => (
              <Button
                key={risk}
                variant={selectedRisk === risk ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedRisk(risk)}
                className={`rounded-full px-4 py-2 text-sm font-inter-medium transition-all whitespace-nowrap ${
                  selectedRisk === risk
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {risk}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilterModal(true)}
            className="p-2 hover:bg-muted/50 flex-shrink-0"
          >
            <Filter size={16} />
          </Button>
        </div>

        {/* Strategy Cards */}
        <div className="space-y-3">
          {filteredStrategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy}
              onClick={() => setSelectedStrategy(strategy)}
              isInWatchlist={watchlist.includes(strategy.id)}
              onToggleWatchlist={() => toggleWatchlist(strategy.id)}
            />
          ))}
        </div>

        {filteredStrategies.length === 0 && (
          <div className="text-center py-8">
            <TrendingUp size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground font-inter-normal">
              No strategies match your current filters
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex justify-around py-3">
          {[
            { icon: Home, id: 'home', label: 'Home' },
            { icon: TrendingUp, id: 'portfolio', label: 'Portfolio' },
            { icon: Heart, id: 'watchlist', label: 'Watchlist' },
            { icon: User, id: 'profile', label: 'Profile' }
          ].map(({ icon: Icon, id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center gap-1 p-2 transition-colors font-inter-normal ${
                activeTab === id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Strategy Modal */}
      {selectedStrategy && (
        <StrategyModal
          strategy={selectedStrategy}
          isOpen={!!selectedStrategy}
          onClose={() => setSelectedStrategy(null)}
        />
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={setFilters}
        currentFilters={filters}
      />
    </div>
  );
}
