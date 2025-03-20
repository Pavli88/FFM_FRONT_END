import UserRegistration from "./UserRegistertration";
import UserLogin from "./UserLogin";
import {Route, Switch, Link} from "react-router-dom";
import ResetPassword from "./ResetPassword";
import React, {useState} from "react";


const MainPage = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    const imageUrl = 'https://wallpapercave.com/wp/wp2833183.jpg'; // Replace with your actual image path
    const [showModal, setShowModal] = useState(false);

    const divStyle = {
        height: '100vh', // Full height of the viewport
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover', // Cover the entire div
        backgroundPosition: 'center', // Center the image
    };
    return (
        <div>
            <div style={{width: '100%', padding: 15, display: "flex"}}>
                <div>
                    <h2 stlye={{margin: 0, height: '100%', color: 'white'}}>FractalPortfolios</h2>
                    <p>Trade like a Pro. Manage like an Expert</p>
                </div>
                <div style={{position: "absolute", right: 10, display: "flex"}}>
                    <Link to={"/register"}>
                        <div style={{margin: 5, height: 40}}>
                                   <button className={'normal-button'} style={{padding: 10}}
                                    onClick={() => setShowModal(true)}>Create Account
                            </button>
                        </div>
                    </Link>
                    <Link to={"/login"}>
                        <div style={{margin: 5, height: 40}}>
                            <button className={'normal-button'} style={{padding: 10}}
                                    onClick={() => setShowModal(true)}>Login
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
            <Switch>
                <Route path="/login">
                    {showModal && (
                        <UserLogin
                           show={showModal} close={() => setShowModal(false)}
                        />
                    )}
                </Route>
                <Route path="/register">
                    {showModal && (
                        <UserRegistration
                            show={showModal} close={() => setShowModal(false)}
                        />
                    )}
                </Route>
                <Route path="/reset_password/:reset_token">
                    <ResetPassword />
                </Route>
            </Switch>
        </div>
    )
};
export default MainPage;