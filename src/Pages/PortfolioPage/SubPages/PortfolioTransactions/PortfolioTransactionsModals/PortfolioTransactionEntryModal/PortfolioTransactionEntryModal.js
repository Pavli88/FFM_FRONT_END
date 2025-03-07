import CustomModal from "../../../../../../components/Modals/Modals";
import axios from "axios";
import {useContext, useRef, useState} from "react";
import DateContext from "../../../../../../context/date-context";
import PortfolioPageContext from "../../../../context/portfolio-page-context";
import ServerContext from "../../../../../../context/server-context";
import InstrumentSearch from "../../../../../../components/Search/InstrumentSearch/InstrumentSearch";
import ToogleSwitch from "../../../../../../components/Buttons/SliderButton/ToogleSwitch";
import BuySellButtonGroup from "../../../../../../components/Buttons/BuySellButtonGroup/BuySellButtonGroup";

const PortfolioTransactionEntryModal = ( {show, close} ) => {
    const server = useContext(ServerContext).server;
    const currentDate = useContext(DateContext).currentDate;


    const portfolio = useContext(PortfolioPageContext);

    const [active, setActive] = useState(false);


    const [transactionType, setTransactionType] = useState('Purchase');
    const [relatedID, setRelatedID] = useState('');
    const [instrumentData, setInstrumentData] = useState({});
    const [optionSelected, setOptionSelected] = useState(false);

    const [broker, setBroker] = useState('oanda');
    const dateRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const fxRef = useRef();
    const brokerIdRef = useRef();

    const submitHandler = async () => {
        const parameters = {
            portfolio_code: portfolio.portfolioCode,
            portfolio_id: portfolio.id,
            security_id: instrumentData.id,
            transaction_type: transactionType,
            trade_date: dateRef.current.value,
            quantity: quantityRef.current.value,
            price: priceRef.current.value,
            currency: instrumentData.currency,
            is_active: active,
            open_status: 'Open',
            transaction_link_code: 0,
            fx_rate: fxRef.current.value,
            broker: broker,
            broker_id: brokerIdRef.current.value
        }
        console.log(parameters)
        const response = await axios.post(`${server}portfolios/new/transaction/`, parameters)
        if (response.data.success){
            setTransactionType('Purchase')
            close()
            console.log('CLOSING')
        };
    };

    const handleInstrumentSelect = (instrument) => {
        setInstrumentData(instrument)
    };
    console.log(transactionType)
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
                        <label className={'input-label'}>Portfolio</label>
                        <label className={'input-label'}>{portfolio.portfolio_code}</label>
                    </div>

                    <ToogleSwitch label={'Active'} isChecked={active} onToggle={() => setActive(!active)}/>

                    <div className="block">
                        <label className={'input-label'}>Instrument</label>
                        <InstrumentSearch onSelect={handleInstrumentSelect}/>
                    </div>

                    <BuySellButtonGroup side={transactionType} change={(value) => setTransactionType(value)}/>

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