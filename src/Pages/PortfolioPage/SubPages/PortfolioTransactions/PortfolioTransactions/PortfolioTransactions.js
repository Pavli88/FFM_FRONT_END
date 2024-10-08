import './PortfolioTransactions.css'
import axios from "axios";
import {useMemo, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { CSVLink, CSVDownload } from "react-csv";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare, BsArrowBarDown, BsX, BsCurrencyDollar} from "react-icons/bs";
import {useExpanded, useGroupBy, useTable} from "react-table";
import PortfolioTransactionEntry from "../PortfolioTransactionEntry/PortfolioTransactionEntry";
import PortfolioCashEntry from "../PortfolioCashEntry/PortfolioCashEntry";
import {BsPlusLg, BsPencil, BsTrash} from "react-icons/bs";


const TableGrouped = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showLinkedModal, setShowLinkedModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [linkedTransaction, setLinkedTransaction] = useState({});

    const deleteTransaction = async (id) => {
        const response = await axios.post(props.server + 'portfolios/delete/transaction/', {
            id: id['original']['id'],
        })
        console.log(response)
        if (response.data.success) {
            props.fetch()
        }
    };
    const updateTransaction = () =>  {
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

    const newLinkedTransaction = async() => {
        const response = await axios.post(props.server + 'portfolios/new/transaction/', linkedTransaction)
        if (response.data.success) {
            props.fetch()
        }
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
                Header: 'Trade Date',
                accessor: 'trade_date',
            },
            {
                Header: 'Settlement Date',
                accessor: 'settlement_date',
            },
            {
                Header: 'Transaction Type',
                accessor: 'transaction_type',
            },
            {
                Header: 'Security Name',
                accessor: 'name',
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
                Header: 'Quantity',
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
                Header: 'Book Value',
                accessor: 'bv',
            },
            {
                Header: 'Local Book Value',
                accessor: 'local_bv',
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
                Header: 'Margin',
                accessor: 'margin_balance',
            },
            {
                Header: 'Margin Rate %',
                accessor: 'margin_rate',
            },
            {
                Header: 'Account ID',
                accessor: 'account_id',
            },
            {
                Header: 'Broker',
                accessor: 'broker',
            },
            {
                Header: 'Broker ID',
                accessor: 'broker_id',
            },
             {
                Header: 'Option',
                accessor: 'option',
            },

        ],
        []
    )
    const tableInstance = useTable(
        {
            columns,
            data
        },
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

    const onAddTransactionButtonClick = (row) => {
        const newTransactionType = row.transaction_type === 'Purchase'
            ? 'Sale'
            : (row.sec_group === 'CFD' && row.transaction_type === 'Sale')
                ? 'Sale'
                : 'Purchase';

        const updatedDict = {...row};
        delete updatedDict['name']
        delete updatedDict['id']
        // Update linked transaction state
        setLinkedTransaction({
            ...updatedDict,
            transaction_link_code: row.id,
            // transaction_type: newTransactionType,
            open_status: 'Close',
            is_active: 0,
        });

        // Show the linked modal
        setShowLinkedModal(true);

    };

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
                // console.log(row)
                return (
                    <tr {...row.getRowProps()}
                        style={{
                            background: row.isGrouped ? '#f2f4f4': 'white',
                            color: row.original.is_active ? 'green' : 'black',
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
                                {row.original.transaction_link_code === row.original.id && row.original.transaction_type !== 'Subscription' && row.original.transaction_type !== 'Redemption' && row.original.transaction_type !== 'Commission' ?
                                <div style={{padding: 2}}>
                                    <button className={'normal-button'} onClick={() => onAddTransactionButtonClick(row.original)}>
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
                <div className={'card-header'}>
                    <div>
                        New Linked Transaction
                    </div>
                </div>
                <div>
                    <div style={{padding: '5px', width: '100%'}}>
                        <div style={{display: "flex"}}>
                            <div>
                                <span className={'input-label'}>Parent Transaction</span>
                            </div>
                            <div style={{position: "absolute", right: 10}}>
                                <span className={'input-label'}>{linkedTransaction.transaction_link_code}</span>
                            </div>
                        </div>

                        <div style={{display: "flex"}}>
                            <div>
                                <span className={'input-label'}>Security Name</span>
                            </div>
                            <div style={{position: "absolute", right: 10}}>
                                <span className={'input-label'}>{linkedTransaction.name}</span>
                            </div>
                        </div>

                        <div style={{display: "flex"}}>
                            <div>
                                <span className={'input-label'}>Security Code</span>
                            </div>
                            <div style={{position: "absolute", right: 10}}>
                                <span className={'input-label'}>{linkedTransaction.security_id}</span>
                            </div>
                        </div>

                        <div style={{display: "flex"}}>
                            <div>
                                <span className={'input-label'}>Open Status</span>
                            </div>
                            <div style={{position: "absolute", right: 10}}>
                                <span className={'input-label'}>Close</span>
                            </div>
                        </div>

                        <div style={{display: "flex"}}>
                            <div>
                                <span className={'input-label'}>Transaction Type</span>
                            </div>
                            <div style={{position: "absolute", right: 10}}>
                                <span className={'input-label'}>{linkedTransaction.transaction_type}</span>
                            </div>
                        </div>

                        <div style={{display: "flex"}}>
                            <div>
                                <span className={'input-label'}>Original Quantity</span>
                            </div>
                            <div style={{position: "absolute", right: 10}}>
                                <span className={'input-label'}>{linkedTransaction.quantity}</span>
                            </div>
                        </div>

                        <div style={{display: "flex", margin: 5}}>
                            <div>
                                <span className={'input-label'}>Trade Date</span>
                            </div>
                            <div style={{position: "absolute", right: 10}}>
                                <input defaultValue={selectedTransaction.trade_date}
                                       type="date"
                                       onChange={(e) => setLinkedTransaction({
                                           ...linkedTransaction,
                                           trade_date: e.target.value
                                       })}
                                       style={{width: 236}}
                                />
                            </div>
                        </div>

                        <div style={{display: "flex", margin: 5}}>
                            <div>
                                <span className={'input-label'}>Quantity</span>
                            </div>
                            <div style={{position: "absolute", right: 10}}>
                                <input placeholder={selectedTransaction.quantity}
                                       type="number"
                                       onChange={(e) => setLinkedTransaction({
                                           ...linkedTransaction,
                                           quantity: e.target.value
                                       })}
                                />
                            </div>
                        </div>

                        <div style={{display: "flex", margin: 5}}>
                            <div>
                                <span className={'input-label'}>Price</span>
                            </div>
                            <div style={{position: "absolute", right: 10}}>
                                <input defaultValue={selectedTransaction.price}
                                       type="number"
                                       onChange={(e) => setLinkedTransaction({
                                           ...linkedTransaction,
                                           price: e.target.value,
                                       })}
                                />
                            </div>
                        </div>

                        <div style={{display: "flex", margin: 5}}>
                            <div>
                                <span className={'input-label'}>FX Rate</span>
                            </div>
                            <div style={{position: "absolute", right: 10}}>
                                <input defaultValue={selectedTransaction.price}
                                       type="number"
                                       onChange={(e) => setLinkedTransaction({
                                           ...linkedTransaction,
                                           fx_rate: e.target.value,
                                       })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
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
        <div >

            <div className={'card-header'}>
                <div>
                    <span>Transactions</span>
                    <CSVLink filename="transactions.csv" data={props.data} style={{paddingLeft: 15}}><BsArrowBarDown
                        style={{fontSize: 20, fontWeight: "bold"}}/></CSVLink>
                </div>
                <div style={{position: "absolute", right: 50}}>
                    <BsPlusLg className={'icon'} onClick={() => setShowTransactionPanel(value => !value)}/>
                </div>
                <div style={{position: "absolute", right: 15}}>
                    <BsCurrencyDollar className={'icon'} onClick={() => setShowCashPanel(value => !value)}/>
                </div>
            </div>

            <div style={{height: 600}}>

                <div className={'card'}
                    style={{height: '100%', width: '100%', overflowY: 'auto', overflowX: 'auto', position: 'relative'}}>
                    <TableGrouped data={props.data} server={props.server} fetch={props.fetch}/>
                </div>
            </div>

            <PortfolioTransactionEntry portfolio={props.portfolio} server={props.server} show={showTransactionPanel}
                                       close={() => {
                                           setShowTransactionPanel(false);
                                           props.fetch();
                                       }}/>
            <PortfolioCashEntry portfolio={props.portfolio} server={props.server} show={showCashPanel}
                                close={() => setShowCashPanel(false)}/>

        </div>
    );
};

export default PortfolioTransactions;