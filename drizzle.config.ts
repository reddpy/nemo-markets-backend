import { Config } from "drizzle-kit";

export default {
  schema: "./app/schema/*.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgres://postgres:pgpassword@0.0.0.0:5432/postgres",
  },
} satisfies Config;
