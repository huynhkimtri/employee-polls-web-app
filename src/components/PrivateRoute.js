import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);
  console.log("🚀 ~ PrivateRoute ~ auth:", auth);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("🚀 ~ PrivateRoute ~ isLoggedIn:", isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
