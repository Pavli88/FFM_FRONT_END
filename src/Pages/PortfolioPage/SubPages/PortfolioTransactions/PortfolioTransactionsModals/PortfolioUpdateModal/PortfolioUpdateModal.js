import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import axios from "axios";

const PortfolioUpdateModal = ( {server, show, selectedTransaction, close } ) => {

    const updateTransaction = () => {
        axios.post(`${server}portfolios/update/transaction/`, selectedTransaction)
            .then(response => alert(response.data.response))
            .catch(error => console.error("Error:", error));
        close(false);
    };

    return (
        <Modal show={show} onHide={() => close()}>
            <Modal.Header closeButton>
                <Modal.Title>Update Transaction {selectedTransaction.id}</Modal.Title>
            </Modal.Header>
            {/*<Modal.Body>*/}
            {/*    <div style={{padding: '5px', width: '100%'}}>*/}
            {/*        {selectedTransaction.sec_group === 'Cash' ? '' :*/}
            {/*            <div style={{width: '100%'}}>*/}
            {/*                <Form.Label>Open Status</Form.Label>*/}
            {/*                <Select style={{height: '100%'}}*/}
            {/*                        value={selectedTransaction.open_status}*/}
            {/*                        options={[*/}
            {/*                            {value: 'Open', label: 'Open'},*/}
            {/*                            {value: 'Closed', label: 'Closed'}*/}
            {/*                        ]}*/}
            {/*                        placeholder={selectedTransaction.open_status}*/}
            {/*                        onChange={(e) => setSelectedTransaction({*/}
            {/*                            ...selectedTransaction,*/}
            {/*                            open_status: e.value,*/}
            {/*                            is_active: e.value === 'Open' ? 1 : 0*/}
            {/*                        })}*/}
            {/*                >*/}
            {/*                </Select>*/}
            {/*            </div>*/}
            {/*        }*/}

            {/*        <div style={{width: '100%', marginTop: 15}}>*/}
            {/*            <Form.Label>Trade Date</Form.Label>*/}
            {/*            <Form.Control defaultValue={selectedTransaction.trade_date}*/}
            {/*                          type="date"*/}
            {/*                          onChange={(e) => setSelectedTransaction({*/}
            {/*                              ...selectedTransaction,*/}
            {/*                              trade_date: e.target.value*/}
            {/*                          })}*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div style={{width: '100%', marginTop: 15}}>*/}
            {/*            <Form.Label>Units</Form.Label>*/}
            {/*            <Form.Control defaultValue={Math.abs(selectedTransaction.quantity)}*/}
            {/*                          type="number"*/}
            {/*                          onChange={(e) => setSelectedTransaction({*/}
            {/*                              ...selectedTransaction,*/}
            {/*                              quantity: Math.abs(e.target.value)*/}
            {/*                          })}*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div style={{width: '100%', marginTop: 15}}>*/}
            {/*            <Form.Label>Price</Form.Label>*/}
            {/*            <Form.Control defaultValue={selectedTransaction.price}*/}
            {/*                          type="number"*/}
            {/*                          onChange={(e) => setSelectedTransaction({*/}
            {/*                              ...selectedTransaction,*/}
            {/*                              price: e.target.value,*/}
            {/*                          })}*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div style={{width: '100%', marginTop: 15}}>*/}
            {/*            <Form.Label>FX Rate</Form.Label>*/}
            {/*            <Form.Control defaultValue={selectedTransaction.fx_rate}*/}
            {/*                          type="number"*/}
            {/*                          onChange={(e) => setSelectedTransaction({*/}
            {/*                              ...selectedTransaction,*/}
            {/*                              fx_rate: e.target.value,*/}
            {/*                          })}*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        {selectedTransaction.sec_group === 'Cash' ? '' :*/}
            {/*            <div style={{width: '100%', marginTop: 15}}>*/}
            {/*                <Form.Label>Broker ID</Form.Label>*/}
            {/*                <Form.Control defaultValue={selectedTransaction.broker_id}*/}
            {/*                              type="number"*/}
            {/*                              onChange={(e) => setSelectedTransaction({*/}
            {/*                                  ...selectedTransaction,*/}
            {/*                                  broker_id: e.target.value,*/}
            {/*                              })}*/}
            {/*                />*/}
            {/*            </div>}*/}

            {/*    </div>*/}
            {/*</Modal.Body>*/}
            <Modal.Footer>
                <button className={'save-button'} onClick={updateTransaction}>
                    Save
                </button>
            </Modal.Footer>
        </Modal>
    );
};
export default PortfolioUpdateModal;