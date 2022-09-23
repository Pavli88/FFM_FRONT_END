import CardWidget from "../../../../components/CardWidget";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useContext, useEffect, useRef, useState} from "react";

// Context
import RobotContext from "../../../../context/robot-context";
import BrokerContext from "../../../../context/broker-context";
import EnvContext from "../../../../context/env-context";

const RobotSettings = (props) => {
    const robotData = useContext(RobotContext)['selectedRobotData'];
    const brokerList = useContext(BrokerContext)['brokerData'];
    const environment = useContext(EnvContext)['environment'];
    const [selectedBroker, setSelectedBroker] = useState(robotData['broker']);
    const [selectedAccount, setSelectedAccount] = useState(robotData['account_number']);
    const [status, setStatus] = useState(robotData['status']);
    const [security, setSecurity] = useState(robotData['security']);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
            setSecurity(robotData['security']);
            setStatus(robotData['status']);
            setSelectedBroker(robotData['broker']);
            setSelectedAccount(robotData['account_number']);
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
        }, [, selectedBroker]
    );
    const submitForm = (event) => {
        event.preventDefault();
        axios.post(props.server + 'robots/update/robot/', {
            robot_id: robotData['id'],
            broker: selectedBroker,
            status: status,
            security: security,
            account_number: selectedAccount,
        })
            .then(response => alert(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    const brokers = brokerList.map((data) => <option key={data['id']} value={data['broker_code']}>{data['broker_code']}</option>)
    const accountData = accounts.map((data) => <option key={data['id']} value={data['account_number']}>{data['account_number']}</option>)
    return (
        <CardWidget title={'Settings'} style={{margin:'5px'}}>
            <Form>
                <Form.Group className="mb-3" controlId="quantity_type">
                    <Form.Label>Status</Form.Label>
                    <Form.Control onChange={(e) => setStatus(e.target.value)} as="select" value={status}>
                        <option value={'active'}>active</option>
                        <option value={'inactive'}>inactive</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="broker">
                    <Form.Label>Broker</Form.Label>
                    <Form.Control onChange={(e) => setSelectedBroker(e.target.value)} as="select" value={selectedBroker}>
                        <option value={selectedBroker} hidden>{selectedBroker}</option>
                        {brokers}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="account">
                    <Form.Label>Account</Form.Label>
                    <Form.Control onChange={(e) => setSelectedAccount(e.target.value)} as="select" value={selectedAccount}>
                        <option value={selectedAccount} hidden>{selectedAccount}</option>
                        {accountData}
                    </Form.Control>
                </Form.Group>
                 <Form.Group className="mb-3" controlId="security_code">
                    <Form.Label>Security Code</Form.Label>
                    <Form.Control onChange={(e) => setSecurity(e.target.value)} value={security} type={'text'}/>
                </Form.Group>
                <Button onClick={submitForm} variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </CardWidget>
    );
};

export default RobotSettings