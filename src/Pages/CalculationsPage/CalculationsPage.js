// React Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import CalculationEntities from "./CalculationEntities/CalculationEntities";
import CalculationOptions from "./CalculationOptions/CalculationOptions";
import CalculationSecurityExceptions from "./CalculationsExceptions/CalculationSecurityExceptions";
import CalculationPortfolioExceptions from "./CalculationsExceptions/CalculationPortfolioExceptions";

//Context
import ServerContext from "../../context/server-context";
import CalculationContext from "./CalculationPageContext/calculation-context";
import DateContext from "../../context/date-context";

import {useContext, useEffect, useState} from "react";
import axios from "axios";

const CalculationsPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const [entity, setEntity] = useState('Portfolio');
    const [entityData, setEntityData] = useState([]);
    const [selectedEntity, setSelectedEntity] = useState([]);
    const [calcDate, setCalDate] = useState(useContext(DateContext)['currentDate']);

    let url = ''
    if (entity === 'Portfolio'){
        url = 'portfolios/get_portfolio_data/all'
    }else {
        url = 'robots/get_robots/live'
    };
    useEffect(() => {
            axios.get(server + url)
                .then(response => setEntityData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [entity]
    );

    console.log(selectedEntity)
    return (
        <CalculationContext.Provider value={{
            entity: entity,
            saveEntity: setEntity,
            entityData: entityData,
            selectedEntity: selectedEntity,
            saveSelectedEntity: setSelectedEntity,
            currentDate: calcDate,
            saveCalcDate: setCalDate,
        }}>
            <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '0px'}} fluid>
                <Row className={"row"} style={{height: '90%', width: '100%'}}>
                    <Col style={{height: '100%'}} sm={4}>
                        <Row style={{height: '50%'}}>
                            <CalculationOptions server={server}/>
                        </Row>
                        <Row style={{height: '50%'}}>
                            <CalculationEntities/>
                        </Row>
                    </Col>
                    <Col style={{height: '100%'}} sm={8}>
                        <Row style={{height: '50%'}}>
                            <CalculationPortfolioExceptions server={server} tableType={entity} calcDate={calcDate}/>
                        </Row>
                        <Row style={{height: '50%'}}>
                            <CalculationSecurityExceptions server={server} tableType={'Security'} calcDate={calcDate}/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </CalculationContext.Provider>
    );
};
export default CalculationsPage;