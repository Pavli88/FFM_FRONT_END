import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {useContext, useEffect, useState} from "react";
import axios from "axios";

//Contexts
import ServerContext from "../../../context/server-context";

// CSS
import "./InstrumentResults.css"
const InstrumentResuts = (props) => {
    const instruments = props.data.map((data) => <tr key={data['id']}>
        <td>{data['name']}</td>
        <td>{data['code']}</td>
        <td>{data['country']}</td>
        <td>{data['currency']}</td>
        <td>{data['group']}</td>
        <td>{data['type']}</td>
    </tr>)
    return(
        <Card className="card main-layout">
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table style={{width: '100%'}}>
                    <thead className="table-header-row">
                    <tr>
                        <td style={{border: '0px'}}>Name</td>
                        <td style={{border: '0px'}}>Code</td>
                        <td style={{border: '0px'}}>Country</td>
                        <td style={{border: '0px'}}>Currency</td>
                        <td style={{border: '0px'}}>Group</td>
                        <td style={{border: '0px'}}>Type</td>
                    </tr>
                    </thead>
                    <tbody style={{height: '100%', overflow: 'scroll'}}>
                    {instruments}
                    </tbody>
                </Table>
            </div>
        </Card>
    )
};
export default InstrumentResuts;