import { redirect } from "react-router";

async function signupAction({ request }) {
  const data = await request.formData();
  const payload = {
    username: data.get("username"),
    password: data.get("password"),
  };
  console.log(payload);
  const res = await fetch("http://localhost:8080/signup", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    return redirect("/auth/login");
  }
}

async function verifyAuth({ request }, next) {
  const res = await fetch("http://localhost:8080/api", {
    credentials: "include",
  });
  console.log(res);
  if (!res.ok) {
    return redirect("/auth/login");
  } else next();
}
async function loginAction({ request }) {
  const data = await request.formData();
  const payload = {
    username: data.get("username"),
    password: data.get("password"),
  };
  const res = await fetch("http://localhost:8080/login", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  console.log(res);
  if (res.ok) {
    return redirect("/");
  }
}

const authUtils = {
  verifyAuth,
  loginAction,
  signupAction,
};

export default authUtils;
