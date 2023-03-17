import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {useContext, useState} from "react";
import axios from "axios";

// Context
import DateContext from "../../../context/date-context";
import PortfolioContext from "../../../context/portfolio-context";
import {BsDash} from "react-icons/bs";

const NewPortfolio = (props) => {
    const saveNewPortfolio = useContext(PortfolioContext)['saveNewPortfolio'];
    const [portfolioName, setPortfolioName] = useState('');
    const [portfolioCode, setPortfolioCode] = useState('');
    const [portType, setPortType] = useState('Trade');
    const [currency, setCurrency] = useState('USD');
    const [date, setDate] = useState(useContext(DateContext)['currentDate']);
    const handleClose = () => {
        props.hide();
    };
    const portfolioNameChangeHandler = (event) => {
        setPortfolioName(event.target.value)
    };
    const portfolioCodeChangeHandler = (event) => {
        setPortfolioCode(event.target.value);
    };
    const portTypeHandler = (event) => {
        setPortType(event.target.value)
    };
    const currencyHandler = (event) => {
        setCurrency(event.target.value);
    };
    const dateHandler = (event) => {
        setDate(event.target.value);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'portfolios/new/', {
            port_name: portfolioName,
            port_type: portType,
            port_currency: currency,
            port_code: portfolioCode,
            inception_date: date,
        })
            .then(function (response) {
                if (response['data'] === 'New Portfolio is created!') {
                    alert('New portfolio is created!')
                    saveNewPortfolio(portfolioCode);
                    props.hide();
                } else {
                    alert(response['data']);
                }
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const header = <div style={{display: "flex"}}>
        <div style={{width: '90%'}}><p style={{margin: 0, height: '100%', verticalAlign: "middle", padding: 5, fontSize: 16}}>New</p>
        </div>
        <Button variant="primary" onClick={submitHandler}>
            Create
        </Button>
    </div>

    return (
        <CardWithHeader headerContent={header}>
            <div style={{margin: 10}}>
                <Form.Label>Portfolio Name</Form.Label>
                <Form.Control onChange={portfolioNameChangeHandler} type="text" placeholder="Portfolio Name" required/>
            </div>

            <div style={{margin: 10}}>
                <Form.Label>Portfolio Code</Form.Label>
                <Form.Control onChange={portfolioCodeChangeHandler} type="text" placeholder="Portfolio Code" required/>
            </div>

            <div style={{margin: 10}}>
                <Form.Label>Portfolio Type</Form.Label>
                <Form.Control onChange={portTypeHandler} as="select">
                    <option value={'Trade'}>Trade</option>
                    <option value={'Savings'}>Savings</option>
                    <option value={'Investment'}>Investment</option>
                </Form.Control>
            </div>

            <div style={{margin: 10}}>
                <Form.Label>Portfolio Currency</Form.Label>
                <Form.Control onChange={currencyHandler} as="select">
                    <option value={'USD'}>USD</option>
                    <option value={'HUF'}>HUF</option>
                    <option value={'EUR'}>EUR</option>
                </Form.Control>
            </div>

            <div style={{margin: 10}}>
                <Form.Label>Portfolio Inception Date</Form.Label>
                <Form.Control onChange={dateHandler} type="date" defaultValue={date}/>
            </div>

        </CardWithHeader>
    );
};

export default NewPortfolio;