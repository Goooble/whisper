import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Dashboard } from "./Dashboard";
import { Editor } from "./Editor";

export default function App() {
  const isAuth = true; // replace with real auth later

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

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
