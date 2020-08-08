import * as types from "../actionType";
import { push } from "../../connected-react-router";
export const add = (payload) => ({
  type: types.ADD,
  payload,
});
export const minus = (payload) => ({
  type: types.MINUS,
  payload,
});
export const goHome = () => {
  return push("/home");
};
