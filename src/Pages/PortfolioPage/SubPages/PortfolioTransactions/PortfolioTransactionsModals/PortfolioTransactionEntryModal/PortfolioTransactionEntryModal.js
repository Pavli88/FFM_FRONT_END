import CustomModal from "../../../../../../components/Modals/Modals";
import axios from "axios";
import React, {useContext, useRef, useState} from "react";
import DateContext from "../../../../../../context/date-context";
import PortfolioPageContext from "../../../../context/portfolio-page-context";
import ServerContext from "../../../../../../context/server-context";
import InstrumentSearch from "../../../../../../components/Search/InstrumentSearch/InstrumentSearch";
import ToogleSwitch from "../../../../../../components/Buttons/SliderButton/ToogleSwitch";
import BuySellButtonGroup from "../../../../../../components/Buttons/BuySellButtonGroup/BuySellButtonGroup";
import InputField from "../../../../../../components/InputField/InputField";

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
    const [date, setDate] = useState(null);
    const [quantityNumber, setQuantityNumber] = useState(null);
    const [price, setPrice] = useState(null);
    const [fxRate, setFxRate] = useState(null);
    const [brokerId, setBrokerId] = useState(null);

    const submitHandler = async () => {
        const parameters = {
            portfolio_code: portfolio.portfolioCode,
            portfolio_id: portfolio.id,
            security_id: instrumentData.id,
            transaction_type: transactionType,
            trade_date: date,
            quantity: quantityNumber,
            price: price,
            currency: instrumentData.currency,
            is_active: active,
            open_status: 'Open',
            transaction_link_code: 0,
            fx_rate: fxRate,
            broker: broker,
            broker_id: brokerId
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
                    <InputField
                        id="currency"
                        type="text"
                        value={instrumentData.currency}
                        label="Currency"
                        readOnly
                    />
                    <InputField
                        id="date"
                        type="date"
                        defaultValue={currentDate}
                        onChange={e => setDate(e.target.value)}
                        label="Date"
                    />
                    <InputField
                        id="quantity"
                        type="number"
                        onChange={e => setQuantityNumber(e.target.value)}
                        label="Quantity"
                    />
                    <InputField
                        id="price"
                        type="number"
                        onChange={e => setPrice(e.target.value)}
                        label="Price"
                        min={0.0}
                    />
                    <InputField
                        id="fxRate"
                        type="number"
                        onChange={e => setFxRate(e.target.value)}
                        label="FX Rate"
                        defaultValue={1.0}
                    />
                    <div className="block">
                        <label className={'input-label'}>Broker</label>
                        <select onChange={(e) => setBroker(e.target.value)}>
                            <option value={'oanda'}>Oanda</option>
                        </select>
                    </div>
                    <InputField
                        id="brokerId"
                        type="number"
                        onChange={e => setBrokerId(e.target.value)}
                        label="Broker ID"
                        defaultValue={1.0}
                    />
                </div>
            </div>
        </CustomModal>
    )
};
export default PortfolioTransactionEntryModal;