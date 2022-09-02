import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

// Context
import CalculationContext from "../CalculationPageContext/calculation-context";
import {useContext} from "react";
const CalculationEntities = (props) => {
    const entityData = useContext(CalculationContext)['entityData']
    const entity = useContext(CalculationContext)['entity']
    const saveSelectedEntity = useContext(CalculationContext)['saveSelectedEntity']
    const dataRows = entityData.map((data) => <tr onDoubleClick={()=>saveSelectedEntity([data['portfolio_name'], data['portfolio_code']])} key={data['id']}>
        <td className={'table-row'}>{data['portfolio_name']}</td>
        <td className={'table-row'}>{entity}</td>
        <td className={'table-row'}>{data['portfolio_code']}</td>
    </tr>)
    return(
        <Card className="card main-layout">
            <Card.Title className="card-header-first">Entity</Card.Title>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-row">
                    <tr>
                        <td className="table-header-row">Name</td>
                        <td className="table-header-row">Type</td>
                        <td className="table-header-row">Code</td>
                    </tr>
                    </thead>
                    <tbody style={{height: '100%', overflow: 'scroll'}}>
                    {dataRows}
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};
export default CalculationEntities