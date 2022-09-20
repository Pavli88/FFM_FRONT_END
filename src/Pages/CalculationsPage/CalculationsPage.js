// React Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import CalculationEntities from "./CalculationEntities/CalculationEntities";
import CalculationOptions from "./CalculationOptions/CalculationOptions";
import CalculationSecurityExceptions from "./CalculationsExceptions/CalculationSecurityExceptions";
import CalculationPortfolioExceptions from "./CalculationsExceptions/CalculationPortfolioExceptions";
import CalculationProcessStatus from "./CalculationProcessStatus/CalculationProcessStatus";

//Context
import ServerContext from "../../context/server-context";
import CalculationContext from "./CalculationPageContext/calculation-context";
import DateContext from "../../context/date-context";
import EntityContext from "../../context/entity-context";

import {useContext, useEffect, useState} from "react";
import axios from "axios";

const CalculationsPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const entity = useContext(EntityContext)['entity'];
    const [startDate, setStartDate] = useState(useContext(DateContext)['currentDate']);
    const [endDate, setEndDate] = useState(useContext(DateContext)['currentDate']);
    const [selectedDate, setSelectedDate] = useState(useContext(DateContext)['currentDate']);
    const [entityData, setEntityData] = useState([]);
    const [selectedEntity, setSelectedEntity] = useState([]);
    const [calcDate, setCalDate] = useState(useContext(DateContext)['currentDate']);
    const [entityUrl, setEntityUrl] = useState('portfolios/get_portfolio_data/all');

    let url = ''
    if (entity === 'Portfolio'){
        url = 'portfolios/get_portfolio_data/all'
    }else {
        url = 'robots/get_robots/live'
    };
    useEffect(() => {
            axios.get(server + entityUrl)
                .then(response => setEntityData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [entity]
    );
    return (
        <CalculationContext.Provider value={{
            entity: entity,
            entityData: entityData,
            selectedEntity: selectedEntity,
            saveSelectedEntity: setSelectedEntity,
            currentDate: calcDate,
            saveCalcDate: setCalDate,
            startDate: startDate,
            saveStartDate: setStartDate,
            endDate: endDate,
            saveEndDate: setEndDate,
            selectedDate: selectedDate,
            saveSelectedDate: setSelectedDate,
        }}>
            <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '0px'}} fluid>
                <Row className={"row"}>
                    <Col>
                        <CalculationOptions server={server} />
                    </Col>
                </Row>
                <Row className={"row"} style={{height: '40%', width: '100%'}}>
                    <Col style={{height: '100%'}} sm={3}>
                        <CalculationEntities/>
                    </Col>
                    <Col style={{height: '100%'}}>
                        <CalculationProcessStatus server={server}/>
                    </Col>
                </Row>
                <Row className={"row"} style={{height: '50%', width: '100%'}}>
                    <Col style={{height: '100%'}}>
                        <CalculationPortfolioExceptions server={server} tableType={entity} calcDate={calcDate}/>
                    </Col>
                    <Col style={{height: '100%'}}>
                        <CalculationSecurityExceptions server={server} tableType={'Security'} calcDate={calcDate}/>
                    </Col>
                </Row>
            </Container>
        </CalculationContext.Provider>
    );
};
export default CalculationsPage;