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
            <div><strong>Portfolio:</strong> {item.portfolio_code}</div>
            <div><strong>Process:</strong> {item.process}</div>
            <div><strong>Status:</strong> {item.status}</div>
            <div><strong>Exception:</strong> {item.exception}</div>
            <div><strong>Comment:</strong> {item.comment}</div>
            <div><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</div>
          </div>
        ))
      )}
    </div>
  );
};


export default NotificationDropdown;