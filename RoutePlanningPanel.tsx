import { useState } from "react";
import { X, MapPin, Circle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface RoutePlanningPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onStartNavigation: (destination: string) => void;
  currentLocation: { latitude: number; longitude: number } | null;
}

export function RoutePlanningPanel({ 
  isOpen, 
  onClose, 
  onStartNavigation, 
  currentLocation 
}: RoutePlanningPanelProps) {
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!destination.trim() || !currentLocation) return;

    setIsLoading(true);
    try {
      // In a real app, you would geocode the destination and get routes
      // For now, we'll simulate route options
      setRoutes([
        {
          id: 1,
          name: "Fastest Route",
          duration: 25,
          distance: 32,
          description: "Via Highway 101",
          selected: true
        },
        {
          id: 2,
          name: "Scenic Route", 
          duration: 35,
          distance: 28,
          description: "Via Coast Road",
          selected: false
        }
      ]);
    } catch (error) {
      console.error("Error getting routes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNavigation = () => {
    if (destination.trim()) {
      onStartNavigation(destination);
      onClose();
    }
  };

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 z-30 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="p-6">
        {/* Panel Handle */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Plan Your Route</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* From/To Inputs */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Circle className="text-green-600 absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4" />
            <Input
              placeholder="Current Location"
              value={currentLocation ? "Current Location" : "Location unavailable"}
              disabled
              className="pl-12 py-4 text-lg font-medium bg-gray-100"
            />
          </div>
          <div className="relative">
            <MapPin className="text-red-600 absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4" />
            <Input
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-12 py-4 text-lg font-medium"
            />
          </div>
        </div>

        {/* Search Button */}
        {destination && !routes.length && (
          <Button 
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full mb-6 py-4 text-lg"
          >
            {isLoading ? "Searching..." : "Find Routes"}
          </Button>
        )}

        {/* Route Options */}
        {routes.length > 0 && (
          <div className="space-y-3 mb-6">
            {routes.map((route) => (
              <Card key={route.id} className={`cursor-pointer ${route.selected ? 'border-blue-500 bg-blue-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {route.name}
                      </div>
                      <div className="text-gray-600">
                        {route.duration} min • {route.distance} km • {route.description}
                      </div>
                    </div>
                    <div className={`font-bold ${route.selected ? 'text-blue-600' : 'text-gray-400'}`}>
                      {route.selected ? 'Selected' : `+${route.duration - 25} min`}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Start Navigation Button */}
        {routes.length > 0 && (
          <Button 
            onClick={handleStartNavigation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg"
          >
            <Navigation className="w-5 h-5 mr-2" />
            Start Navigation
          </Button>
        )}
      </div>
    </div>
  );
}
