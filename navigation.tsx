import { useEffect, useState } from "react";
import { MapInterface } from "@/components/MapInterface";
import { StatusBar } from "@/components/StatusBar";
import { NavigationCard } from "@/components/NavigationCard";
import { SpeedDashboard } from "@/components/SpeedDashboard";
import { MapControls } from "@/components/MapControls";
import { BottomControlPanel } from "@/components/BottomControlPanel";
import { RoutePlanningPanel } from "@/components/RoutePlanningPanel";
import { SettingsOverlay } from "@/components/SettingsOverlay";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useNavigation } from "@/hooks/useNavigation";

export default function NavigationPage() {
  const [showRoutePlanning, setShowRoutePlanning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mapZoom, setMapZoom] = useState(15);
  
  const { location, speed, isLoading, error } = useGeolocation();
  const { 
    currentRoute, 
    navigationState, 
    startNavigation, 
    stopNavigation,
    isNavigating 
  } = useNavigation(location);

  const handleZoomIn = () => setMapZoom(prev => Math.min(prev + 1, 18));
  const handleZoomOut = () => setMapZoom(prev => Math.max(prev - 1, 3));
  
  const handleRecenterMap = () => {
    // Map will recenter to current location
  };

  const handleSearchDestination = () => {
    setShowRoutePlanning(true);
  };

  const handleOpenMenu = () => {
    setShowSettings(true);
  };

  const handleEmergencyCall = () => {
    // Emergency functionality - could call emergency services
    if ('navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
    alert("Emergency feature would contact local emergency services");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Status Bar */}
      <StatusBar 
        gpsConnected={!isLoading && !error} 
        location={location} 
      />

      {/* Main Map Interface */}
      <MapInterface
        location={location}
        zoom={mapZoom}
        route={currentRoute}
        isLoading={isLoading}
        error={error}
      />

      {/* Navigation Instruction Card */}
      {isNavigating && navigationState && (
        <NavigationCard 
          instruction={navigationState.instruction}
          distance={navigationState.distance}
          eta={navigationState.eta}
          maneuver={navigationState.maneuver}
        />
      )}

      {/* Speed Dashboard */}
      <SpeedDashboard 
        speed={speed}
        tripDistance={navigationState?.tripDistance || 0}
        tripTime={navigationState?.tripTime || 0}
        eta={navigationState?.eta}
      />

      {/* Map Controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRecenter={handleRecenterMap}
      />

      {/* Bottom Control Panel */}
      <BottomControlPanel
        onRouteInfo={() => {}}
        onOpenMenu={handleOpenMenu}
        onSearchDestination={handleSearchDestination}
        onEmergencyCall={handleEmergencyCall}
        isNavigating={isNavigating}
      />

      {/* Route Planning Panel */}
      <RoutePlanningPanel
        isOpen={showRoutePlanning}
        onClose={() => setShowRoutePlanning(false)}
        onStartNavigation={startNavigation}
        currentLocation={location}
      />

      {/* Settings Overlay */}
      <SettingsOverlay
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
