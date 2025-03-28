import Select from 'react-select'
import {useState, useContext, useRef} from "react";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import './InstrumentSearchBar.css'
import UserContext from "../../../context/user-context";
import { FaSearch } from 'react-icons/fa'
import fetchAPI from "../../../config files/api";

const InstrumentSearchBar = () => {
    const saveInstrumentResults = useContext(InstrumentSearchContext).saveInstrumentSearchResults;
    const nameRef = useRef();
    const userId = useContext(UserContext).id;
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCurrencies, setSelectedCurrencies] = useState([]);

    const secGroup = [
        {value: 'BND', label: 'Bond'},
        {value: 'Cash', label: 'Cash'},
        {value: 'CFD', label: 'CFD'},
        {value: 'EQT', label: 'Equity'},
    ];

    const bondType = [
        {value: 'CRP', label: 'Corporate'},
        {value: 'GOV', label: 'Government'},
    ];

    const cashType = [
        {value: 'Cash', label: 'Cash'},
        {value: 'MRG', label: 'Margin'},
    ];

    const cfdType = [
        {value: 'BND', label: 'Bond'},
        {value: 'COM', label: 'Commodity'},
        {value: 'EQT', label: 'Equity'},
        {value: 'FX', label: 'Fx'},
    ];

    const equityType = [
        {value: 'EQT', label: 'Equity'},
    ];

    const currencies = [
        {value: 'USD', label: 'USD'},
        {value: 'EUR', label: 'EUR'},
        {value: 'HUF', label: 'HUF'}
    ];

    const countries = [
        {value: 'US', label: 'United States'},
        {value: 'UK', label: 'United Kingdom'},
        {value: 'HU', label: 'Hungary'}
    ];

    const fetchInstruments = () => {

        const params = new URLSearchParams();

        // Add name if it exists
        if (nameRef.current.value) {
            params.append('name', nameRef.current.value);
        }
        if (selectedCountries.length > 0) {
            selectedCountries.forEach(country => params.append('country', country.value));
        }
        if (selectedGroup.length > 0) {
            selectedGroup.forEach(group => params.append('group', group.value));
        }
        if (selectedTypes.length > 0) {
            selectedTypes.forEach(type => params.append('type', type.value));
        }
        if (selectedCurrencies.length > 0) {
            selectedCurrencies.forEach(currency => params.append('currency', currency.value));
        }

        fetchAPI.get(`instruments/get/instruments/?${params.toString()}`)
            .then(response => saveInstrumentResults(response.data))
            .catch(error => {
                console.error('Error Message:', error);
            });
    };

    return (
        <div className={'card'}>
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
                            isMulti
                            options={secGroup}
                            // isClearable
                            onChange={(e) => setSelectedGroup(e)}
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
                        />
                    </div>
                </div>

                <div style={{padding: 10}}>
                    <button className={'icon-button'}>
                        <FaSearch style={{fontSize: 22}}  onClick={fetchInstruments}/>
                    </button>
                </div>

            </div>
        </div>
    );
};
export default InstrumentSearchBar;