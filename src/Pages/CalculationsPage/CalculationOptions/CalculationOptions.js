import DateContext from "../../../context/date-context";
import {useContext, useState, useEffect} from "react";
import Select from "react-select";
import WsContext from "../../../context/ws-context";
import { Oval } from 'react-loader-spinner';

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

        if (calcType === 'multiple' || calcType === 'multi') {
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
                                {value: 'dtd', label: 'DTD'},
                                {value: 'mtd', label: 'MTD'},
                                {value: 'qtd', label: 'QTD'},
                                {value: 'ytd', label: 'YTD'},
                                {value: 'si', label: 'Since Inception'},
                            ]}
                            isClearable
                            isMulti={calcType === 'multiple' || calcType === 'multi'}
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
            <label style={{width: 100}}>Start Date</label>
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
    const {processRunning} = useContext(WsContext);
    const [process, setProcess] = useState();
    const urls = {
        'valuation': 'calculate/valuation/',
        'total_return': 'calculate/total_return/',
        'attribution': 'calculate/attribution/'
    }

    return (
        <div className={'card'}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 15px'
      }}
    >
      {/* Bal oldal - process select és szekciók */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label>Process</label>
        <div style={{ paddingLeft: 15, width: 200 }}>
          <select
            value={process || ''}
            onChange={(e) => setProcess(e.target.value)}
            style={{ width: '100%', padding: '6px' }}
          >
            <option value="" disabled>Select a process</option>
            <option value="valuation">Valuation</option>
            <option value="total_return">Total Return</option>
            <option value="attribution">Attribution</option>
          </select>
        </div>

        {process === 'valuation' && <ValuationSection run={(e) => props.run(e)} />}
        {process === 'total_return' && <TotalReturnSection run={(e) => props.run(e)} />}
      </div>

      {processRunning && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Oval
            height={30}
            width={30}
            color="#007bff"
            secondaryColor="#ccc"
            strokeWidth={3}
            strokeWidthSecondary={2}
            ariaLabel="oval-loading"
            visible={true}
          />
          <span style={{ fontWeight: 'bold', color: '#007bff' }}>Calculating...</span>
        </div>
      )}
    </div>
  </div>
    );
};
export default CalculationOptions;