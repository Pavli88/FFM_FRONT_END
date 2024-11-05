const calculateNetProfit = (profits) => {
    return profits.reduce((acc, profit) => acc + profit, 0);
};

const calculateGrossProfit = (profits) => {
    return profits.filter(profit => profit > 0).reduce((acc, profit) => acc + profit, 0);
};

const calculateGrossLoss = (profits) => {
    return profits.filter(profit => profit < 0).reduce((acc, profit) => acc + profit, 0);
};

const calculateProfitFactor = (profits) => {
    const grossProfit = calculateGrossProfit(profits);
    const grossLoss = Math.abs(calculateGrossLoss(profits));
    return grossLoss !== 0 ? grossProfit / grossLoss : Infinity; // Avoid division by zero
};

const calculateWinRate = (profits) => {
    const winningTrades = profits.filter(profit => profit > 0).length;
    return (winningTrades / profits.length) * 100;
};

const calculateAverageWin = (profits) => {
    const winningTrades = profits.filter(profit => profit > 0);
    return winningTrades.length ? winningTrades.reduce((acc, profit) => acc + profit, 0) / winningTrades.length : 0;
};

const calculateAverageLoss = (profits) => {
    const losingTrades = profits.filter(profit => profit < 0);
    return losingTrades.length ? losingTrades.reduce((acc, profit) => acc + profit, 0) / losingTrades.length : 0;
};

const calculateExpectancy = (profits) => {
    const winRate = calculateWinRate(profits) / 100;
    const avgWin = calculateAverageWin(profits);
    const avgLoss = Math.abs(calculateAverageLoss(profits));
    return (winRate * avgWin) - ((1 - winRate) * avgLoss);
};

const TradingMetrics = ({ profits, maxUnrealized }) => {

    return (
        <div className={'card'}>
            <div className={'card-header'}>Profit Metrics</div>
            <div style={{margin: 10}}>
                <div className={"aligned-container"}>
                    <span>Net Profit</span>
                    <span>{calculateNetProfit(profits).toFixed(2)}</span>
                </div>
                <div className={"aligned-container"}>
                    <span>Gross Profit</span>
                    <span>{calculateGrossProfit(profits).toFixed(2)}</span>
                </div>
                <div className={"aligned-container"}>
                    <span>Gross Loss</span>
                    <span>{calculateGrossLoss(profits).toFixed(2)}</span>
                </div>
                <div className={"aligned-container"}>
                    <span>Profit Factor</span>
                    <span>{calculateProfitFactor(profits).toFixed(2)}</span>
                </div>
                <div className={"aligned-container"}>
                    <span>Win Rate</span>
                    <span>{calculateWinRate(profits).toFixed(2)} %</span>
                </div>
                <div className={"aligned-container"}>
                    <span>Average Win</span>
                    <span>{calculateAverageWin(profits).toFixed(2)}</span>
                </div>
                <div className={"aligned-container"}>
                    <span>Average Loss</span>
                    <span>{calculateAverageLoss(profits).toFixed(2)}</span>
                </div>
                <div className={"aligned-container"}>
                    <span>Expectancy</span>
                    <span>{calculateExpectancy(profits).toFixed(2)}</span>
                </div>
                <div className={"aligned-container"}>
                    <span>Profit to Drawdown</span>
                    <span>{(calculateNetProfit(profits)/Math.abs(maxUnrealized)).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default TradingMetrics;
