import { combineReducers } from "../../redux";
import counter1 from "./reducer1";
import counter2 from "./reducer2";
export default combineReducers({
  c1: counter1,
  counter2,
});
