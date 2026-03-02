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
