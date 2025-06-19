import { apiRequest } from "./queryClient";

export interface RouteRequest {
  start: [number, number]; // [longitude, latitude]
  end: [number, number];   // [longitude, latitude]
  profile?: "driving-car" | "cycling-regular" | "foot-walking";
}

export interface RouteResponse {
  features: Array<{
    geometry: {
      coordinates: Array<[number, number]>;
    };
    properties: {
      summary: {
        distance: number; // in meters
        duration: number; // in seconds
      };
      segments: Array<{
        distance: number;
        duration: number;
        steps: Array<{
          instruction: string;
          distance: number;
          duration: number;
          type: number;
          maneuver?: {
            bearing_after: number;
            bearing_before: number;
            location: [number, number];
          };
        }>;
      }>;
    };
  }>;
}

export class RoutingService {
  async getRoute(request: RouteRequest): Promise<RouteResponse> {
    try {
      const response = await apiRequest("POST", "/api/directions", {
        start: request.start,
        end: request.end,
        profile: request.profile || "driving-car",
      });
      
      return await response.json();
    } catch (error) {
      console.error("Routing service error:", error);
      throw new Error("Failed to calculate route");
    }
  }

  async geocodeAddress(address: string): Promise<[number, number] | null> {
    try {
      // For demo purposes, return mock coordinates
      // In a real app, you would use a geocoding service
      const mockCoordinates: Record<string, [number, number]> = {
        "san francisco": [-122.4194, 37.7749],
        "los angeles": [-118.2437, 34.0522],
        "new york": [-74.0060, 40.7128],
        "seattle": [-122.3321, 47.6062],
      };

      const normalizedAddress = address.toLowerCase().trim();
      return mockCoordinates[normalizedAddress] || null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  }

  formatInstruction(step: any): string {
    const instructions: Record<number, string> = {
      0: "Continue straight",
      1: "Turn right",
      2: "Turn left", 
      3: "Turn sharp right",
      4: "Turn sharp left",
      5: "Turn slight right",
      6: "Turn slight left",
      7: "Continue",
      8: "Enter roundabout",
      9: "Exit roundabout",
      10: "Make U-turn",
      11: "Merge",
      12: "Keep right",
      13: "Keep left",
    };

    return instructions[step.type] || step.instruction || "Continue";
  }

  getManeuverType(step: any): string {
    const maneuverTypes: Record<number, string> = {
      0: "straight",
      1: "right",
      2: "left",
      3: "right",
      4: "left", 
      5: "right",
      6: "left",
      7: "straight",
      8: "right", // roundabout
      9: "right", // exit roundabout
      10: "uturn",
      11: "straight", // merge
      12: "right", // keep right
      13: "left", // keep left
    };

    return maneuverTypes[step.type] || "straight";
  }
}

export const routingService = new RoutingService();
