import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import NewBrokerAccount from "./NewBrokerAccount";
import BrokerContext from "../../../context/broker-context";
import {useContext, useState} from "react";
import {BsDash, BsPlus} from "react-icons/bs";

const BrokerAccounts = (props) => {
    const { user, server} = props.parameters;
    const [showNewAccountModal, setShowNewAccountModal] = useState(false);
    const accounts = useContext(BrokerContext).accounts;
    const accountRows = accounts.map((data) => <tr key={data.id}>
        <td className={'signal-row'}>
            <div>
                {data.broker_name}
            </div>
        </td>
        <td className={'signal-row'}>
            <div style={{width: '100%'}}>
                {data.account_name}
            </div>
        </td>
        <td className={'signal-row'}>
            <div style={{width: '100%'}}>
                {data.account_number}
            </div>
        </td>
        <td className={'signal-row'}>
            <div style={{width: '100%'}}>
                {data.access_token}
            </div>
        </td>
        <td className={'signal-row'}>
            <div style={{width: '100%'}}>
                {data.currency}
            </div>
        </td>
        <td className={'signal-row'}>
            <div style={{width: '100%'}}>
                {data.env}
            </div>
        </td>
    </tr>
    )

    const header = <div style={{display: "flex"}}>
        <div style={{width: '90%'}}><p style={{margin: 0, height: '100%', verticalAlign: "middle", padding: 5, fontSize: 16}}>Broker Accounts</p>
        </div>
        <div style={{margin: 5}}>
            <button style={{border: 0}} onClick={() => setShowNewAccountModal(true)}><BsPlus style={{fontSize: 24}}/>
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
                {accountRows}
                </tbody>
            </table>
            </div>
            <NewBrokerAccount show={showNewAccountModal}
                              hide={() => setShowNewAccountModal(false)}
                              server={server}
                              user={user}
            />
        </CardWithHeader>
    )
};
export default BrokerAccounts;