import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRouteSchema, insertTripSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Route endpoints
  app.get("/api/routes", async (req, res) => {
    try {
      const routes = await storage.getAllRoutes();
      res.json(routes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch routes" });
    }
  });

  app.post("/api/routes", async (req, res) => {
    try {
      const routeData = insertRouteSchema.parse(req.body);
      const route = await storage.createRoute(routeData);
      res.status(201).json(route);
    } catch (error) {
      res.status(400).json({ message: "Invalid route data" });
    }
  });

  app.get("/api/routes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const route = await storage.getRoute(id);
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
      res.json(route);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch route" });
    }
  });

  app.delete("/api/routes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteRoute(id);
      if (!deleted) {
        return res.status(404).json({ message: "Route not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete route" });
    }
  });

  // Trip endpoints
  app.get("/api/trips", async (req, res) => {
    try {
      const trips = await storage.getAllTrips();
      res.json(trips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trips" });
    }
  });

  app.post("/api/trips", async (req, res) => {
    try {
      const tripData = insertTripSchema.parse(req.body);
      const trip = await storage.createTrip(tripData);
      res.status(201).json(trip);
    } catch (error) {
      res.status(400).json({ message: "Invalid trip data" });
    }
  });

  app.get("/api/trips/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const trip = await storage.getTrip(id);
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      res.json(trip);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trip" });
    }
  });

  app.patch("/api/trips/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const trip = await storage.updateTrip(id, updates);
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      res.json(trip);
    } catch (error) {
      res.status(500).json({ message: "Failed to update trip" });
    }
  });

  // External routing API proxy
  app.post("/api/directions", async (req, res) => {
    try {
      const { start, end, profile = "driving-car" } = req.body;
      
      // Generate a realistic mock route for demonstration
      const mockRoute = {
        features: [{
          geometry: {
            coordinates: [
              start,
              [start[0] + (end[0] - start[0]) * 0.3, start[1] + (end[1] - start[1]) * 0.3],
              [start[0] + (end[0] - start[0]) * 0.7, start[1] + (end[1] - start[1]) * 0.7],
              end
            ]
          },
          properties: {
            summary: {
              distance: Math.round(Math.abs(end[0] - start[0]) * 111000 + Math.abs(end[1] - start[1]) * 111000), // rough distance in meters
              duration: Math.round((Math.abs(end[0] - start[0]) + Math.abs(end[1] - start[1])) * 300) // rough duration in seconds
            },
            segments: [{
              distance: Math.round(Math.abs(end[0] - start[0]) * 111000 + Math.abs(end[1] - start[1]) * 111000),
              duration: Math.round((Math.abs(end[0] - start[0]) + Math.abs(end[1] - start[1])) * 300),
              steps: [
                {
                  instruction: "Head northeast",
                  distance: 500,
                  duration: 60,
                  type: 0,
                  maneuver: {
                    bearing_after: 45,
                    bearing_before: 0,
                    location: start
                  }
                },
                {
                  instruction: "Continue straight",
                  distance: 1000,
                  duration: 120,
                  type: 0
                },
                {
                  instruction: "Turn right",
                  distance: 200,
                  duration: 30,
                  type: 1,
                  maneuver: {
                    bearing_after: 90,
                    bearing_before: 45,
                    location: [start[0] + (end[0] - start[0]) * 0.7, start[1] + (end[1] - start[1]) * 0.7]
                  }
                },
                {
                  instruction: "Arrive at destination",
                  distance: 50,
                  duration: 10,
                  type: 0
                }
              ]
            }]
          }
        }]
      };

      res.json(mockRoute);
    } catch (error) {
      console.error("Directions API error:", error);
      res.status(500).json({ message: "Failed to get directions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
