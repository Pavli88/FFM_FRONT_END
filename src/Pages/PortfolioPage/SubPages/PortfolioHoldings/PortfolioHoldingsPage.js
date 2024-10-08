import PortfolioHoldings from "./PortfolioHoldings/PortfolioHoldings";
import './PortfolioHoldingsPage.css'
import axios from "axios";
import {useState} from "react";
const PortfolioHoldingsPage = (props) => {
    const [holdingData, setHoldingData] = useState([{}]);
    const [date, setDate] = useState();
    console.log(date)
    const fetchData = (parameters) => {
        axios.get(props.server + 'portfolios/get/holding/', {
            params: {
                portfolio_code: 'TST',
                date: date
            }
        })
            .then(response => setHoldingData(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return (
        <div className={'port-holding-page-container'}>
            <div style={{display: 'flex', padding: 15}}>
                <div>
                    <button onClick={fetchData}>Get Holding</button>
                </div>
                <div>
                    <input type={'date'} onChange={(e) => setDate(e.target.value)}/>
                </div>
            </div>

            <div style={{padding: 15}}>
                <PortfolioHoldings data={holdingData}/>
            </div>
        </div>
    );
};

export default PortfolioHoldingsPage;