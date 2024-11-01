import {useContext, useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import ServerContext from "../../context/server-context";
import PortfolioDashBoardPage from "./SubPages/PortfolioDashboard/PortfolioDashBoardPage";
import PortfolioRiskPage from "./SubPages/PortfolioRisk/PortfolioRiskPage";
import PortfolioSettingsPage from "./SubPages/PortfolioSettings/PortfolioSettingsPage";
import PortfolioTransactionsPage from "./SubPages/PortfolioTransactions/PortfolioTransactionsPage";
import PortfolioDataImport from "./SubPages/PortfolioImport/PortfolioDataImport";
import PortfolioReturnPage from "./SubPages/PortfolioReturn/PortfolioReturnPage";
import PortfolioNavBar from "./PortfolioNavBar/PortfolioNavBar";
import PortfolioPageContext from "./context/portfolio-page-context";
import {PortfolioSidebarData} from "./PortfolioSidebarData";
import Sidebar from "../../components/Sidebar/Sidebar";
import './PortfolioPage.css'
import Card from "react-bootstrap/Card";
import { BsPencil } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import DateContext from "../../context/date-context";

const DescUpdateModal = (props) => {
    const [newDesc, setNewDesc] = useState('');
    const updateDescription = async (data) => {
        const response = await axios.post(props.server + 'portfolios/update/portfolio/', {
            description: newDesc,
            id: props.portId
        })
        alert('Description is updated')
        props.hide()
    }
    return(
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Body>
                <textarea style={{width: '100%', height: 300}} onChange={(e) => setNewDesc(e.target.value)}/>
                <p style={{margin: 0, marginTop: 5}}>Length: {newDesc.length}</p>
            </Modal.Body>
            <Modal.Footer>
                <div style={{width: '100%'}}>
                    <button className={'normal-button'} onClick={updateDescription}>
                        Save
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
};

const PortfolioPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const currentDate = useContext(DateContext).currentDate;
    const [portfolioCode, setPortfolioCode] = useState();
    const [selectedPortfolioData, setSelectedPortfolioData] = useState([{}]);
    const [showImportModal, setShowImportModal] = useState(false);
    const [descModalStatus, setDescModalStatus] = useState(false);
    const [currentHolding, setCurrentHolding] = useState({});

    const fetchHoldingData = async() => {
        const response = await axios.get(server + 'portfolios/get/holding/', {
            params: {
                date: currentDate,
                portfolio_code: portfolioCode
            }
        })
        setCurrentHolding(response.data)
    };

    useEffect(() => {
        if (portfolioCode !== undefined) {
            fetchHoldingData()
        }
    }, [portfolioCode])

    return (
        <PortfolioPageContext.Provider value={{
            portfolioCode: portfolioCode,
            savePortfolioCode: setPortfolioCode,
            portfolioData: selectedPortfolioData,
            savePortfolioData: setSelectedPortfolioData,
            currentHolding: currentHolding
        }}>
            <div className={'page-container'}>
                <div className={'page-subContainer'}>
                    <div style={{width: '15%', paddingLeft: 15}}>
                        <PortfolioNavBar/>
                        <div style={{height:300}}>
                            <Sidebar sidebarData={PortfolioSidebarData}/>
                        </div>
                        <div style={{height: 465, paddingTop: 15}}>
                            <Card style={{height: '100%'}}>
                                <Card.Header>
                                    <div style={{display: 'flex'}}>
                                        <div>
                                            <span>Description</span>
                                        </div>
                                        <div style={{position: "absolute", right: 5}}>
                                            <button className={'get-button'} onClick={() => setDescModalStatus(true)}>
                                                <BsPencil></BsPencil>
                                            </button>
                                        </div>
                                    </div>
                                </Card.Header>
                                <p style={{padding: 15}}>
                                    {selectedPortfolioData.description}
                                </p>
                            </Card>
                        </div>
                    </div>
                    <div style={{width: '85%'}}>
                        <div style={{
                            display: "flex",
                            paddingTop: 15,
                            paddingLeft: 15,
                            paddingBottom: 0,
                            fontSize: 20,
                            fontWeight: "bold"
                        }}>
                            <span style={{paddingLeft: 5}}>{selectedPortfolioData.portfolio_name}</span>
                            <span style={{paddingLeft: 5, paddingTop:6, fontSize:14}}>{selectedPortfolioData.portfolio_type}</span>
                            <span style={{paddingLeft: 5, paddingTop:6, fontSize:14 }}>{selectedPortfolioData.currency}</span>
                            <span style={{paddingLeft: 5, paddingTop:6, fontSize:14, color: selectedPortfolioData.status === 'Not Funded' ? 'red': selectedPortfolioData.status === 'Funded' ? 'green': 'orange'}}>{selectedPortfolioData.status}</span>
                        </div>

                        <Switch>
                            <Route path="/portfolio/dashboard">
                                <PortfolioDashBoardPage server={server} portfolioData={selectedPortfolioData}/>
                            </Route>
                            <Route path="/portfolio/transactions">
                                <PortfolioTransactionsPage server={server}/>
                            </Route>
                            <Route path="/portfolio/risk">
                                <PortfolioRiskPage server={server}/>
                            </Route>
                            <Route path="/portfolio/return">
                                <PortfolioReturnPage/>
                            </Route>
                            <Route path="/portfolio/settings">
                                <PortfolioSettingsPage/>
                            </Route>
                        </Switch>
                    </div>
                </div>
                <PortfolioDataImport show={showImportModal} hide={() => setShowImportModal(false)} server={server}/>
            </div>
            <DescUpdateModal show={descModalStatus} server={server} portId={selectedPortfolioData.id} hide={() => setDescModalStatus(false)}/>
        </PortfolioPageContext.Provider>
    );
};

export default PortfolioPage;