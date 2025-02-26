import InstrumentTable from "../InstrumentTable/InstrumentTable";

const MyInstruments = ( {data} ) => {
    return (
        <div>
            <InstrumentTable data={data}/>
        </div>
    );
};
export default MyInstruments;