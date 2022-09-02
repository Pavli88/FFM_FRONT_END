import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//CSS
import "./InstrumentPrices.css"

import InstrumentPricesTable from "./InstrumentPricesTable";
import InstrumentPriceOperations from "./InstrumentPriceOperations";

//Contexts
import ServerContext from "../../../context/server-context";
import {useContext} from "react";

const InstrumentPrices = (prop) => {
    const server = useContext(ServerContext)['server'];

    return(

        <InstrumentPricesTable server={server}/>

    );
};
export default InstrumentPrices;