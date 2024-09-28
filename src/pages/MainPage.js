import { Content } from "antd/es/layout/layout";
import NavBar from "../components/NavBar";
import { Col, Layout, Row, theme } from "antd";
import { Outlet } from "react-router-dom";
import { LoadingBar } from "react-redux-loading-bar";

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
        <LoadingBar />
        <Row justify={"center"}>
          <Col
            span={18}
            style={{
              background: colorBgContainer,
              minHeight: 380,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default MainPage;
