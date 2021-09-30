import {useContext, useEffect, useState} from "react";

import RobotContext from "../../../context/robot-context";
import Table from "react-bootstrap/Table";

import ExecutionRow from "./ExecutionRow";

// CSS
import "../../MainCSS.css"
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";

const RobotExecution = (props) => {
    const [robots, setRobots] = useState([]);
    const [parentState, setParentState] = useState('in');

    // Fetching robot risk data from database
    useEffect(() => {
            fetch(props.server + 'robots/get_robots/' + props.env)
                .then(response => response.json())
                .then(data => setRobots(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    const updateParent = (state) => {
        console.log('updater')
        console.log(state)
        setParentState(state);
    };

    const robotData = robots.map((value) =>
        <ExecutionRow server={props.server}
                      robot={value['name']}
                      status={value['status']}
                      strategy={value['strategy']}
                      strategy_params={value['strategy_params']}
                      update={updateParent}
                      timeframe={value['time_frame']}/>
    );

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Robot Execution</Card.Title>
            <div style={{height: '500px', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead style={{fontSize: 12}}>
                    <tr>
                        <th style={{verticalAlign: "middle"}}>Robot</th>
                        <th style={{verticalAlign: "middle"}}>Strategy</th>
                        <th style={{verticalAlign: "middle"}}>Side</th>
                        <th style={{verticalAlign: "middle"}}>Status</th>
                        <th style={{verticalAlign: "middle"}}>Time Frame</th>
                        <th style={{verticalAlign: "middle"}}>Options</th>
                        <th style={{verticalAlign: "middle"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {robotData}
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default RobotExecution;