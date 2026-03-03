import { Client } from "pg";

const SQL = `
CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  karma INT DEFAULT 0
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://gobili:linuxislovedb@localhost:5432/connecto",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
