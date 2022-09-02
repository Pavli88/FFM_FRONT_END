import Button from "react-bootstrap/Button";
import axios from "axios";

const InstrumentDelete = (props) => {
    const deleteInstrument = () => {
        axios.post(props.server + 'instruments/delete_instrument/', {
            id: props.instrumentID,
        })
            .then(response => alert(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return(
        <Button onClick={deleteInstrument}>Delete</Button>
    );
};
export default InstrumentDelete;