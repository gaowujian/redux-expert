import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_USERS_CLICK } from "../store/action-types";
import { counterAction } from "../store/actions";
import { counterRoutine } from "../store/routines";
import { connect } from "react-redux";

function Counter(props) {
  // const dispatch = useDispatch(counterRoutine);
  // console.log(dispatch);
  // const state = useSelector((state) => state.counter);
  return (
    <div>
      <p>number:{props.number}</p>
      <ul>
        {props.users.length > 0 &&
          props.users.map((user) => {
            return <li key={user.name}>{user.name}</li>;
          })}
      </ul>

      {/* <button
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
      </button> */}
      <br />
      <button
        onClick={() => {
          props.counterRoutine();
          console.log(props.counterRoutine(counterRoutine.SUCCESS));
        }}
      >
        获取users
      </button>
    </div>
  );
}

export default connect((state) => state.counter, { counterRoutine })(Counter);
