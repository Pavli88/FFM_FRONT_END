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
    const [marginAllowed, setMarginAllowed] = useState(0);
    const [marginPercentage, setMarginPercentage] = useState(0.0);

    const submitHandler = () => {
        axios.post(server + 'accounts/new_account/', {
            broker_name: brokerNameRef.current.value,
            account_number: accountNumberRef.current.value,
            account_name: accountNameRef.current.value,
            env: env,
            token: tokenRef.current.value,
            currency: currency,
            owner: user,
            margin_account: marginAllowed,
            margin_percentage: marginPercentage,
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
        setMarginAllowed(0);
        setMarginPercentage(0.0)
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

    const marginPercentageDiv = <div style={{margin: 10}}>
        <Form.Label>Margin Percentage</Form.Label>
        <Form.Control onChange={(e) => setMarginPercentage(e.target.value)} type="number" min={0.0} step={0.05}/>
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

                <div style={{margin: 10}}>
                    <Form.Label>Margin Account</Form.Label>
                    <Form.Control value={marginAllowed} onChange={(e) => setMarginAllowed(e.target.value)} as="select">
                        <option value={0}>Disabled</option>
                        <option value={1}>Allowed</option>
                    </Form.Control>
                </div>

                {marginAllowed === '1' ? marginPercentageDiv: ''}

            </div>
        </CardWithHeader>
    );
};

export default NewBrokerAccount;