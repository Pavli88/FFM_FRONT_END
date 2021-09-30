import {useState} from "react";
import Button from "react-bootstrap/Button";

const PriceParagraph = (props) => {
    const [price, setPrice] = useState(1.0);
    const [ask, setAsk] = useState(1.0);

    props.socketConnection.onmessage = function (event){
        let responseData = JSON.parse(event.data)
            setPrice(responseData['bid']);
            setAsk(responseData['ask']);
        console.log(JSON.parse(event.data))
    };

    return (
        <div>
            <p>BID: {price}</p>
            <p>ASK: {ask}</p>
        </div>
    );

};

export default PriceParagraph;