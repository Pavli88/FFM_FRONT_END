import Card from "react-bootstrap/Card";
import {Nav} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
const PortfolioCashEntry = () => {
    return(
        <div>
            <div style={{margin: 10}}>
                <Form.Label>Transaction Type</Form.Label>
                <Form.Control as="select">
                    <option value={'Subscription'}>Subscription</option>
                    <option value={'Redemption'}>Redemption</option>
                    <option value={'Dividend'}>Dividend</option>
                    <option value={'Interest Received'}>Interest Received</option>
                    <option value={'Interest Paid'}>Interest Paid</option>
                    <option value={'Commission'}>Commission</option>
                </Form.Control>
            </div>

            <div style={{margin: 10}}>
                <Form.Label>Currency</Form.Label>
                <Form.Control as="select">
                    <option value={'USD'}>USD</option>
                    <option value={'EUR'}>EUR</option>
                    <option value={'HUF'}>HUF</option>
                </Form.Control>
            </div>

            <div style={{margin: 10}}>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date"/>
            </div>

            <div style={{margin: 10}}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="text"/>
            </div>
        </div>
    )
};
export default PortfolioCashEntry;