import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Route } from "@shared/schema";

interface NavigationState {
  instruction: string;
  distance: string;
  eta: string;
  maneuver: string;
  tripDistance: number;
  tripTime: number;
}

export function useNavigation() {
  const [currentRoute, setCurrentRoute] = useState<any>(null);
  const [navigationState, setNavigationState] = useState<NavigationState | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [tripStartTime, setTripStartTime] = useState<Date | null>(null);
  const queryClient = useQueryClient();

  const getDirectionsMutation = useMutation({
    mutationFn: async ({ destination, currentLocation }: { destination: string, currentLocation: { latitude: number; longitude: number } | null }) => {
      if (!currentLocation) {
        throw new Error("Current location not available");
      }

      // Use actual current location as start point
      const start = [currentLocation.longitude, currentLocation.latitude];
      
      // For demo, offset destination slightly from current location
      const end = [
        currentLocation.longitude + 0.01, 
        currentLocation.latitude + 0.01
      ];
      
      const response = await apiRequest("POST", "/api/directions", {
        start,
        end,
      });
      
      return await response.json();
    },
    onSuccess: (data) => {
      setCurrentRoute(data);
      queryClient.invalidateQueries({ queryKey: ["/api/routes"] });
    },
  });

  const startNavigation = async (destination: string) => {
    try {
      await getDirectionsMutation.mutateAsync({ destination, currentLocation });
      setIsNavigating(true);
      setTripStartTime(new Date());
      
      // Initialize navigation state with route data
      setNavigationState({
        instruction: `Head northeast toward ${destination}`,
        distance: "500 m",
        eta: "1 min",
        maneuver: "straight",
        tripDistance: 0,
        tripTime: 0,
      });
    } catch (error) {
      console.error("Failed to start navigation:", error);
    }
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setCurrentRoute(null);
    setNavigationState(null);
    setTripStartTime(null);
  };

  // Update trip time
  useEffect(() => {
    if (!isNavigating || !tripStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const tripTimeMinutes = Math.floor((now.getTime() - tripStartTime.getTime()) / (1000 * 60));
      
      if (navigationState) {
        setNavigationState(prev => prev ? {
          ...prev,
          tripTime: tripTimeMinutes,
        } : null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isNavigating, tripStartTime, navigationState]);

  return {
    currentRoute,
    navigationState,
    isNavigating,
    startNavigation,
    stopNavigation,
    isLoadingRoute: getDirectionsMutation.isPending,
  };
}
