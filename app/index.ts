import { drizzle } from "drizzle-orm/node-postgres";
import { Request, Response } from "express";
import { Client } from "pg";
import postgres from "postgres";
import { book } from "./schema/book";

const migrationClient = postgres(
  "postgres://postgres:pgpassword@0.0.0.0:5432/postgres",
  { max: 1 }
);

const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "pgpassword",
  database: "postgres",
});

client.connect();
const db = drizzle(client);
// migrate(drizzle(migrationClient), { migrationsFolder: "/migrations" });

const express = require("express");
const app = express();
const port = 3000;

app.get("/", async (req: Request, res: Response) => {
  res.send("wow");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
