import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema.ts";
import postgres from "postgres";

// TODO: move to the top when everything is wrapped in factories.

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  throw new Error("Missing DB_URL.");
}

const client = postgres(dbUrl);

export const db = drizzle(client, { schema, logger: true });
