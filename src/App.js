import './App.css';
import {Route, Switch} from "react-router-dom";
import RiskPage from "./Pages/RiskPage";
import HomePage from "./Pages/HomePage";
import PortfolioPage from "./Pages/PortfolioPage";
import TradePage from "./Pages/TradePage";
import Navigation from "./components/NavBar";
import RobotPage from "./Pages/RobotPage";

function App() {

  return (
      <div className="App">

          <Navigation/>
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

      </div>
  );
}

export default App;
