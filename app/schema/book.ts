import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const book = pgTable("book", {
  id: serial("id"),
  title: text("title"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
