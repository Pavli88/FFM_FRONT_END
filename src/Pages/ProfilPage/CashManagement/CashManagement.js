import './CashManagement.css'

const CashManagement = () => {
    return (
        <div style={{height:'100%', width: '300px'}}>
            <div style={{height: '100%', padding: '20px'}}>
                <div style={{padding: '10px'}}>
                    <button className={'button'}>Subscription</button>
                </div>
                <div style={{padding: '10px'}}>
                    <button className={'button'}>Redemption</button>
                </div>
                <div style={{padding: '10px'}}>
                    <button className={'button'}>Invest</button>
                </div>
            </div>
        </div>
    )
};
export default CashManagement;