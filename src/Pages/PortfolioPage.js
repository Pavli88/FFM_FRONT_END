import {useState} from "react";
import ListGenerator from "../React Functions/ListGenerator";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form";
import RiskEntryModal from "../components/Modals";

const PortfolioPage = () => {

    const thisList = [1,2,3];

    const [a, b] = useState(1)

    // fetch('http://127.0.0.1:8000/robots/get_robots/')
    //     .then(response => {
    //         response.json()
    //     }).catch((error) => {
    //         console.error('Error Message:', error);
    //     });

    const buttonClicked = () =>{
        b(a=>a+1)
    }

    return (
        <Container>
            <h2>Portfolio Page</h2>
            <h2>{a}</h2>
            <ListGenerator numbers={thisList}/>
            <Form.Control as={"select"}>
                <option>1</option>
                <option>1</option>
            </Form.Control>
            <Button variant="primary" onClick={buttonClicked}>Button 1</Button>

        </Container>
    );
};

export default PortfolioPage;