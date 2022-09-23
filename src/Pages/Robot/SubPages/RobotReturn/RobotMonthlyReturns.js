import {useContext, useEffect, useState} from "react";
import axios from "axios";

import MonthlyReturnsChart from "../../../../components/Charts/MonthlyReturnsChart";

// Context
import DateContext from "../../../../context/date-context";
import RobotContext from "../../../../context/robot-context";
import serverContext from "../../../../context/server-context";

const RobotMonthlyReturns = () => {
    const startDate = useContext(DateContext)['startDate'];
    const selectedRobot = useContext(RobotContext)['selectedRobot'];
    const server = useContext(serverContext)['server'];
    const [responseData, setResponseData] = useState([]);
    const returns = responseData.map((data) => data['ret']*100);
    const dates = responseData.map((data) => data['date']);
    console.log(responseData)
    useEffect(() => {
            axios.get(server + 'robots/get/monthly_returns/', {
                params: {
                    robot_code: selectedRobot,
                    date: startDate.slice(0, 7)
                }
            })
                .then(response => setResponseData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [ ,selectedRobot, startDate]
    );

    return (
        <MonthlyReturnsChart returns={returns} dates={dates}/>
    );
};
export default RobotMonthlyReturns;