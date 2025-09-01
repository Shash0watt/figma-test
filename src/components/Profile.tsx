import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  Edit2,
  Check,
  X
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  totalInvested: string;
  totalReturns: string;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
}

const userProfile: UserProfile = {
  name: '----, ----',
  email: '----@email.com',
  joinDate: 'March 2024',
  totalInvested: '$--,---.--',
  totalReturns: '+$-,---.--',
  riskTolerance: 'Moderate'
};

const settingsSections = [
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { id: 'pushNotifications', label: 'Push Notifications', enabled: true },
      { id: 'emailUpdates', label: 'Email Updates', enabled: true },
      { id: 'performanceAlerts', label: 'Performance Alerts', enabled: false },
      { id: 'marketNews', label: 'Market News', enabled: true }
    ]
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    settings: [
      { id: 'twoFactor', label: 'Two-Factor Authentication', enabled: true },
      { id: 'biometric', label: 'Biometric Login', enabled: false },
      { id: 'dataSharing', label: 'Data Sharing', enabled: false }
    ]
  }
];

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [settings, setSettings] = useState(
    settingsSections.reduce((acc, section) => {
      section.settings.forEach(setting => {
        acc[setting.id] = setting.enabled;
      });
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const toggleSetting = (settingId: string) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId]
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header */}
      <div className="p-6 pt-8">
        <h1 className="text-2xl font-inter-semibold mb-2">Profile</h1>
        <p className="text-sm text-muted-foreground font-inter-normal">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="px-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-inter-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="font-inter-medium"
                  />
                  <Input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="font-inter-normal text-sm"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-inter-semibold">{editedProfile.name}</h2>
                  <p className="text-sm text-muted-foreground font-inter-normal">{editedProfile.email}</p>
                  <p className="text-xs text-muted-foreground font-inter-normal mt-1">
                    Member since {editedProfile.joinDate}
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave} className="p-2">
                    <Check size={16} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel} className="p-2">
                    <X size={16} />
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="p-2">
                  <Edit2 size={16} />
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground font-inter-normal">Total Invested</p>
              <p className="font-inter-semibold">{userProfile.totalInvested}</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground font-inter-normal">Total Returns</p>
              <p className="font-inter-semibold text-green-400">{userProfile.totalReturns}</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground font-inter-normal">Risk Level</p>
              <p className="font-inter-semibold">{userProfile.riskTolerance}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-inter-medium">
                  <Icon size={18} className="text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.settings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <Label htmlFor={setting.id} className="font-inter-normal text-sm">
                      {setting.label}
                    </Label>
                    <Switch
                      id={setting.id}
                      checked={settings[setting.id]}
                      onCheckedChange={() => toggleSetting(setting.id)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-inter-medium">
              <Settings size={18} className="text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start font-inter-normal" size="sm">
              <CreditCard size={16} className="mr-3" />
              Payment Methods
            </Button>
            <Button variant="outline" className="w-full justify-start font-inter-normal" size="sm">
              <HelpCircle size={16} className="mr-3" />
              Help & Support
            </Button>
            <Separator />
            <Button variant="outline" className="w-full justify-start font-inter-normal text-red-400 hover:text-red-400 hover:bg-red-400/10" size="sm">
              <LogOut size={16} className="mr-3" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
