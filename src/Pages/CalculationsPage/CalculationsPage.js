import CalculationOptions from "./CalculationOptions/CalculationOptions";
import PortfolioSelection from "./CalculationPortfoliosTable/PortfolioSelection";
import ExceptionsTable from "./ExceptionsTable/ExceptionsTable";
import CalculationContext from "./CalculationPageContext/calculation-context";
import DateContext from "../../context/date-context";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import PortfolioContext from "../../context/portfolio-context";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";
import ProcessAudit from "./ProcessAudit/ProcessAudit";
import fetchAPI from "../../config files/api";
import './CalculationPage.css'
import WsContext from "../../context/ws-context";

const CalculationsPage = () => {
    const portfolios = useContext(PortfolioContext).portfolios;
    const [startDate, setStartDate] = useState(useContext(DateContext)['currentDate']);
    const [endDate, setEndDate] = useState(useContext(DateContext)['currentDate']);
    const [selectedPortfolios, setSelectedPortfolios] = useState([]);
    const [selectedAuditIds, setSelectedAuditIds] = useState([]);
    const [exceptions, setExceptions] = useState([]);
    const {setProcessRunning} =useContext(WsContext);

    const runCalculation = async (parameters) => {
        setProcessRunning(true);
        if (parameters.url === undefined) {
            alert('Please select a process')
        } else {
            if (selectedPortfolios.length === 0) {
                alert('Select portfolios for calculation')
            } else {
                // setShowModal(true)
                const response = await fetchAPI.post(parameters.url, {
                        ...parameters.params,
                        portfolios: selectedPortfolios
                    }
                )
            }
        }
    };

    const fetchExceptions = async () => {
        try {
            const response = await fetchAPI.post('/calculate/exceptions/',
                {
                    ids: selectedAuditIds
                });
            setExceptions(response.data.data);
        } catch (err) {
            console.error('Failed to fetch exception records:', err);
        }
    };

    useEffect(() => {
        fetchExceptions()
    }, [selectedAuditIds]);


    const panel = <div>
        <PortfolioSelection data={portfolios}/>
    </div>

    const mainArea = <div style={{padding: 20}}>

        <div className="card">
            <div className={'card-header'} style={{padding: 10}}>
                  <label style={{fontSize: "1.2rem", fontWeight: "bold"}}>Selected Portfolios</label>
            <div className="portfolio-tags-wrapper">
                {selectedPortfolios.map((code) => (
                    <span key={code} className="portfolio-tag">
        {code}
      </span>
                ))}
            </div>
            </div>
        </div>

        <div style={{paddingTop: 10}}>
            <CalculationOptions run={runCalculation}/>
        </div>

        {/*<TaskComponent/>*/}
        {/*<CeleryStatus/>*/}

        <div style={{paddingTop: 10}}>
             <ProcessAudit portfolioCodes={selectedPortfolios}/>
        </div>

        <div style={{paddingTop: 10}}>
            <ExceptionsTable data={exceptions}/>
        </div>


    </div>

    return (
        <CalculationContext.Provider value={{
            selectedAuditIds: selectedAuditIds,
            saveSelectedAuditIds: setSelectedAuditIds,
            selectedPortfolios: selectedPortfolios,
            saveSelectedPortfolios: setSelectedPortfolios,
            startDate: startDate,
            saveStartDate: setStartDate,
            endDate: endDate,
            saveEndDate: setEndDate,
        }}>
            <ContainerWithSideMenu panel={panel} mainArea={mainArea} sidebarWidth={"600px"}/>
        </CalculationContext.Provider>
    );
};
export default CalculationsPage;