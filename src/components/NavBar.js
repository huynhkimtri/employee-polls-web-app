import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { Avatar, Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";

const NavBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  const items = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "leaderboard",
      label: <Link to="/leaderboard">Leaderboard</Link>,
    },
    {
      key: "add",
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
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
      <div className="logo">
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
            backgroundColor: "#87d068",
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
