import { combineReducers } from "redux";
import counter from "./counter";

// 注意combineReducers的传入参数是一个 object
const rootReducer = combineReducers({ counter });

export default rootReducer;
