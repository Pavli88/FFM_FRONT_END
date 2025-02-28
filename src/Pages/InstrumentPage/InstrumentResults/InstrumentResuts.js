import {useContext, useState} from "react";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import "./InstrumentResults.css"

const InstrumentResuts = ( {data} ) => {
    const saveSelectedInstrument = useContext(InstrumentSearchContext)['saveSelectedInstrument']

    const instruments = data.map((data) => <tr key={data['id']} onClick={() => saveSelectedInstrument(data)} className={'table-row-all'}>
        <td>{data['id']}</td>
        <td>{data['name']}</td>
        <td>{data['country']}</td>
        <td>{data['currency']}</td>
        <td>{data['group']}</td>
        <td>{data['type']}</td>
    </tr>)

    return (
        <div className={'card'}>

            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <table style={{width: '100%'}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Currency</th>
                        <th>Group</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody style={{height: '100%', overflow: 'scroll'}}>
                    {instruments}
                    </tbody>
                </table>
            </div>
        </div>
    )
};
export default InstrumentResuts;