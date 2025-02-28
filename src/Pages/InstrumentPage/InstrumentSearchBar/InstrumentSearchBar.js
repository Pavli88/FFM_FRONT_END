import Select from 'react-select'
import {useState, useContext, useRef} from "react";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import './InstrumentSearchBar.css'
import axios from "axios";
import ServerContext from "../../../context/server-context";

const InstrumentSearchBar = () => {
    const server = useContext(ServerContext).server;
    const saveInstrumentResults = useContext(InstrumentSearchContext).saveInstrumentSearchResults;
    const nameRef = useRef();
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCurrencies, setSelectedCurrencies] = useState([]);

    const secGroup = [
        {value: 'BND', label: 'Bond'},
        {value: 'Cash', label:'Cash'},
        {value: 'CFD', label:'CFD'},
        {value: 'EQT', label: 'Equity'},
    ];

    const bondType = [
        {value:'CRP', label: 'Corporate'},
        {value:'GOV', label: 'Government'},
    ];

    const cashType = [
        {value:'Cash', label: 'Cash'},
        {value:'MRG', label: 'Margin'},
    ];

    const cfdType = [
        {value:'BND', label: 'Bond'},
        {value:'COM', label: 'Commodity'},
        {value:'EQT', label: 'Equity'},
        {value:'FX', label: 'Fx'},
    ];

    const equityType = [
        {value:'EQT', label: 'Equity'},
    ];

    const currencies = [
        {value: 'USD', label:'USD'},
        {value: 'EUR', label: 'EUR'},
        {value: 'HUF', label: 'HUF'}
    ];

    const countries = [
        {value: 'US', label:'United States'},
        {value: 'UK', label: 'United Kingdom'},
        {value: 'HU', label: 'Hungary'}
    ];

    const fetchInstruments = () => {
        axios.post(`${server}instruments/get/instruments/`,
            {
                name: nameRef.current.value,
                country: selectedCountries.map(data => data.value),
                group: selectedGroup.value,
                type: selectedTypes.map(data => data.value),
                currency: selectedCurrencies.map(data => data.value)
            },
        )
            .then(data => saveInstrumentResults(data.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return (
        <div className={'card'} style={{padding: 10, width: '100%'}}>
            <div style={{display: "flex", height: '100%'}}>
                <div className='vertical-box'>
                    <label>Name</label>
                    <div >
                        <input ref={nameRef} type="text" />
                    </div>
                </div>

                <div className='vertical-box'>
                    <label>
                        Country
                    </label>
                    <div >
                        <Select
                            isMulti
                            options={countries}
                            onChange={(e) => setSelectedCountries(e)}
                            // className={'instrument-search-input-field'}
                        />
                    </div>
                </div>

                <div className='vertical-box'>
                    <label>
                        Group
                    </label>
                    <div>
                        <Select
                            options={secGroup}
                            isClearable
                            onChange={(e) => e === null ? setSelectedGroup([]) : setSelectedGroup(e)}
                            // className={'instrument-search-input-field'}
                        />
                    </div>
                </div>

                <div className='vertical-box'>
                    <label>Type</label>
                    <div>
                        <Select
                            isMulti
                            options={
                                selectedGroup.value === 'BND' ? bondType :
                                    selectedGroup.value === 'Cash' ? cashType :
                                        selectedGroup.value === 'CFD' ? cfdType : equityType}
                            onChange={(e) => setSelectedTypes(e)}
                            className={'instrument-search-input-field'}
                        />
                    </div>
                </div>

                <div className='vertical-box'>
                    <label>Currency</label>
                    <div>
                        <Select
                            isMulti
                            options={currencies}
                            onChange={(e) => setSelectedCurrencies(e)}
                            className={'instrument-search-input-field'}
                        />
                    </div>
                </div>

                <div className='vertical-box'>
                    <div style={{height: '100%', paddingLeft: 5}}>
                        <button onClick={fetchInstruments}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default InstrumentSearchBar;