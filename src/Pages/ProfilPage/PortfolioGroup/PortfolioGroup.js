import NewBrokerAccount from "../BrokerAccounts/NewBrokerAccount";
import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import {BsDash, BsPlus} from "react-icons/bs";

const PortfolioGroup = () => {
    const header = <div style={{display: "flex"}}>
        <div style={{width: '90%'}}><div style={{margin: 0, height: '100%', verticalAlign: "middle"}}>Portfolio Relationships</div>
        </div>
        <div style={{margin: 5}}>
            <button style={{border: 0}}><BsPlus style={{fontSize: 24}}/>
            </button>
        </div>
        <div style={{margin: 5}}>
            <button style={{border: 0}} ><BsDash style={{fontSize: 24}}/></button>
        </div>
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