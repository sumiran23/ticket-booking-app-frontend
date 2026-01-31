import { Navbar } from "./Navbar.tsx";
import { Outlet } from "react-router-dom";

function AppContainer() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Outlet />
    </>
  );
}

export default AppContainer;
