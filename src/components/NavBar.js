import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import { Avatar, Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";

const NavBar = () => {
  let naviagate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    naviagate("/login");
  };

  const items = [
    {
      key: "/",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/leaderboard",
      label: <Link to="/leaderboard">Leaderboard</Link>,
    },
    {
      key: "/add",
      label: <Link to="/add">New question</Link>,
    },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="logo">
        <h2>Employee Polls</h2>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
      <div>
        <span
          style={{
            color: "#fff",
            marginRight: "8px",
          }}
        >
          Welcome, {currentUser ? currentUser.name : "Guest"}
        </span>
        <Avatar
          src={currentUser.avatarURL}
          style={{
            backgroundColor: "#1677ff",
          }}
        />
        <Button
          onClick={handleLogout}
          type="link"
          size="small"
          iconPosition="end"
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default NavBar;
