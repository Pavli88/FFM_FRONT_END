import Card from "react-bootstrap/Card";
import './PortfolioTransactions.css'
import axios from "axios";
import {useMemo, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { CSVLink, CSVDownload } from "react-csv";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare, BsChevronRight, BsChevronLeft} from "react-icons/bs";
import {useExpanded, useGroupBy, useTable} from "react-table";
import PortfolioTransactionEntry from "../PortfolioTransactionEntry/PortfolioTransactionEntry";
import PortfolioCashEntry from "../PortfolioCashEntry/PortfolioCashEntry";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const TableGrouped = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    const deleteTransaction = (id) => {
        axios.post(props.server + 'portfolios/delete/transaction/', {
            id: id,
        })
            .then(response => alert(response.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        setShowModal(false)
        props.fetch()
    };
    const updateTransaction = () =>  {
        axios.post(props.server + 'portfolios/update/transaction/', selectedTransaction)
            .then(response => alert(response.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        setShowModal(false)
    };
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
                Header: 'Security',
                accessor: 'security',
            },
            {
                Header: 'Sec Group',
                accessor: 'sec_group',
            },
            {
                Header: 'Currency',
                accessor: 'currency',
            },
            {
                Header: 'Status',
                accessor: 'open_status',
            },
            {
                Header: 'Initial Units',
                accessor: 'quantity',
            },
            {
                Header: 'Trade Price',
                accessor: 'price',
            },
            {
                Header: 'Base MV',
                accessor: 'mv',
            },
            {
                Header: 'Local MV',
                accessor: 'local_mv',
            },
            {
                Header: 'Base CF',
                accessor: 'net_cashflow',
            },
            {
                Header: 'Local CF',
                accessor: 'local_cashflow',
            },
            {
                Header: 'Margin Amount',
                accessor: 'margin_balance',
            },
            {
                Header: 'Base PnL',
                accessor: 'realized_pnl',
            },
             {
                Header: 'Local PnL',
                accessor: 'local_pnl',
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
                Header: 'Trade Date',
                accessor: 'trade_date',
            },
             {
                Header: 'Option',
                accessor: 'option',
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
                      {column.isGrouped ? <BsDashSquare/> : <BsPlusSquare/>}
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
                // console.log(row)
                return (
                    <tr {...row.getRowProps()}
                        style={{
                            cursor: row.isGrouped ? '': 'pointer',
                            background: row.isGrouped ? '#f2f4f4': 'white'
                        }}

                        onDoubleClick={() => {
                            if (row.isGrouped) {
                                console.log('grouped')
                            } else {
                                setShowModal(true)
                                setSelectedTransaction(row.original)
                            }
                        }
                        }

                    >

                        {row.cells.map(cell => {
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Transaction {selectedTransaction.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{padding: '5px', width: '100%', height: '350px'}}>
                        {selectedTransaction.sec_group === 'Cash' ? '':
                        <div style={{width: '100%'}}>
                            <Form.Label>Open Status</Form.Label>
                            <Select style={{height: '100%'}}
                                    value={selectedTransaction.open_status}
                                    options={[
                                        {value: 'Open', label: 'Open'},
                                        {value: 'Closed', label: 'Closed'}
                                    ]}
                                    placeholder={selectedTransaction.open_status}
                                    onChange={(e) => setSelectedTransaction({
                                        ...selectedTransaction,
                                        open_status: e.value,
                                        is_active: e.value === 'Open'
                                    })}
                            >
                            </Select>
                        </div>
                        }

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>Trade Date</Form.Label>
                            <Form.Control defaultValue={selectedTransaction.trade_date}
                                          type="date"
                                          onChange={(e) => setSelectedTransaction({
                                              ...selectedTransaction,
                                              trade_date: e.target.value
                                          })}
                            />
                        </div>

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>Units</Form.Label>
                            <Form.Control defaultValue={selectedTransaction.quantity}
                                          type="number"
                                          onChange={(e) => setSelectedTransaction({
                                              ...selectedTransaction,
                                              quantity: e.target.value
                                          })}
                            />
                        </div>

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control defaultValue={selectedTransaction.price}
                                          type="number"
                                          onChange={(e) => setSelectedTransaction({
                                              ...selectedTransaction,
                                              price: e.target.value,
                                          })}
                            />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className={'delete-button'} onClick={() => deleteTransaction(selectedTransaction.id)}>
                        Delete
                    </button>
                    <button className={'save-button'} onClick={updateTransaction}>
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        </table>
    );
};

const PortfolioTransactions = (props) => {
    const [showTransactionPanel, setShowTransactionPanel] = useState(false);
    // const portTransData = props.data.map((data) => <tr key={data.id} className={'table-row-all'}
    //                                                    style={{cursor: data.sec_group === 'Cash' ? '': "pointer"}} onDoubleClick={() => {
    //     if (data.sec_group != 'Cash') {
    //         setSelectedTransaction(data)
    //         setShowModal(true)
    //     }}

    // }}>
    //     <td>{data.id}</td>
    //     <td>{data.portfolio_code}</td>
    //     <td >{data.security}</td>
    //     <td >{data.sec_group}</td>
    //     <td>{data.quantity}</td>
    //     <td>{data.price}</td>
    //     <td>{data.mv}</td>
    //     <td>{data.currency}</td>
    //     <td>{data.trading_cost}</td>
    //     <td >{data.transaction_type}</td>
    //     <td>{data.open_status}</td>
    //     <td>{data.transaction_link_code}</td>
    //     <td>{data.created_on}</td>
    //     <td>{data.trade_date}</td>
    //     <td>{data.account_id}</td>
    //     <td>{data.broker_id}</td>
    //     <td>{data['is_active']}</td>
    //     <td>{data.transaction_link_code === '' ? <div style={{padding: 0, width: 30}}><button className={'delete-button'} onClick={() => deleteTransaction(data.id)}><BiX/></button></div>: ''}</td>
    // </tr>)

    const TransactionPanel = <div style={{height: '100%', width: '40%', paddingLeft: 15}}>
        <Card style={{height: '100%'}}>
            <Card.Header>Entry</Card.Header>
            <Tabs
                defaultActiveKey="security"
                id="profile-tab"
                style={{paddingLeft: 12, paddingTop: 5, marginBottom: 0}}
            >
                <Tab eventKey="security" title="Security">
                    <PortfolioTransactionEntry portfolio={props.portfolio} server={props.server}/>
                </Tab>
                <Tab eventKey="cash" title="Cash">
                    <div>
                        <PortfolioCashEntry portfolio={props.portfolio} server={props.server}/>
                    </div>
                </Tab>
            </Tabs>
        </Card>
    </div>

    return (
        <div style={{height: '100%', display: "flex"}}>
            <Card className={'transactions-container'}>
                <Card.Header style={{display: "flex"}}>
                    <div>
                        <span>Transactions</span>
                        <CSVLink data={props.data} style={{paddingLeft: 15}}>Download</CSVLink>
                    </div>
                    <div style={{position: "absolute", right: 15}}>
                        <button onClick={() => setShowTransactionPanel(value => !value)} className={'get-button'}>{showTransactionPanel ? <BsChevronLeft/>: <span>New Transaction<BsChevronRight/></span>}  </button>
                    </div>
                </Card.Header>
                <div style={{height: '100%', width: '100%', overflowY: 'scroll', overflowX: 'auto'}}>
                    <TableGrouped data={props.data} server={props.server}/>
                </div>
            </Card>
            {showTransactionPanel ? TransactionPanel: ''}
        </div>
    );
};

export default PortfolioTransactions;