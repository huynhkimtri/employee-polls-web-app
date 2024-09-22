import { Content } from "antd/es/layout/layout";
import Home from "../components/Home";
import NavBar from "../components/NavBar";
import { Layout, theme } from "antd";

const MainPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <NavBar />
      <Content style={{ padding: "0 48px", marginTop: "16px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 380,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Home />
        </div>
      </Content>
    </Layout>
  );
};

export default MainPage;
