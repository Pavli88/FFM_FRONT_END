import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../endpoints/authservice";
import InputField from "../../components/InputField/InputField";
import Form from "../../components/Form/Form";
import { passwordPolicyText } from "../../config files/constants";
import "./UserRegistration.css";
import "../../components/Form/Form.css";
import CustomModal from "../../components/Modals/Modals";
import ModalButton from "../../components/Modals/ModalButton";

const UserRegistration = ({ show, close }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();

const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    const response = await registerUser(username, email, password);

    if (!response.success) {
        setErrors(response.errors);
        return;
    }

    // ✅ Clear inputs and redirect if successful
    setUsername("");
    setEmail("");
    setPassword("");
    alert("Registration successful!");
    history.push("/login");
};


    return (
        <CustomModal show={show} onClose={close} title={"Registration"}>
                <Form onSubmit={handleRegister} className="form-body">
                    <InputField
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors({});
                        }}
                        placeholder="Enter username"
                        label="Username"
                        required
                        error={errors.username}
                    />

                    <InputField
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({});
                        }}
                        placeholder="Enter email"
                        label="Email"
                        required
                        error={errors.email}
                    />

                    <InputField
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({});
                        }}
                        placeholder="Enter password"
                        label="Password"
                        tooltipText={passwordPolicyText}
                        error={errors.password}
                    />

                    {errors.general && <p className="error general-error">{errors.general}</p>}
                    <div>
                        <ModalButton type="submit" label={"Register"}
                                     variant="primary"/>
                    </div>
                </Form>
        </CustomModal>
    );
};

export default UserRegistration;
