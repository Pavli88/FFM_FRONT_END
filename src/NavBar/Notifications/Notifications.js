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
  const { processNotifications, errorNotifications } = useContext(WsContext);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const wrapperRef = useRef();

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

      <button className="notification-button" onClick={() => toggleDropdown('error')}>
        <BsExclamationTriangleFill className="notification-icon" />
        {errorNotifications.length > 0 && (
          <span className="notification-badge">{errorNotifications.length}</span>
        )}
      </button>
      {activeDropdown === 'error' && (
        <NotificationDropdown
          title="All Error Notifications"
          items={errorNotifications}
          emptyText="No notifications"
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
        {processNotifications.length > 0 && (
          <span className="notification-badge">{processNotifications.length}</span>
        )}
      </button>
      {activeDropdown === 'general' && (
        <NotificationDropdown
          title="All Notifications"
          items={processNotifications}
          emptyText="No notifications"
        />
      )}

    </div>
  );
};

export default Notifications