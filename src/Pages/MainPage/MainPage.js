import UserRegistration from "./UserRegistertration";
import UserLogin from "./UserLogin";
import {Route, Switch, Link} from "react-router-dom";

const MainPage = (props) => {
    const imageUrl = 'https://wallpapercave.com/wp/wp2833183.jpg'; // Replace with your actual image path

    const divStyle = {
        height: '100vh', // Full height of the viewport
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover', // Cover the entire div
        backgroundPosition: 'center', // Center the image
    };
    return (
        <div style={divStyle}>
            <div style={{width: '100%', padding: 15, display: "flex"}}>
                <div>
                    <h2 stlye={{margin: 0, height: '100%', color: 'white'}}>FractalPortfolios</h2>
                    <p>Investment & Trading System</p>
                </div>
                <div style={{position: "absolute", right: 10, display: "flex"}}>
                    <Link to={"/register"}>
                        <div style={{margin: 5, height: 40}}>
                            <button className={'normal-button'} style={{padding: 10}}>Create Account</button>
                        </div>
                    </Link>
                    <Link to={"/login"}>
                        <div style={{margin: 5, height: 40}}>
                            <button className={'normal-button'} style={{padding: 10}}>Login</button>
                        </div>
                    </Link>
                </div>
            </div>
            <Switch>
                <Route path="/login">
                    <UserLogin server={props.server}/>
                </Route>
                <Route path="/register">
                    <UserRegistration server={props.server}/>
                </Route>
            </Switch>
        </div>
    )
};
export default MainPage;