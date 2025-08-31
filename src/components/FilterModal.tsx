import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { X, Filter } from 'lucide-react';

interface FilterOptions {
  riskLevels: string[];
  assetClasses: string[];
  returnRange: [number, number];
  instruments: string[];
  maxDrawdownRange: [number, number];
  sharpeRatioRange: [number, number];
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export function FilterModal({ isOpen, onClose, onApplyFilters, currentFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      riskLevels: [],
      assetClasses: [],
      returnRange: [0, 100],
      instruments: [],
      maxDrawdownRange: [0, 100],
      sharpeRatioRange: [0, 3]
    };
    setFilters(resetFilters);
  };

  const updateRiskLevels = (level: string, checked: boolean) => {
    if (checked) {
      setFilters(prev => ({ ...prev, riskLevels: [...prev.riskLevels, level] }));
    } else {
      setFilters(prev => ({ ...prev, riskLevels: prev.riskLevels.filter(l => l !== level) }));
    }
  };

  const updateAssetClasses = (assetClass: string, checked: boolean) => {
    if (checked) {
      setFilters(prev => ({ ...prev, assetClasses: [...prev.assetClasses, assetClass] }));
    } else {
      setFilters(prev => ({ ...prev, assetClasses: prev.assetClasses.filter(a => a !== assetClass) }));
    }
  };

  const updateInstruments = (instrument: string, checked: boolean) => {
    if (checked) {
      setFilters(prev => ({ ...prev, instruments: [...prev.instruments, instrument] }));
    } else {
      setFilters(prev => ({ ...prev, instruments: prev.instruments.filter(i => i !== instrument) }));
    }
  };

  const riskLevels = ['Low', 'Medium', 'High'];
  const assetClasses = ['Stocks', 'Crypto', 'Options', 'Bonds', 'REITs'];
  const instruments = ['Options', 'Spot', 'Futures', 'ETFs', 'Direct'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-card border-border max-h-[90vh] overflow-y-auto p-0">
        {/* Proper Dialog Header for Accessibility */}
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-primary" />
            <DialogTitle className="text-lg font-inter-semibold">Advanced Filters</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground font-inter-normal">
            Filter strategies by risk level, asset class, performance metrics and more
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Risk Level */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-inter-medium">Risk Level</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`risk-${level}`}
                    checked={filters.riskLevels.includes(level)}
                    onCheckedChange={(checked) => updateRiskLevels(level, checked as boolean)}
                  />
                  <Label htmlFor={`risk-${level}`} className="font-inter-normal">{level}</Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Asset Classes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-inter-medium">Asset Classes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assetClasses.map((assetClass) => (
                <div key={assetClass} className="flex items-center space-x-2">
                  <Checkbox
                    id={`asset-${assetClass}`}
                    checked={filters.assetClasses.includes(assetClass)}
                    onCheckedChange={(checked) => updateAssetClasses(assetClass, checked as boolean)}
                  />
                  <Label htmlFor={`asset-${assetClass}`} className="font-inter-normal">{assetClass}</Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Return Range */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-inter-medium">Annual Return Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground font-inter-normal">
                  <span>{filters.returnRange[0]}%</span>
                  <span>{filters.returnRange[1]}%</span>
                </div>
                <Slider
                  value={filters.returnRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, returnRange: value as [number, number] }))}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Instruments */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-inter-medium">Instruments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {instruments.map((instrument) => (
                <div key={instrument} className="flex items-center space-x-2">
                  <Checkbox
                    id={`instrument-${instrument}`}
                    checked={filters.instruments.includes(instrument)}
                    onCheckedChange={(checked) => updateInstruments(instrument, checked as boolean)}
                  />
                  <Label htmlFor={`instrument-${instrument}`} className="font-inter-normal">{instrument}</Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Max Drawdown Range */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-inter-medium">Max Drawdown Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground font-inter-normal">
                  <span>-{filters.maxDrawdownRange[0]}%</span>
                  <span>-{filters.maxDrawdownRange[1]}%</span>
                </div>
                <Slider
                  value={filters.maxDrawdownRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, maxDrawdownRange: value as [number, number] }))}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sharpe Ratio Range */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-inter-medium">Sharpe Ratio Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground font-inter-normal">
                  <span>{filters.sharpeRatioRange[0].toFixed(1)}</span>
                  <span>{filters.sharpeRatioRange[1].toFixed(1)}</span>
                </div>
                <Slider
                  value={filters.sharpeRatioRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, sharpeRatioRange: value as [number, number] }))}
                  max={3}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1 font-inter-medium"
            >
              Reset
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-inter-medium"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}