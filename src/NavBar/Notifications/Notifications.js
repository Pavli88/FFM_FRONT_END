import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import axios from "axios";
import {store} from "react-notifications-component";
import { BsGraphDown, BsBell, BsCpu, BsExclamationTriangle} from 'react-icons/bs';

const Notifications = (props) => {
    const startDate = new Date().toISOString().substr(0,10);
    const [date, setDate] = useState(startDate)
    const [messages, setMessages] = useState([]);
    const tradeMessages = []
    const processMessages = []

    messages.forEach(function (item) {
        if (item['msg_type'] === 'Process') {
            processMessages.push(item)
        }
        if (item['msg_type'] === 'Trade') {
            tradeMessages.push(item)
        }
    })

    // if (tradeMessages.length > 0){
    //     document.getElementById('notTrades').style.backgroundColor='red'
    // }

    // Fetch the data periodically
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(props.server + 'home/system_messages/not_verified', {
                params: {
                    date: date,
                }
            })
                .then(response => setMessages(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, 1000*900);
        return () => clearInterval(interval);
    }, [])

    const removeMsg = (msg) => {
        axios.get(props.server + 'home/verify_sys_msg/' + msg)
            .then(response => console.log(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const procNotHandler = () => {
        processMessages.forEach(function (item) {
            store.addNotification({
                title: item['msg_type'] + ' - ' + item['msg_sub_type'],
                message: item['msg'],
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                onRemoval: () => {
                    removeMsg(item['id']);
                }
            })
        })
    };

    const tradeNotHandler = () => {
        tradeMessages.forEach(function (item) {
            store.addNotification({
                title: item['msg_type'] + ' - ' + item['msg_sub_type'],
                message: item['msg'],
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                onRemoval: () => {
                    removeMsg(item['id']);

                }
            })
        })
    };

    return (
        <div style={{display: "flex"}}>
            <div style={{margin: 5}}>
                <button className={'alert-button'}>
                    <BsExclamationTriangle style={{fontSize: '20px', fontWeight: 'bold'}}/>
                </button>
            </div>

            <div style={{margin: 5}}>
                <button className={'alert-button'}>
                    <BsGraphDown style={{fontSize: '20px', fontWeight: 'bold'}}/>
                </button>
            </div>

            <div style={{margin: 5}}>
                <button className={'alert-button'}>
                    <BsCpu style={{fontSize: '20px', fontWeight: 'bold'}}/>
                </button>
            </div>
            <div style={{margin: 5}}>
                <button className={'alert-button'}>
                    <BsBell style={{fontSize: '20px', fontWeight: 'bold'}}/>
                </button>
            </div>
        </div>
    );
};

export default Notifications