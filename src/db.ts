import { Pool, type QueryResult } from "pg";
interface NewUserData {
  username: string;
  password: string;
}

// Again, this should be read from an environment variable
const pool = new Pool({
  connectionString: "postgresql://gobili:linuxislovedb@localhost:5432/connecto",
});

async function addNewUser(data: NewUserData) {
  try {
    await pool.query(
      `
    INSERT INTO users (username, password) VALUES($1, $2);   
      `,
      [data.username, data.password],
    );
  } catch (e) {
    throw e;
  }
}

async function getUserByUsername(username: string) {
  try {
    const res = await pool.query(
      `
    SELECT * FROM users WHERE username = $1;   
      `,
      [username],
    );
    return res;
  } catch (e) {
    console.log(e);
  }
}

export { pool, addNewUser, getUserByUsername };
