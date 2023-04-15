import {useEffect, useState} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import './PortfolioTransactions.css'

const PortfolioTransactions = (props) => {
    const [portTransData, setPortTransData] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [activeRow, setActiveRow] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('new');
    const [modal, setModal] = useState();

    useEffect(() => {
        axios.get(props.server + 'portfolios/get_portfolio_transactions/' + props.portfolio)
            .then(response => response['data'].map((data) =>
                <tr onClick={() => {
                    setRowData({
                        'id': data[0],
                        'portfolio': data[1],
                        'quantity': data[2],
                        'price': data[3],
                        'mv': data[4],
                        'trade date': data[5],
                        'instrument': data[6],
                        'instrument type': data[7],
                        'source': data[8],
                        'type': data[9]
                    });
                }} key={data[0]}>
                    <td className={'table-row'}>{data[1]}</td>
                    <td className={'table-row'}>{data[2]}</td>
                    <td className={'table-row'}>{data[3]}</td>
                    <td className={'table-row'}>{data[4]}</td>
                    <td className={'table-row'}>{data[5]}</td>
                    <td className={'table-row'}>{data[6]}</td>
                    <td className={'table-row'}>{data[7]}</td>
                    <td className={'table-row'}>{data[8]}</td>
                    <td className={'table-row'}>{data[9]}</td>
                    <td className={'table-row'}>{data[10]}</td>
                </tr>
            ))
            .then(data => setPortTransData(data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    }, [props]
    );
    return (
        <Card className="card">
            <Row style={{width: '100%', margin: '0px'}}>
                <Col sm={2}>
                    <Card.Title className="card-header-first">Transactions</Card.Title>
                </Col>
                <Col>
                    <Button onClick={function () {
                        if (rowData['id'] === '') {
                            alert('Please select a transaction to edit!');
                        } else {
                            setShowModal(true);
                            setModalType('edit')
                        }
                        ;
                    }}>Edit Transaction</Button>
                </Col>
            </Row>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-first">
                    <tr>
                        <td className="table-header-row">Portfolio</td>
                        <td className="table-header-row">Quantity</td>
                        <td className="table-header-row">Price</td>
                        <td className="table-header-row">Market Value</td>
                        <td className="table-header-row">Trade Date</td>
                        <td className="table-header-row">Instrument</td>
                        <td className="table-header-row">Instrument Type</td>
                        <td className="table-header-row">Source</td>
                        <td className="table-header-row">Currency</td>
                        <td className="table-header-row">Type</td>
                    </tr>
                    </thead>
                    <tbody>
                    {portTransData}
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default PortfolioTransactions;