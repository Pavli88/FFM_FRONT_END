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
            {Object.entries(item).map(([key, value]) => (
              <div key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
                {key.toLowerCase().includes('date') && value
                  ? new Date(value).toLocaleString()
                  : String(value)}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};



export default NotificationDropdown;