import {useContext, useEffect, useState} from "react";
import EnvContext from "../../context/env-context";
import RiskTableRow from "./RiskTableRow";

// Bootstrap
import Table from "react-bootstrap/Table";

// CSS
import "../MainCSS.css"

const RiskTableData = (props) => {

    const env = useContext(EnvContext)['environment'];

    const [riskData, setRiskData] = useState([])

    // Fetching robot risk data from database
    useEffect(() => {
            fetch(props.server + 'risk/get_robot_risk/' + env)
                .then(response => response.json())
                .then(data => setRiskData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    console.log(riskData)
    const riskDataRow = riskData.map((data) =>
        <RiskTableRow key={data['id']}
                      robot={data['robot']}
                      dailyRisk={data['daily_risk']}
                      tradeLimit={data['daily_trade_limit']}
                      riskOnTrade={data['risk_per_trade']}
                      pLevel={data['pyramiding_level']}
                      qType={data['quantity_type']}
                      quantity={data['quantity']}
                      sl={data['sl']}
                      winExp={data['win_exp']}
                      server={props.server}/>
    );

    return (
        <Table>
            <thead style={{fontSize: 12}}>
            <tr>
                <th style={{verticalAlign: "middle"}}>Robot</th>
                <th style={{verticalAlign: "middle"}}>Daily Loss Limit %</th>
                <th style={{verticalAlign: "middle"}}>Max Number of Trades (Daily)</th>
                <th style={{verticalAlign: "middle"}}>Risk Exposure %</th>
                <th style={{verticalAlign: "middle"}}>Quantity Type</th>
                <th style={{verticalAlign: "middle"}}>Quantity</th>
                <th style={{verticalAlign: "middle"}}>SL</th>
                <th style={{verticalAlign: "middle"}}>Win Exp %</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {riskDataRow}
            </tbody>
        </Table>
    );
};

export default RiskTableData;