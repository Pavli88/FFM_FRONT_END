import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {useContext, useState, useRef} from "react";
import axios from "axios";

// Context
import DateContext from "../../../context/date-context";
import PortfolioContext from "../../../context/portfolio-context";

const NewPortfolio = (props) => {
    const saveNewPortfolio = useContext(PortfolioContext)['saveNewPortfolio'];
    const { user, server} = props.parameters;
    const portNameRef = useRef();
    const portCodeRef = useRef();
    const currencyRef = useRef();
    const portTypeRef = useRef();
    const dateRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(server + 'portfolios/new/portfolio/', {
            port_name: portNameRef.current.value,
            port_code: portTypeRef.current.value === 'Portfolio Group' ? portCodeRef.current.value + '_GROUP': portCodeRef.current.value,
            port_type: portTypeRef.current.value,
            port_currency: currencyRef.current.value,
            inception_date: dateRef.current.value,
            owner: user,
        })
            .then(function (response) {
                if (response.data.msg === 'New Portfolio is created!') {
                    alert('New portfolio is created!')
                    saveNewPortfolio(response.data.port);
                    props.hide();
                } else {
                    alert(response.data.msg);
                }
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
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
            <div>

                <div style={{margin: 10}}>
                    <Form.Label>Portfolio Type</Form.Label>
                    <Form.Control ref={portTypeRef} as="select">
                        <option value={'Automated'}>Automated</option>
                        <option value={'Investment'}>Investment</option>
                        <option value={'Portfolio Group'}>Portfolio Group</option>
                        <option value={'Test'}>Test</option>
                        <option value={'Trade'}>Trade</option>
                        <option value={'Savings'}>Savings</option>
                    </Form.Control>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label>Portfolio Name</Form.Label>
                    <Form.Control ref={portNameRef} type="text" required/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label>Portfolio Code</Form.Label>
                    <Form.Control ref={portCodeRef} type="text" required/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label>Portfolio Currency</Form.Label>
                    <Form.Control ref={currencyRef} as="select">
                        <option value={'USD'}>USD</option>
                        <option value={'HUF'}>HUF</option>
                        <option value={'EUR'}>EUR</option>
                    </Form.Control>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label>Portfolio Inception Date</Form.Label>
                    <Form.Control ref={dateRef} type="date" defaultValue={useContext(DateContext).currentDate}/>
                </div>
            </div>
        </CardWithHeader>
    );
};

export default NewPortfolio;