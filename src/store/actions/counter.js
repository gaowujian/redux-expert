import { push } from "../../connected-react-router";
import * as actions from "../action-types";
export const add = () => ({
  type: actions.ADD,
});

export const goHome = (path = "/") => {
  return push(path);
};
