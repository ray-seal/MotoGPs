import { X, Volume2, AlertCircle, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface SettingsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsOverlay({ isOpen, onClose }: SettingsOverlayProps) {
  const [voiceNavigation, setVoiceNavigation] = useState(true);
  const [speedAlerts, setSpeedAlerts] = useState(false);
  const [nightMode, setNightMode] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-white rounded-3xl p-8 m-4 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Voice Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">Voice Navigation</div>
                <div className="text-gray-600">Turn-by-turn voice instructions</div>
              </div>
            </div>
            <Switch 
              checked={voiceNavigation}
              onCheckedChange={setVoiceNavigation}
            />
          </div>

          {/* Speed Alerts */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">Speed Alerts</div>
                <div className="text-gray-600">Get warned when exceeding limits</div>
              </div>
            </div>
            <Switch 
              checked={speedAlerts}
              onCheckedChange={setSpeedAlerts}
            />
          </div>

          {/* Night Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">Night Mode</div>
                <div className="text-gray-600">Darker interface for night riding</div>
              </div>
            </div>
            <Switch 
              checked={nightMode}
              onCheckedChange={setNightMode}
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500 text-center">
            MotoGPs v1.0.0 • Built for safe riding
          </div>
        </div>
      </div>
    </div>
  );
}
