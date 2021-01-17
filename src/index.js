import React from "react";
import ReactDOM from "react-dom";
import Counter1 from "./componnts/Counter1";
import Counter2 from "./componnts/Counter2";

function App() {
  return (
    <div>
      <Counter1 />
      <Counter2 />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
