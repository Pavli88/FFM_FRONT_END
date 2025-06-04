import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import LandingPage from "../LandingPage/LandingPage";
import AuthForms from "./AuthForms/AuthForms";
import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";


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
                <Route exact path="/">
                    <LoginPage />
                    {/*<LandingPage />*/}
                </Route>
                <Route path="/reset_password/:reset_token">
                    <ResetPassword />
                </Route>
                <Route path="/login/">
                    <LoginPage />
                </Route>
                <Route path="/sign_up/">
                    <SignUpPage/>
                </Route>
            </Switch>
            <AuthForms
                show={showModal}
                onClose={() => setShowModal(false)}
                initialForm={authFormType}
            />
        </div>
    );
};

export default MainPage;
