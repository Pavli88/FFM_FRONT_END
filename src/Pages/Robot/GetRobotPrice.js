import {useEffect, useState} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

const GetRobotLastPrice = (props) => {

    const [price, setPrice] = useState(0.0);
    const [date, setDate] = useState();

    useEffect(() => {
            axios.get(props.server + 'robots/get_last_price/', {
                params: {
                    robot: props.robot,
                    // start_date: props.start_date,
                    // end_date: props.end_date,
                }
            })
                .then(function(response){
                    setPrice(response['data']['price']);
                    setDate(response['data']['date']);
                    props.getPrice(price);
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Form.Group>
            <Form.Label>Price - {date}</Form.Label>
            <h2>{Math.round((price) * 100) / 100}</h2>
        </Form.Group>
    );
};

export default GetRobotLastPrice;
