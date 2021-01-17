import ReactReduxContext from "./ReactReduxContext";
import React from "react";
export default function Provider(props) {
  const value = { store: props.store };
  return (
    <ReactReduxContext.Provider value={value}>
      {props.children}
    </ReactReduxContext.Provider>
  );
}
