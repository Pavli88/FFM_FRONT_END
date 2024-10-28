import { useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {CSVLink} from "react-csv";
import HoldingsTable from "../../../../../components/Tables/HoldingTable";


const PortfolioHoldings = (props) => {
    const dateRef = useRef();

    const changeOneDay = (currentDate, side) => {
        let date = new Date(currentDate);
        date.setDate(date.getDate() + side); // Add one day
        const updatedDate = date.toISOString().split('T')[0];
        props.changeDate(updatedDate); // Trigger the parent function if needed
    };

    return (
        <div>
            <div style={{marginBottom: 10, paddingTop: 10}}>
                <div  style={{display: 'flex'}}>
                    <div>
                        <span className={'input-label'}>
                            Holdings
                        </span>
                    </div>
                    <div style={{marginLeft: 10}}>
                        <BsArrowLeft className={'icon'}
                                onClick={() => changeOneDay(dateRef.current.value, -1)}>Previous
                        </BsArrowLeft>
                    </div>
                    <div style={{marginLeft: 10}}>
                        <input type={'date'}
                               value={props.date}
                               ref={dateRef}
                               onChange={(e) => props.changeDate(e.target.value)}/>
                    </div>
                    <div style={{marginLeft: 10}}>
                        <BsArrowRight className={'icon'}
                                onClick={() => changeOneDay(dateRef.current.value, 1)}>Next
                        </BsArrowRight>
                    </div>
                    <div style={{marginLeft: 10, padding: 5}}>
                        <CSVLink data={props.data}>Download</CSVLink>
                    </div>
                </div>
            </div>
            <HoldingsTable data={props.data}/>

        </div>
    );
};

export default PortfolioHoldings;

