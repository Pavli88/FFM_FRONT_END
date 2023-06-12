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

    const startDateDiv = <div style={{paddingLeft: 15, display: "flex"}}>
        <div style={{paddingTop: 0, width: 150}}>
                        <span className={'input-label'} style={{textAlign: "left"}}>
                            Start Date
                        </span>
        </div>
        <input ref={startDateRef} type={"date"} defaultValue={currentDate}/>
    </div>

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
                            onChange={(e) => setProcess(e.value)}
                            className={'instrument-search-input-field'}

                        />
                    </div>

                    {process === 'valuation' ? startDateDiv: ''}

                    <div style={{paddingLeft: 10, paddingTop: 0, paddingBottom: 0}}>
                        <button className={'get-button'} onClick={() => props.run({
                            'url': 'calculate/valuation/',
                            params: {'date': startDateRef.current.value}
                        })}>Run
                        </button>
                    </div>
                </div>
            </Card>
        </div>

    );
};
export default CalculationOptions;