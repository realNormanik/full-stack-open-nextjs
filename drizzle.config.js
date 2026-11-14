import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

const envFile = process.env.CI || process.env.NODE_ENV === "test" ? ".env.test" : ".env.local";

config({ path: envFile });

export default defineConfig({
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});