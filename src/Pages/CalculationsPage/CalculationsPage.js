import CalculationOptions from "./CalculationOptions/CalculationOptions";
import CalculationPortfoliosTable from "./CalculationPortfoliosTable/CalculationPortfoliosTable";
import CalculationResponseTable from "./CalculationResponseTable/CalculationResponseTable";
import ServerContext from "../../context/server-context";
import CalculationContext from "./CalculationPageContext/calculation-context";
import DateContext from "../../context/date-context";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import PortfolioContext from "../../context/portfolio-context";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";

const TaskComponent = () => {
    const server = useContext(ServerContext)['server'];
    const [taskId, setTaskId] = useState(null);
    const [taskStatus, setTaskStatus] = useState(null);

    // Function to start the Celery task
    const startTask = async () => {
        try {
            const response = await fetch(`${server}start-task/`);
            const data = await response.json();
            setTaskId(data.task_id);
            setTaskStatus("Task started...");
        } catch (error) {
            console.error("Error starting task:", error);
        }
    };

    // Function to check task status
    const checkTaskStatus = async () => {
        if (!taskId) return;

        try {
            const response = await fetch(`${server}task-status/${taskId}/`);
            const data = await response.json();
            setTaskStatus(`Status: ${data.status}, Result: ${data.result}`);
        } catch (error) {
            console.error("Error checking task status:", error);
        }
    };

    return (
        <div>
            <button onClick={startTask}>Start Task</button>
            {taskId && (
                <div>
                    <p>Task ID: {taskId}</p>
                    <p>{taskStatus}</p>
                    <button onClick={checkTaskStatus}>Check Task Status</button>
                </div>
            )}
        </div>
    );
};

const CeleryStatus = () => {
    const server = useContext(ServerContext)['server'];
    const [status, setStatus] = useState("Checking...");
    const [workers, setWorkers] = useState([]);

    const checkStatus = async () => {
        try {
            const response = await fetch(`${server}celery-status/`);
            const data = await response.json();
            setStatus(data.status);
            setWorkers(data.workers);
        } catch (error) {
            setStatus("stopped");
            setWorkers([]);
        }
    };

    return (
        <div>
            <button onClick={checkStatus}>Check Celery Status</button>
            <h3>Celery Worker Status: {status.toUpperCase()}</h3>
            {workers.length > 0 ? (
                <ul>
                    {workers.map((worker, index) => (
                        <li key={index}>{worker}</li>
                    ))}
                </ul>
            ) : (
                <p>No active workers</p>
            )}
        </div>
    );
};

const CalculationsPage = () => {
    const server = useContext(ServerContext)['server'];
    const portfolios = useContext(PortfolioContext).portfolios;
    const [startDate, setStartDate] = useState(useContext(DateContext)['currentDate']);
    const [endDate, setEndDate] = useState(useContext(DateContext)['currentDate']);
    const [selectedPortfolios, setSelectedPortfolios] = useState([]);
    const [calcResponse, setCalcResponse] = useState([{}]);
    const [showModal, setShowModal] = useState(false);

    const runCalculation = async (parameters) => {
        console.log(parameters)
        if (parameters.url === undefined) {
            alert('Please select a process')
        } else {
            if (selectedPortfolios.length === 0) {
                alert('Select portfolios for calculation')
            } else {
                // setShowModal(true)
                const response = await axios.post(server + parameters.url, {
                        ...parameters.params,
                        portfolios: selectedPortfolios
                    }
                )
                setCalcResponse(response.data)
                setShowModal(false)
            }
        }
    };

    const panel = <div>
        <CalculationPortfoliosTable data={portfolios}/>
    </div>

    const mainArea = <div style={{padding: 20}}>
        <CalculationOptions run={runCalculation}/>
        {/*<TaskComponent/>*/}
        {/*<CeleryStatus/>*/}
        <div >
            <CalculationResponseTable data={calcResponse}/>
        </div>
    </div>

    return (
        <CalculationContext.Provider value={{
            selectedPortfolios: selectedPortfolios,
            saveSelectedPortfolios: setSelectedPortfolios,
            startDate: startDate,
            saveStartDate: setStartDate,
            endDate: endDate,
            saveEndDate: setEndDate,
        }}>
            <ContainerWithSideMenu panel={panel} mainArea={mainArea} sidebarWidth={"500px"}/>
        </CalculationContext.Provider>
    );
};
export default CalculationsPage;