import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {useState} from "react";

import StrategyOptionsModal from "./StrategyOptionsModal";

const ExecutionRow = (props) => {
    const minVal = props.timeframe.slice(1)
    let schedType = ''
    if (props.timeframe.slice(0, 1) === 'M'){
        schedType = 'I'
    }else{
        schedType = props.timeframe.slice(0, 1)
    }

    const updater = (val) => {
        props.update(val)
    };

    const executeRobot = (event) => {
        const robotStatus = event.target.value
        if (robotStatus === "inactive") {
            axios.post(props.server + 'new/schedule/', {
                process: "robots.processes.run_robot.run_robot",
                task_name: props.robot,
                arguments: [props.robot],
                minutes: minVal,
                schedule_type: schedType
            })
            .then(function (response) {
                // if (response['data'] == 'New Portfolio was created!') {
                //     // window.location.reload();
                // } else {
                //     alert(response['data']);
                // }
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
        } else {
            axios.post(props.server + 'robots/update_robot/', {
            'name': props.robot,
            'status': 'inactive'
        })
            .then(function (response) {
                // if (response['data'] == 'New Portfolio was created!') {
                //     // window.location.reload();
                // } else {
                //     alert(response['data']);
                // }
                console.log(response)
                alert(response['data']['response']);
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
        };
        updater(event.target.value);

    };

    let buttonTxt = ''
    if (props.status === 'inactive'){
        buttonTxt = 'Run'
    } else {
        buttonTxt = 'Stop'
    };

    return (
        <tr>
            <td>
                {props.robot}
            </td>
            <td>
                {props.strategy}
            </td>
            <td>
                {props.strategy_params['side']}
            </td>
            <td>
                {props.status}
            </td>
            <td>
                {props.timeframe}
            </td>
            <td>
               <StrategyOptionsModal params={props.strategy_params} robot={props.robot} server={props.server}/>
            </td>
            <td>
                <Button onClick={executeRobot} value={props.status}>{buttonTxt}</Button>
            </td>
        </tr>
    );

};

export default ExecutionRow;