import './CashBalances.css'
import Card from "react-bootstrap/Card";
import ChartWidget from "../../../Widgets/Charts/ChartWidget";
import CashBalanceChartConfig from "../ProfilCharts/CashBalanceChartConfig";
import {useState} from "react";


const CashChart = (props) => {
    const cashBalanceChartParameters = CashBalanceChartConfig({
        'name': [props.data.currency],
        'subscriptions': [props.data.Subscription],
        'redemptions': [props.data.Redemption * -1],
        'investment': [props.data.Investment * -1],
        'divestment': [props.data.Divestment],
        'total': [props.data.Subscription - (props.data.Redemption * -1)]
    });
    console.log(cashBalanceChartParameters)
    const header = <div style={{display: 'flex'}}>
        <div>
            Available Cash
        </div>
        <div style={{position: "absolute", right: 30}}>
            {props.data.Subscription + (props.data.Divestment === undefined ? 0: props.data.Divestment)
                + (props.data.Investment === undefined ? 0: props.data.Investment)
                + (props.data.Redemption === undefined ? 0: props.data.Redemption)} {props.data.currency}
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