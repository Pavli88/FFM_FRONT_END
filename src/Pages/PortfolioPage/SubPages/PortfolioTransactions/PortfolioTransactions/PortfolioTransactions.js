import Card from "react-bootstrap/Card";
import './PortfolioTransactions.css'
import { BiX } from 'react-icons/bi';
import axios from "axios";
import {useMemo, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Nav} from "react-bootstrap";
import Select from "react-select";
import { CSVLink, CSVDownload } from "react-csv";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";
import {useExpanded, useGroupBy, useTable} from "react-table";


const TableGrouped = (props) => {
    const data = useMemo(
        () => props.data,
        [props.data]
    )

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',

            },
            {
                Header: 'Linked Transaction',
                accessor: 'transaction_link_code',

            },
            {
                Header: 'Portfolio Code',
                accessor: 'portfolio_code',

            },
            {
                Header: 'Transaction Type',
                accessor: 'transaction_type',
            },
            {
                Header: 'Currency',
                accessor: 'currency',
            },
            {
                Header: 'Units',
                accessor: 'quantity',
            },
            {
                Header: 'Trade Price',
                accessor: 'price',
            },
            {
                Header: 'Sec Group',
                accessor: 'sec_group',
            },
            {
                Header: 'Market Value',
                accessor: 'mv',
            },
            {
                Header: 'Account ID',
                accessor: 'account_id',
            },
            {
                Header: 'Broker ID',
                accessor: 'broker_id',
            },
            {
                Header: 'Security',
                accessor: 'security',
            },
        ],
        []
    )
    const tableInstance = useTable(
        {columns, data},
        useGroupBy,
        useExpanded)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { groupBy, expanded },
    } = tableInstance
    const firstPageRows = rows.slice(0, 200)
    return (

            <table {...getTableProps()}>
                <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {column.canGroupBy ? (
                                            // If the column can be grouped, let's add a toggle
                                            <span {...column.getGroupByToggleProps()} style={{paddingRight: 5}}>
                      {column.isGrouped ? <BsDashSquare/>: <BsPlusSquare/>}
                    </span>
                                        ) : null}
                                        {column.render('Header')}
                                    </th>
                                ))}
                            <th></th>
                            <th></th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {firstPageRows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                console.log(cell)
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            fontWeight: cell.isGrouped
                                                ? "bold"
                                                : cell.isAggregated
                                                    ? "bold"
                                                    : cell.isPlaceholder
                                                        ? '#ff000042'
                                                        : 'white',
                                        }}
                                    >
                                        {cell.isGrouped ? (
                                            // If it's a grouped cell, add an expander and row count
                                            <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                          </span>{' '}
                                                {cell.render('Cell')} ({row.subRows.length})
                                            </>
                                        ) : cell.isAggregated ? (
                                            // If the cell is aggregated, use the Aggregated
                                            // renderer for cell
                                            cell.render('Aggregated')
                                        ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                            // Otherwise, just render the regular cell
                                            cell.render('Cell')

                                        )}
                                    </td>

                                )

                            })

                            }

                        </tr>
                    )
                })}
                </tbody>
            </table>
    );
};


const PortfolioTransactions = (props) => {
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [showModal, setShowModal] = useState(false);

    const deleteTransaction = (id) => {
        axios.post(props.server + 'portfolios/delete/transaction/', {
            id: id,
        })
            .then(response => alert(response.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        // props.fetch()
    };
    console.log(props.data)
    const updateTransaction = () =>  {
        axios.post(props.server + 'portfolios/update/transaction/', selectedTransaction)
            .then(response => alert(response.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const portTransData = props.data.map((data) => <tr key={data.id} className={'table-row-all'}
                                                       style={{cursor: data.sec_group === 'Cash' ? '': "pointer"}} onDoubleClick={() => {
        if (data.sec_group != 'Cash') {
            setSelectedTransaction(data)
            setShowModal(true)
        }

    }}>
        <td>{data.id}</td>
        <td>{data.portfolio_code}</td>
        <td >{data.security}</td>
        <td >{data.sec_group}</td>
        <td>{data.quantity}</td>
        <td>{data.price}</td>
        <td>{data.mv}</td>
        <td>{data.currency}</td>
        <td>{data.trading_cost}</td>
        <td >{data.transaction_type}</td>
        <td>{data.open_status}</td>
        <td>{data.transaction_link_code}</td>
        <td>{data.created_on}</td>
        <td>{data.trade_date}</td>
        <td>{data.account_id}</td>
        <td>{data.broker_id}</td>
        <td>{data['is_active']}</td>
        <td>{data.transaction_link_code === '' ? <div style={{padding: 0, width: 30}}><button className={'delete-button'} onClick={() => deleteTransaction(data.id)}><BiX/></button></div>: ''}</td>
    </tr>)
    return (
        <div style={{height: '100%', paddingLeft: 15}}>
            <Card className={'transactions-container'}>
                <Card.Header>
                    <div>
                        <span>Transactions</span>
                        <CSVLink data={props.data} style={{paddingLeft: 15}}>Download</CSVLink>
                    </div>
                </Card.Header>
                <div style={{height: '100%', width: '100%', overflowY: 'scroll', overflowX: 'auto'}}>
                    <TableGrouped data={props.data}/>
                </div>
            </Card>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{width: '100%'}}>

                    {selectedTransaction.sec_group === 'Cash' ? '': <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                        <div className={'portfolio-settings-name-field'}>
                            <Nav.Link href="#" disabled>
                                Open Status
                            </Nav.Link>
                        </div>
                        <div style={{width: '100%'}}>
                            <Select style={{height: '100%'}}
                                    value={selectedTransaction.open_status}
                                    options={[
                                        { value: 'Open', label: 'Open'},
                                        { value: 'Closed', label: 'Closed'}
                                    ]}
                                    placeholder={selectedTransaction.open_status}
                                    onChange={(e) => setSelectedTransaction({...selectedTransaction, open_status: e.value})}
                            >
                            </Select>
                        </div>
                    </div>}


                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={updateTransaction}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
};

export default PortfolioTransactions;