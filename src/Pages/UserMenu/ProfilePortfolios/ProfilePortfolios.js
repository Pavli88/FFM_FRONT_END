import {useContext, useState} from "react";
import PortfolioContext from "../../../context/portfolio-context";
import NewPortfolio from "./NewPortfolio";
import UserContext from "../../../context/user-context";
import ServerContext from "../../../context/server-context";
import axios from "axios";

const ProfilePortfolios = () => {
    const server = useContext(ServerContext).server;
    const portfolioData = useContext(PortfolioContext).portfolios;
    const [showNewPortModal, setNewPortModal] = useState(false);
    const [selectedPortfolios, setSelectedPortfolios] = useState(new Set());

    const generalParameters = {
        user: useContext(UserContext).user,
        server: useContext(ServerContext).server
    };

    const toggleSelection = (id) => {
        setSelectedPortfolios(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
    };

    const deletePortfolios = async () => {
        const response = await axios.post(`${server}portfolios/delete/portfolios/`, {
            ids: Array.from(selectedPortfolios)
        });
        if (response.data.success) {
            alert(response.data.message)
        }
    };

    const portfolios = portfolioData.map((data) => (
        <tr key={data.id} className={'table-row-all'}>
            <td className={'table-row'}>
                <input
                    type="checkbox"
                    checked={selectedPortfolios.has(data.id)}
                    onChange={() => toggleSelection(data.id)}
                />
            </td>
            <td className={'table-row'}>{data.id}</td>
            <td className={'table-row'}>{data.portfolio_name}</td>
            <td className={'table-row'} style={{ width: '100%' }}>{data.portfolio_code}</td>
            <td className={'table-row'} style={{ width: '100%' }}>{data.portfolio_type}</td>
            <td className={'table-row'} style={{ width: '100%' }}>{data.currency}</td>
            <td className={'table-row'} style={{ width: '100%', color: data.status === 'Not Funded' ? 'red' : data.status === 'Funded' ? 'green' : 'orange' }}>
                {data.status}
            </td>
            {/*<td className={'table-row'} style={{ width: '100%' }}>{data.public}</td>*/}
        </tr>
    ));

    return (
        <div className={'card'}>

            <div className={'card-header'}>
                Portfolios
            </div>

            <div style={{display: "flex"}}>
                <button className={'normal-button'} onClick={() => setNewPortModal(true)}>New Portfolio</button>
                <button className={'normal-button'} onClick={() => deletePortfolios()}>Terminate</button>
                <button className={'normal-button'} onClick={() => deletePortfolios()}>Delete Selected</button>
            </div>

            <div style={{height: '100%', overflowY: 'scroll', paddingTop: 10}}>
                <table style={{width: '100%'}}>
                    <thead style={{width: '100%'}}>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Type</th>
                        <th>Currency</th>
                        <th>Funded</th>
                    </tr>
                    </thead>
                    <tbody>{portfolios}</tbody>
                </table>
            </div>
            <NewPortfolio parameters={{ ...generalParameters }} show={showNewPortModal} close={() => setNewPortModal(false)} />
        </div>
    );
};

export default ProfilePortfolios;