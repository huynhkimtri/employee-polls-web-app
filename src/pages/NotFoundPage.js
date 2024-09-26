import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const NotFoundPage = () => {
  let navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button
        type="primary"
        onClick={() => navigate("/")}
        icon={<HomeOutlined />}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
