import CardWithHeader from "../../../../../Widgets/Charts/CardWithHeader";
const PortfolioGeneralSettings = () => {
    const header = <p>General</p>
    return(
        <CardWithHeader headerContent={header}>
            <p>Name</p>
            <p>portfolio Ticker</p>
            <p>Base Currency</p>
            <p>Type</p>
            <p>set portfolio status - active or inactive</p>
            <p>is robot trading allowed on the portfolio ?</p>
            <p>allowed multi currency ?</p>
        </CardWithHeader>
    )
};
export default PortfolioGeneralSettings;