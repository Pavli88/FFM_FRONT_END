import PortfolioDetails from "./PortfolioDetails";
import PortfolioDescription from "./PortfolioDescreption";
import CashHoldings from "../PortfolioHoldings/CashHolding";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {useEffect, useState} from "react";
import axios from "axios";

const PortfolioDashBoardPage = (props) => {

    // Loading cash holding data
    const [chData, setChData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'portfolios/get_cash_holdings/', {
                params: {
                    portfolio: props.portfolio,
                    date: props.end_date,
                }
            })
                .then(response => response['data'].map(data=>data))
                .then(data=>setChData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Row style={{width: '100%', height:'100%', margin:'0px'}}>
            <Row style={{width: '50%', height: '400px', background:'red', margin:'0px'}}>
                <Col>
                    <PortfolioDetails portfolio={props.portfolio} server={props.server} default={props.default}/>
                </Col>
                <Col>
                    <PortfolioDescription/>
                </Col>
            </Row>
            <Row style={{width: '50%', height:'200px', background:'blue', margin:'0px'}}>
                <Col>
                    <CashHoldings portfolio={props.portfolio} server={props.server} data={chData}/>
                </Col>
                <Col>

                </Col>
            </Row>
            <Row style={{width: '100%', height:'400px', background:'blue', margin:'0px'}}>

            </Row>
        </Row>
    );
};

export default PortfolioDashBoardPage;