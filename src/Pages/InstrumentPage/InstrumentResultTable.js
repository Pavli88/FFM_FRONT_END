import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

//CSS
import "./InstrumentResultTable.css"

//Context
import InstrumentSearchContext from "./InstrumentPageContext/instrument-search-context";

import {useContext, useState} from "react";
import axios from "axios";

const InstrumentResultTable = (props) => {
    const searchResults = useContext(InstrumentSearchContext)['searchResults']
    const saveSelectedInstrument = useContext(InstrumentSearchContext)['saveSelectedInstrument']
    const searchRecords = searchResults.map((data) => <tr onDoubleClick={()=>getInstrumentData(data['id'])} key={data['id']}>
        <td className={'table-row'}>{data['instrument_name']}</td>
        <td className={'table-row'}>{data['instrument_type']}</td>
        <td className={'table-row'}>{data['currency']}</td>
    </tr>)
    const getInstrumentData = (instrumentId) => {
        axios.get(props.server + 'instruments/get_instruments/', {
            params: {
                id: instrumentId,
            }
        })
            .then(response => saveSelectedInstrument(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <Card className="card main-layout">
            <Card.Title className="card-header-first">Available Instruments</Card.Title>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-row">
                    <tr>
                        <td className="table-header-row">Name</td>
                        <td className="table-header-row">Instrument Type</td>
                        <td className="table-header-row">Currency</td>
                    </tr>
                    </thead>
                    <tbody style={{height: '100%', overflow: 'scroll'}}>
                    {searchRecords}
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};
export default InstrumentResultTable;