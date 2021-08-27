import {useState} from "react";
import Button from "react-bootstrap/Button";

const PriceParagraph = (props) => {
    const [price, setPrice] = useState(1.0);

    props.socketConnection.onmessage = function (event){
        let responseData = JSON.parse(event.data)
            setPrice(responseData['value'])
        console.log(JSON.parse(event.data))
    };

    return (
        <p>{price}</p>
    );

};

export default PriceParagraph;