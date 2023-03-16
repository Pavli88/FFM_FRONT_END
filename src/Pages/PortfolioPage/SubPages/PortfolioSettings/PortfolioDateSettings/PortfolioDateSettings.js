import CardWithHeader from "../../../../../Widgets/Charts/CardWithHeader";

const PortfolioDateSettings = () => {
    const header = <p>Dates</p>
    return(
        <CardWithHeader headerContent={header}>
            <p>Creation Date</p>
            <p>Inception Date</p>
            <p>Termination Date</p>
        </CardWithHeader>
    )
};
export default PortfolioDateSettings;