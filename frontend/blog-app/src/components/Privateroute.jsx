import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth";

function Privateroute() {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />;
}

export default Privateroute;
