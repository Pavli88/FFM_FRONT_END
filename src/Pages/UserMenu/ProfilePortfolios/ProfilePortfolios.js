import {useContext, useState} from "react";
import PortfolioContext from "../../../context/portfolio-context";
import NewPortfolio from "./NewPortfolio";
import UserContext from "../../../context/user-context";
import ServerContext from "../../../context/server-context";

const ProfilePortfolios = () => {
    const portfolioData = useContext(PortfolioContext).portfolios;
    const [showNewPortModal, setNewPortModal] = useState(false);

    const generalParameters = {
        user: useContext(UserContext).user,
        server: useContext(ServerContext).server
    };

    const portfolios = portfolioData.map((data) => <tr key={data.id} className={'table-row-all'}>
        <td className={'table-row'}>
            <div>
                {data.id}
            </div>
        </td>
        <td className={'table-row'}>
            <div>
                {data.portfolio_name}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{width: '100%'}}>
                {data.portfolio_code}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{width: '100%'}}>
                {data.portfolio_type}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{width: '100%'}}>
                {data.currency}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{
                width: '100%',
                color: data.status === 'Not Funded' ? 'red' : data.status === 'Funded' ? 'green' : 'orange'
            }}>
                {data.status}
            </div>
        </td>
        <td className={'table-row'}>
            <div style={{width: '100%'}}>
                {data.public}
            </div>
        </td>
    </tr>)

    return (
        <div className={'card'}>
            <div className={'card-header'}>
                <div>
                <span>Portfolios</span>
                </div>
                <div style={{position: "absolute", right: 10}}>
                    <button className={'normal-button'} onClick={() => setNewPortModal(true)}>New Portfolio</button>
                </div>
            </div>
            <div style={{height: '100%', overflowY: "scroll"}}>
                <table style={{width: '100%'}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Type</th>
                        <th>Currency</th>
                        <th>Funded</th>
                    </tr>
                    </thead>
                    <tbody style={{width: '100%'}}>
                    {portfolios}
                    </tbody>
                </table>
            </div>
            <NewPortfolio parameters={{...generalParameters}} show={showNewPortModal}
                                  hide={() => setNewPortModal(false)}/>
        </div>
    )
};
export default ProfilePortfolios;