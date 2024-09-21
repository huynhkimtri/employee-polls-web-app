import { useDispatch } from "react-redux";
import { login, loginError } from "../actions/auth";
import { useEffect, useState } from "react";
import { _getUsers } from "../utils/_DATA";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let naviagate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const users = await _getUsers();
    const user = users[values.username];

    if (user && user.password === values.password) {
      dispatch(login(user));
      // Redirect to home or desired page after login
      naviagate("/");
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
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <h1 style={{ textAlign: "center" }}>Employee Polls</h1>
        {error && (
          <Alert
            style={{ marginBottom: "10px" }}
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
          <a className="login-form-forgot" href="/">
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
