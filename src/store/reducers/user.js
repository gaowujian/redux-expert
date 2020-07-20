import * as types from "../action-types";
const initialState = {};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case types.LOGIN_SUCCESS: {
      // 直接覆盖,不需要保留老状态
      return { token: payload };
    }
    case types.LOGIN_FAIL: {
      return { error };
    }

    case types.LOGOUT_SUCCESS: {
      return {};
    }

    default:
      return state;
  }
};
