import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Nav} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PortfolioPageContext from "../context/portfolio-page-context";
import {useContext, useRef, useState} from "react";
import './PortfolioNavBar.css'
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import ServerContext from "../../../context/server-context";
import { BsArrowRepeat } from 'react-icons/bs';

const PortfolioNavBar = (props) => {
    const server = useContext(ServerContext)['server'];
    const savePortfolioData = useContext(PortfolioPageContext).savePortfolioData
    const savePortfolioCode = useContext(PortfolioPageContext).savePortfolioCode
    const [loadStatus, setLoadStatus] = useState(false);
    const [textAnimation, setTextAnimation] = useState(0);
    const portfolioRef = useRef();

    const fetchPortfolioData = async() => {
        const response = await axios.get(server + 'portfolios/get/portfolios/', {
            params: {
                portfolio_code: portfolioRef.current.value,
            }
        })
        if (response.data.length !== 0){
            savePortfolioCode(portfolioRef.current.value)
            savePortfolioData(response.data)
        }
        else{
            alert('Portfolio Code Does Not Exists!')
        }
        console.log(response.data)
    };

    const loadingButton = <div style={{position: "absolute", right: 5, height: '100%'}}>
        <button style={{border: "none", height: '100%', borderRadius: 8}} disabled>
            <div style={{display: "flex"}}>
                <div>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                </div>
                <div style={{padding: 2}}>
                    Loading...
                </div>
            </div>
        </button>
    </div>

    return (
        <div className={'portnav-bar-main'}>
            <Card>
                <div style={{paddingLeft: 15, paddingTop: 5}}>
                    <span className={'input-label'} style={{textAlign: "left"}}>
                        Portfolio Code
                    </span>
                </div>
                <div style={{display: "flex", paddingLeft: 15, paddingTop: 5, paddingBottom: 10, paddingRight: 15}}>
                    <div style={{}}>
                        <input
                            type={'text'}
                            ref={portfolioRef}
                        />
                    </div>
                    <div style={{paddingLeft: 10}}>
                        <button onClick={(e) => fetchPortfolioData()}
                                className={'get-button'}
                                style={{width: 40}}><BsArrowRepeat
                        /></button>
                    </div>
                </div>

                {/*<Col md="auto">*/}
                {/*    <Button onClick={() => setTextAnimation(1)}>Get</Button>*/}
                {/*</Col>*/}
                {/*<div className={'portfolio-result-animation portfolio-result-found'}*/}
                {/*     status={textAnimation}*/}
                {/*     onAnimationEnd={() => setTextAnimation(0)}>*/}
                {/*    test*/}
                {/*</div>*/}
                {loadStatus ? loadingButton : ''}
            </Card>
        </div>
    )
};
export default PortfolioNavBar;