import ServerContext from "../../../../context/server-context";
import {useContext, useEffect, useRef, useState} from "react";
import Card from "react-bootstrap/Card";
import PlusMinusButtonGroup from "../../../../components/PlusMinusButtonGroup/PlusMinusButtonGroup";
import {BsDash, BsPlus} from "react-icons/bs";
import axios from "axios";
import Table from "react-bootstrap/Table";

const InstrumentPrices = (props) => {
    const isMounted = useRef(false);
    const [priceData, setPriceData] = useState([{}]);
    const [selectedPrice, setSelectedPrice] = useState({});
    useEffect(() => {
            if (isMounted.current) {
                axios.get(props.server + 'instruments/get/price/', {
                    params: {
                        inst_code: props.id
                    }
                })
                    .then(data => setPriceData(data.data))
                    .catch((error) => {
                        console.error('Error Message:', error);
                    });
            } else {
                isMounted.current = true;
            }
        }, [props.id]
    );

    const prices = priceData.map((data) => <tr key={data.id} onClick={() => setSelectedPrice(data.id)}>
        <td>{data.date}</td>
        <td>{data.price}</td>
        <td>{data.source}</td>
    </tr>)

    const addNewPrice = () => {
        console.log('New Price')
    };

    const deletePrice = () => {

    };

    return (
        <div style={{width: 700, height: '100%', paddingLeft: 15}}>
            <Card style={{height: '100%'}}>
                <Card.Header
                    style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderBottom: 0}}>
                    <div style={{display: "flex"}}>
                        <div style={{padding: 5}}>Prices</div>
                        <PlusMinusButtonGroup save={addNewPrice} delete={deletePrice}/>
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
        </div>
    )
};
export default InstrumentPrices;