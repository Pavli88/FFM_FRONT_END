import Table from "react-bootstrap/Table";
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

const SystemMessages = (props) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'home/system_messages/All',{
                params: {
                    date: props.date,
                }
            })
                .then(response => setMessages(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    const messageData = messages.map((value) =>
        <tr>
            <td>
                {value['msg_type']}
            </td>
            <td>
                {value['msg_sub_type']}
            </td>
            <td>
                {value['msg']}
            </td>
            <td>
                {value['date']}
            </td>
        </tr>
    );

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Processes</Card.Title>
            <div style={{height:'500px',overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                <thead style={{fontSize: 12}}>
                <tr>
                    <th style={{verticalAlign: "middle"}}>Process</th>
                    <th style={{verticalAlign: "middle"}}>Type</th>
                    <th style={{verticalAlign: "middle"}}>Message</th>
                    <th style={{verticalAlign: "middle"}}>Date</th>
                </tr>
                </thead>
                <tbody>
                {messageData}
                </tbody>
            </Table>
            </div>
        </Card>
    );
};

export default SystemMessages;