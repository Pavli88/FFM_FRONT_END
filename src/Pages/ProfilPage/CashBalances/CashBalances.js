import './CashBalances.css'
import Card from "react-bootstrap/Card";
import ChartWidget from "../../../Widgets/Charts/ChartWidget";
import CashBalanceChartConfig from "../ProfilCharts/CashBalanceChartConfig";
import {useState} from "react";


const CashChart = (props) => {
    const [exposureData, setExposureData] = useState({
        'name': ['Cash flow'],
        'subscriptions': [1000],
        'redemptions': [2000]
    });
    const cashBalanceChartParameters = CashBalanceChartConfig(exposureData);
    const header = <div style={{display: 'flex'}}>
        <div>
            1000.45
        </div>
        <div style={{position: "absolute", right: 30}}>
            USD
        </div>
    </div>
    return (
        <div className={'cash-card-container'}>
            <ChartWidget {...cashBalanceChartParameters} name={header}/>
        </div>
    )
};

const CashBalances = () => {

    return (
        <div className={'main-container'}>
            <CashChart/>
            <CashChart/>
            <CashChart/>
        </div>
    )
}
export default CashBalances;