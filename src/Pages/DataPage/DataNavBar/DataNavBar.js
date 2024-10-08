import Card from "react-bootstrap/Card";
import {BsArrowLeftSquare} from "react-icons/bs";
import Select from 'react-select'
import {useContext, useState} from "react";
import axios from "axios";
import ServerContext from "../../../context/server-context";
import Papa from 'papaparse';

const DataNavBar = (props) => {
    const server = useContext(ServerContext).server;
    const [csvData, setCsvData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [file, setFile] = useState();
    const [process, setProcess] = useState('test');

    const postData = async(file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append('process', process)
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        const response = await axios.post(server + 'data/import/', formData, config)
        alert(response.data.response)
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true, // if you want the first row to be the header
                skipEmptyLines: true,
                complete: function (results) {
                    const rows = results.data;
                    const headers = results.meta.fields;
                    setHeaders(headers); // Set table headers
                    setCsvData(rows);    // Set parsed data
                },
            });
        }
        setFile(file)
    };

    return (
        <div style={{width: '100%', padding: 15}}>
            <div className={'card'}>
                <div style={{display: "flex", paddingLeft: 15, paddingTop: 5, paddingBottom: 5, paddingRight: 15}}>
                    <div style={{paddingTop: 0}}>
                        <span className={'input-label'} style={{textAlign: "left"}}>
                            Import Stream
                        </span>
                    </div>
                    <div style={{paddingLeft: 15, paddingTop: 0, width: 500}}>
                        <Select
                            options={[
                                {value: 'prices', label: 'Prices'},
                                {value: 'fx', label: 'FX Rates'},
                                {value: 'nav', label: 'NAV'},
                                {value: 'instrument', label: 'Instrument'},
                                {value: 'transaction', label: 'Transactions'},
                            ]}
                            isClearable
                            onChange={(e) => setProcess(e.value)}
                            className={'instrument-search-input-field'}

                        />
                    </div>
                    <div style={{paddingLeft: 15, paddingTop: 0}}>
                        <input type={'file'} accept=".csv" onChange={handleFileUpload}/>
                    </div>
                    <div style={{paddingLeft: 10, paddingTop: 0, paddingBottom: 0}}>
                        <button className={'get-button'} onClick={() => postData(file)}><BsArrowLeftSquare/> Import
                        </button>
                    </div>
                </div>
            </div>


            <div className={'card'} style={{marginTop: 15}}>
                {csvData.length > 0 && (
                    <table>
                        <thead>
                        <tr>
                            {/* Render table headers dynamically */}
                            {headers.map((header, index) => (
                                <th key={index} style={{padding: '8px'}}>{header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {/* Render table rows dynamically */}
                        {csvData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {headers.map((header, cellIndex) => (
                                    <td key={cellIndex} style={{padding: '8px'}}>{row[header]}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

            </div>


        </div>

    )
};
export default DataNavBar;