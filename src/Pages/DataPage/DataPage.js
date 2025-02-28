import DataNavBar from "./DataNavBar/DataNavBar";
import InstrumentPricing from "./InstrumentPricing";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";

const DataPage = () => {
    const panel = <div>
        <InstrumentPricing/>
    </div>

    const mainArea = <div>
        <DataNavBar/>
    </div>

    return(
        <ContainerWithSideMenu panel={panel} mainArea={mainArea}/>
    )
}
export default DataPage;