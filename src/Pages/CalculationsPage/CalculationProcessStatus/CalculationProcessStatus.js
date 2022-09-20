import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {useContext, useEffect, useState} from "react";
import axios from "axios";

// Context
import CalculationContext from "../CalculationPageContext/calculation-context";

// CSS
import "./CalculationProcessStatus.css"

const CalculationProcessStatus = (props) => {
    const calcDate = useContext(CalculationContext)['startDate'];
    const saveSelectedDate = useContext(CalculationContext)['saveSelectedDate'];
    const selectedEntity = useContext(CalculationContext)['selectedEntity'][1];
    const [processStatuses, setProcessStatuses] = useState([]);
    const processes = processStatuses.map((data) =>
        <tr  key={data['id']} onClick={() => saveSelectedDate(data['date'])}>
            <td className="table-cell">{data['date']}</td>
            <td className="table-cell">{data['portfolio_code']}</td>
            <td className={data['cash_holding'] == 'Error' ? "table-row-error": data['cash_holding'] == 'Alert' ? "table-row-alert": "table-row-fixed"}>{data['cash_holding']}</td>
            <td className="table-cell">{data['position']}</td>
            <td className="table-cell">{data['portfolio_holding']}</td>
        </tr>)

    useEffect(() => {
        axios.get(props.server + 'calculate/get/portfolio/processes/', {
            params: {
                portfolio_code: selectedEntity,
                start_date: calcDate,
            }
        })
            .then(response => setProcessStatuses(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        }, [props]
    );
    return(
        <Card className="card main-layout">
            <Card.Title className="card-header-first">Process Status</Card.Title>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-row">
                    <tr>
                        <td className="table-header-row">Date</td>
                        <td className="table-header-row">Portfolio Code</td>
                        <td className="table-header-row">Cash Holding</td>
                        <td className="table-header-row">Position</td>
                        <td className="table-header-row">Portfolio Holding</td>
                    </tr>
                    </thead>
                    <tbody style={{height: '100%', overflow: 'scroll'}}>
                    {processes}
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};
export default CalculationProcessStatus;