//  action 生成器
export const add = function () {
  return { type: "add" };
};
export const minus = function () {
  return { type: "minus" };
};

export const asyncAdd = function () {
  return function (dispatch) {
    setTimeout(() => {
      dispatch({ type: "add" });
    }, 1000);
  };
};
