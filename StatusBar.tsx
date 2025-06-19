import { Satellite, Wifi, WifiOff, Battery } from "lucide-react";

interface StatusBarProps {
  gpsConnected: boolean;
  location: { latitude: number; longitude: number } | null;
}

export function StatusBar({ gpsConnected, location }: StatusBarProps) {
  const currentTime = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm p-4 flex justify-between items-center z-30">
      <div className="flex items-center space-x-3">
        {gpsConnected ? (
          <Satellite className="text-green-500 w-5 h-5" />
        ) : (
          <Satellite className="text-red-500 w-5 h-5" />
        )}
        <span className="text-sm font-medium text-white">
          {gpsConnected ? "GPS Connected" : "GPS Searching..."}
        </span>
        {location && (
          <span className="text-xs text-gray-300">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-white">{currentTime}</span>
        <Wifi className="text-green-500 w-5 h-5" />
        <Battery className="text-green-500 w-5 h-5" />
      </div>
    </div>
  );
}
