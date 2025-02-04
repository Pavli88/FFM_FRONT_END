import Card from "react-bootstrap/Card";
import CalculationContext from "../CalculationPageContext/calculation-context";
import {useContext} from "react";

const CalculationPortfoliosTable = (props) => {
    const savePortfolios = useContext(CalculationContext).saveSelectedPortfolios;
    const selectedPortfolios = useContext(CalculationContext).selectedPortfolios;

    const portfolios = props.data.map((data) => <tr key={data.id} className={'table-row-all'}>
        <td className={'table-row'}>
            <div>
                <input type={'checkbox'}
                       onClick={(e) => savePortfolios(e.target.checked ?
                           [...selectedPortfolios, data.portfolio_code] :
                           selectedPortfolios.filter((item) => item !== data.portfolio_code))}/>
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
    </tr>)
    return (
        <div className='card' style={{backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px'}}>
            <div style={{height: '100%', overflowY: "scroll"}}>
                <table style={{width: '100%'}}>
                    <tbody style={{width: '100%'}}>
                    {portfolios}
                    </tbody>
                </table>
            </div>
        </div>
    )
};
export default CalculationPortfoliosTable;