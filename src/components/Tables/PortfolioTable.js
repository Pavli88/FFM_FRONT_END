import {useEffect, useState} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const PortfolioTable = (props) => {

    const [portfolioData, setPortfolioData] = useState([])

    useEffect(() => {
            axios.get(props.server + 'portfolios/get_portfolio_data/')
                .then(response => response['data'].map((record) =>
                    <tr key={record['id']}>
                        <td className="table-row-robot-name">{record['portfolio_name']}</td>
                        <td className="table-row-other">{record['portfolio_type']}</td>
                        <td className="table-row-other">{record['currency']}</td>
                        <td className="table-row-other">{record['inception_date']}</td>
                        <td className="table-row-other">{record['status']}</td>
                    </tr>
                ))
                .then(data => setPortfolioData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Table>
            <thead>
            <tr>
                <th className="table-row-robot-name">Portfolio</th>
                <th>Portfolio Type</th>
                <th>Currency</th>
                <th>Inception Date</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {portfolioData}
            </tbody>
        </Table>
    );
};

export default PortfolioTable;