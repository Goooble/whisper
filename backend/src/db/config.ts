import { Pool } from "pg";

export const pool = new Pool({
  user: "gobili",
  host: "localhost",
  database: "connecto",
  password: "linuxislovedb",
  port: 5432,
});

pool
  .query("SELECT 1")
  .then(() => console.log("DB ready"))
  .catch((err) => console.error(err));
