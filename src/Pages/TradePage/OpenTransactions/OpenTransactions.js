import {useContext, useEffect, useMemo, useRef, useState} from "react";
import axios from "axios";
import TradeContext from "../context/trade-context";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import TradeExecution from "../TradeExecution/TradeExecution";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";
import {useExpanded, useGroupBy, useTable} from "react-table";


const UnitModal = (props) => {
    const [newUnit, setNewUnit] = useState(0);
    const closeTransactions = async (data) => {
        const response = await axios.post(props.server + 'trade_page/new/signal/', data)
        props.update();
        props.hide();
    }

    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Close Units - {props.data.portfolio_code} - {props.data.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{width: '100%'}}>

                    <Form.Group>
                        <Form.Label>Units</Form.Label>
                        <Form.Control onChange={(e) => setNewUnit(e.target.value)} type="number" min={0} max={props.data.quantity} required/>
                    </Form.Group>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <div style={{width: '100%'}}>
                    <button className={'terminate-button'}
                            onClick={() => closeTransactions({
                                'transaction_type': 'Close Out',
                                'portfolio_code': props.data.portfolio_code,
                                'account_id': props.data.account_id,
                                'security_id': props.data.security_id,
                                'id': props.data.id,
                                'quantity': newUnit,
                            })}>
                        Close Out
                    </button>
                </div>
                <div style={{width: '100%'}}>
                    <button className={'delete-button'}
                            onClick={() => closeTransactions({
                                'transaction_type': 'Close',
                                'portfolio_code': props.data.portfolio_code,
                                'account_id': props.data.account_id,
                                'security_id': props.data.security_id,
                                'id': props.data.id,
                            })}>
                        Close
                    </button>
                </div>
                <div style={{width: '100%'}}>
                    <button className={'delete-button'}
                            onClick={() => closeTransactions({
                                'transaction_type': 'Close All',
                                'portfolio_code': props.data.portfolio_code,
                                'account_id': props.data.account_id,
                                'security_id': props.data.security_id,
                                'id': props.data.id,
                            })}>
                        Close All Trades
                    </button>
                </div>
                <div style={{width: '100%'}}>
                    <button className={'delete-button'}
                            onClick={() => closeTransactions({
                                'transaction_type': 'Liquidate',
                                'portfolio_code': props.data.portfolio_code,
                                'account_id': props.data.account_id,
                                'security_id': props.data.security_id,
                                'id': props.data.id,
                            })}>
                        Liquidate Portfolio
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

const OpenTransactions = (props) => {
    const newTransactionID = useContext(TradeContext).newTransactionID;
    const saveNewTransactionID = useContext(TradeContext).saveNewTrnsactionID;
    const [openTransactionsData, setOpenTransactionsData] =  useState([{}]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [showTradeModal, setShowTradeModal] = useState(false);

    const MINUTE_MS = 10000;

    useEffect(() => {
        fetchTransactions()
        // const interval = setInterval(() => {
        //     fetchTransactions()
        // }, MINUTE_MS);
        // return () => clearInterval(interval);
    }, [newTransactionID])

    const fetchTransactions = async() => {
        const response = await axios.get(props.server + 'portfolios/get/open_transactions/')
        setOpenTransactionsData(response.data)
    };

    const data = useMemo(
        () => openTransactionsData,
        [openTransactionsData]
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Portfolio Code',
                accessor: 'portfolio_code',

            },
            {
                Header: 'Security',
                accessor: 'name',

            },
            {
                Header: 'Security ID',
                accessor: 'security_id',

            },
            {
                Header: 'Group',
                accessor: 'sec_group',
            },
            {
                Header: 'Currency',
                accessor: 'currency',
            },
            {
                Header: 'Tran Type',
                accessor: 'transaction_type',
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
                disableGroupBy: true,
            },
            {
                Header: 'Price',
                accessor: 'price',
                disableGroupBy: true,
            },
            {
                Header: 'Market Value',
                accessor: 'mv',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`
            },
            {
                Header: 'Transaction ID',
                accessor: 'id',
                disableGroupBy: true,

            },
            {
                Header: 'Account ID',
                accessor: 'account_id',
                disableGroupBy: true,
            },
             {
                Header: 'Broker',
                accessor: 'broker',
                disableGroupBy: true,
            },
            {
                Header: 'Broker ID',
                accessor: 'broker_id',
                disableGroupBy: true,
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
        setGroupBy,
        prepareRow,
        state: {groupBy},
    } = tableInstance
    const firstPageRows = rows.slice(0, 200)

    useEffect(() => {
        setGroupBy(['portfolio_code', 'name']);
    }, [openTransactionsData])

    return (
        <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <div className='card' style={{backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px'}}>

                <div className={'card-header'}>
                    <div style={{position: "absolute", left: 10, padding: 15}}>
                        <button className={'normal-button'} onClick={() => setShowTradeModal(true)}>New</button>
                    </div>
                </div>

                <div style={{height: '100%', overflowY: 'scroll'}}>
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
                                                    <span {...column.getGroupByToggleProps()}
                                                          style={{paddingRight: 5}}>
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
                                        cursor: row.isGrouped ? '' : 'pointer',
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
                                    className={'table-row-all'}
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
                                                    // color: (cell.column.Header === 'Change' || cell.column.Header === 'P&L') && cell.value < 0 ? 'red' : (cell.column.Header === 'Change' || cell.column.Header === 'P&L') && cell.value > 0 ? 'green' : 'black',
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
                </div>
                <UnitModal show={showModal}
                           hide={() => setShowModal(false)}
                           data={selectedTransaction}
                           server={props.server}
                           update={() => fetchTransactions()}
                />
                <TradeExecution server={props.server} show={showTradeModal} hide={() => setShowTradeModal(false)}
                                update={() => fetchTransactions()}/>
            </div>
        </div>
    )
};
export default OpenTransactions;