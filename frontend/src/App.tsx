import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Dashboard } from "./Dashboard";
import { Editor } from "./Editor";
import { useAuth } from "./auth/AuthContext";

export default function App() {
  const { isAuthenticated: isAuth } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuth ? "/dashboard" : "/login"} />}
      />

      <Route
        path="/login"
        element={isAuth ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuth ? <Navigate to="/dashboard" /> : <SignUp />}
      />

      <Route
        path="/dashboard"
        element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/editor"
        element={isAuth ? <Editor /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
