import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import {useState} from "react";

const PortfolioDataImport = (props) => {
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const [importStream, setImportStream] = useState('NAV');
    const handleOnChange = (e) => {
        setFile(e.target.files[0]);

    };
    const fileReader = new FileReader();
    const handleClose = () => {
        props.hide();
    };
    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });
        setArray(array);
    };
    const importStreamHandler = (event) => {
        setImportStream(event.target.value)
    };
    const previewImportStream = () => {
        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                csvFileToArray(csvOutput);
            };

            fileReader.readAsText(file);
        }
    };
    const submitHandler = (event) => {
        event.preventDefault();

        axios.post(props.server + 'portfolios/import/' + importStream, {
            data: array,
        })
            .then(function (response) {
                console.log(response)
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    const headerKeys = Object.keys(Object.assign({}, ...array));
    return (
        <>
            <Modal show={props.show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Data Import</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{height:'500px'}}>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Row>
                            <Col>
                                <Form.Control onChange={importStreamHandler} as="select">
                                    <option value={'NAV'}>NAV</option>
                                    <option value={'Holdings'}>Holdings</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control onChange={handleOnChange} type={'file'} accept={'.csv'}
                                                  placeholder="File"
                                                  required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={previewImportStream}>
                                    Preview
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '90%'}}>
                        <table style={{width:'100%'}}>
                        <thead>
                        <tr key={"header"}>
                            {headerKeys.map((key) => (
                                <th>{key}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        {array.map((item) => (
                            <tr key={item.id}>
                                {Object.values(item).map((val) => (
                                    <td>{val}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};
export default PortfolioDataImport;