import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pollsReducer from "./pollsReducer";
import userReducer from "./userReducer";
import { loadingBarReducer } from "react-redux-loading-bar";

const rootReducer = combineReducers({
  auth: authReducer,
  polls: pollsReducer,
  users: userReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
