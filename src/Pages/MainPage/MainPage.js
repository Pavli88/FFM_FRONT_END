import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import AuthForms from "./AuthForms/AuthForms";

const MainPage = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [authFormType, setAuthFormType] = useState("login");

    const imageUrl = 'https://wallpapercave.com/wp/wp2833183.jpg';

    const divStyle = {
        height: '100vh',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div>
            <div style={{ width: '100%', padding: 15, display: "flex" }}>
                <div>
                    <h2 style={{ margin: 0, height: '100%' }}>FractalPortfolios</h2>
                    <p>Trade like a Pro. Manage like an Expert</p>
                </div>
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

            <Switch>
                <Route path="/reset_password/:reset_token">
                    <ResetPassword />
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
