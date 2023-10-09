import axios from "axios";
import {useContext, useEffect, useState, useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import EnvContext from "../../context/env-context";
import ServerContext from "../../context/server-context";
import HomePageReportDateContext from "./contexts/HomePageReportDateContext";


const HomePage = (props) => {
    const [requestParameters, setRequestParameters] = useState({'startDate': '', 'robots': []});

    return (
        <HomePageReportDateContext.Provider value={{
            requestParameters: requestParameters,
            saveRequestParameters: setRequestParameters,
        }}>

        </HomePageReportDateContext.Provider>
    );
};

export default HomePage;