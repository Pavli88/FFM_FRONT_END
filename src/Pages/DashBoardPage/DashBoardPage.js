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
import fetchAPI from "../../config files/api";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";
import ValueChange from "../../components/Layout/ValueChange/ValueChange";

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
    const allDates = [];

    // First, extract all dates and initialize structure
    dateRecords.forEach((dateEntry, index) => {
        allDates.push(index); // Use index as a date reference (or replace with actual date)
        const { records } = dateEntry;

        records.forEach(({ portfolio_code, holding_nav }) => {
            const validNav = holding_nav == null || isNaN(holding_nav) ? 0 : holding_nav;

            // Initialize array for all dates if not already
            if (!portfolioMap[portfolio_code]) {
                portfolioMap[portfolio_code] = Array(dateRecords.length).fill(0);
            }

            // Set NAV at correct date index
            portfolioMap[portfolio_code][index] = validNav;
        });
    });

    // Convert to desired format
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

    // console.log(portfolioNavData)


    // Fetch child portfolios whenever portGroup changes
    useEffect(() => {
        const fetchPortChildCodes = async () => {
            try {
                const response = await fetchAPI.get(`portfolios/group/${portGroup}/`);
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
                    fetchAPI.post('portfolios/get/nav/', {
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
    // console.log(data)
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

    const panel = <div>
        <PortfolioGroup allowSelect={true}/>
        <div>
            <input type={'date'} onChange={(e) => setStartDate(e.target.value)} defaultValue={startDate}/>
        </div>
    </div>

    const mainArea = <div>
        <div className={'card'} style={{padding: 5}}>
            <label style={{fontWeight: "bold"}}>{portGroup}</label>
        </div>

        <div style={{padding: 5}}>

            <div className="card">

                {/* Right side */}
                <div style={{display: "flex", alignItems: "center", gap: "15px"}}>

                     <label style={{fontSize: "1.2rem", fontWeight: "bold"}}>
                        Net Asset Value
                    </label>

                    <ValueChange mainValue={totalNav} change={navChange} label={'Total'}/>
                    <ValueChange mainValue={totalCash} change={cashChange} label={'Cash'}/>

                </div>
            </div>


            <div style={{display: "flex", height: 350, marginTop: 5}}>
                <div style={{flex: 2}}>
                    <StackedBarChart data={data} labels={labels} title={'NAV History'}/>
                </div>

                <div style={{flex: 2, marginRight: 5, marginLeft: 5}}>
                    <StackedBarChart data={summedData} labels={labels} title={'NAV Decomposition'}/>
                </div>
                <div className={'card'} style={{height: '100%', flex: 1}}>
                    <PieChart values={navValues} labels={portfolios} title={'Portfolio Decomposition'}/>
                </div>
            </div>
        </div>

        <HoldingTable portfolioCode={childPortfolios}/>

        {/* Position Exposures */}
        <PositionExposures portfolioCodes={childPortfolios} server={server}/>

        {/*pnl*/}
        <div >
            <div className={'card'}>
                        <label
                              style={{fontSize: "1.2rem", fontWeight: "bold"}}>Profit and Loss</label>

            </div>
            <div style={{display: "flex", height: 350, marginTop: 5}}>
                <div style={{flex: 1, marginRight: 5}}>
                    <StackedBarChart data={summedPnl} labels={labels} title={'Profit History'}/>
                </div>

                <div style={{flex: 1, height: 350, marginRight: 5}}>
                    <PortfolioTransactionPnl
                        unrealized={cumulativeSum(unrealizedPnl)}
                        realized={cumulativeSum(realizedPnl)}
                    />
                </div>
                <div style={{height: 350, width: 300}}>
                    <TradingMetrics profits={realizedPnl}
                                    maxUnrealized={Math.min(...cumulativeSum(unrealizedPnl))}/>
                </div>

            </div>
        </div>

        {/* Performance Section */}
        <div style={{padding: 5}}>
            <div className={'card'}>
                        <label
                              style={{fontSize: "1.2rem", fontWeight: "bold"}}>Performance</label>
            </div>

            <div style={{display: "flex", height: 500, marginTop: 5}}>
                <div className={'card'} style={{flex: 1, marginRight: 5}}>
                    <DailyReturns
                        returns={totalReturns.map(d => d.total_return)}
                        dates={totalReturns.map(d => d.end_date)}
                        changeReturnType={(value) => setReturnsTypes(value.value)}
                    />
                </div>
            </div>
        </div>
    </div>

    return (
        <ContainerWithSideMenu panel={panel} mainArea={mainArea} sidebarWidth={"600px"}/>
    );
};

export default DashBoardPage;