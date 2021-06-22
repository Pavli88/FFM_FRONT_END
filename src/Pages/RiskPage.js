import {useState, useEffect, useContext} from "react";

import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table'

import RiskTableData from "./RiskPage/RiskTableData";
import ServerContext from "../context/server-context";

const RiskPage = () => {

    const server = useContext(ServerContext)['server'];

    return (
        <Container className={"border"}>
            <RiskTableData server={server}/>
        </Container>
    );
};

export default RiskPage;