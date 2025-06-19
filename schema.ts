import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const routes = pgTable("routes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  startLat: real("start_lat").notNull(),
  startLng: real("start_lng").notNull(),
  endLat: real("end_lat").notNull(),
  endLng: real("end_lng").notNull(),
  distance: real("distance").notNull(), // in kilometers
  duration: integer("duration").notNull(), // in minutes
  waypoints: text("waypoints").array(), // JSON encoded waypoints
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  routeId: integer("route_id").references(() => routes.id),
  startTime: timestamp("start_time").defaultNow().notNull(),
  endTime: timestamp("end_time"),
  totalDistance: real("total_distance"), // in kilometers
  maxSpeed: real("max_speed"), // in km/h
  avgSpeed: real("avg_speed"), // in km/h
  isCompleted: boolean("is_completed").default(false).notNull(),
});

export const insertRouteSchema = createInsertSchema(routes).omit({
  id: true,
  createdAt: true,
});

export const insertTripSchema = createInsertSchema(trips).omit({
  id: true,
  startTime: true,
});

export type InsertRoute = z.infer<typeof insertRouteSchema>;
export type Route = typeof routes.$inferSelect;
export type InsertTrip = z.infer<typeof insertTripSchema>;
export type Trip = typeof trips.$inferSelect;
