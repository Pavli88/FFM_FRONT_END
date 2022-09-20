import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

// Context
import CalculationContext from "../CalculationPageContext/calculation-context";

import {useContext, useEffect, useState} from "react";
import axios from "axios";

// CSS
import "./CalculationPortfolioExceptions.css"

const CalculationPortfolioExceptions = (props) => {
    const selectedEntity = useContext(CalculationContext)['selectedEntity'][1];
    const selectedDate = useContext(CalculationContext)['selectedDate'];
    const [exceptions, setExceptions] = useState([]);
    const securityExceptions = exceptions.map((data) =>
        <tr className={data['status'] == 'Error' ? "table-row-error": data['status'] == 'Alert' ? "table-row-alert": "table-row-fixed"} key={data['id']}>
            <td className="table-cell">{data['exception_level']}</td>
            <td className="table-cell">{data['entity_code']}</td>
            <td className="table-cell">{data['exception_type']}</td>
            <td className="table-cell">{data['process']}</td>
            <td className="table-cell">{data['calculation_date']}</td>
            <td className="table-cell-pointer" onDoubleClick={(e) => updateStatus(e.target)} id={data['id']}>{data['status']}</td>
        </tr>)
    useEffect(() => {
            axios.get(props.server + 'exceptions/get/', {
                params:{
                    entity_code: selectedEntity,
                    exception_level: 'Portfolio',
                    calculation_date: selectedDate,
                }
            })
                .then(response => setExceptions(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    const updateStatus = (value) => {
        value.parentElement.className = "table-row-fixed"
        value.innerHTML = 'Fixed'
        axios.get(props.server + 'exceptions/update/', {
            params: {
                id: value.id,
                status: 'Fixed',
            }
        })
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return(
        <Card className="card main-layout">
            <Card.Title className="card-header-first">{props.tableType} Level Exceptions</Card.Title>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-row">
                    <tr>
                        <td className="table-header-row">Exception Level</td>
                        <td className="table-header-row">Entity Code</td>
                        <td className="table-header-row">Exception Type</td>
                        <td className="table-header-row">Process</td>
                        <td className="table-header-row">Calculation Date</td>
                        <td className="table-header-row">Status</td>
                    </tr>
                    </thead>
                    <tbody style={{height: '100%', overflow: 'scroll'}}>
                    {securityExceptions}
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};
export default CalculationPortfolioExceptions;