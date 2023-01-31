import CardWidget from "../../../../components/CardWidget";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from 'react-select'

import {useContext, useEffect, useRef, useState} from "react";
import { HexColorPicker } from "react-colorful";

// Context
import RobotContext from "../../../../context/robot-context";
import BrokerContext from "../../../../context/broker-context";
import EnvContext from "../../../../context/env-context";

const RobotSettings = (props) => {
    const robotData = useContext(RobotContext)['selectedRobotData'];
    const brokerList = useContext(BrokerContext)['brokerData'];
    const environment = useContext(EnvContext)['environment'];
    const robotStrategies = useContext(RobotContext)['robotStrategies'];
    const [selectedBroker, setSelectedBroker] = useState(robotData['broker']);
    const [selectedAccount, setSelectedAccount] = useState(robotData['account_number']);
    // const [selectedStrategy, setSelectedStrategy] = useState(robotData['strategy_id']);
    // const [status, setStatus] = useState(robotData['status']);
    // const [security, setSecurity] = useState(robotData['security']);
    const [accounts, setAccounts] = useState([]);
    const [robotColorCode, setRobotColorCode] = useState(robotData['color']);

    const [requestObject, setRequestObject] = useState({
        'robot_id': robotData['id'],
        'broker': robotData['broker'],
        'status': robotData['status'],
        'security': robotData['security'],
        'account_number': robotData['account_number'],
        'color': robotData['color'],
        'strategy': robotData['strategy'],
    });

    const handleChangeComplete = (color) => {
        setRobotColorCode({background: color.hex});
    };
    const colorChange = (color, event) => {

    };

    useEffect(() => {
            setRequestObject({
                'robot_id': robotData['id'],
                'broker': robotData['broker'],
                'status': robotData['status'],
                'security': robotData['security'],
                'account_number': robotData['account_number'],
                'color': robotData['color'],
                'strategy': robotData['strategy'],
            })
        }, [robotData]
    );
    useEffect(() => {
            axios.get(props.server + 'accounts/get_accounts_data/', {
                params: {
                    broker: selectedBroker,
                    env: environment,
                }
            })
                .then(data => setAccounts(data['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [, requestObject.broker]
    );
    const submitForm = (event) => {
        event.preventDefault();
        console.log(requestObject);
        axios.post(props.server + 'robots/update/robot/', requestObject)
            .then(response => alert(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const brokers = brokerList.map((data) => <option key={data['id']} value={data['broker_code']}>{data['broker_code']}</option>)
    const accountData = accounts.map((data) => <option key={data['id']} value={data['account_number']}>{data['account_number']}</option>)
    return (
        <CardWidget title={'Settings'} style={{margin: '5px'}}>
            <Form>
                <Form.Group className="mb-3" controlId="quantity_type">
                    <Form.Label>Status</Form.Label>
                    <Form.Control onChange={(e) => {setRequestObject({...requestObject, status: e.target.value})}} as="select" value={requestObject.status}>
                        <option value={'active'}>active</option>
                        <option value={'inactive'}>inactive</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="broker">
                    <Form.Label>Broker</Form.Label>
                    <Form.Control onChange={(e) => {
                        setRequestObject({...requestObject, broker: e.target.value})}} as="select" value={requestObject.broker}>
                        <option value={requestObject.broker} hidden>{requestObject.broker}</option>
                        {brokers}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="account">
                    <Form.Label>Account</Form.Label>
                    <Form.Control onChange={(e) => {setRequestObject({...requestObject, account_number: e.target.value})}} as="select" value={selectedAccount}>
                        <option value={selectedAccount} hidden>{requestObject.account_number}</option>
                        {accountData}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="account">
                    <Form.Label>Strategy</Form.Label>
                    <Select
                        options={robotStrategies}
                        // value={requestObject.strategy}
                        onChange={(e) => {setRequestObject({...requestObject, strategy: e.label})}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="security_code">
                    <Form.Label>Security Code</Form.Label>
                    <Form.Control onChange={(e) => {setRequestObject({...requestObject, security: e.target.value})}} type={'text'} value={requestObject.security}/>
                </Form.Group>

                <HexColorPicker color={requestObject.color} onChange={setRobotColorCode}/>

                <Button onClick={submitForm} variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </CardWidget>
    );
};

export default RobotSettings