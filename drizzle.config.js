import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "mysql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    host: "localhost",
    user: "root",
    database: "attendance_tracker",
    password: "fortune13578998",
    port: 3306
  }
});