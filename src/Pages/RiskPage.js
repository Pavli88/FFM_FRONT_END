import {useState, useEffect, useContext} from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import RiskTableData from "./RiskPage/RiskTableData";
import ServerContext from "../context/server-context";

// CSS
import "./MainCSS.css"

const RiskPage = () => {

    const server = useContext(ServerContext)['server'];

    return (
        <Container className={"border"}
                   style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row>
                <Col>

                </Col>
            </Row>

        </Container>
    );
};

export default RiskPage;