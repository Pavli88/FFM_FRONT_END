import Dropdown from "react-bootstrap/Dropdown";
import {useContext} from "react";
import EnvContext from "../context/env-context";

const NavEnvironment = () => {
    const saveEnvironment = useContext(EnvContext)['saveEnvironment'];
    return (
        <Dropdown onSelect={(env) => saveEnvironment(env)} style={{margin: '5px'}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Env
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="live">Live</Dropdown.Item>
                <Dropdown.Item eventKey="demo">Demo</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
export default NavEnvironment;