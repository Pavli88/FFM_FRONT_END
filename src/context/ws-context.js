import React from "react";
import {useState, useEffect} from "react";
const WsContext = React.createContext();

export const WsProvider = ({ children }) => {
    const [wsConnection, setWsConnection] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [processRunning, setProcessRunning] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WS_URL + "connection/");
        setSocket(ws);

        ws.onopen = () => {
            console.log("✅ WebSocket connected");
            setWsConnection(true);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const {type, payload} = data;

            switch (type) {
                case "process.completed":
                    console.log("✅ Process completed: " + payload.message);
                    setProcessRunning(false);
                    break;
                case "notification.message":
                    console.log("🔔 " + payload.message);
                    break;
                case "chat.message":
                    console.log("💬 New chat message:", payload);
                    break;
                case "trade.confirmed":
                    console.log("💸 Trade confirmed!");
                    break;
                default:
                    console.warn("Unknown WS message type:", type);
            }
        };

        ws.onerror = (error) => {
            console.error("❗ WebSocket error:", error);
        };

        ws.onclose = (event) => {
            console.warn("🛑 WebSocket closed:", event.code, event.reason);
            setWsConnection(false);
        };

        return () => ws.close();
    }, []);

    return (
        <WsContext.Provider value={{ wsConnection, socket, lastMessage, processRunning, setProcessRunning}}>
            {children}
        </WsContext.Provider>
    );
};

export default WsContext;