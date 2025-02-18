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

const CalculationsPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const [startDate, setStartDate] = useState(useContext(DateContext)['currentDate']);
    const [endDate, setEndDate] = useState(useContext(DateContext)['currentDate']);
    const [selectedPortfolios, setSelectedPortfolios] = useState([]);
    const [portfolios, setPortfolios] = useState([{}]);
    const [calcResponse, setCalcResponse] = useState([{}]);
    const [showModal, setShowModal] = useState(false);

    const fetchPortfolios = async() => {
        const response = await axios.get(server + 'portfolios/get/portfolios/'
        )
        setPortfolios(response.data)
    };

    useEffect(() => {
        fetchPortfolios()
    }, [])

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
                <TaskComponent/>
                <CeleryStatus/>
                <div style={{display: "flex", height: 800}}>

                    <div style={{paddingBottom: 15, paddingLeft: 15, paddingRight: 15, width: '30%', height: '100%'}}>
                        <span className="input-label"
                              style={{fontSize: "1.2rem", fontWeight: "bold"}}>Porftolios</span>
                        <CalculationPortfoliosTable data={portfolios}/>
                    </div>

                    <div style={{paddingBottom: 15, paddingRight: 15, width: '70%', height: '100%'}}>
                    <CalculationResponseTable data={calcResponse}/>
                    </div>
                </div>
            </div>
            <Modal show={showModal}>
                <Modal.Body>
                    <div style={{display: "flex"}}>
                    <Spinner
                        as="span"
                        animation="border"
                        role="primary"
                        aria-hidden="true"
                    />
                        <div className={'input-label'}>
                            Calculating...
                        </div>
                </div>

                </Modal.Body>
            </Modal>
        </CalculationContext.Provider>
    );
};
export default CalculationsPage;