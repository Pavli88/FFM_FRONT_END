import { useState } from "react";
import { changeEmail } from "../../../endpoints/authservice";
import InputField from "../../../components/InputField/InputField";
import CustomModal from "../../../components/Modals/Modals";

const ChangeEmailModal = ({ show, close, onEmailChangeSuccess }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChangeEmail = async () => {
        setMessage("");
        setLoading(true);
        setSuccess(false);

        const result = await changeEmail(email);

        setMessage(result.message);
        setSuccess(result.success);
        setLoading(false);

        // Optionally close the modal on success
        if (result.success) {
            setTimeout(() => {
                onEmailChangeSuccess();
                close();
            }, 2000);
        }
    };

    const footerButton = <div className="button-group">
        <button onClick={() => handleChangeEmail()}>
            {loading ? "Updating..." : "Change Email"}
        </button>
    </div>


    return (
        <CustomModal show={show} onClose={close} title={"Change Email"} footer={footerButton}>
            {message && (
                <p className={success ? "success-message" : "error-message"}>
                    {message}
                </p>
            )}

            <InputField
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter new email"
                required
            />

        </CustomModal>
    );
};

export default ChangeEmailModal;
