import {BsDash, BsPlus} from "react-icons/bs";
import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import {useContext} from "react";
import PortfolioContext from "../../../context/portfolio-context";

const ProfilePortfolios = () => {
    const portfolioData = useContext(PortfolioContext).portfolios;
    console.log(portfolioData)
    const portfolios = portfolioData.map((data) => <tr key={data.id}>
        <td className={'signal-row'}>
            <div>
                {data.portfolio_name}
            </div>
        </td>
        <td className={'signal-row'}>
            <div style={{width: '100%'}}>
                {data.portfolio_code}
            </div>
        </td>
        <td className={'signal-row'}>
            <div style={{width: '100%'}}>
                {data.portfolio_type}
            </div>
        </td>
        <td className={'signal-row'}>
            <div style={{width: '100%'}}>
                {data.currency}
            </div>
        </td>
        <td className={'signal-row'}>
            <div style={{width: '100%'}}>
                {data.status}
            </div>
        </td>
        <td className={'signal-row'}>
            <div style={{width: '100%'}}>
                {data.public}
            </div>
        </td>
    </tr>)
    const header = <div style={{display: "flex"}}>
        <div style={{width: '90%'}}>
            <div style={{margin: 0, height: '100%', verticalAlign: "middle", padding: 5}}>Portfolios</div>
        </div>
        <div style={{margin: 5}}>
            <button style={{border: 0}}><BsPlus style={{fontSize: 24}}/>
            </button>
        </div>
        <div style={{margin: 5}}>
            <button style={{border: 0}}><BsDash style={{fontSize: 24}}/></button>
        </div>
    </div>
    return(
        <CardWithHeader headerContent={header}>
            <div style={{display: 'flex', height: '100%'}}>
                <div style={{width: '30%', height: '100%'}}>

                </div>
                <div style={{width:'70%', height: '100%', overflow: "scroll"}}>
                    <table style={{width: '100%', height: '100%'}}>
                        <tbody style={{width: '100%'}}>
                        {portfolios}
                        </tbody>
                    </table>
                </div>
            </div>
        </CardWithHeader>
    )
};
export default ProfilePortfolios;