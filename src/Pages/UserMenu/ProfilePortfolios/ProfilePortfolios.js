import {useContext, useState} from "react";
import PortfolioContext from "../../../context/portfolio-context";
import NewPortfolio from "./NewPortfolio";
import { FaPlus, FaTrashAlt, FaCheckSquare } from "react-icons/fa";
import fetchAPI from "../../../config files/api";

const ProfilePortfolios = () => {
    const portfolioData = useContext(PortfolioContext).portfolios;
    const { fetchPortfolios } = useContext(PortfolioContext);
    const [showNewPortModal, setNewPortModal] = useState(false);
    const [selectedPortfolios, setSelectedPortfolios] = useState([]);

    const toggleSelection = (id) => {
        setSelectedPortfolios(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(portId => portId !== id)
                : [...prevSelected, id]
        );
    };

    const deletePortfolios = async () => {
        try {
            if (selectedPortfolios.length === 0) {
                alert("No portfolios selected for deletion.");
                return;
            }

            const response = await fetchAPI.post('portfolios/delete/portfolios/', {
                ids: selectedPortfolios
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
        if (window.confirm(
            "Deleting portfolios will result in deleting all related transactions, holdings, and NAV values! " +
            "Are you sure you want to delete the selected portfolios?"
        )) {
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
            <td className={'table-row'} style={{
                width: '100%',
                color: data.status === 'Not Funded' ? 'red' : data.status === 'Funded' ? 'green' : 'orange'
            }}>
                {data.status}
            </td>
        </tr>
    ));

    return (
        <div className={'card'}>
            <div className={'card-header'} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label>Portfolios</label>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button className={'icon-button'} onClick={() => setNewPortModal(true)} title="Add New Portfolio">
                        <FaPlus size={20} />
                    </button>
                    <button className={'icon-button'} title="Terminate Selected">
                        <FaCheckSquare size={20} />
                    </button>
                    <button className={'icon-button'} onClick={() => confirmAndDelete()} title="Delete Selected">
                        <FaTrashAlt size={20} />
                    </button>
                </div>
            </div>

            <div style={{ height: '100%', overflowY: 'scroll', paddingTop: 10 }}>
                <table style={{ width: '100%' }}>
                    <thead style={{ width: '100%' }}>
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