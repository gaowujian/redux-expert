import React from "react";
import { useSelector, useDispatch } from "../react-redux";
import { ADD1, MINUS1 } from "../store/action-types";
function Counter1() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.c1;
  });

  return (
    <div>
      <p>number:{state.number}</p>
      <button
        onClick={function promiseClick() {
          console.log("dispatch:", dispatch);
          debugger;
          dispatch(
            new Promise(function promise11(resolve, reject) {
              setTimeout(() => {
                resolve({ type: ADD1 });
              }, 1000);
            })
          );
        }}
      >
        promise +
      </button>
      <br />
      <button
        onClick={function thunkClick() {
          dispatch(function thunkAction1(storeDispatch) {
            debugger;
            setTimeout(function thunkAction2() {
              storeDispatch({ type: ADD1 });
            }, 1000);
          });
        }}
      >
        thunk +
      </button>
      <br />
      <button
        onClick={() => {
          dispatch({ type: MINUS1 });
        }}
      >
        -
      </button>
    </div>
  );
}
export default Counter1;
