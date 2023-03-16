import CardWithHeader from "../../../../../Widgets/Charts/CardWithHeader";
const PortfolioOwnershipSettings = () => {
    const header = <p>Ownership</p>
    return(
        <CardWithHeader headerContent={header}>
            <p>Owner</p>
            <p>Manager</p>
            <p>Public or not</p>
        </CardWithHeader>
    )
};
export default PortfolioOwnershipSettings;