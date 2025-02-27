import CustomModal from "../../../../../../components/Modals/Modals";
import axios from "axios";
import {useContext, useRef, useState} from "react";
import DateContext from "../../../../../../context/date-context";
import PortfolioPageContext from "../../../../context/portfolio-page-context";
import ServerContext from "../../../../../../context/server-context";

const PortfolioTransactionEntryModal = ( {show, close} ) => {
    const server = useContext(ServerContext).server;
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const currentDate = useContext(DateContext).currentDate;
    const [transactionType, setTransactionType] = useState('Purchase');
    const [relatedID, setRelatedID] = useState('');
    const [instrumentData, setInstrumentData] = useState({});
    const [optionSelected, setOptionSelected] = useState(false);
    const [optionType, setOptionType] = useState("C");
    const [active, setActive] = useState(false);
    const [broker, setBroker] = useState('oanda');
    const dateRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const fxRef = useRef();
    const brokerIdRef = useRef();

    const submitHandler = async () => {
        const response = await axios.post(`${server}portfolios/new/transaction/`, {
            portfolio_code: portfolioCode,
            security_id: instrumentData.id,
            transaction_type: transactionType,
            trade_date: dateRef.current.value,
            quantity: quantityRef.current.value,
            price: priceRef.current.value,
            currency: instrumentData.currency,
            is_active: active,
            open_status: 'Open',
            transaction_link_code: 0,
            option: optionSelected ? optionType : '',
            fx_rate: fxRef.current.value,
            broker: broker,
            broker_id: brokerIdRef.current.value
        })
        if (response.data.success){
            setTransactionType('Purchase')
            close()
            console.log('CLOSING')
        };
    };

    const getSecurity = () => {
        axios.get(`${server}instruments/get/instrument/`, {
            params: {
                id: relatedID,
            }
        })
            .then(response => setInstrumentData(response.data[0]))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return (
        <CustomModal show={show} onClose={close} title={'New Transaction'}
            footer={
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitHandler}>
                    Save
                </button>
            }>
            <div>
                <div style={{height: '600px', overflowY: 'scroll', padding: 5}}>

                    <div className="block">
                            <label className={'input-label'}>Active Transaction</label>
                            <input type="checkbox" onChange={() => setActive(!active)}/>
                    </div>

                    <div className="block">
                            <label className={'input-label'}>Option</label>
                            <input type="checkbox" onChange={(e) => {
                                setOptionSelected(e.target.checked)
                                setOptionType('C')
                            }}/>
                    </div>

                    <div className="block">
                            <label className={'input-label'}>Security ID</label>
                        <div style={{position: "absolute", right: 10, display: "flex"}}>
                            <div>
                                <input value={relatedID}
                                       onChange={(e) => setRelatedID(e.target.value)}
                                       type="number"
                                       style={{width: 135}}/>
                            </div>
                            <div style={{paddingLeft: 15}}>
                                <button className={'normal-button'}
                                        style={{width: 50}}
                                        onClick={getSecurity}
                                >Get
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="block">
                        <label className={'input-label'}>Transaction Type</label>
                            <select onChange={(e) => setTransactionType(e.target.value)} >
                                <option value={'Purchase'}>Purchase</option>
                                <option value={'Sale'}>Sale</option>
                            </select>

                    </div>

                    {optionSelected ? <div className="block">
                        <label className={'input-label'}>Option Type</label>
                        <select onChange={(e) => setOptionType(e.target.value)}>
                                <option value={'C'}>Call</option>
                                <option value={'P'}>Put</option>
                        </select>
                    </div> : ""
                    }

                    <div className="block">
                            <label className={'input-label'}>Security Name</label>
                            <input value={instrumentData.name} type="text" disabled/>
                    </div>

                    <div className="block">
                            <label className={'input-label'}>Security Group</label>
                            <input value={instrumentData.group} type="text" disabled/>
                    </div>

                    <div className="block">
                            <label className={'input-label'}>Currency</label>
                            <input value={instrumentData.currency} type="text" disabled/>
                    </div>

                    <div className="block">
                            <label className={'input-label'}>Date</label>
                            <input ref={dateRef} defaultValue={currentDate} type="date"/>
                    </div>

                    <div className="block">
                            <label className={'input-label'}>Quantity</label>
                            <input ref={quantityRef} type="number"/>
                    </div>

                    <div className="block">
                            <label className={'input-label'}>Price</label>
                            <input ref={priceRef} type="number" min={0.0}/>
                    </div>

                    <div className="block">
                            <label className={'input-label'}>FX Rate</label>
                            <input ref={fxRef} type="number" defaultValue={1.0}/>
                    </div>

                    <div className="block">
                        <label className={'input-label'}>Broker</label>
                        <select onChange={(e) => setBroker(e.target.value)}>
                                <option value={'oanda'}>Oanda</option>
                        </select>
                    </div>

                    <div className="block">
                        <label className={'input-label'}>Broker ID</label>
                        <input ref={brokerIdRef} type="number" defaultValue={1.0}/>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
};
export default PortfolioTransactionEntryModal;