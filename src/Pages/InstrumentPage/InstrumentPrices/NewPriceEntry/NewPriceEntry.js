import CustomModal from "../../../../components/Modals/Modals";
import Select from "react-select";
import {useContext, useRef, useState} from "react";
import ServerContext from "../../../../context/server-context";
import DateContext from "../../../../context/date-context";
import fetchAPI from "../../../../config files/api";
import InstrumentSearchContext from "../../InstrumentPageContext/instrument-search-context";

const NewPriceEntry = ({show, close, refreshPrices}) => {
    const currentDate = useContext(DateContext).currentDate;
    const [priceSource, setPriceSource] = useState();
    const dateRef = useRef();
    const priceRef = useRef();
    const selectedInstrument = useContext(InstrumentSearchContext).selectedInstrument;

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            // Construct request data
            const requestData = {
                instrument_id: selectedInstrument.id,
                date: dateRef.current.value,
                price: priceRef.current.value,
                source: priceSource
            };

            // Send the POST request
            const response = await fetchAPI.post('instruments/new/price/', requestData);

            // Show success message
            alert(response.data.message || "Instrument saved successfully!");
            refreshPrices();
            close(); // Close modal after successful submission

        } catch (error) {
            console.error("Error submitting data:", error);

            // Handle errors from backend
            if (error.response) {
                alert(error.response.data.error || "Failed to create instrument.");
            } else {
                alert("Network error. Please try again.");
            }
        }
    };

    const priceSources = [
        {value: "oanda", label: "Oanda"},
        {value: "saxo", label: "Saxo Bank"},
    ];

    return (
        <CustomModal show={show} onClose={close} title={'New Price'}
                     footer={
                         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitHandler}>
                             Save
                         </button>
                     }>
            <div style={{width: '100%'}}>

                <div className={'block'}>
                    <label>Date</label>
                    <input ref={dateRef} defaultValue={currentDate} type={'date'}></input>
                </div>

                <div className={'block'}>
                    <label>Price</label>
                    <input ref={priceRef} type={'number'}></input>
                </div>

                <div className={'block'}>
                    <label>Source</label>

                    <Select
                        options={priceSources}
                        defaultValue={priceSource}
                        onChange={(e) => setPriceSource(e.value)}
                    />

                </div>

            </div>
        </CustomModal>
    );
};
export default NewPriceEntry;