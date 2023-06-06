import CalculationOptions from "./CalculationOptions/CalculationOptions";
import CalculationPortfoliosTable from "./CalculationPortfoliosTable/CalculationPortfoliosTable";
import ServerContext from "../../context/server-context";
import CalculationContext from "./CalculationPageContext/calculation-context";
import DateContext from "../../context/date-context";
import {useContext, useEffect, useState} from "react";
import axios from "axios";

const CalculationsPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const [startDate, setStartDate] = useState(useContext(DateContext)['currentDate']);
    const [endDate, setEndDate] = useState(useContext(DateContext)['currentDate']);
    const [selectedDate, setSelectedDate] = useState(useContext(DateContext)['currentDate']);
    const [selectedPortfolios, setSelectedPortfolios] = useState([]);
    const [calcDate, setCalDate] = useState(useContext(DateContext)['currentDate']);
    const [portfolios, setPortfolios] = useState([{}]);

    const fetchPortfolios = async() => {
        const response = await axios.get(server + 'portfolios/get/portfolios/'
        )
        setPortfolios(response.data)
    };

    useEffect(() => {
        fetchPortfolios()
    }, [])

    return (
        <CalculationContext.Provider value={{
            selectedPortfolios: selectedPortfolios,
            saveSelectedPortfolios: setSelectedPortfolios,
            currentDate: calcDate,
            saveCalcDate: setCalDate,
            startDate: startDate,
            saveStartDate: setStartDate,
            endDate: endDate,
            saveEndDate: setEndDate,
            selectedDate: selectedDate,
            saveSelectedDate: setSelectedDate,
        }}>
            <div className={'page-container'}>
                <CalculationOptions/>
                <div>
                    <div style={{paddingBottom: 15, paddingLeft: 15, paddingRight: 15, width: '30%', height: '100%'}}>
                        <CalculationPortfoliosTable data={portfolios}/>
                    </div>

                    <div>

                    </div>
                </div>
            </div>
        </CalculationContext.Provider>
    );
};
export default CalculationsPage;