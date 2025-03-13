import axios from "axios";
import {useContext, useEffect, useState, useMemo} from "react";
import ServerContext from "../../context/server-context";
import DailyReturns from "../PortfolioPage/SubPages/PortfolioReturn/DailyReturns/DailyReturns";
import DateContext from "../../context/date-context";
import DashboardContext from "../../context/dashboard-context";
import {BarChartGrouped, StackedBarChart} from "../../components/Charts/BarCharts";
import {PieChart} from "../../components/Charts/PieCharts";
import {PositionExposures} from "../../components/Widgets/Risk/PositionExposures";
import PortfolioGroup from "../UserMenu/PortfolioGroup/PortfolioGroup";
import {cumulativeSum} from "../../calculations/cumulative";
import PortfolioTransactionPnl
    from "../PortfolioPage/SubPages/PortfolioReturn/PortfolioTransactionPnl/PortfolioTransactionPnl";
import TradingMetrics from "../../calculations/tradeMetrics";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs';
import HoldingTable from "../../components/Tables/HoldingTable";

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
            // Replace null or NaN values with 0
            const validNav = holding_nav == null || isNaN(holding_nav) ? 0 : holding_nav;

            // If portfolio_code is not in the map, initialize it
            if (!portfolioMap[portfolio_code]) {
                portfolioMap[portfolio_code] = [];
            }

            // Push the valid holding_nav value to the portfolio's data array
            portfolioMap[portfolio_code].push(validNav);
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
    const firstDayOfYear = useContext(DateContext).firstDayOfCurrentYear;
    const {portGroup} = useContext(DashboardContext);
    const [childPortfolios, setChildPortfolios] = useState([]);
    const [totalReturns, setTotalReturns] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [returnTypes, setReturnsTypes] = useState('dtd');
    const [portfolioNavData, setPortfolioNavData] = useState([]);
    const [startDate, setStartDate] = useState(firstDayOfYear);
    console.log(typeof portfolioNavData)
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
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await axios.post(`${server}portfolios/get/total_returns/`, {
                    portfolio_code: portGroup,
                    period: returnTypes,
                    end_date__gte: startDate
                });
                setTotalReturns(response.data);
            } catch (error) {
                console.error("Error fetching total returns:", error);
            }
        };

        if (portGroup) fetchAllData();
    }, [portGroup, returnTypes, startDate]);

    useEffect(() => {
        const fetchNavData = async () => {
            try {
                const [portfolioNavRes] = await Promise.all([
                    axios.post(`${server}portfolios/get/nav/`, {
                        portfolio_code__in: childPortfolios,
                        date__gte: startDate
                    }),
                ]);
                setPortfolioNavData(portfolioNavRes.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        if (childPortfolios && childPortfolios.length > 0) {
            fetchNavData();
        }
    }, [childPortfolios, startDate])

    const data = transformPortfolioData(portfolioNavData)

    const summedData = transformSummedData(portfolioNavData, {
        labels: ['Positions', 'Cash', 'Margin'],
        values: ['pos_val', 'cash_val', 'margin']
    })
    const summedPnl = transformSummedData(portfolioNavData, {
        labels: ['Realized', 'Unrealized'],
        values: ['pnl', 'unrealized_pnl']
    })
    const realizedPnl = summedPnl[0]['data']
    const unrealizedPnl = summedPnl[1]['data']

    const labels = portfolioNavData.map((d) => d.date)
    const lastRecordData = portfolioNavData.length > 0 ? portfolioNavData[portfolioNavData.length - 1]['records'] : []
    const secondLastRecord = portfolioNavData.length > 0 ? portfolioNavData[portfolioNavData.length - 2]['records'] : []
    const portfolios = lastRecordData.map((d) => d.portfolio_code)
    const navValues = lastRecordData.map((d) => d.holding_nav)

    const totalNav = lastRecordData.map((n) => n.holding_nav).reduce((acc, curr) => acc + curr, 0).toFixed(2)
    const totalSecondNav = secondLastRecord.map((n) => n.holding_nav).reduce((acc, curr) => acc + curr, 0).toFixed(2)
    const totalCash = lastRecordData.map((n) => n.cash_val).reduce((acc, curr) => acc + curr, 0).toFixed(2)
    const secondTotalCash = secondLastRecord.map((n) => n.cash_val).reduce((acc, curr) => acc + curr, 0).toFixed(2)
    const navChange = totalNav - totalSecondNav
    const cashChange = totalCash - secondTotalCash
    return (
        <div >
            {/* Side Menu */}
            <div style={{
                width: isMenuOpen ? "500px" : "50px",
                transition: "width 0.3s ease",
                backgroundColor: "#eeeeee",
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
                    <PortfolioGroup allowSelect={true}/>
                </div>

                <div style={{
                    visibility: isMenuOpen ? "visible" : "hidden",
                    opacity: isMenuOpen ? 1 : 0,
                    transition: "visibility 0.3s, opacity 0.3s ease",
                    height: '400px'
                }}>
                    <input type={'date'} onChange={(e) => setStartDate(e.target.value)} defaultValue={startDate}/>
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
                    {isMenuOpen ? <BsChevronLeft/> : <BsChevronRight/>}
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                marginLeft: isMenuOpen ? "500px" : "50px",
                transition: "margin-left 0.3s ease",
                flex: 1,
                padding: 10,
            }}>
                <div style={{padding: 10}}>
                    {/* Portfolio Info */}
                    <div style={{
                        borderTop: "1px solid #e5e8e8",
                        borderBottom: "1px solid #e5e8e8",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span style={{fontWeight: "bold"}}>{portGroup}</span>
                    </div>
                </div>


                <div style={{padding: 10}}>
                    <div style={{
                        // borderTop: "1px solid  #e5e8e8 ",
                        // borderBottom: "1px solid  #e5e8e8 ",
                        padding: "5px",
                        display: "flex",
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span className="input-label"
                              style={{fontSize: "1.2rem", fontWeight: "bold"}}>Net Asset Value</span>
                        <div>
                            <span style={{fontWeight: "bold", marginRight: 10}}>Total</span>
                            <span style={{fontWeight: "bold", marginRight: 10, color: totalNav > 0 ? "green" : "red"}}>
                {totalNav > 0 ? "+" : ""}{totalNav}
                                {navChange !== 0 && (
                                    <span style={{fontSize: "0.8em", opacity: 0.7, marginLeft: 5}}>
                        <span style={{
                            color: navChange > 0 ? "green" : "red",
                            display: "inline-flex",
                            alignItems: "center"
                        }}>
                            {navChange > 0 ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                            {navChange > 0 ? "+" : "-"}{Math.abs(navChange)}
                        </span>
                    </span>
                                )}
            </span>

                            <span style={{fontWeight: "bold", marginRight: 10}}>Cash</span>
                            <span style={{fontWeight: "bold", color: totalNav > 0 ? "green" : "red"}}>
                {totalNav > 0 ? "+" : ""}{totalCash}
                                {cashChange !== 0 && (
                                    <span style={{fontSize: "0.8em", opacity: 0.7, marginLeft: 5}}>
                        <span style={{
                            color: cashChange > 0 ? "green" : "red",
                            display: "inline-flex",
                            alignItems: "center"
                        }}>
                            {cashChange > 0 ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                            {cashChange > 0 ? "+" : "-"}{Math.abs(cashChange)}
                        </span>
                    </span>
                                )}
            </span>
                        </div>

                    </div>
                    <div style={{display: "flex", height: 350, marginTop: 10}}>
                        <div className={'card'} style={{flex: 2, marginRight: 5}}>
                            <StackedBarChart data={data} labels={labels} yName={'NAV'}/>
                        </div>

                        <div className={'card'} style={{flex: 2, marginRight: 5, marginLeft: 5}}>
                            <StackedBarChart data={summedData} labels={labels} yName={'NAV'}/>
                        </div>
                        <div className={'card'} style={{height: '100%', flex: 1, marginLeft: 5}}>
                            <PieChart values={navValues} labels={portfolios}/>
                        </div>
                    </div>
                </div>

                {/* Position Exposures */}
                <PositionExposures portfolioCodes={childPortfolios} server={server}/>

                {/*pnl*/}
                <div style={{padding: 10}}>
                    <div style={{
                        // borderTop: "1px solid  #e5e8e8 ",
                        // borderBottom: "1px solid  #e5e8e8 ",
                        padding: "5px",
                        display: "flex",
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span className="input-label"
                              style={{fontSize: "1.2rem", fontWeight: "bold"}}>Profit and Loss</span>

                    </div>
                    <div style={{display: "flex", height: 350, marginTop: 10}}>
                        <div className={'card'} style={{flex: 1, marginRight: 5}}>
                            <StackedBarChart data={summedPnl} labels={labels} yName={'Profit & Loss'}/>
                        </div>

                        <div style={{flex: 1, height: 350, marginLeft: 10}}>
                            <PortfolioTransactionPnl
                                unrealized={cumulativeSum(unrealizedPnl)}
                                realized={cumulativeSum(realizedPnl)}
                            />
                        </div>
                        <div style={{height: 350, marginLeft: 10, width: 300}}>
                            <TradingMetrics profits={realizedPnl}
                                            maxUnrealized={Math.min(...cumulativeSum(unrealizedPnl))}/>
                        </div>

                    </div>
                </div>

                {/* Performance Section */}
                <div style={{padding: 10}}>
                    <div style={{
                        // borderTop: "1px solid #e5e8e8",
                        // borderBottom: "1px solid #e5e8e8",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span className="input-label"
                              style={{fontSize: "1.2rem", fontWeight: "bold"}}>Performance</span>
                    </div>

                    <div style={{display: "flex", height: 500, marginTop: 10}}>
                        <div className={'card'} style={{flex: 1, marginRight: 5}}>
                            <DailyReturns
                                returns={totalReturns.map(d => d.total_return)}
                                dates={totalReturns.map(d => d.end_date)}
                                changeReturnType={(value) => setReturnsTypes(value.value)}
                            />
                        </div>
                    </div>
                </div>

                <HoldingTable portfolioCode={childPortfolios}/>

            </div>
        </div>
    );
};

export default DashBoardPage;