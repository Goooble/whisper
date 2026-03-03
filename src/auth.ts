import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { addNewUser, getUsers } from "./db.js";
function verifyUser(url: string): boolean {
  const name: string = grabName(url);
  const userList: string[] = getUsers();
  if (userList.includes(name)) return true;
  else return false;
}

function getUserID(url: string): string {
  return grabName(url);
}
//refactor while auth
function grabName(url: string): string {
  const name: string = new URL(url, "ws://localhost:8000").searchParams.get(
    "user",
  ) as string;
  return name;
}

async function signin(req: Request, res: Response) {
  try {
    await addNewUser(req.body);
  } catch (e) {
    res.sendStatus(400);
  }
  res.send("ok");
}

export { verifyUser, getUserID, signin };
