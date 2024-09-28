import { useDispatch } from "react-redux";
import { login, loginError } from "../actions/auth";
import { useEffect, useState } from "react";
import { loginWithUsernamePassword } from "../utils/API";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Checkbox, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  let navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    setError(null);
    const user = await loginWithUsernamePassword(
      values.username,
      values.password
    );
    if (user) {
      dispatch(login(user));
      // dispatch(handleInitialData(user.id));
      // Redirect to home or desired page after login
      navigate(from, { replace: true });
    } else {
      const errorMessage = "Invalid username or password";
      dispatch(loginError(errorMessage));
      setError(errorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    setError(null);
  }, [username, password]);

  return (
    <div className="login-container">
      {contextHolder}
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <h1 style={{ textAlign: "center" }}>Employee Polls</h1>
        {error && (
          <Alert
            showIcon
            style={{ marginBottom: "20px" }}
            message={error}
            type="error"
          />
        )}
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a
            className="login-form-forgot"
            href="###"
            onClick={() =>
              messageApi.info(
                "Hello, this function is currently under development!"
              )
            }
          >
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
