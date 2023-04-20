import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {useContext} from "react";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import "./InstrumentResults.css"

const InstrumentResuts = (props) => {
    const saveSelectedInstrument = useContext(InstrumentSearchContext)['saveSelectedInstrument']
    const instruments = props.data.map((data) => <tr key={data['id']} onClick={() => saveSelectedInstrument(data)} className={'table-row-all'}>
        <td>{data['name']}</td>
        <td>{data['id']}</td>
        <td>{data['code']}</td>
        <td>{data['country']}</td>
        <td>{data['currency']}</td>
        <td>{data['group']}</td>
        <td>{data['type']}</td>
    </tr>)
    return (
        <Card style={{height: '100%'}}>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table style={{width: '100%'}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Country</th>
                        <th>Currency</th>
                        <th>Group</th>
                        <th>Type</th>
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