import { Pool } from "pg";
import bcrypt from "bcrypt";
interface NewUserData {
  username: string;
  password: string;
}

// Again, this should be read from an environment variable
const pool = new Pool({
  connectionString: "postgresql://gobili:linuxislovedb@localhost:5432/connecto",
});

async function addNewUser(data: NewUserData) {
  console.log("entering data");
  const hashedPassword = await bcrypt.hash(data.password, 12);
  try {
    await pool.query(
      `
    INSERT INTO users (username, password) VALUES($1, $2);   
      `,
      [data.username, hashedPassword],
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
}

const users: string[] = ["a", "b", "c", "d"];
function getUsers(): string[] {
  return users;
}

export { getUsers, pool, addNewUser };
