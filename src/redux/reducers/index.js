import { combineReducers } from "../../redux";
import counter1 from "./counter1";
import counter2 from "./counter2";

// 注意combineReducers的传入参数是一个 object
const rootReducer = combineReducers({ counter1, counter2 });

export default rootReducer;
