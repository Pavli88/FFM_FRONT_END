import CustomModal from "../../../components/Modals/Modals";
import {useState, useContext} from "react";
import fetchAPI from "../../../config files/api";
import UserContext from "../../../context/user-context";

const InstrumentNew = ({ show, close }) => {
    const userData = useContext(UserContext).userData;

    const [formData, setFormData] = useState({
        name: '',
        country: '',
        group: '',
        type: '',
        currency: '',
        // user: userData?.is_superuser || userData?.is_staff ? String(userData.id) : userData?.id || null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUserChange = (e) => {
        setFormData(prev => ({
            ...prev,
            user: e.target.value === 'None' ? null : e.target.value
        }));
    };

    const submitHandler = async (event) => {
        console.log(formData)
        event.preventDefault();

        try {
            const response = await fetchAPI.post('instruments/new/', formData);
            alert(response.data.message || "Instrument saved successfully!");
            close();
        } catch (error) {
            console.error("Error submitting data:", error);
            if (error.response) {
                alert(error.response.data.error || "Failed to create instrument.");
            } else {
                alert("Network error. Please try again.");
            }
        }
    };

    const optionGenerator = (values) =>
        values.map((data) => (
            <option key={data.value} value={data.value}>
                {data.label}
            </option>
        ));

    const allGroups = [
        { value: 'Bond', label: 'Bond' },
        { value: 'Cash', label: 'Cash' },
        { value: 'CFD', label: 'CFD' },
        { value: 'Equity', label: 'Equity' },
        { value: 'FX', label: 'FX' },
    ];

    const secGroup = (userData?.is_superuser || userData?.is_staff)
        ? allGroups
        : allGroups.filter(g => g.value !== 'Cash' && g.value !== 'CFD');

    const types = {
        Bond: [{value: 'COR', label: 'Corporate'}, {value: 'GOV', label: 'Government'}],
        Cash: [{value: 'Cash', label: 'Cash'}, {value: 'Margin', label: 'Margin'}],
        CFD: [
            {value: 'Bond', label: 'Bond'},
            {value: 'COM', label: 'Commodity'},
            {value: 'Equity', label: 'Equity'},
            {value: 'FX', label: 'Fx'}
        ],
        Equity: [
            {value: 'Equity', label: 'Equity'},
            {value: 'Fund', label: 'Fund'}
        ],
        FX: (userData?.is_superuser || userData?.is_staff)
            ? [
                {value: 'Spot', label: 'Spot'},
                {value: 'Option', label: 'Option'}
            ]
            : [
                {value: 'Option', label: 'Option'}
            ]
    };

    const currencies = [
        'USD', 'EUR', 'HUF', 'AUD', 'NZD', 'JPY', 'HKD', 'DKK',
        'SEK', 'NOK', 'CHF', 'CAD', 'GBP', 'CZK', 'PLN', 'SGD'
    ].map((cur) => ({ value: cur, label: cur }));

    const countries = [
        { value: 'US', label: 'United States' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'HU', label: 'Hungary' },
        { value: 'NON', label: '-' },
    ];

    return (
        <CustomModal show={show} onClose={close} title={'New Instrument'}
            footer={
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitHandler}>
                    Save
                </button>
            }>
            <form onSubmit={submitHandler} className="space-y-4">

                {userData?.is_superuser || userData?.is_staff ? (
                    <div className="block">
                        <label>Owner</label>
                        <select name="user" onChange={handleUserChange} value={formData.user ?? 'None'} required>
                            <option value="None">System</option>
                            <option value={userData.id}>My Instrument</option>
                        </select>
                    </div>
                ) : null}

                <div className="block">
                    <label>Full Name</label>
                    <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="block">
                    <label>Country of Issue</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Country</option>
                        {optionGenerator(countries)}
                    </select>
                </div>

                <div className="block">
                    <label>Group</label>
                    <select
                        name="group"
                        value={formData.group}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Group</option>
                        {optionGenerator(secGroup)}
                    </select>
                </div>

                <div className="block">
                    <label>Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        disabled={!formData.group}
                    >
                        <option value="">Select Type</option>
                        {optionGenerator(types[formData.group] || [])}
                    </select>
                </div>

                <div className="block">
                    <label>Currency</label>
                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Currency</option>
                        {optionGenerator(currencies)}
                    </select>
                </div>
            </form>
        </CustomModal>
    );
};
export default InstrumentNew;