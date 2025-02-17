import PortfolioGroup from "../PortfolioGroup/PortfolioGroup";
import ProfilePortfolios from "../ProfilePortfolios/ProfilePortfolios";

const MyPortfoliosPage = () => {
    return (
        <div style={{display: 'flex', width: '100%', height: '800px'}}>
            <div style={{width: '40%', height: '100%', margin: 10}}>
                <PortfolioGroup/>
            </div>
            <div style={{width: '60%', height: '100%', margin: 10}}>
                <ProfilePortfolios/>
            </div>
        </div>
    )
};
export default MyPortfoliosPage;