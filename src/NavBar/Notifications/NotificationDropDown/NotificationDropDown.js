import './NotificationDropDown.css'

const NotificationDropdown = ({ title, items = [], emptyText = 'No notifications' }) => {
  return (
    <div className="notification-dropdown">
      <h4 className="notification-dropdown-title">{title}</h4>
      {items.length === 0 ? (
        <div className="notification-empty">{emptyText}</div>
      ) : (
        items.map((item, idx) => (
          <div key={idx} className="notification-item">
            {item.msg_type ? `${item.msg_type}: ` : ''}{item.msg}
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationDropdown;