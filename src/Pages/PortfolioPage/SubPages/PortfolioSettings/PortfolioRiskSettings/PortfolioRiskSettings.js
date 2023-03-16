import CardWithHeader from "../../../../../Widgets/Charts/CardWithHeader";
const PortfolioRiskSettings = () => {
    const header = <p>Risk</p>
    return(
        <CardWithHeader headerContent={header}>
            <p>Max margin exposure</p>
            <p>Trade on margin allowed or not</p>
            <p>Drawdown alert</p>
        </CardWithHeader>
    )
};
export default PortfolioRiskSettings;