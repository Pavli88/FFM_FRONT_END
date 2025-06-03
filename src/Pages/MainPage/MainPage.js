import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import AuthForms from "./AuthForms/AuthForms";
import LandingPage from "../LandingPage/LandingPage";
import Login from "../SignInPage/src/screens/Login/Login"
const MainPage = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [authFormType, setAuthFormType] = useState("login");

    return (
        <div>
            <div style={{ width: '100%', display: "flex" }}>
                <div style={{ position: "absolute", right: 10, display: "flex" }}>
                    <div style={{ margin: 5, height: 40 }}>
                        <button className={'normal-button'} style={{ padding: 10 }}
                            onClick={() => {
                                setAuthFormType("signup");
                                setShowModal(true);
                            }}>
                            Sign Up
                        </button>
                    </div>
                    <div style={{ margin: 5, height: 40 }}>
                        <button className={'normal-button'} style={{ padding: 10 }}
                            onClick={() => {
                                setAuthFormType("login");
                                setShowModal(true);
                            }}>
                            Sign In
                        </button>
                    </div>
                </div>

            </div>
            {/*<LandingPage/>*/}
            <Switch>
                <Route path="/reset_password/:reset_token">
                    <ResetPassword />
                </Route>
            </Switch>
            <Login
                show={showModal}
                onClose={() => setShowModal(false)}
                initialForm={authFormType}
            />
        </div>
    );
};

export default MainPage;
