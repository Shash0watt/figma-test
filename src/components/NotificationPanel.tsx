import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

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

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationPanel({ notifications, onMarkAsRead, onClearAll }: NotificationPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} className="text-green-400" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-400" />;
      case 'info': return <Bell size={16} className="text-blue-400" />;
      case 'error': return <TrendingDown size={16} className="text-red-400" />;
      default: return <Bell size={16} className="text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-400';
      case 'warning': return 'border-l-yellow-400';
      case 'info': return 'border-l-blue-400';
      case 'error': return 'border-l-red-400';
      default: return 'border-l-muted';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-inter-semibold">Notifications</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-xs font-inter-normal"
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 border-l-4 ${getTypeColor(notification.type)} ${
              !notification.isRead ? 'bg-card/80' : 'bg-card/40'
            } cursor-pointer hover:bg-card transition-colors`}
            onClick={() => onMarkAsRead(notification.id)}
          >
            <div className="flex items-start gap-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-inter-medium">{notification.title}</h4>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-inter-normal leading-relaxed">
                  {notification.message}
                </p>
                {notification.strategyName && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {notification.strategyName}
                  </Badge>
                )}
                {notification.amount && (
                  <div className="text-xs text-primary font-inter-medium mt-1">
                    {notification.amount}
                  </div>
                )}
                <div className="text-xs text-muted-foreground font-inter-normal mt-2">
                  {notification.timestamp}
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {notifications.length === 0 && (
          <div className="text-center py-8">
            <Bell size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground font-inter-normal">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}