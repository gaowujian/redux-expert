import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterAction } from "../store/actions";

function About() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.counter);
  return (
    <div>
      <p>number:{state.number}</p>
      <button
        onClick={() => {
          dispatch(counterAction.add());
        }}
      >
        同步+1
      </button>
      <br />
      <button
        onClick={() => {
          dispatch(counterAction.asyncAdd());
        }}
      >
        异步+1
      </button>
    </div>
  );
}

export default About;
