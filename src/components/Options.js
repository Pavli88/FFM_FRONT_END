import {useEffect, useState} from "react";
import axios from "axios";

const OptionLoader = (props) => {

    const [rawData, setRawData] = useState('');

    useEffect(() => {
            axios.get(props.url, {params: props.params})
                .then(response => response['data'].map((record) =>
                    <option key={record['id']} value={record[props.code]}>{record[props.value]}</option>))
                .then(data => setRawData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        rawData
    );
};

export default OptionLoader;