import PortfolioDetails from "./PortfolioDetails";
import PortfolioDescription from "./PortfolioDescreption";
import CashHoldings from "../PortfolioHoldings/CashHolding";
import PortfolioNav from "./PortfolioNav";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {useContext, useEffect, useState} from "react";
import axios from "axios";

// Contexts
import DateContext from "../../../../context/date-context";

const PortfolioDashBoardPage = (props) => {
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];
    const [navData, setNavData] = useState([]);
    useEffect(() => {
            axios.get(props.server + 'portfolios/nav/' + props.portfolio, {
                params: {
                    start_date: startDate,
                    end_date: endDate
                }
            })
                .then(response => response['data'].map(data => data))
                .then(data => setNavData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    const portfolioNavData = navData.map(data => data['total'])

    const [portData, setPortData] = useState();

    useEffect(() => {
            axios.get(props.server + 'portfolios/get_portfolio_data/'+ props.portfolio)
                .then(response => response['data'].map(data=>data))
                .then(data=>setPortData(<PortfolioDetails data={data}/>))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Row style={{width: '100%', height: '100%', margin: '0px', background: 'orange'}}>
            <Col>
                <Row style={{width: '100%', height: '100%', background: 'blue', margin: '0px'}}>
                    <Col>
                        {portData}
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row style={{width: '100%', height: '40%', background: 'red', margin: '0px'}}>
                    <Col>
                        <PortfolioNav data={portfolioNavData}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default PortfolioDashBoardPage;