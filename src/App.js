import appConfig from "./config files/app-config";
import React, {useContext, useEffect, useState} from "react";
import MainApplication from "./MainApplication/MainApplication";
import MainPage from "./Pages/MainPage/MainPage";
import './App.css'
// Contexts
import AuthContext from "./context/AuthProvider";

function App(props) {
    const { auth } = useContext(AuthContext);

    if (!auth.userAllowedToLogin) {
        return <MainPage server={props.server}/>
    }
    return (
        <MainApplication config={props} userData={auth.user}/>
    );
}
export default App;
