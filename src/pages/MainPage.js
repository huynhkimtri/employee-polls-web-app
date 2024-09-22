import { Content } from "antd/es/layout/layout";
import NavBar from "../components/NavBar";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <NavBar />
      <Content
        style={{ padding: "0 48px", marginTop: "16px", marginBottom: "48px" }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 380,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainPage;
