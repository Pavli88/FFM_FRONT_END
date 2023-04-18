import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState, useRef, useContext} from "react";

import axios from "axios";
import BrokerContext from "../../../context/broker-context";
import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import {BsDash} from "react-icons/bs";

const NewBrokerAccount = (props) => {
    const { user, server} = props.parameters;
    const saveAccount = useContext(BrokerContext).saveAccount;
    const newAccount = useContext(BrokerContext).newAccount;
    const [env, setEnv] = useState('live');
    const [currency, setCurrency] = useState('USD');
    const accountNameRef = useRef();
    const accountNumberRef = useRef();
    const tokenRef = useRef();
    const brokerNameRef = useRef();

    const submitHandler = () => {
        axios.post(server + 'accounts/new_account/', {
            broker_name: brokerNameRef.current.value,
            account_number: accountNumberRef.current.value,
            account_name: accountNameRef.current.value,
            env: env,
            token: tokenRef.current.value,
            currency: currency,
            owner: user
        })
                .then(function(response){
                    if (response.data === 'Account is created successfully!'){
                        saveAccount(newAccount + 1)
                        alert(response.data)
                    }else{
                        alert(response.data)
                    }
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        setEnv('live');
        setCurrency('USD');
        props.hide();
    };

    const envHandler = (event) => {
        setEnv(event.target.value);
    };

    const currencyHandler = (event) => {
        setCurrency(event.target.value);
    };

    const header = <div style={{display: "flex"}}>
        <div style={{width: '90%'}}><p
            style={{margin: 0, height: '100%', verticalAlign: "middle", padding: 5, fontSize: 16}}>New</p>
        </div>
        <button className={'save-button'} onClick={submitHandler}>
            Create
        </button>
    </div>

    return (
        <CardWithHeader headerContent={header}>
            <div style={{height: '600px', overflowY: 'scroll', padding: 5}}>
                <div style={{margin: 10}}>
                    <Form.Label>Broker</Form.Label>
                    <Form.Control ref={brokerNameRef} type="text"/>
                </div>
                <div style={{margin: 10}}>
                    <Form.Label>Account Name</Form.Label>
                    <Form.Control ref={accountNameRef} type="text"/>
                </div>
                <div style={{margin: 10}}>
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control ref={accountNumberRef} type="text"/>
                </div>
                <div style={{margin: 10}}>
                    <Form.Label>Token</Form.Label>
                    <Form.Control ref={tokenRef} type="text"/>
                </div>
                <div style={{margin: 10}}>
                    <Form.Label>Environment</Form.Label>
                    <Form.Control onChange={envHandler} as="select">
                        <option value={'live'}>Live</option>
                        <option value={'demo'}>Demo</option>
                    </Form.Control>
                </div>
                <div style={{margin: 10}}>
                    <Form.Label>Currency</Form.Label>
                    <Form.Control onChange={currencyHandler} as="select">
                        <option value={'USD'}>USD</option>
                        <option value={'EUR'}>EUR</option>
                    </Form.Control>
                </div>
            </div>
        </CardWithHeader>
    );
};

export default NewBrokerAccount;