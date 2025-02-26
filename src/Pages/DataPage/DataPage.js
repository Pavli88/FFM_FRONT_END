import DataNavBar from "./DataNavBar/DataNavBar";
import InstrumentPricing from "../InstrumentPage/InstrumentPricing/InstrumentPricing";
const DataPage = () => {
    return(
        <div className={'page-container'}>
            <DataNavBar/>
            <InstrumentPricing/>
        </div>
    )
}
export default DataPage;