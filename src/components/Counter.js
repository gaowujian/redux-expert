import React from "react";
import { useState } from "react";
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
        +
      </button>
      <button
        onClick={() => {
          dispatch(counterAction.goHome("/"));
        }}
      >
        跳转到首页
      </button>
    </div>
  );
}

export default About;
