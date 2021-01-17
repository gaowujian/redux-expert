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
        onClick={() => {
          dispatch({ type: ADD1 });
        }}
      >
        +
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
