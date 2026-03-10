import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import type { Request, Response } from "express";
import { addNewUser, getUserByUsername, getUsers } from "./db.js";
import { json } from "node:stream/consumers";

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
  req.body.password = await bcrypt.hash(req.body.password, 12);
  try {
    await addNewUser(req.body);
  } catch (e) {
    return res.sendStatus(400);
  }
  res.send("ok");
}

async function login(req: Request, res: Response) {
  try {
    const data = await getUserByUsername(req.body.username);
    if (!data || data.rows.length === 0) {
      throw new Error("Invalid username");
    }
    const user = data.rows[0];
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (isValid) {
      console.log(user.id);
      const token = jwt.sign({ sub: user.id }, "secret", { expiresIn: "1d" });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
    } else {
      throw new Error("Invalid password");
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
  res.send("LOGGED IN");
}

function logout(req: Request, res: Response) {
  console.log("sfdsdf");
  res.clearCookie("token");
  res.send("ok");
}

function verifyAuth(req: Request, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, "secret");
    console.log(decoded);

    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

function verifyUserID(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, "secret");
  } catch (err) {
    return res.sendStatus(401);
  }
}

export { verifyUser, getUserID, signin, login, logout, verifyAuth };
