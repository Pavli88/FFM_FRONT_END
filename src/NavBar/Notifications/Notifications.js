import {useEffect, useState, useRef, useContext} from "react";
import axios from "axios";
import NotificationDropdown from "./NotificationDropDown/NotificationDropDown";
import {
  BsExclamationTriangleFill,
  BsCpuFill,
  BsBellFill
} from 'react-icons/bs';
import './Notifications.css'
import WsContext from "../../context/ws-context";

const Notifications = ({ server }) => {
  const { processNotifications } = useContext(WsContext);
  const [messages, setMessages] = useState([{
    id: 123,
    msg_type: 'Process',         // <- EZ az, amit figyelsz
    msg_sub_type: 'Completed',
    msg: 'Valuation calculation finished.',
    timestamp: '2025-06-02T12:34:56Z'
  }]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const wrapperRef = useRef();

  const riskNotifications = messages.filter(m => m.msg_type === 'Risk');
  // const processNotifications = processNotifications.filter(m => m.msg_type === 'Process');
  const tradeMessages = messages.filter(m => m.msg_type === 'Trade');

  const toggleDropdown = (type) => {
    setActiveDropdown(prev => (prev === type ? null : type));
  };

  const removeMsg = (msgId) => {
    axios.get(`${server}home/verify_sys_msg/${msgId}`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="notifications-wrapper" ref={wrapperRef}>
      <button className="notification-button" onClick={() => toggleDropdown('risk')}>
        <BsExclamationTriangleFill className="notification-icon" />
        {riskNotifications.length > 0 && (
          <span className="notification-badge">{riskNotifications.length}</span>
        )}
      </button>
      {activeDropdown === 'risk' && (
        <NotificationDropdown
          title="Risk Notifications"
          items={riskNotifications}
          emptyText="No risk alerts"
        />
      )}

      <button className="notification-button" onClick={() => toggleDropdown('process')}>
        <BsCpuFill className="notification-icon" />
        {processNotifications.length > 0 && (
          <span className="notification-badge">{processNotifications.length}</span>
        )}
      </button>
      {activeDropdown === 'process' && (
        <NotificationDropdown
          title="Process Notifications"
          items={processNotifications}
          emptyText="No process alerts"
        />
      )}

      <button className="notification-button" onClick={() => toggleDropdown('general')}>
        <BsBellFill className="notification-icon" />
        {messages.length > 0 && (
          <span className="notification-badge">{messages.length}</span>
        )}
      </button>
      {activeDropdown === 'general' && (
        <NotificationDropdown
          title="All Notifications"
          items={messages}
          emptyText="No notifications"
        />
      )}
    </div>
  );
};

export default Notifications