import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "../Tooltips/Tooltip";
import "./Modals.css"; // Import the CSS file

const CustomModal = ({ show, onClose, title, children, tooltip }) => {
    return (
        <AnimatePresence>
            {show && (
                <div className="modal-overlay" onClick={onClose}>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                        className="modal-container"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        {/* Header */}
                        <div className="modal-header">
                            <h2 className="modal-title">
                                {title}
                                {tooltip && <Tooltip text={tooltip}/>}
                            </h2>

                            <button onClick={onClose} className="icon-button" aria-label="Close modal">
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="modal-body">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CustomModal;
