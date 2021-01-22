import * as actions from "../action-types";
export const add = () => ({
  type: actions.ADD,
});

export const asyncAdd = () => ({
  type: actions.ASYNC_ADD,
});
