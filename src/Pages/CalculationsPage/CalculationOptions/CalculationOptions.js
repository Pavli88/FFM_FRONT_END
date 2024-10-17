import DateContext from "../../../context/date-context";
import {useContext, useRef, useState} from "react";
import Select from "react-select";

const TotalReturnSection = (props) => {
    const [calcType, setCalcType] = useState('multiple');
    const [parameters, setParameters] = useState({
        'calc_type': calcType,
    });
    const [periods, setPeriods] = useState([]);

    const handleCalcTypeChange = (selectedOption) => {
        const newCalcType = selectedOption?.value || 'multiple';
        setCalcType(newCalcType);

        let updatedParameters = {
            ...parameters,
            calc_type: newCalcType,
            ...(newCalcType === 'multiple' && { periods: periods.length > 0 ? periods : [] }),
        };

        if (newCalcType === 'multiple') {
            delete updatedParameters.start_date;
        }

        if (newCalcType === 'adhoc') {
            delete updatedParameters.periods;
        }

        setParameters(updatedParameters);

        if (newCalcType !== 'multiple') {
            setPeriods([]);
        }
    };

    const handlePeriodsChange = (selectedOptions) => {
        const selectedPeriods = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setPeriods(selectedPeriods);

        if (calcType === 'multiple') {
            setParameters((prevParameters) => ({
                ...prevParameters,
                periods: selectedPeriods,
            }));
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>

            <div style={{display: 'flex', alignItems: 'center', paddingLeft: 5}}>
                <span className="input-label" style={{width: 100}}>Period Mode</span>
            </div>

            <div style={{paddingLeft: 15, paddingTop: 0, width: 200}}>
                <Select
                    options={[
                        {value: 'adhoc', label: 'Ad-Hoc'},
                        {value: 'multiple', label: 'Multiple Periods'},
                        {value: 'multi', label: 'Multiple Dates'}
                    ]}
                    onChange={handleCalcTypeChange}
                    defaultValue={{value: 'multiple', label: 'Multiple Periods'}}
                />
            </div>

            {calcType !== 'adhoc' &&
                <>

                    <div style={{display: 'flex', alignItems: 'center', paddingLeft: 5}}>
                        <span className="input-label" style={{width: 80}}>Period</span>
                    </div>
                    <div style={{paddingLeft: 15, paddingTop: 0, width: 200}}>
                        <Select
                            options={[
                                {value: '1m', label: '1 Month'},
                                {value: '3m', label: '3 Months'},
                                {value: '6m', label: '6 Months'},
                                {value: '1y', label: '1 Year'},
                                {value: 'me', label: 'Month End'},
                                {value: 'mtd', label: 'Mtd'},
                                {value: 'qtd', label: 'Qtd'},
                                {value: 'ytd', label: 'Ytd'},
                                {value: 'si', label: 'Since Inception'},
                            ]}
                            isClearable
                            isMulti={calcType === 'multiple'}
                            onChange={handlePeriodsChange}
                        />
                    </div>
                </>
            }

            {(calcType === 'adhoc' || calcType === 'multi') && (
                <div style={{display: 'flex', alignItems: 'center', paddingLeft: 5}}>
                    <span className="input-label" style={{width: 100}}>Start Date</span>
                    <input
                        type="date"
                        onChange={(e) => setParameters({...parameters, start_date: e.target.value})}
                        style={{width: 200}}
                    />
                </div>
            )}

            <div style={{display: 'flex', alignItems: 'center', paddingLeft: 5}}>
                <span className="input-label" style={{width: 100}}>End Date</span>
                <input
                    type="date"
                    onChange={(e) => setParameters({...parameters, end_date: e.target.value})}
                    style={{width: 200}}
                />
            </div>

            <div style={{paddingLeft: 10, paddingTop: 0, paddingBottom: 0}}>
                <button className={'get-button'} onClick={() => props.run({
                    'url': 'calculate/total_return/',
                    params: parameters
                })}>Run
                </button>
            </div>

        </div>
    );
};

const ValuationSection = (props) => {
    const currentDate = useContext(DateContext).currentDate;
    const [parameters, setParameters] = useState({'start_date': currentDate});

    return (
        <div style={{display: 'flex', alignItems: 'center', paddingLeft: 5}}>
            <span className="input-label" style={{width: 100}}>Start Date</span>
            <input
                type="date"
                value={parameters.start_date}
                onChange={(e) => setParameters({...parameters, 'start_date': e.target.value})}
                style={{width: 200}}
            />
            <div style={{paddingLeft: 10, paddingTop: 0, paddingBottom: 0}}>
                <button className={'get-button'} onClick={() => props.run({
                    'url': 'calculate/valuation/',
                    params: parameters
                })}>Run
                </button>
            </div>
        </div>
    );
};

const CalculationOptions = (props) => {
    const [process, setProcess] = useState();
    const urls = {
        'valuation': 'calculate/valuation/',
        'total_return': 'calculate/total_return/',
        'attribution': 'calculate/attribution/'
    }

    return (
        <div style={{padding: 15}}>
            <div className={'card'}>
                <div style={{display: "flex", paddingLeft: 15, paddingTop: 5, paddingBottom: 5, paddingRight: 15}}>
                    <div style={{paddingTop: 0}}>
                        <span className={'input-label'} style={{textAlign: "left"}}>
                            Process
                        </span>
                    </div>
                    <div style={{paddingLeft: 15, paddingTop: 0, width: 200}}>
                        <Select
                            options={[
                                {value: 'valuation', label: 'Valuation'},
                                {value: 'total_return', label: 'Total Return'},
                                {value: 'attribution', label: 'Attribution'}
                            ]}
                            isClearable
                            onChange={(e) => setProcess(e.value)}
                        />
                    </div>
                    {process === 'valuation' && <ValuationSection run={(e) => props.run(e)}/>}
                    {process === 'total_return' && <TotalReturnSection run={(e) => props.run(e)}/>}
                </div>
            </div>
        </div>

    );
};
export default CalculationOptions;