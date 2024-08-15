import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";



const PrivateRoute = () => {
    const {user} = useUser();

  return user ? <Outlet /> : <Navigate to = {"/signin"}/>
}

export default PrivateRoute