import { motion } from "framer-motion";
import "./Modals.css"; // Import the CSS file

const CustomModal = ({ show, onClose, title, children, footer }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            {/* Modal Animation */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="modal-container"
            >
                {/* Header */}
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button onClick={onClose} className="icon-button">
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">{children}</div>

                {/* Footer */}
                {footer && <div className="modal-footer">{footer}</div>}
            </motion.div>
        </div>
    );
};

export default CustomModal;
