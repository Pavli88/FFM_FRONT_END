import Col from "react-bootstrap/Col";
import CardWidgetMiddle from "../../../../components/CardWidgetMiddle";
import Row from "react-bootstrap/Row";

//CSS
import './RobotGeneralInformation.css'
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import React, {useContext, useEffect, useState} from "react";

import axios from "axios";

//Context
import robotContext from "../../../../context/robot-context";
import serverContext from "../../../../context/server-context";

const RobotGeneralInformation = (props) => {
    const robotData = useContext(robotContext)['selectedRobotData'];
    return (
        <div style={{height:'100%', width:'100%', paddingTop: '15px', paddingBottom: '15px'}}>
            <Table id={'cash-flow-table'} style={{margin: '0px'}}>
            <tbody style={{height: '100%', padding: '5px'}}>
            <tr key={1}>
                <td className={'table-row-text'}>{'Strategy'}</td>
                <td>{robotData['strategy']}</td>
            </tr>
            <tr key={2}>
                <td className={'table-row-text'}>{'Security'}</td>
                <td>{robotData['security']}</td>
            </tr>
            <tr key={3}>
                <td className={'table-row-text'}>{'Inception Date'}</td>
                <td>{robotData['inception_date']}</td>
            </tr>
            <tr key={4}>
                <td className={'table-row-text'}>{'Broker'}</td>
                <td>{robotData['broker']}</td>
            </tr>
            <tr key={6}>
                <td className={'table-row-text'}>{'Account Number'}</td>
                <td>{robotData['account_number']}</td>
            </tr>
            {/*<tr key={7}>*/}
            {/*    <td className={'table-row-text'}>{'Last Price'}</td>*/}
            {/*    <td className={'table-row'}>{props.data['price']}</td>*/}
            {/*</tr>*/}
            {/*<tr key={8}>*/}
            {/*    <td className={'table-row-text'}>{'Last Pricing Date'}</td>*/}
            {/*    <td className={'table-row'}>{props.data['date']}</td>*/}
            {/*</tr>*/}
            </tbody>
        </Table>
        </div>

        // <Row style={{height:'100px'}}>
        //
        //
        //
        //         <Col style={{height:'100%'}}>
        //             <CardWidgetMiddle title={'Last Price'}>
        //                 <p className={'card-paragraph'}>{props.data['price']}</p>
        //             </CardWidgetMiddle>
        //         </Col>
        //         <Col style={{height:'100%'}}>
        //             <CardWidgetMiddle title={'Last Pricing Date'}>
        //                 <p className={'card-paragraph'} style={{color: props.data['date'] < props.data['end_date'] ? 'red': 'green'}}>{props.data['date']}</p>
        //             </CardWidgetMiddle>
        //         </Col>
        //     </Row>
    )
};
export default RobotGeneralInformation;