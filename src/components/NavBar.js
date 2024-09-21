import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

const NavBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/add">New question</Link>
      <div>
        <p>Welcome, {currentUser ? currentUser.name : "Guest"}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
