import PortfolioTradeRouting from "./PortfolioTradeRouting/PortfolioTradeRouting";
import {useContext, useEffect, useState} from "react";
import ServerContext from "../../../../context/server-context";
import PortfolioPageContext from "../../context/portfolio-page-context";
import './PortfolioSettingsPage.css'
import {Nav, Card} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import CardWithHeader from "../../../../Widgets/Charts/CardWithHeader";
import axios from "axios";
import Select from "react-select";

const PortfolioSettingsPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    const [portfolioData, setPortfolioData] = useState({})

    useEffect(() => {
        axios.get(server + 'portfolios/get/portfolios/', {
            params: {
                portfolio_code: portfolioCode,
            }
        })
            .then(response => response.data === undefined ? '': setPortfolioData(response.data[0]))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    }, [portfolioCode])

    const InputField = (props) => {
        return (
            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                <div className={'portfolio-settings-name-field'}>
                    <Nav.Link href="#" disabled>
                        {props.name}
                    </Nav.Link>
                </div>
                <div style={{width: '100%'}}>
                    <Form.Control
                        type={props.style}
                        style={{height: '100%'}}
                        placeholder={props.data}
                        disabled={props.disabled}
                    />
                </div>
            </div>
        )
    };

    const savePortfolioData = () => {
        axios.post(server + 'portfolios/update/portfolio/', portfolioData)
            .then(data => alert(data.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const currencyOptions = [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'HUF', label: 'HUF' },
    ]

    return (
        <div className={'portfolio-settings-page-container'}>
            <div style={{width: '50%'}}>
                <div style={{display: 'flex'}}>
                    <div style={{width: '100%'}}>
                        <CardWithHeader headerContent={'General'}>

                            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                <div className={'portfolio-settings-name-field'}>
                                    <Nav.Link href="#" disabled>
                                        Name
                                    </Nav.Link>
                                </div>
                                <div style={{width: '100%'}}>
                                    <Form.Control
                                        type={'text'}
                                        style={{height: '100%'}}
                                        value={portfolioData.portfolio_name}
                                        onChange={(e) => setPortfolioData({...portfolioData, portfolio_name: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                <div className={'portfolio-settings-name-field'}>
                                    <Nav.Link href="#" disabled>
                                        Code
                                    </Nav.Link>
                                </div>
                                <div style={{width: '100%'}}>
                                    <Form.Control
                                        type={'text'}
                                        style={{height: '100%'}}
                                        placeholder={portfolioData.portfolio_code}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                <div className={'portfolio-settings-name-field'}>
                                    <Nav.Link href="#" disabled>
                                        Base Currency
                                    </Nav.Link>
                                </div>
                                <div style={{width: '100%'}}>
                                    <Select style={{height: '100%'}}
                                            value={portfolioData.currency}
                                            options={currencyOptions}
                                            placeholder={portfolioData.currency}
                                            onChange={(e) => setPortfolioData({...portfolioData, currency: e.value})}
                                    >
                                    </Select>
                                </div>
                            </div>

                            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                <div className={'portfolio-settings-name-field'}>
                                    <Nav.Link href="#" disabled>
                                        Type
                                    </Nav.Link>
                                </div>
                                <div style={{width: '100%'}}>
                                    <Select style={{height: '100%'}}
                                            value={portfolioData.portfolio_type}
                                            options={[
                                                {value: 'Trade', label: 'Trade'},
                                                {value: 'Savings', label: 'Savings'},
                                                {value: 'Investment', label: 'Investment'},
                                                {value: 'Test', label: 'Test'},
                                            ]}
                                            placeholder={portfolioData.portfolio_type}
                                            onChange={(e) => setPortfolioData({
                                                ...portfolioData,
                                                portfolio_type: e.value
                                            })}
                                    >
                                    </Select>
                                </div>
                            </div>

                            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                <div className={'portfolio-settings-name-field'}>
                                    <Nav.Link href="#" disabled>
                                        Status
                                    </Nav.Link>
                                </div>
                                <div style={{width: '100%'}}>
                                    <Select style={{height: '100%'}}
                                            value={portfolioData.status === 'active' ? 'Active': 'Inactive'}
                                            options={[
                                                { value: 'active', label: 'Active' },
                                                { value: 'inactive', label: 'Inactive' },
                                            ]}
                                            placeholder={portfolioData.status === 'active' ? 'Active': 'Inactive'}
                                            onChange={(e) => setPortfolioData({...portfolioData, status: e.value})}
                                    >
                                    </Select>
                                </div>
                            </div>

                            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                    <div className={'portfolio-settings-name-field'}>
                                        <Nav.Link href="#" disabled>
                                            Robot Trading
                                        </Nav.Link>
                                    </div>
                                <div style={{width: '100%'}}>
                                    <Select style={{height: '100%'}}
                                            value={portfolioData.is_automated === 1 ? 'Enabled': 'Disabled'}
                                            options={[
                                                {value: 1, label: 'Enabled'},
                                                {value: 0, label: 'Disabled'},
                                            ]}
                                            placeholder={portfolioData.is_automated === 1 ? 'Enabled': 'Disabled'}
                                            onChange={(e) => setPortfolioData({
                                                ...portfolioData,
                                                is_automated: e.value
                                            })}
                                    >
                                    </Select>
                                </div>
                            </div>

                            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                <div className={'portfolio-settings-name-field'}>
                                    <Nav.Link href="#" disabled>
                                        Public
                                    </Nav.Link>
                                </div>
                                <div style={{width: '100%'}}>
                                    <Select style={{height: '100%'}}
                                            value={portfolioData.public === 1 ? 'Public': 'Private'}
                                            options={[
                                                {value: 1, label: 'Public'},
                                                {value: 0, label: 'Private'},
                                            ]}
                                            placeholder={portfolioData.public === 1 ? 'Public': 'Private'}
                                            onChange={(e) => setPortfolioData({
                                                ...portfolioData,
                                                public: e.value
                                            })}
                                    >
                                    </Select>
                                </div>
                            </div>

                        </CardWithHeader>
                    </div>
                    <div style={{width: '100%', paddingLeft: 15}}>
                        <div style={{height: 200, paddingBottom: 15}}>
                            <CardWithHeader headerContent={'Ownership'}>

                                <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                    <div className={'portfolio-settings-name-field'}>
                                        <Nav.Link href="#" disabled>
                                            Owner
                                        </Nav.Link>
                                    </div>
                                    <div style={{width: '100%'}}>
                                        <Form.Control
                                            type={'text'}
                                            style={{height: '100%'}}
                                            value={portfolioData.owner}
                                            onChange={(e) => setPortfolioData({
                                                ...portfolioData,
                                                owner: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>

                                <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                    <div className={'portfolio-settings-name-field'}>
                                        <Nav.Link href="#" disabled>
                                            Manager
                                        </Nav.Link>
                                    </div>
                                    <div style={{width: '100%'}}>
                                        <Form.Control
                                            type={'text'}
                                            style={{height: '100%'}}
                                            value={portfolioData.manager}
                                            onChange={(e) => setPortfolioData({
                                                ...portfolioData,
                                                manager: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>

                            </CardWithHeader>
                        </div>

                        <div style={{height: 200}}>
                            <CardWithHeader headerContent={'Dates'}>
                                <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                    <div className={'portfolio-settings-name-field'}>
                                        <Nav.Link href="#" disabled>
                                            Created
                                        </Nav.Link>
                                    </div>
                                    <div style={{width: '100%'}}>
                                        <Form.Control
                                            type={'date'}
                                            style={{height: '100%'}}
                                            value={portfolioData.creation_date}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                    <div className={'portfolio-settings-name-field'}>
                                        <Nav.Link href="#" disabled>
                                            Inception
                                        </Nav.Link>
                                    </div>
                                    <div style={{width: '100%'}}>
                                        <Form.Control
                                            type={'date'}
                                            style={{height: '100%'}}
                                            value={portfolioData.inception_date}
                                            onChange={(e) => setPortfolioData({
                                                      ...portfolioData,
                                                      inception_date: e.target.value
                                                  })}
                                        />
                                    </div>
                                </div>

                                <InputField name={'Terminated'} data={portfolioData.termination_date} disabled={false}
                                            style={'date'}/>
                            </CardWithHeader>
                        </div>


                    </div>
                </div>
                <div style={{display: 'flex', paddingTop: 15}}>
                    <div >
                        <CardWithHeader headerContent={'Risk'}>

                        </CardWithHeader>
                    </div>
                    <div style={{width: '100%', paddingLeft: 15}}>
                        <CardWithHeader headerContent={'Valuation'}>

                        </CardWithHeader>
                    </div>
                </div>
                <div style={{height: '200px', paddingTop: 15}}>
                    <div style={{padding: 5}}>
                        <button className={'save-button'} onClick={savePortfolioData}>Save</button>
                    </div>
                    <div style={{padding: 5}}>
                        <button className={'terminate-button'}>Terminate</button>
                    </div>
                    <div style={{padding: 5}}>
                        <button className={'delete-button'}>Delete</button>
                    </div>
                </div>
            </div>
            <div style={{width: '50%'}}>
                <PortfolioTradeRouting server={server}/>
            </div>

        </div>
    );
};

export default PortfolioSettingsPage;