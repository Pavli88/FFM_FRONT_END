import {useContext, useState} from "react";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import "./InstrumentResults.css"
import InstrumentNew from "../InstrumentNew/InstrumentNew";
import {FaPlus} from "react-icons/fa";

const InstrumentResuts = ( {data} ) => {
    const saveSelectedInstrument = useContext(InstrumentSearchContext)['saveSelectedInstrument']
    const [showNewInstrumentModal, setShowNewInstrumentModal] = useState(false);

    const instruments = data.map((data) => <tr key={data['id']} onClick={() => saveSelectedInstrument(data)} style={{cursor: "pointer"}}>
        <td>{data['id']}</td>
        <td>{data['name']}</td>
        <td>{data['country']}</td>
        <td>{data['currency']}</td>
        <td>{data['group']}</td>
        <td>{data['type']}</td>
    </tr>)

    return (
        <div className={'card'} style={{padding: 15}}>
            <div className={'card-header'} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label>Instruments</label>
                <div>
                    <button onClick={() => setShowNewInstrumentModal(!showNewInstrumentModal)} title={'Add New Instrument'}>
                        <FaPlus size={20}/>
                    </button>
                </div>
                <InstrumentNew show={showNewInstrumentModal}
                               close={() => setShowNewInstrumentModal(!showNewInstrumentModal)}/>
            </div>
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