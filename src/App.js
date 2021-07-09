import './App.css';
import {useContext, useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import RiskPage from "./Pages/RiskPage";
import HomePage from "./Pages/HomePage";
import PortfolioPage from "./Pages/PortfolioPage";
import TradePage from "./Pages/TradePage";
import Navigation from "./components/NavBar";
import RobotPage from "./Pages/RobotPage";
import InstrumentPage from "./Pages/InstrumentPage";

// Contexts
import ServerContext from "./context/server-context";
import EnvContext from "./context/env-context";
import PortfolioContext from "./context/portfolio-context";
import axios from "axios";

function App() {
    // 'https://127.0.0.1:8000/' 'https://pavliati.pythonanywhere.com/'
    const [robotEnvData, setRobotEnvData] = useState('live');
    const server = 'http://127.0.0.1:8000/'

    const getEnvData = (env) => {
        setRobotEnvData(env);
    };

    const [portfolioData, setPortfolioData] = useState([]);

    useEffect(() => {
            axios.get(server + 'portfolios/get_portfolio_data/')
                .then(response => setPortfolioData(response['data']))

                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, []
    );

    return (
        <ServerContext.Provider value={{server: server}}>
            <EnvContext.Provider value={{
                environment: robotEnvData
            }}>
                <PortfolioContext.Provider value={{portfolioData}}>
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
                </PortfolioContext.Provider>
            </EnvContext.Provider>
        </ServerContext.Provider>
    );
}

export default App;
