import ServerContext from "../../../../context/server-context";
import {useContext, useEffect, useRef, useState} from "react";
import Card from "react-bootstrap/Card";
import PlusMinusButtonGroup from "../../../../components/PlusMinusButtonGroup/PlusMinusButtonGroup";
import {BsDash, BsPlus} from "react-icons/bs";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DateContext from "../../../../context/date-context";
import Select from "react-select";

const InstrumentPrices = (props) => {
    const currentDate = useContext(DateContext).currentDate
    const [queryDate, setQueryDate] = useState(currentDate);
    const [showModal, setShowModal] = useState(false);
    const isMounted = useRef(false);
    const [priceData, setPriceData] = useState([{}]);
    const [selectedPriceID, setSelectedPrice] = useState({});
    const [priceSource, setPriceSource] = useState("oanda");
    const dateRef = useRef();
    const priceRef = useRef();

    useEffect(() => {
            if (isMounted.current) {
                fetchPrices(queryDate);
            } else {
                isMounted.current = true;
            }
        }, [props.instrument.id, queryDate]
    );

    const prices = priceData.map((data) => <tr key={data.id} onClick={() => setSelectedPrice(data.id)} style={{cursor: "pointer"}}>
        <td>{data.date}</td>
        <td>{data.price}</td>
        <td>{data.source}</td>
    </tr>)

    const saveNewPrice = async() => {
        const response = await axios.post(props.server + 'instruments/new/price/', {
            instrument_id: props.instrument.id,
            date: dateRef.current.value,
            price: priceRef.current.value,
            source: priceSource
        })
        alert(response.data.response)
        fetchPrices(queryDate);
    };

    const fetchPrices = async(date) => {
        const response = await axios.get(props.server + 'instruments/get/price/', {
            params: {
                date__gte: date,
                instrument_id: props.instrument.id
            }
        })
        setPriceData(response.data);
    };

    const deletePrice = async() => {
        const response = await axios.post(props.server + 'instruments/delete/price/', {
            id: selectedPriceID,
        })
        alert(response.data.response)
        fetchPrices();
    };

    const priceSources = [
        {value: 'oanda', label: 'Oanda'},
        {value: 'saxo', label: 'Saxo Bank'},
    ];

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: 15}}>
            <Card style={{height: '100%'}}>
                <Card.Header
                    style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderBottom: 0}}>
                    <div style={{display: "flex"}}>
                        <div style={{padding: 5}}>Prices from</div>
                        <div style={{width: 200, paddingLeft: 5}}>
                            <input defaultValue={currentDate} type={'date'} onChange={(e) => setQueryDate(e.target.value)}/>
                        </div>
                        <PlusMinusButtonGroup save={() => setShowModal(true)} delete={deletePrice}/>
                    </div>
                </Card.Header>
                <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <Table style={{width: '100%'}}>
                        <thead>
                        <tr>
                            <td>Date</td>
                            <td>Price</td>
                            <td>Source</td>
                        </tr>
                        </thead>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        {prices}
                        </tbody>
                    </Table>
                </div>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Price - {props.instrument.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{width: '100%'}}>

                    <div style={{display: "flex", margin: 5}}>
                        <div className={'input-label'}>
                            Date
                        </div>
                        <div style={{width: 300, position: "absolute", right: 15}}>
                            <input ref={dateRef} defaultValue={currentDate} type={'date'}></input>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div className={'input-label'}>
                            Price
                        </div>
                        <div style={{width: 300, position: "absolute", right: 15}}>
                            <input ref={priceRef} type={'number'}></input>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div className={'input-label'}>
                            Source
                        </div>
                        <div style={{width: 300, position: "absolute", right: 15}}>
                            <Select
                                options={priceSources}
                                defaultValue={priceSource}
                                onChange={(e) => setPriceSource(e.value)}
                                className={'instrument-search-input-field'}
                            />
                        </div>
                    </div>

                </div>
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={saveNewPrice} style={{width: '100%'}}>Save</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
};
export default InstrumentPrices;