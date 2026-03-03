import { Outlet, NavLink } from "react-router";
function Home() {
  return (
    <div>
      <p>Home</p>
      <button
        onClick={async () => {
          await fetch("http://localhost:8080/logout", {
            credentials: "include",
          });
        }}
      >
        Logout
      </button>
      <button>
        <NavLink to="/auth/login">Login</NavLink>
      </button>
      <button>
        <NavLink to="/auth/signup">Signup</NavLink>
      </button>
      <Outlet></Outlet>
    </div>
  );
}

export { Home };
