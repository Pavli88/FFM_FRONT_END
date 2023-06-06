import Card from "react-bootstrap/Card";
import CalculationContext from "../CalculationPageContext/calculation-context";
import {useContext, useRef, useState} from "react";
import axios from "axios";
import Select from "react-select";

const CalculationOptions = (props) => {

    const runCalculation = () => {
        console.log('run calc')
    };

    return(
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
                                {value: 'Valuation', label: 'Valuation'}
                            ]}
                            isClearable
                            // onChange={(e) => e === null ? setSelectedGroup([]) : setSelectedGroup(e)}
                            className={'instrument-search-input-field'}

                        />
                    </div>

                    <div style={{paddingLeft: 10, paddingTop: 0, paddingBottom: 0}}>
                        <button className={'get-button'} onClick={runCalculation}>Run</button>
                    </div>
                </div>
        </Card>
        </div>

    );
};
export default CalculationOptions;