import './App.css';
import {useState} from "react";
import {Route, Switch} from "react-router-dom";
import RiskPage from "./Pages/RiskPage";
import HomePage from "./Pages/HomePage";
import PortfolioPage from "./Pages/PortfolioPage";
import TradePage from "./Pages/TradePage";
import Navigation from "./components/NavBar";
import RobotPage from "./Pages/RobotPage";

// Contexts
import ServerContext from "./context/server-context";
import EnvContext from "./context/env-context";


function App() {

    const [robotEnvData, setRobotEnvData] = useState('live');
    console.log(robotEnvData)
    const getEnvData = (env) => {
        setRobotEnvData(env);
    };

    return (
        <ServerContext.Provider value={{
            server: 'http://127.0.0.1:8000/'
        }}>
            <div className="App">
                <EnvContext.Provider value={{
                    environment: robotEnvData
                }}>
                    <Navigation onEnvChange={getEnvData}/>
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
                        <Route path="/robot">
                            <RobotPage/>
                        </Route>
                    </Switch>
                </EnvContext.Provider>
            </div>
        </ServerContext.Provider>
    );
}

export default App;
