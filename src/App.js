import './App.css';
import {useContext, useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import RiskPage from "./Pages/RiskPage";
import HomePage from "./Pages/HomePage";
import PortfolioPage from "./Pages/PortfolioPage";
import TradePage from "./Pages/TradePage";
import Navigation from "./components/NavBar";
import RobotPage from "./Pages/RobotPage";
import InstrumentPage from "./Pages/InstrumentPage/InstrumentPage";

// Contexts
import ServerContext from "./context/server-context";
import EnvContext from "./context/env-context";
import PortfolioContext from "./context/portfolio-context";
import RobotContext from "./context/robot-context";
import DateContext from "./context/date-context";

import axios from "axios";
import Button from "react-bootstrap/Button";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


function App() {
    // 'http://127.0.0.1:8000/' 'https://pavliati.pythonanywhere.com/'
    const [robotEnvData, setRobotEnvData] = useState('live');
    const [portfolioData, setPortfolioData] = useState([]);
    const [robotsData, setRobotsData] = useState([]);
    const server = 'https://pavliati.pythonanywhere.com/'

    const getEnvData = (env) => {
        setRobotEnvData(env);
    };
    // Date variables
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0,10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0,10));
    console.log(firstDay.toISOString())
    useEffect(() => {
            axios.get(server + 'portfolios/get_portfolio_data/all')
                .then(response => setPortfolioData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, []
    );
    useEffect(() => {
            axios.get(server + 'robots/get_robots/' + robotEnvData)
                .then(response => setRobotsData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, []
    );
    return (
        <ServerContext.Provider value={{server: server}}>
            <EnvContext.Provider value={{environment: robotEnvData}}>
                <RobotContext.Provider value={{robots: robotsData}}>
                    <PortfolioContext.Provider value={{portfolioData}}>
                        <DateContext.Provider value={{
                            startDate: startDate,
                            endDate: endDate,
                            saveStartDate: setStartDate,
                            saveEndDate: setEndDate,
                        }}>
                            <ReactNotification/>
                            <div className="App">
                                <Navigation onEnvChange={getEnvData} env={robotEnvData}/>
                                <Switch>
                                    <Route path="/risk">
                                        <RiskPage/>
                                    </Route>
                                    <Route path="/home">
                                        <HomePage/>
                                    </Route>
                                    <Route path="/trade">
                                        <TradePage/>
                                    </Route>
                                    <Route path="/portfolio">
                                        <PortfolioPage/>
                                    </Route>
                                    <Route path="/instruments">
                                        <InstrumentPage/>
                                    </Route>
                                    <Route path="/robot">
                                        <RobotPage/>
                                    </Route>
                                </Switch>
                            </div>
                        </DateContext.Provider>
                    </PortfolioContext.Provider>
                </RobotContext.Provider>
            </EnvContext.Provider>
        </ServerContext.Provider>
    );
}

export default App;
