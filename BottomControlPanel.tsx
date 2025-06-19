import { Route, Menu, Search, AlertTriangle, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomControlPanelProps {
  onRouteInfo: () => void;
  onOpenMenu: () => void;
  onSearchDestination: () => void;
  onEmergencyCall: () => void;
  isNavigating: boolean;
}

export function BottomControlPanel({ 
  onRouteInfo, 
  onOpenMenu, 
  onSearchDestination, 
  onEmergencyCall,
  isNavigating 
}: BottomControlPanelProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-95 backdrop-blur-sm p-4 z-20">
      <div className="flex items-center justify-between space-x-4">
        {/* Route Info Button */}
        <Button
          variant="secondary"
          className="flex-1 bg-gray-800 hover:bg-gray-700 rounded-xl p-4 flex items-center justify-center space-x-2"
          onClick={onRouteInfo}
        >
          <Route className="text-white w-5 h-5" />
          <span className="text-white font-medium hidden sm:inline">Route</span>
        </Button>

        {/* Main Menu Button */}
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl p-4 flex items-center justify-center space-x-2"
          onClick={onOpenMenu}
        >
          <Menu className="text-white w-5 h-5" />
          <span className="text-white font-medium hidden sm:inline">Menu</span>
        </Button>

        {/* Search/Destination Button */}
        <Button
          className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl p-4 flex items-center justify-center space-x-2"
          onClick={onSearchDestination}
          disabled={isNavigating}
        >
          {isNavigating ? (
            <Square className="text-white w-5 h-5" />
          ) : (
            <Search className="text-white w-5 h-5" />
          )}
          <span className="text-white font-medium hidden sm:inline">
            {isNavigating ? "Stop" : "Search"}
          </span>
        </Button>

        {/* Emergency/SOS Button */}
        <Button
          variant="destructive"
          className="bg-red-600 hover:bg-red-700 rounded-xl p-4 flex items-center justify-center"
          onClick={onEmergencyCall}
        >
          <AlertTriangle className="text-white w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
