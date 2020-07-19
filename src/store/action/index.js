import * as types from "../action-types";
export const increment = () => {
  return { type: types.INCREAMENT };
};
export const asyncIncrement = () => {
  return { type: types.ASYNCINCREAMENT };
};
export const decrement = () => {
  return { type: types.DECREAMENT };
};
