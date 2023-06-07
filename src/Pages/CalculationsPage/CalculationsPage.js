import CalculationOptions from "./CalculationOptions/CalculationOptions";
import CalculationPortfoliosTable from "./CalculationPortfoliosTable/CalculationPortfoliosTable";
import CalculationResponseTable from "./CalculationResponseTable/CalculationResponseTable";
import ServerContext from "../../context/server-context";
import CalculationContext from "./CalculationPageContext/calculation-context";
import DateContext from "../../context/date-context";
import {useContext, useEffect, useState} from "react";
import axios from "axios";

const CalculationsPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const [startDate, setStartDate] = useState(useContext(DateContext)['currentDate']);
    const [endDate, setEndDate] = useState(useContext(DateContext)['currentDate']);
    const [selectedPortfolios, setSelectedPortfolios] = useState([]);
    const [portfolios, setPortfolios] = useState([{}]);
    const [calcResponse, setCalcResponse] = useState([{}]);

    const fetchPortfolios = async() => {
        const response = await axios.get(server + 'portfolios/get/portfolios/'
        )
        setPortfolios(response.data)
    };

    useEffect(() => {
        fetchPortfolios()
    }, [])

    const runCalculation = async(parameters) => {
        const response = await axios.post(server + parameters.url, {...parameters.params,
            portfolios: selectedPortfolios
            }
        )
        setCalcResponse(response.data)
    };

    return (
        <CalculationContext.Provider value={{
            selectedPortfolios: selectedPortfolios,
            saveSelectedPortfolios: setSelectedPortfolios,
            startDate: startDate,
            saveStartDate: setStartDate,
            endDate: endDate,
            saveEndDate: setEndDate,
        }}>
            <div className={'page-container'}>
                <CalculationOptions run={runCalculation}/>
                <div style={{display: "flex"}}>
                    <div style={{paddingBottom: 15, paddingLeft: 15, paddingRight: 15, width: '30%', height: '100%'}}>
                        <CalculationPortfoliosTable data={portfolios} />
                    </div>

                    <div style={{paddingBottom: 15, paddingRight: 15, width: '70%', height: '100%'}}>
                        <CalculationResponseTable data={calcResponse}/>
                    </div>
                </div>
            </div>
        </CalculationContext.Provider>
    );
};
export default CalculationsPage;