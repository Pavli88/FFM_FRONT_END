import Table from "react-bootstrap/Table";
import {useContext} from "react";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";

const InstrumentTable = ({ data }) => {
    const { saveSelectedInstrument } = useContext(InstrumentSearchContext); // Correct way to extract value from context

    if (!data || !Array.isArray(data)) {
        return <p>No instruments available.</p>; // Handle potential undefined/null or non-array cases
    }

    const instruments = data.map((instrument) => (
        <tr
            key={instrument.id}
            onClick={() => saveSelectedInstrument(instrument)}
            className="table-row-all"
        >
            <td>{instrument.id}</td>
            <td>{instrument.name}</td>
            <td>{instrument.country}</td>
            <td>{instrument.currency}</td>
            <td>{instrument.group}</td>
            <td>{instrument.type}</td>
        </tr>
    ));

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div className="card" style={{ width: '100%', height: '100%' }}>
                <div style={{ height: '100%', overflowY: 'scroll', overflowX: 'hidden' }}>
                    <table style={{ width: '100%' }}>
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
                        <tbody>{instruments}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InstrumentTable;