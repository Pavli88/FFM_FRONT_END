import './CashBalances.css'
import Card from "react-bootstrap/Card";
import ChartWidget from "../../../Widgets/Charts/ChartWidget";
import CashBalanceChartConfig from "../ProfilCharts/CashBalanceChartConfig";
import {useState} from "react";


const CashChart = (props) => {
    const cashBalanceChartParameters = CashBalanceChartConfig({
        'name': [props.data.currency],
        'subscriptions': [props.data.Subscription],
        'redemptions': [props.data.Redemption]
    });
    const header = <div style={{display: 'flex'}}>
        <div>
            1000.45
        </div>
        <div style={{position: "absolute", right: 30}}>
            {props.data.currency}
        </div>
    </div>
    return (
        <div className={'cash-card-container'}>
            <ChartWidget {...cashBalanceChartParameters} name={header}/>
        </div>
    )
};

const CashBalances = (props) => {
    const cashData = props.data.map((data)=><CashChart data={data}/>)
    return (
        <div className={'main-container'}>
            {cashData}
        </div>
    )
}
export default CashBalances;