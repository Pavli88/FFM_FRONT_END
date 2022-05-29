import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const RobotTradesStatistics = (props) => {
    let losingTradeNumber = 0;
    let winningTradeNumber = 0;
    let losingTrades = [];
    let winningTrades = [];
    let totalWinner = 0.0;
    let totalLoser= 0.0;

    for (const val of props.data) {
        if (val < 0) {
            losingTradeNumber=+losingTradeNumber+1;
            losingTrades.push(val);
        } else if (val > 0){
            winningTradeNumber=+winningTradeNumber+1;
            winningTrades.push(val);
        };

    };

    for (let i = 0; i < losingTrades.length; i++) {
        totalLoser += losingTrades[i];
    };

    for (let i = 0; i < winningTrades.length; i++) {
        totalWinner += winningTrades[i];
    };

    let winPerc = Math.round((winningTradeNumber) / (losingTradeNumber + winningTradeNumber)*100)/100;
    let lossPerc = Math.round(losingTradeNumber / (losingTradeNumber + winningTradeNumber)*100)/100;
    let avgWinner = Math.round(totalWinner/winningTrades.length*100)/100;
    let avgLoser = Math.round(totalLoser/losingTrades.length*100)/100;
    return (
        <Col sm={4} style={{height: '100%'}}>
            <Row>
                <h2>Statistics</h2>
            </Row>
            <Row style={{padding: '5px', marginRight: '25px', position: 'centered'}}>
                <Col>
                    <div style={{display: 'flex', width: '100%'}}>
                        <p>Total Trades</p>
                        <p style={{
                            position: 'absolute',
                            right: '0px'
                        }}>{losingTradeNumber + winningTradeNumber}</p>
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <p>Winning Trades</p>
                        <p style={{
                            position: 'absolute',
                            right: '0px'
                        }}>{winningTradeNumber}</p>
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <p>Loosing Trades</p>
                        <p style={{
                            position: 'absolute',
                            right: '0px'
                        }}>{losingTradeNumber}</p>
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <p>Winning %</p>
                        <p style={{
                            position: 'absolute',
                            right: '0px'
                        }}>{winPerc}</p>
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <p>Loosing %</p>
                        <p style={{
                            position: 'absolute',
                            right: '0px'
                        }}>{lossPerc}</p>
                    </div>
                </Col>
                <Col>
                    <div style={{display: 'flex', width: '100%'}}>
                        <p>Total Winning P&L</p>
                        <p style={{
                            position: 'absolute',
                            right: '0px'
                        }}>{Math.round(totalWinner * 100) / 100}</p>
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <p>Total Losing P&L</p>
                        <p style={{
                            position: 'absolute',
                            right: '0px'
                        }}>{Math.round(totalLoser * 100) / 100}</p>
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <p>Avg Winning Trade</p>
                        <p style={{
                            position: 'absolute',
                            right: '0px'
                        }}>{avgWinner}</p>
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <p>Avg Losing Trade</p>
                        <p style={{
                            position: 'absolute',
                            right: '0px'
                        }}>{avgLoser}</p>
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <p>Payoff Ratio</p>
                        <p style={{
                            position: 'absolute',
                            right: '0px',
                        }}>{Math.round(Math.abs(avgWinner / avgLoser) * 100) / 100}</p>
                    </div>
                </Col>
            </Row>
            <Row style={{
                width: '100%',
                padding: '5px',
                position: 'absolute',
                bottom: '0px'
            }}>
                <Col style={{display: 'flex', width: '100%'}}>
                    <p style={{fontWeight: 'bold'}}>Profit Factor</p>
                    <p style={{
                        position: 'absolute',
                        right: '15px',
                        fontWeight: 'bold'
                    }}>{Math.round((winPerc * avgWinner) / (lossPerc / avgLoser) * -100) / 100}</p>
                </Col>
                <Col>
                    <p style={{fontWeight: 'bold', position: 'absolute', left: '0px'}}>Total Profit</p>
                    <p style={{
                        position: 'absolute',
                        right: '45px',
                        fontWeight: 'bold'
                    }}>{Math.round((totalWinner + totalLoser) * 100) / 100}</p>
                </Col>
            </Row>
        </Col>
    );
};

export default RobotTradesStatistics;