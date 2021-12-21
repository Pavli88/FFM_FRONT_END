import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// CSS
import "../../../PortfolioPage.css"
import "../../../MainCSS.css"
import Table from "react-bootstrap/Table";

const Holdings = () => {
    return (
        <Card className="card">
            <Card.Title className="card-header-first">Transactions</Card.Title>
            <Row style={{width: '100%', margin: '0px'}}>

            </Row>

            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-first">
                    <tr>
                        <td className="table-header-row">Quantity</td>
                        <td className="table-header-row">Price</td>
                        <td className="table-header-row">Market Value</td>
                        <td className="table-header-row">Trade Date</td>
                        <td className="table-header-row">Instrument</td>
                        <td className="table-header-row">Instrument Type</td>
                        <td className="table-header-row">Source</td>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default Holdings;