import { useDispatch } from "react-redux";
import { login, loginError } from "../actions/auth";
import { useState } from "react";
import { _getUsers } from "../utils/_DATA";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  let naviagate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const users = await _getUsers();
    console.log("🚀 ~ handleLogin ~ users:", users);
    const user = users[username];
    console.log("🚀 ~ handleLogin ~ user:", user);

    if (user && user.password === password) {
      dispatch(login(user));
      // Redirect to home or desired page after login
      naviagate("/");
    } else {
      const errorMessage = "Invalid username or password";
      dispatch(loginError(errorMessage));
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
