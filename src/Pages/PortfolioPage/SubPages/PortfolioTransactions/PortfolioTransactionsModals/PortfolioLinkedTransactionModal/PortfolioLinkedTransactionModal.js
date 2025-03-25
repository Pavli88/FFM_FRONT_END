import CustomModal from "../../../../../../components/Modals/Modals";
import fetchAPI from "../../../../../../config files/api";
import {useContext, useState} from "react";
import InputField from "../../../../../../components/InputField/InputField";
import PortfolioContext from "../../../../../../context/portfolio-context";
import DateContext from "../../../../../../context/date-context";

const PortfolioLinkedTransactionModal = ({ show, close, parentID }) => {
    const { selectedPortfolio } = useContext(PortfolioContext);
    const { currentDate } = useContext(DateContext);

    const [formData, setFormData] = useState({
        quantity: null,
        price: null,
        fx_rate: null,
        trade_date: currentDate,
        optional: { broker_id: null }
    });

    const [errors, setErrors] = useState({});

    const handleChange = (key, value) => {
        setFormData(prev => {
            if (key === "optional") {
                return {
                    ...prev,
                    optional: {
                        ...prev.optional,
                        broker_id: parseFloat(value)
                    }
                };
            }
            return {
                ...prev,
                [key]: value
            };
        });
    };

    const validateForm = () => {
        let newErrors = {};
        if (formData.quantity === null || formData.quantity === "") newErrors.quantity = "Quantity is required";
        if (formData.price === null || formData.price === "") newErrors.price = "Price is required";
        if (formData.fx_rate === null || formData.fx_rate === "") newErrors.fx_rate = "FX Rate is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = async () => {
        if (!validateForm()) {
            return;
        }

        const parameters = {
            parent_id: parentID,
            quantity: parseFloat(formData.quantity),
            price: parseFloat(formData.price),
            fx_rate: parseFloat(formData.fx_rate),
            trade_date: formData.trade_date,
            optional: formData.optional
        };

        const response = await fetchAPI.post('portfolios/transactions/new/', parameters);

        if (response.data.success) {
            setFormData({
                parent_id: null,
                quantity: null,
                price: null,
                fx_rate: null,
                trade_date: null,
                optional: { broker_id: null }
            });
            close();
        }
    };

    return (
        <CustomModal show={show} onClose={close} title="Linked Transaction"
            footer={
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitHandler}>
                    Save
                </button>
            }>

            <InputField
                id="quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                label="Quantity"
                min={0.0}
                required
            />
            {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}

            <InputField
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                label="Price"
                min={0.0}
                required
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}

            <InputField
                id="fx_rate"
                type="number"
                name="fx_rate"
                value={formData.fx_rate}
                onChange={(e) => handleChange("fx_rate", e.target.value)}
                label="FX Rate"
                min={0.0}
                required
            />
            {errors.fx_rate && <p className="text-red-500">{errors.fx_rate}</p>}

            <InputField
                id="trade_date"
                type="date"
                name="trade_date"
                value={formData.trade_date}
                onChange={(e) => handleChange("trade_date", e.target.value)}
                label="Trade Date"
                min={selectedPortfolio.inception_date}
                required
            />

            <InputField
                id="broker_id"
                type="number"
                name="broker_id"
                value={formData.optional.broker_id}
                onChange={(e) => handleChange("optional", e.target.value)}
                label="Broker ID"
                min={0.0}
                required
            />

        </CustomModal>
    );
};
export default PortfolioLinkedTransactionModal;