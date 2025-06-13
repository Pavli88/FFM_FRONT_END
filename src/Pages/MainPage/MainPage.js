import React from "react";
import { Route, Switch } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";

const MainPage = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/reset_password/:reset_token">
          <ResetPassword />
        </Route>
        <Route path="/login/">
          <LoginPage />
        </Route>
        <Route path="/sign_up/">
          <SignUpPage />
        </Route>
      </Switch>
    </div>
  );
};

export default MainPage;
