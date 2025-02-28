import axios from "axios";
import CustomModal from "../../../components/Modals/Modals";
import {useState, useRef, useContext} from "react";
import ServerContext from "../../../context/server-context";

const InstrumentNew = ( { show, close }) => {
    const server = useContext(ServerContext).server;
    const [selectedGroup, setSelectedGroup] = useState('BND');
    const nameRef = useRef();
    const countryRef = useRef();
    const groupRef = useRef();
    const typeRef = useRef();
    const currencyRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${server}instruments/new/`, {
                name: nameRef.current.value,
                country: countryRef.current.value,
                group: selectedGroup,
                type: typeRef.current.value,
                currency: currencyRef.current.value,
            });
            alert(response.data);
            close(); // Close modal after successful submission
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Failed to create instrument.");
        }
    };

    const optionGenerator = (values) =>
        values.map((data) => (
            <option key={data.value} value={data.value}>
                {data.label}
            </option>
        ));

    const secGroup = [
        {value: 'Bond', label: 'Bond'},
        {value: 'Cash', label:'Cash'},
        {value: 'CFD', label:'CFD'},
        {value: 'Equity', label: 'Equity'},
        {value: 'Loan', label: 'Loan'},
        {value: 'Option', label: 'Option'},
    ];

    const bondType = [
        {value:'COR', label: 'Corporate'},
        {value:'GOV', label: 'Government'},
    ];

    const cashType = [
        {value:'Cash', label: 'Cash'},
        {value:'Margin', label: 'Margin'},
    ];

    const cfdType = [
        {value:'Bond', label: 'Bond'},
        {value:'COM', label: 'Commodity'},
        {value:'Equity', label: 'Equity'},
        {value:'FX', label: 'Fx'},
    ];

    const equityType = [
        {value:'Equity', label: 'Equity'},
        {value:'Fund', label: 'Fund'},
    ];

    const optionType = [
        {value:'Equity', label: 'Equity'},
        {value:'FX', label: 'FX'},
        {value:'Index', label: 'Index'},
    ];

    const loanType = [
        {value:'Leverage', label: 'Leverage'},
    ];

    const currencies = [
        {value: 'USD', label: 'USD'},
        {value: 'EUR', label: 'EUR'},
        {value: 'HUF', label: 'HUF'},
        {value: 'AUD', label: 'AUD'},
        {value: 'NZD', label: 'NZD'},
        {value: 'JPY', label: 'JPY'},
        {value: 'HKD', label: 'HKD'},
        {value: 'DKK', label: 'DKK'},
        {value: 'SEK', label: 'SEK'},
        {value: 'NOK', label: 'NOK'},
        {value: 'CHF', label: 'CHF'},
        {value: 'CAD', label: 'CAD'},
        {value: 'GBP', label: 'GBP'},
        {value: 'CZK', label: 'CZK'},
        {value: 'PLN', label: 'PLN'},
        {value: 'SGD', label: 'SGD'},
    ];

    const countries = [
        {value: 'US', label: 'United States'},
        {value: 'UK', label: 'United Kingdom'},
        {value: 'HU', label: 'Hungary'},
        {value: 'NON', label: '-'},
    ];

    return (
        <CustomModal show={show} onClose={close} title={'New Instrument'}
                     footer={
                         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitHandler}>
                             Save
                         </button>
                     }>
            <div>
                <div className={'block'}>
                    <label>Full Name</label>
                    <input ref={nameRef} type="text" required/>
                </div>

                <div className={'block'}>
                    <label>Country of Issue</label>
                    <select ref={countryRef}>
                        {optionGenerator(countries)}
                    </select>
                </div>

                <div className={'block'}>
                    <label style={{textAlign: 'left'}}>Group</label>
                    <select ref={groupRef} onChange={(e) => setSelectedGroup(e.target.value)}>
                        {optionGenerator(secGroup)}
                    </select>
                </div>

                <div className={'block'}>
                    <label>Type</label>
                    <select ref={typeRef}>
                        {selectedGroup === 'Bond' ? optionGenerator(bondType) :
                            selectedGroup === 'Cash' ? optionGenerator(cashType) :
                                selectedGroup === 'CFD' ? optionGenerator(cfdType) :
                                    selectedGroup === 'Loan' ? optionGenerator(loanType) :
                                        selectedGroup === 'Option' ? optionGenerator(optionType) :
                                            optionGenerator(equityType)}
                    </select>
                </div>

                <div className={'block'}>
                    <label>Currency</label>
                    <select ref={currencyRef} required>
                        {optionGenerator(currencies)}
                    </select>
                </div>
            </div>
        </CustomModal>
    );
};
export default InstrumentNew;