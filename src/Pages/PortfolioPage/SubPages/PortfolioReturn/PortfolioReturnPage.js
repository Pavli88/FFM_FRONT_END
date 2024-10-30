import PortfolioTransactionPnl from "./PortfolioTransactionPnl/PortfolioTransactionPnl";
import CumulativePerformance from "./CumulativePerformance";
import DailyReturns from "./DailyReturns/DailyReturns";
import MonthlyReturns from "./MonthlyReturns/MonthlyReturns";
import AggregatedPnl from "./AggregatedPnls/AggregatedPnl";
import {useContext, useEffect, useRef, useState} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import ServerContext from "../../../../context/server-context";
import axios from "axios";
import DailyPnl from "./DailyPnl/DailyPnl";
import {BsArrowRepeat} from "react-icons/bs";
import {cumulativeSum, cumulativeMultiply} from "../../../../calculations/cumulative";
import Section from "../../../../components/Layout/Section";

const PortfolioReturnPage = () => {
    const { server } = useContext(ServerContext);
    const { portfolioCode, portfolioData } = useContext(PortfolioPageContext);
    const [navData, setNavData] = useState([]);
    const [dailyReturns, setDailyReturns] = useState([]);
    const [startDate, setStartDate] = useState(portfolioData.inception_date);
    const startDateRef = useRef();
    console.log(dailyReturns)
    console.log(dailyReturns.map((d) => d.total_return))
    // Consolidate data fetching
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
                    periods: ['dtd']
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
    }, [portfolioCode]);

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
                <Section title="Monthly Total Returns">
                    <MonthlyReturns />
                </Section>

                <Section title="Ex-Post Periodic Returns">
                    <MonthlyReturns />
                </Section>

                <Section title="Profit & Loss">
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "50%", height: 300 }}>
                            <DailyPnl data={navData} />
                        </div>
                        <div style={{ width: "50%", height: 300 }}>
                            <PortfolioTransactionPnl
                                data={cumulativeSum(navData.map((d) => d.total_pnl))}
                                currency={portfolioData.currency}
                            />
                        </div>
                    </div>
                </Section>

                <Section title="Returns">
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "50%", height: 300 }}>
                            <DailyReturns returns={dailyReturns.map((d) => d.total_return)} dates={dailyReturns.map((d) => d.end_date)}/>
                        </div>
                        {/*<div style={{ width: "50%", height: 300 }}>*/}
                        {/*    <CumulativePerformance*/}
                        {/*        */}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                </Section>
            </div>
        </div>
    );
};



export default PortfolioReturnPage;