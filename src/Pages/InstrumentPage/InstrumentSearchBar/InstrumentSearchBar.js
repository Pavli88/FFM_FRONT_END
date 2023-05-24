import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import {Nav} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from 'react-select'
import {useState, useContext, useRef} from "react";
import InstrumentNew from "../InstrumentNew";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import './InstrumentSearchBar.css'

const InstrumentSearchBar = () => {
    const saveRequestParameters = useContext(InstrumentSearchContext)['saveRequestParameters'];
    const nameRef = useRef();
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCurrencies, setSelectedCurrencies] = useState([]);

    const secGroup = [
        {value: 'BND', label: 'Bond'},
        {value: 'CSH', label:'Cash'},
        {value: 'CFD', label:'CFD'},
        {value: 'EQT', label: 'Equity'},
    ];

    const bondType = [
        {value:'CRP', label: 'Corporate'},
        {value:'GOV', label: 'Government'},
    ];

    const cashType = [
        {value:'CSH', label: 'Cash'},
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
        saveRequestParameters({
            name: nameRef.current.value,
            // country: selectedCountries.map(data=>data.value),
            // group: selectedGroup.value,
            // type: selectedTypes.map(data=>data.value),
            // currency: selectedCurrencies.map(data=>data.value)

        });
    };

    return (
        <div className={'instrument-search-bar-container'}>
            {/*<div className={'instrument-search-label'}>Search</div>*/}
            <div className={'instrument-search-bar-name'}>
                Name
            </div>
            <div className={'instrument-search-input-field-container'}>
                <Form.Control ref={nameRef} type="text" className={'instrument-search-input-field'}/>
            </div>
            <div className={'instrument-search-bar-name'}>
                Country
            </div>
            <div className={'instrument-search-input-field-container'}>
                <Select
                    isMulti
                    options={countries}
                    onChange={(e) => setSelectedCountries(e)}
                    className={'instrument-search-input-field'}
                />
            </div>
            <div className={'instrument-search-bar-name'}>
                Group
            </div>
            <div >
                <Select
                    options={secGroup}
                    isClearable
                    onChange={(e) => e === null ? setSelectedGroup([]) : setSelectedGroup(e)}
                    className={'instrument-search-input-field'}
                />
            </div>
            <div className={'instrument-search-bar-name'}>
                Type
            </div>
            <div>
                <Select
                    isMulti
                    options={
                        selectedGroup.value === 'BND' ? bondType :
                            selectedGroup.value === 'CSH' ? cashType :
                                selectedGroup.value === 'CFD' ? cfdType : equityType}
                    onChange={(e) => setSelectedTypes(e)}
                    className={'instrument-search-input-field'}
                />
            </div>
            <div className={'instrument-search-bar-name'}>
                Currency
            </div>
            <div>
                <Select
                    isMulti
                    options={currencies}
                    onChange={(e) => setSelectedCurrencies(e)}
                    className={'instrument-search-input-field'}
                />
            </div>
            <div className={'instrument-search-button-div'}>
                <Button onClick={fetchInstruments} className={'instrument-search-button'}>Get</Button>
            </div>
            <div className={'instrument-search-button-div'}>
                <InstrumentNew className={'instrument-search-button'}/>
            </div>
        </div>
    );
};
export default InstrumentSearchBar;