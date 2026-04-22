import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home } from "./Home.jsx";
import { Login } from "./Login.jsx";
import { Signup } from "./Signup.jsx";
import authUtils from "./auth.js";

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
        action: authUtils.signupAction,
        Component: Signup,
      },
      {
        path: "login",
        action: authUtils.loginAction,
        Component: Login,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);
