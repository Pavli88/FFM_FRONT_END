import {useContext, useState} from "react";
import PortfolioContext from "../../../context/portfolio-context";
import NewPortfolio from "./NewPortfolio";
import ServerContext from "../../../context/server-context";
import axios from "axios";

const ProfilePortfolios = () => {
    const server = useContext(ServerContext).server;
    const portfolioData = useContext(PortfolioContext).portfolios;
    const { fetchPortfolios } = useContext(PortfolioContext);
    const [showNewPortModal, setNewPortModal] = useState(false);
    const [selectedPortfolios, setSelectedPortfolios] = useState([]);

    const toggleSelection = (id) => {
        setSelectedPortfolios(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(portId => portId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };
    console.log(selectedPortfolios);

    const deletePortfolios = async () => {
        try {
            if (selectedPortfolios.length === 0) {
                alert("No portfolios selected for deletion.");
                return;
            }

            const response = await axios.post(`${server}portfolios/delete/portfolios/`, {
                ids: selectedPortfolios
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem("access")}`},
            });

            if (response.data.success) {
                fetchPortfolios();
                alert(response.data.message);
            } else {
                alert("Failed to delete portfolios. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting portfolios:", error);
            alert("An error occurred while deleting portfolios. Please try again later.");
        }
    };


    const confirmAndDelete = () => {
        if (window.confirm("Deleting portfolios will result in deleting all related transactions, holdings and NAV values! " +
            "Are you sure you want to delete the selected portfolios?")) {
            deletePortfolios();
        }
    };

    const portfolios = portfolioData.map((data) => (
        <tr key={data.id} className={'table-row-all'}>
            <td className={'table-row'}>
                <input
                    type="checkbox"
                    checked={selectedPortfolios.includes(data.id)}
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
                <button className={'normal-button'} onClick={() => confirmAndDelete()}>Delete Selected</button>
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
            <NewPortfolio show={showNewPortModal} close={() => setNewPortModal(false)} />
        </div>
    );
};

export default ProfilePortfolios;