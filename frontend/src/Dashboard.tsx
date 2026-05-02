import { useAuth } from "./auth/AuthContext";
import { useNavigate } from "react-router-dom";
export function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          logout();
          navigate("/");
          console.log("logged out");
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          navigate("/editor");
        }}
      >
        Editor
      </button>
    </>
  );
}
