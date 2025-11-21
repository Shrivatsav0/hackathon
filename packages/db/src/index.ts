import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "cloudflare:workers";

export const db = drizzle(env.DATABASE_URL || "");

// Export auth schemas
export * from "./schema/auth";

// Export new schemas
export * from "./schema/events";
export * from "./schema/teams";
export * from "./schema/transactions";
