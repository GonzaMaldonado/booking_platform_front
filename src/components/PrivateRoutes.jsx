import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";


const PrivateRoutes = () => {
  const { isAuth } = useAuthStore()

  return isAuth ? <Outlet/> : <Navigate to={"/login"} replace={true} />
}

export default PrivateRoutes