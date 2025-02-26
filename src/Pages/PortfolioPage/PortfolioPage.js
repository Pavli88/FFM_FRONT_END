import {useContext, useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import ServerContext from "../../context/server-context";
import PortfolioSettingsPage from "./SubPages/PortfolioSettings/PortfolioSettingsPage";
import PortfolioTransactionsPage from "./SubPages/PortfolioTransactions/PortfolioTransactionsPage";
import PortfolioHoldingsPage from "./SubPages/PortfolioHoldings/PortfolioHoldingsPage";
import PortfolioNavBar from "./PortfolioNavBar/PortfolioNavBar";
import PortfolioOverview from "./SubPages/PortfolioOverview/PortfolioOverview";
import PortfolioPageContext from "./context/portfolio-page-context";
import {PortfolioSidebarData} from "./PortfolioSidebarData";
import Sidebar from "../../components/Sidebar/Sidebar";
import './PortfolioPage.css'
import Card from "react-bootstrap/Card";
import {BsChevronLeft, BsChevronRight, BsPencil} from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import DateContext from "../../context/date-context";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";

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
    return (
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
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const fetchHoldingData = async () => {
        const response = await axios.post(server + 'portfolios/get/holding/', {
            date: currentDate,
            portfolio_code: [portfolioCode]
        })
        setCurrentHolding(response.data)
    };

    useEffect(() => {
        if (portfolioCode !== undefined) {
            fetchHoldingData()
        }
    }, [portfolioCode])

    const panel =
        <div>
            <div style={{
                // visibility: isMenuOpen ? "visible" : "hidden",
                opacity: isMenuOpen ? 1 : 0,
                transition: "visibility 0.3s, opacity 0.3s ease",
            }}>
                <PortfolioNavBar/>
            </div>

            <div style={{
                // visibility: isMenuOpen ? "visible" : "hidden",
                opacity: isMenuOpen ? 1 : 0,
                transition: "visibility 0.3s, opacity 0.3s ease",
                height: 300
            }}>
                <Sidebar sidebarData={PortfolioSidebarData}/>
            </div>
            <div style={{
                // visibility: isMenuOpen ? "visible" : "hidden",
                opacity: isMenuOpen ? 1 : 0,
                transition: "visibility 0.3s, opacity 0.3s ease",
                height: 465,
                paddingTop: 15
            }}>
                <div className={'card'} style={{height: '100%'}}>
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
                </div>
            </div>
        </div>

    const mainArea = <Switch>
        <Route path="/portfolio/overview">
            <PortfolioOverview/>
        </Route>
        <Route path="/portfolio/holdings">
            <PortfolioHoldingsPage/>
        </Route>
        <Route path="/portfolio/transactions">
            <PortfolioTransactionsPage server={server}/>
        </Route>
        <Route path="/portfolio/settings">
            <PortfolioSettingsPage/>
        </Route>
    </Switch>

    return (
        <PortfolioPageContext.Provider value={{
            portfolioCode: portfolioCode,
            savePortfolioCode: setPortfolioCode,
            portfolioData: selectedPortfolioData,
            savePortfolioData: setSelectedPortfolioData,
            currentHolding: currentHolding
        }}>
            <ContainerWithSideMenu panel={panel} mainArea={mainArea}/>
            <DescUpdateModal show={descModalStatus} server={server} portId={selectedPortfolioData.id}
                             hide={() => setDescModalStatus(false)}/>
        </PortfolioPageContext.Provider>
    );
};

export default PortfolioPage;