import ServerContext from "../context/server-context";
import EntityContext from "../context/entity-context";
import PortfolioContext from "../context/portfolio-context";
import DateContext from "../context/date-context";
import UserContext from "../context/user-context";
import appConfig from "../config files/app-config";
import BrokerContext from "../context/broker-context";
import ReactNotification from "react-notifications-component";
import Navigation from "../NavBar/NavBar";
import {Route, Switch, Redirect, useHistory } from "react-router-dom";
import RiskPage from "../Pages/RiskPage/RiskPage";
import HomePage from "../Pages/HomePage/HomePage";
import TradePage from "../Pages/TradePage/TradePage";
import PortfolioPage from "../Pages/PortfolioPage/PortfolioPage";
import CalculationsPage from "../Pages/CalculationsPage/CalculationsPage";
import InstrumentPage from "../Pages/InstrumentPage/InstrumentPage";
import DashBoardPage from "../Pages/DashBoardPage/DashBoardPage";
import ProfilPage from "../Pages/ProfilPage/ProfilPage";
import DataPage from "../Pages/DataPage/DataPage";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container'

// import './MainApplication.css'

const Notifications = () => {
        const [messages, setMessages] = useState([]);
        console.log(messages)
        useEffect(() => {
            const socket = new WebSocket('ws://127.0.0.1:8000/ws/notifications/');

            socket.onmessage = function (event) {
                const data = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, data.message]);
            };

            socket.onclose = function (e) {
                console.error('WebSocket closed unexpectedly');
            };

            return () => socket.close();
        }, []);

        return (
            <div>
                <p>test</p>
                <h2>Notifications</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        );
    }

const MainApplication = (props) => {
    const { server, currentDate, fistDayOfCurrentYear } = props.config;
    const { userName } = props.user;

    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState('');
    const [newPortfolio, setNewPortfolio] = useState(0);

    const [brokerData, setBrokerData] = useState([{}]);
    const [entity, setEntity] = useState('Portfolio');

    const [accounts, setAccounts] = useState([]);
    const [newAccount, setNewAccount] = useState(0)

    // Date variables
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0, 10));

    useEffect(() => {
            axios.get(server + 'portfolios/get/portfolios/', {
                params: {
                    owner: userName
                }
            })
                .then(response => setPortfolios(response.data))
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
            axios.get(server + 'accounts/get/accounts/', {
                params: {
                    owner: userName
                }
            })
                .then(response => setAccounts(response.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [newAccount]
    );



    return (
        <Container style={{background: '#FBFAFA', padding: 0}} fluid>
            <ServerContext.Provider value={{server: server}}>
                <EntityContext.Provider value={{
                    entity: entity,
                    saveEntity: setEntity,
                }}>

                            <PortfolioContext.Provider value={{
                                portfolios: portfolios,
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
                                        brokerData: brokerData,
                                        accounts: accounts,
                                        newAccount: newAccount,
                                        saveAccount: setNewAccount,
                                    }}>
                                        <UserContext.Provider value={{
                                            user: userName
                                        }}>
                                            <ReactNotification/>

                                            <div style={{border: 1, borderColor: 'grey', background: 'grey'}}>
                                                <Navigation user={userName}/>
                                            </div>

                                            <div style={{height: 1000, width: '100%', overflow: "scroll"}}>
                                                <Switch>
                                                    <Route path="/risk">
                                                        <RiskPage/>
                                                    </Route>
                                                    <Route path="/dashboard">
                                                        <DashBoardPage/>
                                                    </Route>
                                                    <Route path="/home">
                                                        <HomePage/>
                                                    </Route>
                                                    <Route path="/trade">
                                                        <TradePage/>
                                                    </Route>
                                                    <Route path="/data">
                                                        <DataPage/>
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
                                                    <Route path='*' element={<Redirect to='/dashboard'/>}/>
                                                </Switch>
                                            </div>
                                        </UserContext.Provider>
                                    </BrokerContext.Provider>
                                </DateContext.Provider>
                            </PortfolioContext.Provider>
                </EntityContext.Provider>
            </ServerContext.Provider>
        </Container>
    );
};
export default MainApplication;