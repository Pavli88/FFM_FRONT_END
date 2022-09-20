import './App.css';
import React, {useContext, useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import RiskPage from "./Pages/RiskPage";
import HomePage from "./Pages/HomePage";
import PortfolioPage from "./Pages/PortfolioPage";
import TradePage from "./Pages/TradePage";
import Navigation from "./components/NavBar";
import RobotPage from "./Pages/RobotPage";
import InstrumentPage from "./Pages/InstrumentPage/InstrumentPage";
import CalculationsPage from "./Pages/CalculationsPage/CalculationsPage";

// Contexts
import ServerContext from "./context/server-context";
import EnvContext from "./context/env-context";
import PortfolioContext from "./context/portfolio-context";
import RobotContext from "./context/robot-context";
import DateContext from "./context/date-context";
import BrokerContext from "./context/broker-context";
import EntityContext from "./context/entity-context";

import axios from "axios";
import Button from "react-bootstrap/Button";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


function App() {
    // 'http://127.0.0.1:8000/' 'https://pavliati.pythonanywhere.com/'
    const [robotEnvData, setRobotEnvData] = useState('live');
    const [portfolioData, setPortfolioData] = useState([]);
    const [robotsData, setRobotsData] = useState([]);
    const [selectedRobot, setSelectedRobot] = useState('');
    const [selectedPortfolio, setSelectedPortfolio] = useState('');
    const [newPortfolio, setNewPortfolio] = useState('');
    const [brokerData, setBrokerData] = useState([{'id': 1,'broker': 'System', 'broker_code': 'ffm_system'}]);
    const [entity, setEntity] = useState('Portfolio');
    const server = 'https://pavliati.pythonanywhere.com/'
    console.log(selectedPortfolio)
    const getEnvData = (env) => {
        setRobotEnvData(env);
    };
    // Date variables
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0,10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0,10));
    const currentDate = date.toISOString().substr(0,10);

    useEffect(() => {
            axios.get(server + 'portfolios/get_portfolio_data/all')
                .then(response => setPortfolioData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
            axios.get(server + 'accounts/get_brokers/')
                .then(response => setBrokerData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [newPortfolio]
    );
    useEffect(() => {
            axios.get(server + 'robots/get_robots/' + robotEnvData)
                .then(response => {
                    setRobotsData(response['data']);
                    setSelectedRobot(response['data'][0]['name']);
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, []
    );

    return (
        <ServerContext.Provider value={{server: server}}>
            <EntityContext.Provider value={{
                entity: entity,
                saveEntity: setEntity,
            }}>
                <EnvContext.Provider value={{
                    environment: robotEnvData,
                    saveEnvironment: setRobotEnvData,
                }}>
                    <RobotContext.Provider value={{
                        robots: robotsData,
                        selectedRobot: selectedRobot,
                        selectRobot: setSelectedRobot,
                    }}>
                        <PortfolioContext.Provider value={{
                            portfolios: portfolioData,
                            selectedPortfolio: selectedPortfolio,
                            selectPortfolio: setSelectedPortfolio,
                            saveNewPortfolio: setNewPortfolio,
                        }}>
                            <DateContext.Provider value={{
                                startDate: startDate,
                                endDate: endDate,
                                saveStartDate: setStartDate,
                                saveEndDate: setEndDate,
                                currentDate: currentDate,
                            }}>
                                <BrokerContext.Provider value={{
                                        brokerData: brokerData
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
                                            <Route path="/calculations">
                                                <CalculationsPage/>
                                            </Route>
                                            <Route path="/instruments">
                                                <InstrumentPage/>
                                            </Route>
                                            <Route path="/robot">
                                                <RobotPage/>
                                            </Route>
                                        </Switch>
                                    </div>
                                </BrokerContext.Provider>
                            </DateContext.Provider>
                        </PortfolioContext.Provider>
                    </RobotContext.Provider>
                </EnvContext.Provider>
            </EntityContext.Provider>
        </ServerContext.Provider>
    );
}

export default App;
