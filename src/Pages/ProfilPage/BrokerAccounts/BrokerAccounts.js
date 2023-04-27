import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import BrokerContext from "../../../context/broker-context";
import {useContext} from "react";
import {BsDash, BsTrash} from "react-icons/bs";
import axios from "axios";

const BrokerAccounts = (props) => {
    const { user, server} = props.parameters;
    const saveAccount = useContext(BrokerContext).saveAccount;
    const newAccount = useContext(BrokerContext).newAccount;
    const accounts = useContext(BrokerContext).accounts;
    console.log(accounts)
    const accountRows = accounts.map((data) => <tr key={data.id} className={'table-row-all'}>
        <td className={'table-row'}>
            <div>
                {data.broker_name}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{width: '100%'}}>
                {data.account_name}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{width: '100%'}}>
                {data.account_number}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{width: '100%'}}>
                {data.access_token}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{width: '100%'}}>
                {data.currency}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{width: '100%'}}>
                {data.env}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{width: '100%'}}>
                {data['margin_account'] ? 'Margin Allowed': 'Margin Disabled'}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{width: '100%'}}>
                {data['margin_percentage']}
            </div>
        </td>
        <td className={'table-row'}>
            <button className={'delete-button'} onClick={() => deleteAccount(data.id)}>
                <BsTrash/>
            </button>
        </td>
    </tr>
    )

    const deleteAccount = (id) => {
        axios.post(server + 'accounts/delete/', {
            id: id
        })
            .then(function(response){
                    if (response.data === 'Account is deleted'){
                        saveAccount(newAccount + 1)
                        alert(response.data)
                    }
                })
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const header = <div style={{display: "flex"}}>
        <div style={{width: '90%'}}><p style={{margin: 0, height: '100%', verticalAlign: "middle", padding: 5, fontSize: 16}}>Accounts</p>
        </div>
    </div>

    return(
        <CardWithHeader headerContent={header}>
            <div style={{overflow:"scroll", height:'100%'}}>
                <table style={{width: '100%'}}>
                <tbody style={{width: '100%'}}>
                {accountRows}
                </tbody>
            </table>
            </div>
        </CardWithHeader>
    )
};
export default BrokerAccounts;