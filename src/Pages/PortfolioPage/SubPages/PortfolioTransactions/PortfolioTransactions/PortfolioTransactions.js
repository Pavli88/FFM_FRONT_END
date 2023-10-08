import Card from "react-bootstrap/Card";
import './PortfolioTransactions.css'
import axios from "axios";
import {useMemo, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { CSVLink, CSVDownload } from "react-csv";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";
import {useExpanded, useGroupBy, useTable} from "react-table";
import PortfolioTransactionEntry from "../PortfolioTransactionEntry/PortfolioTransactionEntry";
import PortfolioCashEntry from "../PortfolioCashEntry/PortfolioCashEntry";
import {BsPlusLg, BsPencil, BsTrash} from "react-icons/bs";


const TableGrouped = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showLinkedModal, setShowLinkedModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [linkedTransaction, setLinkedTransaction] = useState({});

    const deleteTransaction = (id) => {
        axios.post(props.server + 'portfolios/delete/transaction/', {
            id: id['original']['id'],
        })
            .then(response => alert(response.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        setShowModal(false)
        props.fetch()
    };
    const updateTransaction = () =>  {
        console.log(selectedTransaction)
        axios.post(props.server + 'portfolios/save/transaction/', selectedTransaction)
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

    const removeKey = () => {
        setLinkedTransaction(current => {
            const {id, ...rest} = current;
            return rest;
        });
    };

    const newLinkedTransaction = () => {
        axios.post(props.server + 'portfolios/save/transaction/', linkedTransaction)
            .then(response => alert(response.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        setShowLinkedModal(false)
    };

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
                Header: 'FX Rate',
                accessor: 'fx_rate',
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
                Header: 'Base P&L',
                accessor: 'realized_pnl',
            },
             {
                Header: 'Local P&L',
                accessor: 'local_pnl',
            },
             {
                Header: 'FX P&L',
                accessor: 'fx_pnl',
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
                                <th {...column.getHeaderProps()} style={{fontSize: 12}}>
                                    {column.canGroupBy ? (
                                        // If the column can be grouped, let's add a toggle
                                        <span {...column.getGroupByToggleProps()} style={{paddingRight: 5}}>
                      {column.isGrouped ? <BsDashSquare/> : <BsPlusSquare/>}
                    </span>
                                    ) : null}
                                    {column.render('Header')}
                                </th>
                            ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row, i) => {
                prepareRow(row)

                return (
                    <tr {...row.getRowProps()}
                        style={{
                            background: row.isGrouped ? '#f2f4f4': 'white',
                        }}

                    >
                        {row.cells.map(cell => {
                            return (
                                // This generates each individual cells
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
                                        fontSize: 12,
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

                        {row.isGrouped ? '' : <td className={'sticky-column'}>
                            <div style={{display: "flex"}}>
                                {row.original.transaction_link_code === 0 && row.original.transaction_type !== 'Subscription' && row.original.transaction_type !== 'Redemption' && row.original.transaction_type !== 'Commission' ?
                                <div style={{padding: 2}}>
                                    <button className={'normal-button'} onClick={() => {
                                        setShowLinkedModal(true)
                                        setLinkedTransaction({
                                            ...row.original,
                                            'transaction_link_code': row.original.id,
                                            'transaction_type': row.original.transaction_type === 'Purchase' ? 'Sale' : row.original.sec_group === 'CFD' && row.original.transaction_type === 'Sale' ? 'Sale' : 'Purchase',
                                            'open_status': 'Closed',
                                            'is_active': 0,
                                        })
                                        removeKey()
                                    }}>
                                        <BsPlusLg/>
                                    </button>
                                </div>: ''}
                                <div style={{padding: 2}}>
                                    <button className={'normal-button'} onClick={() => {
                                        setShowModal(true)
                                        setSelectedTransaction(row.original)
                                    }}>
                                        <BsPencil/>
                                    </button>
                                </div>
                                <div style={{padding: 2}}>
                                    <button className={'delete-button'} onClick={() => deleteTransaction(row)}>
                                        <BsTrash/>
                                    </button>
                                </div>
                            </div>

                        </td>}
                    </tr>
                )
            })}
            </tbody>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Transaction {selectedTransaction.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{padding: '5px', width: '100%'}}>
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
                                        is_active: e.value === 'Open' ? 1: 0
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
                            <Form.Control defaultValue={Math.abs(selectedTransaction.quantity)}
                                          type="number"
                                          onChange={(e) => setSelectedTransaction({
                                              ...selectedTransaction,
                                              quantity: Math.abs(e.target.value)
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

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>FX Rate</Form.Label>
                            <Form.Control defaultValue={selectedTransaction.fx_rate}
                                          type="number"
                                          onChange={(e) => setSelectedTransaction({
                                              ...selectedTransaction,
                                              fx_rate: e.target.value,
                                          })}
                            />
                        </div>

                        {selectedTransaction.sec_group === 'Cash' ? '' :
                            <div style={{width: '100%', marginTop: 15}}>
                                <Form.Label>Broker ID</Form.Label>
                                <Form.Control defaultValue={selectedTransaction.broker_id}
                                              type="number"
                                              onChange={(e) => setSelectedTransaction({
                                                  ...selectedTransaction,
                                                  broker_id: e.target.value,
                                              })}
                                />
                            </div>}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className={'save-button'} onClick={updateTransaction}>
                        Save
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={showLinkedModal} onHide={() => setShowLinkedModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>New Linked Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{padding: '5px', width: '100%'}}>

                        <div style={{width: '100%'}}>
                            <Form.Label>Parent Transaction</Form.Label>
                            <Form.Control defaultValue={linkedTransaction.transaction_link_code}
                                          type="text"
                                          disabled={true}
                            />
                        </div>

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>Open Status</Form.Label>
                            <Form.Control defaultValue={'Closed'}
                                          type="text"
                                          disabled={true}
                            />
                        </div>


                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>Transaction Type</Form.Label>
                            <Form.Control defaultValue={linkedTransaction.transaction_type}
                                          type="text"
                                          disabled={true}
                            />
                        </div>

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>Trade Date</Form.Label>
                            <Form.Control defaultValue={selectedTransaction.trade_date}
                                          type="date"
                                          onChange={(e) => setLinkedTransaction({
                                              ...linkedTransaction,
                                              trade_date: e.target.value
                                          })}
                            />
                        </div>

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control placeholder={selectedTransaction.quantity}
                                          type="number"
                                          onChange={(e) => setLinkedTransaction({
                                              ...linkedTransaction,
                                              quantity: e.target.value
                                          })}
                            />
                        </div>

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control defaultValue={selectedTransaction.price}
                                          type="number"
                                          onChange={(e) => setLinkedTransaction({
                                              ...linkedTransaction,
                                              price: e.target.value,
                                          })}
                            />
                        </div>

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>FX Rate</Form.Label>
                            <Form.Control defaultValue={selectedTransaction.price}
                                          type="number"
                                          onChange={(e) => setLinkedTransaction({
                                              ...linkedTransaction,
                                              fx_rate: e.target.value,
                                          })}
                            />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className={'save-button'} onClick={newLinkedTransaction}>
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        </table>
    );
};

const PortfolioTransactions = (props) => {
    const [showTransactionPanel, setShowTransactionPanel] = useState(false);
    const [showCashPanel, setShowCashPanel] = useState(false);
    return (
        <div style={{height: '100%', display: "flex"}}>
            <Card className={'transactions-container'}>
                <Card.Header style={{display: "flex"}}>
                    <div>
                        <span>Transactions</span>
                        <CSVLink data={props.data} style={{paddingLeft: 15}}>Download</CSVLink>
                    </div>
                    <div style={{position: "absolute", right: 100}}>
                        <button onClick={() => setShowTransactionPanel(value => !value)}
                                className={'normal-button'} style={{fontSize: 12}}><span style={{paddingRight: 5}}>Transaction</span>
                            <BsPlusLg/>
                        </button>
                    </div>
                    <div style={{position: "absolute", right: 15}}>
                        <button onClick={() => setShowCashPanel(value => !value)}
                                className={'normal-button'} style={{fontSize: 12}}><span style={{paddingRight: 5}}>Cashflow</span>
                            <BsPlusLg/>
                        </button>
                    </div>
                </Card.Header>
                <div
                    style={{height: '100%', width: '100%', overflowY: 'auto', overflowX: 'auto', position: 'relative'}}>
                    <TableGrouped data={props.data} server={props.server}/>
                </div>
            </Card>

            <PortfolioTransactionEntry portfolio={props.portfolio} server={props.server} show={showTransactionPanel} close={() => setShowTransactionPanel(false)}/>
            <PortfolioCashEntry portfolio={props.portfolio} server={props.server} show={showCashPanel} close={() => setShowCashPanel(false)}/>

        </div>
    );
};

export default PortfolioTransactions;