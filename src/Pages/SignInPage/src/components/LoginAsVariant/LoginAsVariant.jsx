/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React, {useContext} from "react";
import "./style.css";
import UserContext from "../../../../../context/user-context";

export const LoginAsVariant = ({className}) => {
  return (
      <div className={`login-as-variant ${className}`}>
        <div className="overlap-group-2">
          <div className="group">
            <img className="ellipse" alt="Ellipse" src="sign_in//img/ellipse-3-3.svg"/>

          <div className="group-2">
            <div className="text-wrapper-3">Username</div>

            <div className="text-wrapper-4">Active 1 days ago</div>
          </div>
        </div>

        <div className="cancel">
          <div className="group-3" />
        </div>
      </div>
    </div>
  );
};
