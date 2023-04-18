import ServerContext from "../../../../context/server-context";
import {useContext} from "react";
import Card from "react-bootstrap/Card";
import PlusMinusButtonGroup from "../../../../components/PlusMinusButtonGroup/PlusMinusButtonGroup";
import {BsDash, BsPlus} from "react-icons/bs";

const InstrumentPrices = (prop) => {
    const server = useContext(ServerContext)['server'];

    const addNewPrice = () => {
        console.log('New Price')
    };

    const deletePrice = () => {

    };

    return (
        <div style={{width: 500, height: '100%', paddingLeft: 15}}>
            <Card style={{height: '100%'}}>
                <Card.Header
                    style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderBottom: 0}}>
                    <div style={{display: "flex"}}>
                        <div style={{padding: 5}}>Prices</div>
                        <PlusMinusButtonGroup save={addNewPrice} delete={deletePrice}/>
                    </div>
                </Card.Header>
                <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>

                </div>
            </Card>
        </div>
    )
};
export default InstrumentPrices;