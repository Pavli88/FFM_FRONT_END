import {useEffect, useState} from "react";
import axios from "axios";
import {store} from "react-notifications-component";
import { BsGraphDown, BsBell, BsCpu, BsExclamationTriangle} from 'react-icons/bs';

const Notifications = (props) => {
    const startDate = new Date().toISOString().substr(0,10);
    const [date, setDate] = useState(startDate)
    const [messages, setMessages] = useState([]);
    const [riskNotifications, setRiskNotifications] = useState([])
    const [processNotifications, setProcessNotifications] = useState([])
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


    // WS connection to handle websockets
    // useEffect(() => {
    //     const socket = new WebSocket('ws://127.0.0.1:8000/ws/notifications/');
    //
    //         socket.onmessage = function (event) {
    //             const data = JSON.parse(event.data);
    //             setMessages((prevMessages) => [...prevMessages, data.message]);
    //         };
    //
    //         socket.onclose = function (e) {
    //             console.error('WebSocket closed unexpectedly');
    //         };
    //
    //         return () => socket.close();
    // }, [])

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

    return (
        <div style={{display: "flex", marginRight: 15}}>
            <div className="notification-container">
                <button className="notification-button" onClick="toggleNotifications()">
                    <span className="notification-icon"><BsExclamationTriangle/></span>
                    <span className="notification-badge"
                          id="notification-badge">{riskNotifications.length}</span>
                </button>
            </div>
            <div className="notification-container">
                <button className="notification-button" onClick="toggleNotifications()">
                    <span className="notification-icon"><BsGraphDown/></span>
                    <span className="notification-badge"
                          id="notification-badge">34</span>
                </button>
            </div>
            <div className="notification-container">
                <button className="notification-button" onClick="toggleNotifications()">
                    <span className="notification-icon"><BsCpu/></span>
                    <span className="notification-badge"
                          id="notification-badge">{processNotifications.length}</span>
                </button>
            </div>
            <div className="notification-container">
                <button className="notification-button" onClick="toggleNotifications()">
                    <span className="notification-icon"><BsBell/></span>
                    <span className="notification-badge"
                          id="notification-badge">3</span>
                </button>
            </div>
        </div>
    );
};

export default Notifications