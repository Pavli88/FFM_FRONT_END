import PortfolioTradeRouting from "./PortfolioTradeRouting/PortfolioTradeRouting";
import {useContext, useEffect, useState} from "react";
import ServerContext from "../../../../context/server-context";
import PortfolioPageContext from "../../context/portfolio-page-context";
import './PortfolioSettingsPage.css'
import {Nav, Card} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import CardWithHeader from "../../../../Widgets/Charts/CardWithHeader";
import axios from "axios";

const PortfolioSettingsPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const data = useContext(PortfolioPageContext).portfolioData;
    const [postRequest, setPostRequest] = useState({});
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
        console.log(postRequest)
        axios.post(server + 'portfolios/update/portfolio/', postRequest)
            .then(data => alert(data.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

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
                                        placeholder={data[0]['portfolio_name']}
                                        onChange={(e) => setPostRequest({...postRequest, portfolio_name: e.target.value})}
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
                                        placeholder={data[0]['portfolio_code']}
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
                                    <Form.Control style={{height: '100%'}}
                                                  as={'select'}
                                                  value={postRequest.currency}
                                                  onChange={(e) => setPostRequest({
                                                      ...postRequest,
                                                      currency: e.target.value
                                                  })}>
                                        <option value={'USD'}>USD</option>
                                        <option value={'EUR'}>EUR</option>
                                    </Form.Control>
                                </div>
                            </div>

                            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                <div className={'portfolio-settings-name-field'}>
                                    <Nav.Link href="#" disabled>
                                        Type
                                    </Nav.Link>
                                </div>
                                <div style={{width: '100%'}}>
                                    <Form.Control style={{height: '100%'}}
                                                  as={'select'}
                                                  value={postRequest.portfolio_type}
                                                  onChange={(e) => setPostRequest({
                                                      ...postRequest,
                                                      portfolio_type: e.target.value
                                                  })}>
                                        <option value={'Trade'}>Trade</option>
                                        <option value={'Savings'}>Savings</option>
                                        <option value={'Investment'}>Investment</option>
                                        <option value={'Test'}>Test</option>
                                    </Form.Control>
                                </div>
                            </div>

                            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                <div className={'portfolio-settings-name-field'}>
                                    <Nav.Link href="#" disabled>
                                        Status
                                    </Nav.Link>
                                </div>
                                <div style={{width: '100%'}}>
                                    <Form.Control style={{height: '100%'}}
                                                  as={'select'}
                                                  value={postRequest.status}
                                                  onChange={(e) => setPostRequest({
                                                      ...postRequest,
                                                      status: e.target.value
                                                  })}>
                                        <option value={'active'}>Active</option>
                                        <option value={'inactive'}>Inactive</option>
                                    </Form.Control>
                                </div>
                            </div>

                            <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                    <div className={'portfolio-settings-name-field'}>
                                        <Nav.Link href="#" disabled>
                                            Robot Trading
                                        </Nav.Link>
                                    </div>
                                    <div style={{width: '100%'}}>
                                        <Form.Control style={{height: '100%'}}
                                                      as={'select'}
                                                      value={postRequest.is_automated}
                                                      onChange={(e) => setPostRequest({
                                                          ...postRequest,
                                                          is_automated: e.target.value
                                                      })}>
                                            <option value={'1'}>Allowed</option>
                                            <option value={'0'}>Not Allowed</option>
                                        </Form.Control>
                                    </div>
                            </div>

                            <InputField name={'Multi Currency'} data={data[0]['currency']} disabled={false}/>
                        </CardWithHeader>
                    </div>
                    <div style={{width: '100%', paddingLeft: 15}}>
                        <div style={{height: 200}}>
                            <CardWithHeader headerContent={'Ownership'}>
                                <InputField name={'Owner'} data={data[0]['owner']} disabled={false}/>
                                <InputField name={'Manager'} data={data[0]['manager']} disabled={false}/>

                                <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                                    <div className={'portfolio-settings-name-field'}>
                                        <Nav.Link href="#" disabled>
                                            Public
                                        </Nav.Link>
                                    </div>
                                    <div style={{width: '100%'}}>
                                        <Form.Control style={{height: '100%'}}
                                                      as={'select'}
                                                      value={postRequest.public}
                                                      onChange={(e) => setPostRequest({
                                                          ...postRequest,
                                                          public: e.target.value
                                                      })}>
                                            <option value={1}>Public</option>
                                            <option value={0}>Private</option>
                                        </Form.Control>
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
                                            value={postRequest['creation_date']}
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
                                            value={postRequest['inception_date']}
                                            onChange={(e) => setPostRequest({
                                                      ...postRequest,
                                                      inception_date: e.target.value
                                                  })}
                                        />
                                    </div>
                                </div>

                                <InputField name={'Terminated'} data={data[0]['termination_date']} disabled={false}
                                            style={'date'}/>
                            </CardWithHeader>
                        </div>


                    </div>
                </div>
                <div style={{display: 'flex', paddingTop: 15}}>
                    <div >
                        <CardWithHeader headerContent={'Risk'}>
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
                                        value={postRequest['creation_date']}
                                        disabled
                                    />
                                </div>
                            </div>
                            <InputField name={'Inception'} data={data[0]['inception_date']} disabled={false}
                                        style={'text'}/>
                            <InputField name={'Terminated'} data={data[0]['termination_date']} disabled={false}
                                        style={'text'}/>
                        </CardWithHeader>
                    </div>
                    <div style={{width: '100%', paddingLeft: 15}}>
                        <CardWithHeader headerContent={'Valuation'}>
                            <InputField name={'Created'} data={data[0]['creation_date']} disabled={true}
                                        style={'text'}/>
                            <InputField name={'Inception'} data={data[0]['inception_date']} disabled={false}
                                        style={'text'}/>
                            <InputField name={'Terminated'} data={data[0]['termination_date']} disabled={false}
                                        style={'text'}/>
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