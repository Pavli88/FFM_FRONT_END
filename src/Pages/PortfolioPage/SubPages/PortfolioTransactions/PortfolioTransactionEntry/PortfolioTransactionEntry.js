import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {useRef} from "react";
const PortfolioTransactionEntry = (props) => {
    const securityRef = useRef();
    const currencRef = useRef();
    const dateRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const costRef = useRef();
    const typeRef = useRef();
    const submitHandler = () => {
        console.log(props.server)
        axios.post(props.server + 'portfolios/new/transaction/', {
            portfolio_code: props.portfolio,
            /*security: securityRef.current.value,
            quantity: quantityRef.current.value,
            price: priceRef.current.value,
            currency: currencRef.current.value,
            trading_cost: costRef.current.value,
            transaction_type: typeRef.current.value,*/

        })
                .then(response => console.log(response.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
    };
    return(
       <div>
           <div style={{margin: 10}}>
               <Form.Label>Transaction Type</Form.Label>
               <Form.Control as="select">
                   <option value={'Purchase'}>Purchase</option>
                   <option value={'Sale'}>Sale</option>
               </Form.Control>
           </div>

           <div style={{margin: 10, display: 'flex'}}>
               <div>
                   <Form.Label>Security</Form.Label>
                   <Form.Control type="text"/>
               </div>
               <div>
                   <button>Get</button>
               </div>
           </div>

           <div style={{margin: 10}}>
               <Form.Label>Currency</Form.Label>
               <Form.Control type="text" disabled/>
           </div>

            <div style={{margin: 10}}>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date"/>
            </div>

            <div style={{margin: 10}}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number"/>
            </div>

           <div style={{margin: 10}}>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number"/>
            </div>
           <div>
               <button onClick={submitHandler}>Save</button>
           </div>
       </div>
    )
};
export default PortfolioTransactionEntry;