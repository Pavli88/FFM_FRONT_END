import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {useContext, useEffect, useState} from "react";
import axios from "axios";

//Contexts
import ServerContext from "../../../context/server-context";

const InstrumentResuts = (props) => {
    const instruments = props.data.map((data) => <tr key={data['id']}>
        <td className={'table-row'}>{data['name']}</td>
        <td className={'table-row'}>{data['code']}</td>
        <td className={'table-row'}>{data['country']}</td>
        <td className={'table-row'}>{data['currency']}</td>
        <td className={'table-row'}>{data['group']}</td>
        <td className={'table-row'}>{data['type']}</td>
    </tr>)
    return(
        <Card className="card main-layout">
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-row">
                    <tr>
                        <td className="table-header-row">Name</td>
                        <td className="table-header-row">Code</td>
                        <td className="table-header-row">Country</td>
                        <td className="table-header-row">Currency</td>
                        <td className="table-header-row">Group</td>
                        <td className="table-header-row">Type</td>

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