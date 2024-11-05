import PortfolioTransactionPnl from "./PortfolioTransactionPnl/PortfolioTransactionPnl";
import DailyReturns from "./DailyReturns/DailyReturns";
import MonthlyReturns from "./MonthlyReturns/MonthlyReturns";
import {useContext, useEffect, useRef, useState} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import ServerContext from "../../../../context/server-context";
import axios from "axios";
import DailyPnl from "./DailyPnl/DailyPnl";
import {cumulativeSum, cumulativeMultiply} from "../../../../calculations/cumulative";
import Section from "../../../../components/Layout/Section";
import Attribution from "./Attribution/Attribution";
import TradingMetrics from "../../../../calculations/tradeMetrics";

const PortfolioReturnPage = () => {
    const { server } = useContext(ServerContext);
    const { portfolioCode, portfolioData } = useContext(PortfolioPageContext);
    const [navData, setNavData] = useState([]);
    const [dailyReturns, setDailyReturns] = useState([]);
    const [startDate, setStartDate] = useState(portfolioData.inception_date);
    const [returnTypes, setReturnsTypes] = useState('dtd')
    const startDateRef = useRef();

    const fetchAllData = async () => {
        try {
            const [navRes, retRes] = await Promise.all([
                axios.get(`${server}portfolios/get/nav/`, {
                    params: {
                        date__gte: portfolioData.inception_date,
                        portfolio_code: portfolioCode,
                    },
                }),
                axios.post(`${server}portfolios/get/total_returns/`, {
                    portfolio_code: portfolioCode,
                    period: returnTypes
                }),
            ]);
            setNavData(navRes.data);
            setDailyReturns(retRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (portfolioCode) fetchAllData();
    }, [portfolioCode, returnTypes]);

    return (
        <div style={{ height: "900px", width: "100%", padding: 15 }}>
            <div style={{ paddingBottom: 15 }}>
                <div className="card" style={{ padding: 10 }}>
                    <div style={{ display: "flex" }}>
                        <span className="input-label">Start Date</span>
                        <input
                            type="date"
                            ref={startDateRef}
                            defaultValue={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: "760px", overflowY: "scroll" }}>
                <Section title="Returns">
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "50%", height: 350 }}>
                            <DailyReturns returns={dailyReturns.map((d) => d.total_return)}
                                          dates={dailyReturns.map((d) => d.end_date)}
                                          changeReturnType={(value) => setReturnsTypes(value.value)}
                            />
                        </div>
                        {/*<div style={{ width: "50%", height: 300 }}>*/}
                        {/*    <CumulativePerformance*/}
                        {/*        */}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                </Section>

                <Section title="Profit & Loss">
                    <div style={{ display: "flex" }}>
                        <div style={{ flex: 1, height: 350 }}>
                            <DailyPnl data={navData} />
                        </div>
                        <div style={{ flex: 1, height: 350, marginLeft: 10}}>
                            <PortfolioTransactionPnl
                                total={cumulativeSum(navData.map((d) => d.total_pnl))}
                                unrealized={cumulativeSum(navData.map((e) => e.unrealized_pnl))}
                                realized={cumulativeSum(navData.map((f) => f.pnl))}
                                currency={portfolioData.currency}
                            />
                        </div>

                        <div style={{ height: 350, marginLeft: 10, width: 300}}>
                             <TradingMetrics profits={navData.map((d) => d.pnl)} maxUnrealized={Math.min(...navData.map((d) => d.unrealized_pnl))}/>
                        </div>
                    </div>
                </Section>

                <Section title="Attribution">
                    <Attribution/>
                </Section>
            </div>
        </div>
    );
};



export default PortfolioReturnPage;