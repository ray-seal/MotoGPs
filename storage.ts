import { routes, trips, type Route, type Trip, type InsertRoute, type InsertTrip } from "@shared/schema";

export interface IStorage {
  // Route operations
  createRoute(route: InsertRoute): Promise<Route>;
  getRoute(id: number): Promise<Route | undefined>;
  getAllRoutes(): Promise<Route[]>;
  deleteRoute(id: number): Promise<boolean>;
  
  // Trip operations
  createTrip(trip: InsertTrip): Promise<Trip>;
  getTrip(id: number): Promise<Trip | undefined>;
  getAllTrips(): Promise<Trip[]>;
  updateTrip(id: number, updates: Partial<Trip>): Promise<Trip | undefined>;
  deleteTrip(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private routes: Map<number, Route>;
  private trips: Map<number, Trip>;
  private currentRouteId: number;
  private currentTripId: number;

  constructor() {
    this.routes = new Map();
    this.trips = new Map();
    this.currentRouteId = 1;
    this.currentTripId = 1;
  }

  // Route operations
  async createRoute(insertRoute: InsertRoute): Promise<Route> {
    const id = this.currentRouteId++;
    const route: Route = {
      ...insertRoute,
      id,
      createdAt: new Date(),
      waypoints: insertRoute.waypoints || null,
    };
    this.routes.set(id, route);
    return route;
  }

  async getRoute(id: number): Promise<Route | undefined> {
    return this.routes.get(id);
  }

  async getAllRoutes(): Promise<Route[]> {
    return Array.from(this.routes.values());
  }

  async deleteRoute(id: number): Promise<boolean> {
    return this.routes.delete(id);
  }

  // Trip operations
  async createTrip(insertTrip: InsertTrip): Promise<Trip> {
    const id = this.currentTripId++;
    const trip: Trip = {
      id,
      routeId: insertTrip.routeId || null,
      startTime: new Date(),
      endTime: insertTrip.endTime || null,
      totalDistance: insertTrip.totalDistance || null,
      maxSpeed: insertTrip.maxSpeed || null,
      avgSpeed: insertTrip.avgSpeed || null,
      isCompleted: insertTrip.isCompleted || false,
    };
    this.trips.set(id, trip);
    return trip;
  }

  async getTrip(id: number): Promise<Trip | undefined> {
    return this.trips.get(id);
  }

  async getAllTrips(): Promise<Trip[]> {
    return Array.from(this.trips.values());
  }

  async updateTrip(id: number, updates: Partial<Trip>): Promise<Trip | undefined> {
    const trip = this.trips.get(id);
    if (!trip) return undefined;
    
    const updatedTrip = { ...trip, ...updates };
    this.trips.set(id, updatedTrip);
    return updatedTrip;
  }

  async deleteTrip(id: number): Promise<boolean> {
    return this.trips.delete(id);
  }
}

export const storage = new MemStorage();
