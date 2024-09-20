import { LOGIN, LOGIN_ERROR, LOGOUT } from "../utils/constants";

export const login = (userId) => ({
  type: LOGIN,
  userId,
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  error,
});
