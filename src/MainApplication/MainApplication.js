import ServerContext from "../context/server-context";
import EntityContext from "../context/entity-context";
import EnvContext from "../context/env-context";
import RobotContext from "../context/robot-context";
import PortfolioContext from "../context/portfolio-context";
import DateContext from "../context/date-context";
import appConfig from "../config files/app-config";
import BrokerContext from "../context/broker-context";
import ReactNotification from "react-notifications-component";
import Navigation from "../components/NavBar";
import {Route, Switch, Redirect, useHistory } from "react-router-dom";
import RiskPage from "../Pages/RiskPage";
import HomePage from "../Pages/HomePage";
import TradePage from "../Pages/TradePage";
import PortfolioPage from "../Pages/PortfolioPage";
import CalculationsPage from "../Pages/CalculationsPage/CalculationsPage";
import InstrumentPage from "../Pages/InstrumentPage/InstrumentPage";
import RobotPage from "../Pages/RobotPage";
import ProfilPage from "../Pages/ProfilPage/ProfilPage";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container'

const MainApplication = (props) => {
    const { server, defaultRobotEnvironment, currentDate, fistDayOfCurrentYear } = props.config;
    const { userName } = props.user;
    const history = useHistory();
    console.log(server)
    const [robotEnvData, setRobotEnvData] = useState(defaultRobotEnvironment);
    const [portfolioData, setPortfolioData] = useState([]);
    const [allRobotsData, setAllRobotsData] = useState([]);
    const [selectedRobotData, setSelectedRobotData] = useState({});
    const [selectedPortfolio, setSelectedPortfolio] = useState('');
    const [newPortfolio, setNewPortfolio] = useState('');
    const [newRobot, setNewRobot] = useState('');
    const [brokerData, setBrokerData] = useState([{'id': 1, 'broker': 'System', 'broker_code': 'ffm_system'}]);
    const [entity, setEntity] = useState('Portfolio');
    const [robotStrategies, setRobotStrategyOptions] = useState([]);

    const getEnvData = (env) => {
        setRobotEnvData(env);
    };

    // Date variables
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0, 10));

    useEffect(() => {
            axios.get(server + 'portfolios/get_portfolio_data/all')
                .then(response => setPortfolioData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
            axios.get(server + 'accounts/get/brokers')
                .then(response => setBrokerData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [newPortfolio]
    );
    useEffect(() => {
            axios.get(server + 'robots/get/robots/' + robotEnvData)
                .then(function (response) {
                    setAllRobotsData(response['data']);
                    setSelectedRobotData(response['data'][0]);
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [newRobot, robotEnvData]
    );

    const getRobotStrategies = async () => {
        const responseStrategies = await axios.get(server + 'robots/get/strategies/',);
        setRobotStrategyOptions(responseStrategies['data'].map((data) => ({
            'value': data['id'],
            'label': data['name']
        })));
    };

    useEffect(() => {
            history.push("/dashboard/");
            getRobotStrategies();
        }, []
    );

    return (
        <Container style={{background: '#FBFAFA', padding: '0px'}} fluid>
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
                            allRobotsData: allRobotsData,
                            selectedRobotData: selectedRobotData,
                            selectRobot: setSelectedRobotData,
                            saveNewRobot: setNewRobot,
                            robotStrategies: robotStrategies,
                            saveRobotStrategy: setRobotStrategyOptions

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
                                    firstDayOfCurrentYear: fistDayOfCurrentYear
                                }}>
                                    <BrokerContext.Provider value={{
                                        brokerData: brokerData
                                    }}>
                                        <ReactNotification/>

                                            <div style={{border: 1, borderColor:'grey', background:'grey'}}>
                                                <Navigation onEnvChange={getEnvData} env={robotEnvData} user={userName}/>
                                            </div>
                                            <div style={{marginTop: 5}}>
                                                <Switch>
                                                    <Route path="/risk">
                                                        <RiskPage/>
                                                    </Route>
                                                    <Route path="/dashboard">
                                                        <HomePage/>
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
                                                    <Route path="/profil">
                                                        <ProfilPage/>
                                                    </Route>
                                                    <Route path="/robot">
                                                        <RobotPage/>
                                                    </Route>

                                                    <Route path='*' element={<Redirect to='/dashboard'/>}/>
                                                </Switch>
                                            </div>
                                    </BrokerContext.Provider>
                                </DateContext.Provider>
                            </PortfolioContext.Provider>
                        </RobotContext.Provider>
                    </EnvContext.Provider>
                </EntityContext.Provider>
            </ServerContext.Provider>
        </Container>
    );
};
export default MainApplication;