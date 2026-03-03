import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home } from "./Home.jsx";
import { Room } from "./Room.jsx";
import { Login } from "./Login.jsx";
import { Signup } from "./Signup.jsx";

function auth() {
  console.log("Authing");
}

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
  console.log(res);
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [],
  },
  {
    path: "/auth",
    children: [
      {
        path: "signup",
        action: signupAction,
        Component: Signup,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "app", //protected routes
    middleware: [auth],
    children: [
      {
        path: "room",
        Component: Room,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);
