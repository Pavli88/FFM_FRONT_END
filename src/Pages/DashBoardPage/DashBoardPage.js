import axios from "axios";
import {useContext, useEffect, useState, useMemo} from "react";
import ServerContext from "../../context/server-context";
import DailyReturns from "../PortfolioPage/SubPages/PortfolioReturn/DailyReturns/DailyReturns";
import DateContext from "../../context/date-context";
import DashboardContext from "../../context/dashboard-context";
import {BarChartGrouped, StackedBarChart} from "../../components/Charts/BarCharts";
import {PieChart} from "../../components/Charts/PieCharts";
import {PositionExposures} from "../../components/Widgets/Risk/PositionExposures";
import PortfolioGroup from "../ProfilPage/PortfolioGroup/PortfolioGroup";
import {cumulativeSum} from "../../calculations/cumulative";
import PortfolioTransactionPnl
    from "../PortfolioPage/SubPages/PortfolioReturn/PortfolioTransactionPnl/PortfolioTransactionPnl";
import TradingMetrics from "../../calculations/tradeMetrics";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// Custom hook for fetching dashboard data
const useDashboardData = (server, currentDate, portCodes) => {
    const [data, setData] = useState({
        portfolioNavData: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    portfolioNavRes
                ] = await Promise.all([
                    axios.post(`${server}portfolios/get/nav/`,  {
                        portfolio_code__in : portCodes
                    }),
                ]);

                setData({
                    portfolioNavData: portfolioNavRes.data,
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, [server, currentDate]);

    return data;
};

const transformPortfolioData = (dateRecords) => {
    const portfolioMap = {};

    dateRecords.forEach(({ records }) => {
        records.forEach(({ portfolio_code, holding_nav }) => {
            // Skip invalid holding_nav
            if (holding_nav == null || isNaN(holding_nav)) return;

            // If portfolio_code is not in the map, initialize it
            if (!portfolioMap[portfolio_code]) {
                portfolioMap[portfolio_code] = [];
            }

            // Push the holding_nav value to the portfolio's data array
            portfolioMap[portfolio_code].push(holding_nav);
        });
    });

    // Convert the map to the desired array format
    return Object.entries(portfolioMap).map(([name, data]) => ({ name, data }));
};

const transformSummedData = (dateRecords, fieldMapping) => {
    const fieldMap = {};

    // Initialize the field map with empty arrays for each field
    fieldMapping.values.forEach((field) => {
        fieldMap[field] = [];
    });

    dateRecords.forEach(({ records }) => {
        // Initialize a temporary sum object for the current date
        const tempSum = {};
        fieldMapping.values.forEach((field) => {
            tempSum[field] = 0;
        });

        // Sum up the specified fields across all records for the current date
        records.forEach((record) => {
            fieldMapping.values.forEach((field) => {
                if (record[field] != null && !isNaN(record[field])) {
                    tempSum[field] += record[field];
                }
            });
        });

        // Append the computed sums to the respective field's data array
        fieldMapping.values.forEach((field, index) => {
            fieldMap[field].push(tempSum[field]);
        });
    });

    // Convert the map to the desired array format using the labels
    return fieldMapping.values.map((field, index) => ({
        name: fieldMapping.labels[index],
        data: fieldMap[field],
    }));
};

const DashBoardPage = () => {
    const server = useContext(ServerContext).server;
    const currentDate = useContext(DateContext).currentDate;
    const { portGroup } = useContext(DashboardContext);
    const [childPortfolios, setChildPortfolios] = useState([]);
    const [totalReturns, setTotalReturns] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [returnTypes, setReturnsTypes] = useState('dtd');

    // Fetch child portfolios whenever portGroup changes
    useEffect(() => {
        const fetchPortChildCodes = async () => {
            try {
                const response = await axios.get(`${server}portfolios/group/${portGroup}/`);
                setChildPortfolios(response.data.child_portfolios);
            } catch (error) {
                console.error("Error fetching child portfolios:", error);
            }
        };

        if (portGroup) fetchPortChildCodes();
    }, [portGroup]);

    // Fetch portfolio data when portGroup, returnTypes, or childPortfolios change
    const { portfolioNavData } = useDashboardData(server, currentDate, childPortfolios);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await axios.post(`${server}portfolios/get/total_returns/`, {
                    portfolio_code: portGroup,
                    period: returnTypes
                });
                setTotalReturns(response.data);
            } catch (error) {
                console.error("Error fetching total returns:", error);
            }
        };

        if (portGroup) fetchAllData();
    }, [portGroup, returnTypes]);

    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            {/* Side Menu */}
            <div style={{
                width: isMenuOpen ? "500px" : "50px",
                transition: "width 0.3s ease",
                backgroundColor: "#cfcccb",
                height: "100vh",
                position: "fixed",
                zIndex: 2,
                top: 0,
                left: 0,
                overflow: "hidden",
                boxShadow: isMenuOpen ? "2px 0px 5px rgba(0, 0, 0, 0.1)" : "none",
                paddingTop: "80px",
                paddingLeft: isMenuOpen ? 20 : 0,
                paddingRight: 50,
            }}>
                {/* Portfolio Group Widget inside the menu */}
                <div style={{
                    visibility: isMenuOpen ? "visible" : "hidden",
                    opacity: isMenuOpen ? 1 : 0,
                    transition: "visibility 0.3s, opacity 0.3s ease",
                    height: '400px'
                }}>
                    <PortfolioGroup allowSelect={true} />
                </div>

                {/* Open/Close Button */}
                <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        position: "absolute",
                        right: "5px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "16px",
                        backgroundColor: "#fff",
                        borderRadius: "80%",
                        padding: "10px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                        zIndex: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {isMenuOpen ? <BsChevronLeft /> : <BsChevronRight />}
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                marginLeft: isMenuOpen ? "500px" : "50px",
                transition: "margin-left 0.3s ease",
                flex: 1,
                padding: 10,
            }}>
                <div style={{ padding: 10 }}>
                    {/* Portfolio Info */}
                    <div style={{
                        borderTop: "1px solid #e5e8e8",
                        borderBottom: "1px solid #e5e8e8",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span style={{ fontWeight: "bold" }}>{portGroup}</span>
                    </div>
                </div>

                <div style={{ padding: 10 }}>
                    {/* NAV Section */}
                    <div style={{
                        borderTop: "1px solid #e5e8e8",
                        borderBottom: "1px solid #e5e8e8",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span style={{ fontWeight: "bold" }}>NAV</span>
                    </div>

                    {/* Charts Section */}
                    <div style={{ display: "flex", height: 350, marginTop: 10 }}>
                        <div className={'card'} style={{ flex: 2, marginRight: 5 }}>
                            <StackedBarChart data={portfolioNavData} labels={portfolioNavData.map(d => d.date)} yName={'NAV'} />
                        </div>
                        <div className={'card'} style={{ flex: 1, marginLeft: 5 }}>
                            <PieChart values={portfolioNavData.map(d => d.holding_nav)} labels={portfolioNavData.map(d => d.portfolio_code)} />
                        </div>
                    </div>
                </div>

                {/* Position Exposures */}
                <PositionExposures portfolioCodes={childPortfolios} server={server} />

                {/* Performance Section */}
                <div style={{ padding: 10 }}>
                    <div style={{
                        borderTop: "1px solid #e5e8e8",
                        borderBottom: "1px solid #e5e8e8",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span style={{ fontWeight: "bold" }}>Performance</span>
                    </div>

                    <div style={{ display: "flex", height: 350, marginTop: 10 }}>
                        <div className={'card'} style={{ flex: 1, marginRight: 5 }}>
                            <DailyReturns
                                returns={totalReturns.map(d => d.total_return)}
                                dates={totalReturns.map(d => d.end_date)}
                                changeReturnType={(value) => setReturnsTypes(value.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardPage;