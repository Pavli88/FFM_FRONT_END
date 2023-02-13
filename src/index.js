import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import appConfig from "./config files/app-config";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from "./context/AuthProvider";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App {...appConfig}/>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
