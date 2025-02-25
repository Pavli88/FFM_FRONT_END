import ServerContext from "../context/server-context";
import PortfolioContext from "../context/portfolio-context";
import DateContext from "../context/date-context";
import UserContext from "../context/user-context";
import BrokerContext from "../context/broker-context";
import DashboardContext from "../context/dashboard-context";
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
import UserProfile from "../Pages/UserMenu/UserProfile/UserProfile";
import MyPortfoliosPage from "../Pages/UserMenu/MyPortfolios/MyPortfoliosPage";
import DataPage from "../Pages/DataPage/DataPage";
import React, {useEffect, useState} from "react";
import axios from "axios";
import BrokerAccountsPage from "../Pages/UserMenu/BrokerAccounts/BrokerAccountsPage";

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

const MainApplication = ({config}) => {
    const { server, currentDate, fistDayOfCurrentYear } = config;

    //User related data and variables
    // const { username, email, first_name, last_name, date_joined, last_login, is_staff, is_superuser} = userData;
    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState('');
    const [newPortfolio, setNewPortfolio] = useState(0);

    const [brokerData, setBrokerData] = useState([{}]);
    const [accounts, setAccounts] = useState([]);
    const [newAccount, setNewAccount] = useState(0)

    // Date variables
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0, 10));
    const [userData, setUserData] = useState([{}]);

    console.log(userData)
    // Dashboard Context
    const [portGroup, setPortGroup] = useState(null);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("access");
            const response = await axios.get(`${server}user/get/data/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
            fetchUserData();
        }, []
    );

    useEffect(() => {
            axios.get(server + 'accounts/get/brokers')
                .then(response => setBrokerData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, []
    );

    useEffect(() => {
            axios.get(server + 'portfolios/get/portfolios/', {
                params: {owner: userData.username}
            })
                .then(response => setPortfolios(response.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [newPortfolio]
    );

    useEffect(() => {
            axios.get(`${server}accounts/get/accounts/`, {params: {owner: userData.username}})
                .then(response => setAccounts(response.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        },[ newAccount ]
    );


    return (
        <div style={{background: '#FBFAFA', padding: 0}}>
            <ServerContext.Provider value={{server: server}}>
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
                            <UserContext.Provider value={userData}>
                                <DashboardContext.Provider value={{
                                    portGroup: portGroup,
                                    setPortGroup: setPortGroup
                                }}>
                                    <ReactNotification/>

                                    <div style={{
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        // border: '1px solid grey',
                                        background: 'grey',
                                        zIndex: 1000
                                    }}>
                                        <Navigation user={userData.username}/>
                                    </div>

                                    <div  style={{
                                        marginTop: 85,
                                        height: 'calc(100vh - 60px)',
                                        width: '100%',
                                    }}>
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
                                            <Route path="/profile">
                                                <UserProfile/>
                                            </Route>
                                            <Route path="/myPortfolios">
                                                <MyPortfoliosPage/>
                                            </Route>
                                            <Route path="/brokerAccounts">
                                                <BrokerAccountsPage/>
                                            </Route>
                                            <Route path='*' element={<Redirect to='/dashboard'/>}/>
                                        </Switch>
                                    </div>
                                </DashboardContext.Provider>
                            </UserContext.Provider>
                        </BrokerContext.Provider>
                    </DateContext.Provider>
                </PortfolioContext.Provider>

            </ServerContext.Provider>
        </div>
    );
};
export default MainApplication;