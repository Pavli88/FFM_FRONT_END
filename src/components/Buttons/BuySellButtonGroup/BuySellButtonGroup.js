import "./BuySellButtonGroup.css"

const BuySellButtonGroup = ( {side, change}) => {
    return (
        <div className={'buy-sell-button-group'}>
                    <button
                        className={side === 'Sale' ? 'sell-button' : 'sell-button-unselected'}
                        onClick={() => change('Sale')}
                    >
                        SELL
                    </button>
                    <button
                        className={side === 'Purchase' ? 'buy-button' : 'buy-button-unselected'}
                        onClick={() => change('Purchase')}
                    >
                        BUY
                    </button>
                </div>
    );
};
export default BuySellButtonGroup;