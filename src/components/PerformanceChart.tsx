import React, { useEffect, useRef, useState } from 'react';

interface ChartData {
  month: string;
  value: number;
}

interface PerformanceChartProps {
  data: ChartData[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 350, height: 200 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newWidth = Math.max(280, containerWidth - 32); // Subtract padding
        const newHeight = Math.max(160, Math.min(220, newWidth * 0.6)); // Responsive height ratio
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  const { width: chartWidth, height: chartHeight } = dimensions;
  const padding = Math.max(20, chartWidth * 0.08); // Responsive padding

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - ((item.value - minValue) / range) * (chartHeight - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative mb-6" ref={containerRef}>
      {/* Holdings value label */}
      <div className="mb-2">
        <span className="text-xs text-muted-foreground font-inter-normal">holding value</span>
      </div>
      
      <div 
        className="bg-background rounded-lg overflow-hidden relative"
        style={{ height: `${chartHeight}px` }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines - more subtle and responsive */}
          <defs>
            <pattern 
              id="grid" 
              width={Math.max(40, chartWidth * 0.12)} 
              height={Math.max(20, chartHeight * 0.12)} 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d={`M ${Math.max(40, chartWidth * 0.12)} 0 L 0 0 0 ${Math.max(20, chartHeight * 0.12)}`} 
                fill="none" 
                stroke="rgba(138, 148, 167, 0.05)" 
                strokeWidth="1"
              />
            </pattern>
            
            {/* Gradient fill under the line */}
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00FFAB" stopOpacity="0.2"/>
              <stop offset="50%" stopColor="#00FFAB" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="#00FFAB" stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Gradient fill area */}
          <polygon
            points={`${padding},${chartHeight - padding} ${points} ${chartWidth - padding},${chartHeight - padding}`}
            fill="url(#chartGradient)"
          />
          
          {/* Performance line */}
          <polyline
            points={points}
            fill="none"
            stroke="#00FFAB"
            strokeWidth={Math.max(2, chartWidth * 0.007)}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sparkline-path"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding);
            const y = chartHeight - padding - ((item.value - minValue) / range) * (chartHeight - 2 * padding);
            const pointRadius = Math.max(2, chartWidth * 0.006);
            const glowRadius = Math.max(4, chartWidth * 0.012);
            
            return (
              <g key={index}>
                {/* Glow effect for last point */}
                {index === data.length - 1 && (
                  <circle
                    cx={x}
                    cy={y}
                    r={glowRadius}
                    fill="#00FFAB"
                    fillOpacity="0.3"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={index === data.length - 1 ? pointRadius * 1.5 : pointRadius}
                  fill="#00FFAB"
                />
              </g>
            );
          })}
        </svg>
        
        {/* Value indicators on chart - responsive positioning */}
        <div 
          className="absolute text-xs text-muted-foreground font-inter-normal"
          style={{ 
            bottom: `${padding * 0.5}px`, 
            left: `${padding * 0.5}px` 
          }}
        >
          ${Math.round(minValue).toLocaleString()}
        </div>
        <div 
          className="absolute text-xs text-muted-foreground font-inter-normal"
          style={{ 
            top: `${padding * 0.5}px`, 
            right: `${padding * 0.5}px` 
          }}
        >
          ${Math.round(maxValue).toLocaleString()}
        </div>
      </div>
      
      {/* Month labels - responsive spacing */}
      <div className="flex justify-between mt-3" style={{ paddingLeft: `${padding}px`, paddingRight: `${padding}px` }}>
        {data.map((item, index) => (
          <span key={index} className="text-xs text-muted-foreground font-inter-normal uppercase">
            {item.month}
          </span>
        ))}
      </div>
    </div>
  );
}