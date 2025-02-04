import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs';

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
    const getFormattedValue = (value) => {
        if (value === undefined || value === null || isNaN(value)) {
            return <span style={{ color: 'black' }}>0.00</span>;
        }

        const isPositive = value > 0;
        const isNegative = value < 0;
        const color = isPositive ? 'green' : isNegative ? 'red' : 'black';
        const Icon = isPositive ? BsCaretUpFill : isNegative ? BsCaretDownFill : null;

        return (
            <span style={{ color, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                {Icon && <Icon style={{ marginRight: 5 }} />} {value.toFixed(2)}
            </span>
        );
    };

    const metrics = [
        { label: 'Net Profit', value: calculateNetProfit(profits) },
        { label: 'Gross Profit', value: calculateGrossProfit(profits) },
        { label: 'Gross Loss', value: calculateGrossLoss(profits) },
        { label: 'Profit Factor', value: calculateProfitFactor(profits) },
        { label: 'Win Rate %', value: calculateWinRate(profits) },
        { label: 'Average Win', value: calculateAverageWin(profits) },
        { label: 'Average Loss', value: calculateAverageLoss(profits) },
        { label: 'Expectancy', value: calculateExpectancy(profits) },
        { label: 'Max Drawdown', value: maxUnrealized },
        { label: 'Profit to Drawdown', value: calculateNetProfit(profits) / Math.abs(maxUnrealized) }
    ];

    return (
        <div className='card'>
            <div style={{ margin: 10 }}>
                {metrics.map(({ label, value, suffix = '' }) => (
                    <div className='aligned-container' key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '30px' }}>
                        <span>{label}</span>
                        <span style={{ textAlign: 'right', flex: 1 }}>{getFormattedValue(value)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TradingMetrics;


