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

    const accountRows = accounts.map((data) => <tr key={data.id} className={'table-row-all'}>
        <td className={'table-row'}>
            <div>
                {data.id}
            </div>
        </td>
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

    return(
        <div className={'card'}>
            <div className={'card-header'}>
                Accounts
            </div>
            <div style={{overflow:"scroll", height:'100%'}}>
                <table style={{width: '100%'}}>
                    <thead>
                    <tr>
                        <td>
                            ID
                        </td>
                        <td>
                            Broker
                        </td>
                        <td>
                            Name
                        </td>
                        <td>
                            Account ID
                        </td>
                        <td>
                            Token
                        </td>
                        <td>
                            Currency
                        </td>
                        <td>
                            Env
                        </td>
                        <td>
                            Margin
                        </td>
                        <td>
                            ID
                        </td>
                    </tr>
                    </thead>
                    <tbody style={{width: '100%'}}>
                {accountRows}
                </tbody>
            </table>
            </div>
        </div>
    )
};
export default BrokerAccounts;