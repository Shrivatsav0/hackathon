import { pgTable, bigint, uuid, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { events } from "./events";
import { teams } from "./teams";
import { user } from "./auth";

export const transactions = pgTable("transactions", {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    type: text("type").notNull(),
    description: text("description"),
    status: text("status").notNull().default("pending"),
    eventId: uuid("event_id").references(() => events.id, { onDelete: "cascade" }),
    teamId: uuid("team_id").references(() => teams.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
