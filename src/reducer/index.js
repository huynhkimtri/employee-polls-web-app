import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pollsReducer from "./pollsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  polls: pollsReducer,
  users: userReducer,
});

export default rootReducer;
