import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { tasksReduser } from "./tasks";

const rootReduser = combineReducers({
  auth: authReducer,
  tasks: tasksReduser
});

export default rootReduser;