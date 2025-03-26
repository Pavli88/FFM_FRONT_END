import PricingCards from "./PricingCard/PricingCards";

const SubscriptionsPage = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: '100vh',
            padding: '20px',
            background: '#f4f4f4'
        }}>
            <h1 style={{
                marginBottom: '40px',
                fontSize: '36px',
                fontWeight: '700',
                fontFamily: "'Poppins', sans-serif",
                color: '#333',
                textAlign: 'center',
            }}>
                Subscription Plans
            </h1>
            <div style={{
                width: '80%',
                maxWidth: '1200px',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <PricingCards />
            </div>
        </div>
    );
};

export default SubscriptionsPage;
