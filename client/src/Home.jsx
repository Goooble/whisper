import { Outlet } from "react-router";
function Home() {
  return (
    <div>
      <p>Home</p>
      <Outlet></Outlet>
    </div>
  );
}

export { Home };
