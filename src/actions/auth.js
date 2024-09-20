import { LOGIN, LOGIN_ERROR, LOGOUT } from "../utils/constants";

export const login = (user) => ({
  type: LOGIN,
  user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  error,
});
