import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {useContext} from "react";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import "./InstrumentResults.css"

const InstrumentResuts = (props) => {
    const saveSelectedInstrument = useContext(InstrumentSearchContext)['saveSelectedInstrument']
    const instruments = props.data.map((data) => <tr key={data['id']} onClick={() => saveSelectedInstrument(data)} className={'table-row-all'}>
        <td className={'table-row'}>{data['name']}</td>
        <td className={'table-row'}>{data['id']}</td>
        <td className={'table-row'}>{data['code']}</td>
        <td className={'table-row'}>{data['country']}</td>
        <td className={'table-row'}>{data['currency']}</td>
        <td className={'table-row'}>{data['group']}</td>
        <td className={'table-row'}>{data['type']}</td>
    </tr>)
    return (
        <div className={'instrument-results-container'}>
            <Card>
                <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <Table style={{width: '100%'}}>
                        <thead className="table-header-row">
                        <tr>
                            <td style={{border: '0px'}}>Name</td>
                            <td style={{border: '0px'}}>ID</td>
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
        </div>
    )
};
export default InstrumentResuts;