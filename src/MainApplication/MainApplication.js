import ServerContext from "../context/server-context";
import PortfolioContext from "../context/portfolio-context";
import DateContext from "../context/date-context";
import UserContext from "../context/user-context";
import BrokerContext from "../context/broker-context";
import DashboardContext from "../context/dashboard-context";
import {WsProvider} from "../context/ws-context";

import ReactNotification from "react-notifications-component";
import Navigation from "../NavBar/NavBar";
import {Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import TradePage from "../Pages/TradePage/TradePage";
import PortfolioPage from "../Pages/PortfolioPage/PortfolioPage";
import CalculationsPage from "../Pages/CalculationsPage/CalculationsPage";
import InstrumentPage from "../Pages/InstrumentPage/InstrumentPage";
import DashBoardPage from "../Pages/DashBoardPage/DashBoardPage";
import MyPortfoliosPage from "../Pages/UserMenu/MyPortfolios/MyPortfoliosPage";
import DataPage from "../Pages/DataPage/DataPage";
import React, {useEffect, useState} from "react";
import BrokerAccountsPage from "../Pages/UserMenu/BrokerAccounts/BrokerAccountsPage";
import fetchAPI from "../config files/api";
import Subscriptions from "../Pages/UserMenu/Subscriptions";
import UserProfile from "../Pages/UserMenu/UserProfile/UserProfile";
import PublicProfile from "../Pages/PublicProfile/PublicProfile";

const MainApplication = ({config}) => {
    const { server, currentDate, fistDayOfCurrentYear } = config;

    //User related data and variables
    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState({});

    // Broker Data
    const [brokerData, setBrokerData] = useState([{}]);
    const [brokerCredentials, setBrokerCredentials] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [newAccount, setNewAccount] = useState(0)

    const apiNotSupportedBroker = brokerData.filter(data => data.api_support === false)
    const apiSupportedBroker = brokerData.filter(data => data.api_support === true)

    // Date variables
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0, 10));
    const [userData, setUserData] = useState([{}]);

    // Dashboard Context
    const [portGroup, setPortGroup] = useState(null);

    const fetchUserData = async () => {
        try {
            const response = await fetchAPI.get('user/get/data/');

            // Append timestamp to avoid cache issues
            let updatedUserData = {
                ...response.data,
                image_url: response.data.image_url ? `${response.data.image_url}?t=${Date.now()}` : null,
            };

            setUserData(updatedUserData);
        } catch (error) {
            console.error("Error fetching user data:", error.response?.data || error.message);
        }
    };


    const fetchAccountData = async () => {
        try {
            const response = await fetchAPI.get('accounts/get/accounts/', {
                    params: {
                        user: userData.username
                    }
                });
            setAccounts(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error.response?.data || error.message);
        }
    };

    const fetchBrokers = async () => {
        try {
            const response = await fetchAPI.get('accounts/get/brokers');
            setBrokerData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error.response?.data || error.message);
        }
    };

    const fetchBrokersCredentials = async () => {
        try {
            const response = await fetchAPI.get('accounts/credentials');
            setBrokerCredentials(response.data);
        } catch (error) {
            setBrokerCredentials(null);
            console.error("Error fetching user data:", error.response?.data || error.message);
        }
    };

    const fetchPortfolios = async () => {
        try {
            const response = await fetchAPI.get('portfolios/get/portfolios/');
            setPortfolios(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
            fetchUserData();
        }, []
    );

    useEffect(() => {
        fetchBrokers();
        fetchBrokersCredentials();
    }, []);

    useEffect(() => {
        if (userData?.username) {
            fetchPortfolios();
        }
    }, [userData]);

    useEffect(() => {
        if (userData?.username) {
            fetchAccountData();
        }
    }, [userData, newAccount]);


    return (
        <div style={{background: '#FBFAFA', padding: 0}}>
            <WsProvider>
                <ServerContext.Provider value={{
                    server: server,
                }}>
                    <PortfolioContext.Provider value={{
                        portfolios: portfolios,
                        selectedPortfolio: selectedPortfolio,
                        selectPortfolio: setSelectedPortfolio,
                        fetchPortfolios: fetchPortfolios,
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
                                brokerCredentials: brokerCredentials,
                                fetchBrokersCredentials: fetchBrokersCredentials,
                                fetchAccounts: fetchAccountData,
                                fetchBrokers: fetchBrokers,
                                apiSupportedBrokers: apiSupportedBroker,
                                apiNotSupportedBrokers: apiNotSupportedBroker
                            }}>
                                <UserContext.Provider value={
                                    {userData, fetchUserData}
                                }>
                                    <DashboardContext.Provider value={{
                                        portGroup: portGroup,
                                        setPortGroup: setPortGroup,
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

                                        <div style={{
                                            marginTop: 85,
                                            height: 'calc(100vh - 60px)',
                                            width: '100%',
                                        }}>
                                            <Switch>
                                                {/*<Route path="/risk">*/}
                                                {/*    <RiskPage/>*/}
                                                {/*</Route>*/}
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
                                                <Route path="/subscriptions">
                                                    <Subscriptions/>
                                                </Route>
                                                <Route path="/myPortfolios">
                                                    <MyPortfoliosPage/>
                                                </Route>
                                                <Route path="/brokerAccounts">
                                                    <BrokerAccountsPage/>
                                                </Route>
                                                <Route path="/user/:username">
                                                    <PublicProfile/>
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
            </WsProvider>
        </div>
    );
};
export default MainApplication;