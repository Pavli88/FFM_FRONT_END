import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {useState, useRef, useContext} from "react";
import './PortfolioTradeRoutingNew.css'
import PortfolioPageContext from "../../../../context/portfolio-page-context";
import ServerContext from "../../../../../../context/server-context";

const PortfolioTradeRoutingNew = (props) => {
    const server = useContext(ServerContext)['server'];
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    const [tickerData, setTickerData] = useState([]);
    const [selectedTicker, setSelectedTicker] = useState();
    const [accountData, setAccountData] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState({});
    const instCodeRef = useRef();
    const tickers = tickerData.map((data) => <tr key={data['id']} style={{cursor: "pointer"}} onClick={() => {
        setSelectedTicker(data['id'])
        getAccounts(data['source'])
    }}>
        <td>
            {data['source_ticker']}
        </td>
        <td>
            {data['source']}
        </td>
    </tr>)

    const accountRows = accountData.map((data) => <tr key={data.id} onClick={() => setSelectedAccount(data)} style={{cursor: 'pointer'}}>
        <td>{data.account_name}</td>
        <td>{data.account_number}</td>
        <td>{data.env}</td>
        <td>{data.currency}</td>
    </tr>)

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(server + 'portfolios/new/trade_routing/', {
            portfolio_code: portfolioCode,
            inst_id: instCodeRef.current.value,
            ticker_id: selectedTicker,
            broker_account_id: selectedAccount['id'],
        })
            .then(data=>alert(data.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const getTickers = async() => {
        const response = await axios.get(server + 'instruments/get/broker/tickers/', {
            params: {
                inst_code: instCodeRef.current.value
            }
        })
        setTickerData(response.data)

    };

    const getAccounts = async(broker) => {
        const response = await axios.get(server + 'accounts/get/accounts/', {
            params: {
                broker_name: broker
            }
        })
        setAccountData(response.data)
    };

    const handleClose = () => {
        setTickerData([]);
        setSelectedTicker();
        setAccountData([]);
        setSelectedAccount({});
        props.hide();
    };


    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Instrument Routing</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form.Label style={{fontWeight: "bold"}}>Instrument ID</Form.Label>
                <div style={{display: "flex", paddingBottom: 15, width: '100%'}}>
                    <div style={{width: '100%'}}>
                        <input min={0} ref={instCodeRef} type="number" required  onChange={() => getTickers()}/>
                    </div>
                </div>

                <Form.Label style={{fontWeight: "bold"}}>Broker Tickers</Form.Label>
                <div style={{overflow: "scroll", height: '300px', paddingBottom: 15, paddingLeft: 15, paddingRight: 15, width: '100%'}}>
                    <table>
                        <tbody>
                        {tickers}
                        </tbody>
                    </table>
                </div>

                <Form.Label style={{fontWeight: "bold"}}>Accounts</Form.Label>
                <div style={{overflow: "scroll", height: '300px', paddingBottom: 15, paddingLeft: 15, paddingRight: 15, width: '100%'}}>
                    <table>
                        <tbody>
                        {accountRows}
                        </tbody>
                    </table>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button className={'normal-button'} onClick={submitHandler}>Save</button>
            </Modal.Footer>
        </Modal>
    )
}
export default PortfolioTradeRoutingNew;