import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    location: text("location"),
    page: jsonb("page").default(null),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
