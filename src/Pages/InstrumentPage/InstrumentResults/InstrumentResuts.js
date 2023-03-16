import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {useContext} from "react";

//Contexts
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";

// CSS
import "./InstrumentResults.css"
const InstrumentResuts = (props) => {
    const saveSelectedInstrument = useContext(InstrumentSearchContext)['saveSelectedInstrument']
    const instruments = props.data.map((data) => <tr key={data['id']} onClick={() => saveSelectedInstrument(data)}>
        <td>{data['name']}</td>
        <td>{data['id']}</td>
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
    )
};
export default InstrumentResuts;