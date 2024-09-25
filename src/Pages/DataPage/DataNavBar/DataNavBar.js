import Card from "react-bootstrap/Card";
import {BsArrowLeftSquare} from "react-icons/bs";
import Select from 'react-select'
import {useContext, useState} from "react";
import axios from "axios";
import ServerContext from "../../../context/server-context";
const DataNavBar = (props) => {
    const server = useContext(ServerContext).server;
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const fileReader = new FileReader();
    // console.log(file)
    const handleOnChange = (e) => {
        setFile(e.target.files[0]);

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        }

    };

    const postData = async(file) => {
        const formData = new FormData();
        formData.append("file", file);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        const response = await axios.post(server + 'data/import/', formData, config)
        alert(response.data.response)
    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf('\n') + 1).split('\n').filter((str) => str !== '');
        const array = csvRows.map(i => {
            const values = i.split(',');
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });
        setArray(array);
    };

    const headerKeys = Object.keys(Object.assign({}, ...array));

    return(
        <div style={{width: '100%', padding: 15}}>
            <Card>
                <div style={{display: "flex", paddingLeft: 15, paddingTop: 5, paddingBottom: 5, paddingRight: 15}}>
                    <div style={{paddingTop: 0}}>
                        <span className={'input-label'} style={{textAlign: "left"}}>
                            Import Stream
                        </span>
                    </div>
                    <div style={{paddingLeft: 15, paddingTop: 0, width: 500}}>
                        <Select
                            options={[
                                {value: 'Prices', label: 'Prices'},
                                {value: 'NAV', label: 'NAV'},
                                {value: 'Instrument', label: 'Instrument'},
                                {value: 'Transactions', label: 'Transactions'},
                            ]}
                            isClearable
                            // onChange={(e) => e === null ? setSelectedGroup([]) : setSelectedGroup(e)}
                            className={'instrument-search-input-field'}

                        />
                    </div>
                    <div style={{paddingLeft: 15, paddingTop:0}}>
                        <input type={'file'} onChange={handleOnChange}/>
                    </div>
                    <div style={{paddingLeft: 10, paddingTop: 0, paddingBottom: 0}}>
                        <button className={'get-button'} onClick={() => postData(file)}><BsArrowLeftSquare/>  Import</button>
                    </div>
                </div>

            </Card>

            <div style={{paddingTop: 15}}>
                <Card>
                    <div>
                        <table>
                            <thead>
                            <tr key={"header"}>
                                {headerKeys.map((key) => (
                                    <th>{key}</th>
                                ))}
                            </tr>
                            </thead>

                            <tbody>
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
                </Card>
            </div>

        </div>

    )
};
export default DataNavBar;