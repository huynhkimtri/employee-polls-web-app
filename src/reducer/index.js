import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pollsReducer from "./pollsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  polls: pollsReducer,
});

export default rootReducer;
