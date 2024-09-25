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
        saveRequestParameters({
            name: nameRef.current.value,
            country: selectedCountries.map(data=>data.value),
            group: selectedGroup.value,
            type: selectedTypes.map(data=>data.value),
            currency: selectedCurrencies.map(data=>data.value)

        });
    };

    return (
        <Card className={'search-container'}>
            <div style={{display: "flex", height: '100%'}}>
                <div style={{display: "flex"}}>
                    <div className={'input-label'}>
                        Name
                    </div>
                    <div >
                        <input ref={nameRef} type="text" />
                    </div>
                </div>

                <div style={{display: "flex"}}>
                    <div className={'input-label'}>
                        Country
                    </div>
                    <div >
                        <Select
                            isMulti
                            options={countries}
                            onChange={(e) => setSelectedCountries(e)}
                            className={'instrument-search-input-field'}
                        />
                    </div>
                </div>

                <div style={{display: "flex"}}>
                    <div className={'input-label'}>
                        Group
                    </div>
                    <div>
                        <Select
                            options={secGroup}
                            isClearable
                            onChange={(e) => e === null ? setSelectedGroup([]) : setSelectedGroup(e)}
                            className={'instrument-search-input-field'}
                        />
                    </div>
                </div>

                <div style={{display: "flex"}}>
                    <div className={'input-label'}>
                        Type
                    </div>
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

                <div style={{display: "flex"}}>
                    <div className={'input-label'}>
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
                </div>

                <div style={{display: "flex"}}>
                    <div style={{height: '100%', paddingLeft: 5}}>
                        <button onClick={fetchInstruments} className={'get-button'}>Search</button>
                    </div>
                    <div style={{height: '100%', paddingLeft: 5}}>
                        <InstrumentNew className={'instrument-search-button'}/>
                    </div>
                </div>
            </div>
        </Card>
    );
};
export default InstrumentSearchBar;