import PlusMinusButtonGroup from "../../../components/PlusMinusButtonGroup/PlusMinusButtonGroup";
import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import {BsDash, BsPlus} from "react-icons/bs";

const PortfolioGroup = () => {
    const header = <div style={{display: "flex"}}>
        <div style={{padding: 5}}>Portfolio Relationships</div>
        <PlusMinusButtonGroup/>
    </div>
    return(
        <CardWithHeader headerContent={header}>
            <div style={{overflow:"scroll"}}>
                <table style={{width: '100%', height: '100%'}}>
                <tbody style={{width: '100%'}}>
                {/*{accountRows}*/}
                </tbody>
            </table>
            </div>
        </CardWithHeader>
    )
};
export default PortfolioGroup;