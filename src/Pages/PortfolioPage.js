import {useContext, useEffect, useState} from "react";

import ServerContext from "../context/server-context";
import EnvContext from "../context/env-context";
import axios from "axios";

import NewPortfolioForm from "../components/Forms/NewPortfolioForm";
import PortfolioTable from "../components/Tables/PortfolioTable";

// Bootstrap
import Table from "react-bootstrap/Table";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';



const PortfolioPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row>
                <Col>
                    <Container className="border" style={{width: "100%", height: window.innerHeight}}>

                    </Container>
                </Col>
                <Col>
                    <Card>
                        <Card.Header as="h5">
                            <NewPortfolioForm server={server}/>
                        </Card.Header>
                        <PortfolioTable server={server}/>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PortfolioPage;