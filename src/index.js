import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import appConfig from "./config files/app-config";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App {...appConfig}/>
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
