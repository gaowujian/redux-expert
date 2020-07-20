import * as types from "../action-types";
export const login = (username, password) => {
  return { type: types.LOGIN_REQUEST, payload: { username, password } };
};
export const logout = () => {
  return { type: types.LOGOUT_REQUEST };
};
