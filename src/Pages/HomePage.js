import ApexChart from "../components/Charts";
import Card from "../components/Card";
import {useEffect, useState} from "react";
import axios from "axios";

const HomePage = () => {
    const xdata = [1,2,3,4]
    const ydata = [100, 265, 774, 222]

    const [robotBalanceData, setRobotBalanceData] = useState([])

    const requestData = {
        'start_date': 21,
        'end_date': 34,
    }

    useEffect(() => {
            axios.get('http://127.0.0.1:8000/robots/get_robot_balance/all', {params:requestData})
                .then(response => response.json())
                .then(data => setRobotBalanceData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, []
    );

    return(
        <div>
            <h2>Home Page</h2>

            <Card name="Test">
                <ApexChart chartType="bar" xdata={xdata} ydata={ydata}/>
            </Card>
        </div>
    )
}

export default HomePage;