import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import React from "react";

//CSS
import "./PortfolioCashDetails.css"

const PortfolioCashDetails = (props) => {

    const cashData = props.data.map((data) => <tr key={data['id']}>
        <td className={'table-row-name'}>{data['name']}</td>
        <td className={'table-row-value'}>{data['value']}</td>
    </tr>);
     console.log(props.data)
    return(
        <Card className="card" style={{margin: '0px'}}>
            <Card.Title className="card-header-first">Cash Details</Card.Title>
            <Card.Body>
                <div style={{height: '100%'}}>
                    <Table id={'cash-flow-table'}>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        {cashData}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
};
export default PortfolioCashDetails;