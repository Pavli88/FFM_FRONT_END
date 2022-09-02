import PortfolioDetails from "./PortfolioDetails";
import PortfolioDescription from "./PortfolioDescreption";
import CashHoldings from "../PortfolioHoldings/CashHolding";
import PortfolioNav from "./PortfolioNav";
import PortfolioCashSummary from "./PortfolioCashSummary";
import PortfolioCashDetails from "./PortfolioCashDetails";

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
    const [portData, setPortData] = useState();
    const [cashHoldingData, setCashHoldingData] = useState([]);
    const [cashTypeData, setCashTypeData] = useState([]);
    const portfolioNavData = navData.map(data => data['total'])

    useEffect(() => {
        axios.get(props.server + 'portfolios/cash/total/by_type/' + props.portfolio, {
            params: {
                portfolio_code: props.portfolio
            }
        })
            .then(response => setCashTypeData(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        axios.get(props.server + 'portfolios/get_portfolio_data/' + props.portfolio)
            .then(response => response['data'].map(data => data))
            .then(data => setPortData(<PortfolioDetails data={data}/>))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        axios.get(props.server + 'portfolios/cash/holding/' + endDate, {
            params: {
                portfolio_code: props.portfolio
            }
        })
            .then(response => setCashHoldingData(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        }, [props]
    );
    // useEffect(() => {

        // axios.get(props.server + 'portfolios/nav/' + props.portfolio, {
        //     params: {
        //         start_date: startDate,
        //         end_date: endDate
        //     }
        // })
        //     .then(response => response['data'].map(data => data))
        //     .then(data => setNavData(data))
        //     .catch((error) => {
        //         console.error('Error Message:', error);
        //     });
            // axios.get(props.server + 'portfolios/cash/total/by_type/' + props.portfolio)
            //     .then(response => console.log(response['data']))
            //     .catch((error) => {
            //         console.error('Error Message:', error);
            //     });

    //     }, [props]
    // );

    return (
        <Row style={{width: '100%', height: '100%', margin: '0px'}}>
            <Col>
                <Row style={{width: '100%', height: '100%', margin: '0px', padding: '0px'}}>
                    <Col style={{height: '50%'}}>
                        <Row style={{height: '100%', paddingBottom: '5px'}}>
                            {portData}
                        </Row>
                    </Col>
                    <Col style={{height: '50%'}}>
                        <Row style={{height: '50%', paddingBottom: '5px'}}>
                            <PortfolioCashSummary data={cashHoldingData}/>
                        </Row>
                         <Row style={{height: '50%', paddingBottom: '5px'}}>
                              <PortfolioCashDetails data={cashTypeData}/>
                         </Row>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row style={{width: '100%', height: '100%', margin: '0px'}}>
                    <Col style={{height: '50%'}}>
                        <PortfolioNav data={portfolioNavData}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default PortfolioDashBoardPage;