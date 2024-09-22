import { LOGIN, LOGIN_ERROR, LOGOUT } from "../utils/constants";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.user,
        error: null,
      };
    case LOGOUT:
      return initialState;
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default authReducer;
