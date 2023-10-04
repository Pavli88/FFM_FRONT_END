import Card from "react-bootstrap/Card";
import CalculationContext from "../CalculationPageContext/calculation-context";
import DateContext from "../../../context/date-context";
import {useContext, useRef, useState} from "react";
import axios from "axios";
import Select from "react-select";

const CalculationOptions = (props) => {
    const currentDate = useContext(DateContext).currentDate;
    const startDateRef = useRef();
    const [process, setProcess] = useState();
    const [parameters, setParameters] = useState({
        'date': currentDate
    });

    const startDateDiv = <div style={{paddingLeft: 15, display: "flex"}}>
        <div style={{paddingTop: 0, width: 150}}>
                        <span className={'input-label'} style={{textAlign: "left"}}>
                            Start Date
                        </span>
        </div>
        <input type={"date"} defaultValue={currentDate} onChange={(e) => setParameters({...parameters, 'date': e.target.value})}/>
    </div>

    const returnPeriods = <div style={{paddingLeft: 15, paddingTop: 0, width: 400}}>
        <Select
            options={[
                {value: '1m', label: '1 Month'},
                {value: '3m', label: '3 Months'},
                {value: '6m', label: '6 Months'},
                {value: '1y', label: '1 Year'},
                {value: 'mtd', label: 'Mtd'},
                {value: 'qtd', label: 'Qtd'},
                {value: 'ytd', label: 'Ytd'},
                {value: 'si', label: 'Since Inception'},
            ]}
            isClearable
            isMulti
            onChange={(e) => setParameters({...parameters, 'periods':e.map(data => data['value'])})}
            className={'instrument-search-input-field'}

        />
    </div>

    const urls = {
        'valuation': 'calculate/valuation/',
        'total_return': 'calculate/total_return/',
        'attribution': 'calculate/attribution/'
    }

    return (
        <div style={{padding: 15}}>
            <Card>
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
                            onChange={function (e) {
                                setProcess(e.value)
                                setParameters({
                                    'date': currentDate
                                })
                            }}
                            className={'instrument-search-input-field'}

                        />
                    </div>

                    {process === 'valuation' || process === 'total_return' ? startDateDiv: ''}
                    {process === 'total_return' ? returnPeriods: ''}

                    <div style={{paddingLeft: 10, paddingTop: 0, paddingBottom: 0}}>
                        <button className={'get-button'} onClick={() => props.run({
                            'url': urls[process],
                            params: parameters
                        })}>Run
                        </button>
                    </div>
                </div>
            </Card>
        </div>

    );
};
export default CalculationOptions;