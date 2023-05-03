import DailyCashFlow from "./DailyCashFlow/DailyCashFlow";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import Card from "react-bootstrap/Card";


const AvailableCash = (props) => {
    return (
        <Card style={{height: '100%'}}>
            <Card.Header>
                <div style={{display: "flex"}}>
                    <div>
                        Available Cash
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div style={{
                    width: '100%',
                    height: '100%',
                    // padding: 4,
                    fontSize: 50,
                    color: "cornflowerblue",
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: 0,
                    position: "absolute",
                    top: '35%',
                    right: 5,

                }}>
                    {props.data.amount}
                </div>
            </Card.Body>
            <Card.Footer>
                <div style={{display: 'flex'}}>
                    <div>
                        {props.data.currency}
                    </div>
                    <div style={{position: "absolute", right: 20, fontSize: 12,}}>
                        {props.data.date}
                    </div>
                </div>
            </Card.Footer>
        </Card>
    )
};

const PortfolioDashBoardPage = (props) => {
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const [availableCash, setAvailableCash] = useState({})
    const fetchData = async() => {
        const response = await axios.get(props.server + 'portfolios/available_cash/', {
            params: {
                portfolio_code: portfolioData[0].portfolio_code
            }
        })
        setAvailableCash(response.data)
    };

    useEffect(() => {
        fetchData()
    }, [portfolioData])
    console.log(availableCash)
    return (
        <div style={{width: '100%', height: '100%', margin: '0px', padding: 15}}>
            <div style={{height: 300, width: '100%', display: 'flex'}}>
                <div style={{height: '100%', width: 300, paddingRight: 15}}>
                    <AvailableCash data={availableCash}/>
                </div>
                <div style={{width: '100%', height: '100%'}}>
                    <DailyCashFlow server={props.server}/>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDashBoardPage;