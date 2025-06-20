import {Header} from "./Header/Header";
import "./LandingPage.css";
import {HeroSection} from "./HeroSection/HeroSection";
import {ContentSection} from "./ContentSection/ContentSection";
import {CTASection} from "./CTASection/CTASection";
import {Footer} from "./Footer/Footer";


const LandingPage = () => {
    return (
        <div className="landing-page">

            <Header/>
            <HeroSection/>
            <div className="section-divider" />
            <ContentSection/>
            <CTASection/>
            <Footer/>
        </div>
    );
};

export default LandingPage;