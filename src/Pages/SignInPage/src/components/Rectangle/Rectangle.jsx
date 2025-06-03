/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./style.css";

export const Rectangle = ({ stateProp, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "state",
  });

  return (
    <div
      className={`rectangle ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="overlap-group">
        <div className={`text-wrapper ${state.state}`}>
          Username or email address
        </div>

        <div className={`div state-${state.state}`} />
      </div>
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "click":
      return {
        ...state,
        state: "active",
      };
  }

  return state;
}

Rectangle.propTypes = {
  stateProp: PropTypes.oneOf(["state", "active"]),
};
