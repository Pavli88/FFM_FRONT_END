import {useContext, useRef} from "react";
import axios from "axios";
import DateContext from "../../../context/date-context";
import PortfolioContext from "../../../context/portfolio-context";
import CustomModal from "../../../components/Modals/Modals";
import ServerContext from "../../../context/server-context";
import fetchAPI from "../../../config files/api";

const NewPortfolio = ({show, close, parameters}) => {
    const server = useContext(ServerContext).server;
    const { fetchPortfolios } = useContext(PortfolioContext);
    const portNameRef = useRef();
    const currencyRef = useRef();
    const portTypeRef = useRef();
    const dateRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        fetchAPI.post(`${server}portfolios/new/portfolio/`, {
            port_name: portNameRef.current.value,
            port_type: portTypeRef.current.value,
            currency: currencyRef.current.value,
            inception_date: dateRef.current.value,
        })
            .then(function (response) {
                if (response.data.msg === 'New Portfolio is created!') {
                    alert('New portfolio is created!')
                    fetchPortfolios();
                    close();
                } else {
                    alert(response.data.msg);
                }
            }).catch((error) => {
            // Handle errors: Show the error message from backend if available
            if (error.response) {
                // Request made and server responded with a status other than 2xx
                console.error("Error Response:", error.response);
                alert(error.response.data.msg);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Error Request:", error.request);
                alert("No response received from server.");
            } else {
                // Something else happened
                console.error("Error Message:", error.message);
                alert("An error occurred while processing your request.");
            }
        });
    };

    return (
        <CustomModal show={show} onClose={close} title={'New Portfolio'}
            footer={
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitHandler}>
                    Save
                </button>
            }>

            <div>

                <div className="block">
                    <label>Portfolio Type</label>
                    <select ref={portTypeRef}>
                        <option value={'Business'}>Business</option>
                        <option value={'Portfolio Group'}>Portfolio Group</option>
                        <option value={'Portfolio'}>Portfolio</option>
                    </select>
                </div>

                <div className="block">
                    <label>Portfolio Name</label>
                    <input ref={portNameRef} type="text" required/>
                </div>

                <div className="block">
                    <label>Portfolio Currency</label>
                    <select ref={currencyRef}>
                        <option value={'USD'}>USD</option>
                        <option value={'HUF'}>HUF</option>
                        <option value={'EUR'}>EUR</option>
                    </select>
                </div>

                <div className="block">
                    <label>Portfolio Inception Date</label>
                    <input ref={dateRef} type="date" defaultValue={useContext(DateContext).currentDate}/>
                </div>

            </div>
        </CustomModal>
    );
};

export default NewPortfolio;