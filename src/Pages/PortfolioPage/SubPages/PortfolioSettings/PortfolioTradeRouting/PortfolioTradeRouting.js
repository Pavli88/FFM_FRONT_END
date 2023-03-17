import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {BiX} from "react-icons/bi";
import {useState} from "react";
import Table from "react-bootstrap/Table";

import PortfolioTradeRoutingNew from "./PortfolioTradeRoutingNew/PortfolioTradeRoutingNew";
import CardWithHeader from "../../../../../Widgets/Charts/CardWithHeader";
import {BsDash, BsPlus} from "react-icons/bs";

const PortfolioTradeRouting = (props) => {
    const [newRoutingModalStatus, setNewRoutingModalStatus] = useState(false)
    const header = <div style={{display: "flex"}}>
        <div style={{width: '90%'}}><p style={{margin: 0, height: '100%', verticalAlign: "middle"}}>Security Trade Routing</p>
        </div>
        <div style={{margin: 5}}>
            <button style={{border: 0}} onClick={()=>setNewRoutingModalStatus(true)}><BsPlus style={{fontSize: 24}}/>
            </button>
        </div>
        <div style={{margin: 5}}>
            <button style={{border: 0}} ><BsDash style={{fontSize: 24}}/></button>
        </div>
    </div>
    return (
        <CardWithHeader headerContent={header}>
            <div style={{overflow:"scroll"}}>
                <table style={{width: '100%', height: '100%'}}>
                <tbody style={{width: '100%'}}>

                <tr>
                    <td className={'table-row'}>
                        <div>
                            Silver
                        </div>
                    </td>
                    <td className={'table-row'}>
                        <div style={{width: '100%'}}>
                            Oanda
                        </div>
                    </td>
                    <td className={'table-row'}>
                        <div style={{width: '100%'}}>
                            1234-1234-1234-5234
                        </div>
                    </td>
                    <td className={'table-row'}>
                        <div style={{width: '100%'}}>
                            EUR_USD
                        </div>
                    </td>
                    <td className={'table-row'}>
                        <div style={{width: '100%'}}>
                            Stop Based
                        </div>
                    </td>
                    <td className={'table-row'}>
                        <div style={{width: '100%'}}>
                            0.04
                        </div>
                    </td>
                </tr>

                <tr>
                    <td className={'table-row'}>
                        <div>
                            Gold
                        </div>
                    </td>
                    <td className={'table-row'}>
                        <div style={{width: '100%'}}>
                            Trade Station
                        </div>
                    </td>
                    <td className={'table-row'}>
                        <div style={{width: '100%'}}>
                            1234-1234-1234-5234
                        </div>
                    </td>
                    <td className={'table-row'}>
                        <div style={{width: '100%'}}>
                            EUR_USD
                        </div>
                    </td>
                    <td className={'table-row'}>
                        <div style={{width: '100%'}}>
                            Fix
                        </div>
                    </td>
                    <td className={'table-row'}>
                        <div style={{width: '100%'}}>
                            5
                        </div>
                    </td>
                </tr>

                </tbody>
            </table>
            </div>
            <PortfolioTradeRoutingNew server={props.server} show={newRoutingModalStatus} hide={()=>setNewRoutingModalStatus(false)}/>
        </CardWithHeader>
    )
};
export default PortfolioTradeRouting;