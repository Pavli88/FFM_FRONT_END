import {useContext, useEffect, useState} from "react";
import DateContext from "../../../context/date-context";
import axios from "axios";
import {BarChart, BarChartSorted} from "../../Charts/BarCharts";
import {PieChart, PieChartSorted} from "../../Charts/PieCharts";
import {Heatmap} from "../../Charts/Heatmaps";
import {LineChart} from "../../Charts/LineCharts";
import ValueChange from "../../Layout/ValueChange/ValueChange";

export const PositionExposures = ({portfolioCodes, server}) => {
    const currentDate = useContext(DateContext)['currentDate'];
    // const [correlationData, setCorrelationData] = useState({})
    const [exposureData, setExposureData] = useState([{
        "date": "",
        "data": {
            "correlation": {},
            "exposures": [],
            "port_std": 0,
            "lev_exp": 0,
            "risk_structure": [],
            "risk_contribs": [],
            "leverage": 0
        }
    }]);

    const [correlPeriod, setCorrelPeriod] = useState(5);
    const [samplePeriod, setSamplePeriod] = useState(10);

    // Debounce the correlPeriod
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchExposures();
        }, 1000);
        return () => clearTimeout(handler);
    }, [correlPeriod, portfolioCodes, samplePeriod]);

    const fetchExposures = async () => {
        const response = await axios.post(`${server}portfolios/get/position_exposures/`, {
            portfolio_code: portfolioCodes,
            period: correlPeriod,
            date: currentDate,
            sample_period: samplePeriod
        })
        setExposureData(response.data)
        // setCorrelationData(response.data['correlation'])
    };

    const std_hist = exposureData.map((d) => d.data.port_std)
    const exp_hist = exposureData.map((d) => d.data.lev_exp)
    const std_dates = exposureData.map((l) => l.date)
    const lastRecordData = exposureData[exposureData.length - 1]['data']
    const expData = lastRecordData['exposures'].map((d) => d.weight)
    const expLabel = lastRecordData['exposures'].map((d) => d.instrument__name)
    const riskExpData = lastRecordData['risk_contribs'].map((d) => d.value)
    const riskExpLabel = lastRecordData['risk_contribs'].map((d) => d.label)
    const normalRisks = exposureData.map((d) => d.data.port_std / d.data.leverage)
    const levFreeRisk = exposureData[exposureData.length - 1]['data']['port_std'] / exposureData[exposureData.length - 1]['data']['leverage']
    const totalRisk = (exposureData[exposureData.length - 1]['data']['port_std']*1000/10).toFixed(2)
    const totalRiskPrev = (exposureData[exposureData.length - 2]['data']['port_std']*1000/10).toFixed(2)
    const leverages = exposureData.map((d) => d.data.leverage)

    const netExposure = (exposureData[exposureData.length - 1]['data']['lev_exp']*1000/10).toFixed(2)
    const netExposure2 = (exposureData[exposureData.length - 2]['data']['lev_exp']*1000/10).toFixed(2)

    return (
        <div style={{padding: 5, width: '100%'}}>

            <div
                className="card"
                style={{
                    display: "flex",
                    gap: "25px"
                }}
            >
                <div style={{display: "flex", alignItems: "center"}}>
                     <div>
                    <label style={{fontSize: "1.2rem", fontWeight: "bold", whiteSpace: 'nowrap'}}>
                        Risk Exposure
                    </label>
                </div>

                <ValueChange mainValue={netExposure} change={netExposure-netExposure2} label={'Net Exposure'} percentage={true}/>


                <div style={{display: "flex", alignItems: "center"}}>
                    <label style={{fontWeight: "bold", marginRight: 5}}>Risk</label>
                    <label style={{fontWeight: "bold"}}>
                        {(levFreeRisk * 100).toFixed(2)} %
                    </label>
                </div>

                <ValueChange mainValue={totalRisk} change={totalRisk-totalRiskPrev} label={'Total Risk'} percentage={true}/>

                <div style={{display: "flex", alignItems: "center"}}>
                    <label style={{fontWeight: "bold", marginRight: 5}}>Leverage</label>
                    <label style={{fontWeight: "bold"}}>
                        {(exposureData[exposureData.length - 1]['data']['leverage']).toFixed(2)} x
                    </label>
                </div>

                <div style={{display: "flex", alignItems: "center"}}>
                    <label style={{fontWeight: "bold", marginRight: 5}}>Correlation Days</label>
                    <input
                        type="number"
                        min={0}
                        defaultValue={correlPeriod}
                        onChange={(e) => setCorrelPeriod(e.target.value)}
                        style={{width: 100}}
                    />
                </div>

                <div style={{display: "flex", alignItems: "center"}}>
                    <label style={{fontWeight: "bold", marginRight: 5}}>Sample Period</label>
                    <input
                        type="number"
                        min={0}
                        defaultValue={samplePeriod}
                        onChange={(e) => setSamplePeriod(e.target.value)}
                        style={{width: 100}}
                    />
                </div>
                </div>

            </div>


            <div style={{display: "flex", marginTop: 5}}>

                <div className={'card'} style={{height: 400, flex: 1, marginRight: 5}}>
                    <div className={'card-header'}>
                        Position Exposure
                    </div>
                    <BarChartSorted
                        labels={expLabel}
                        values={expData}/>
                </div>

                <div className={'card'} style={{height: 400, flex: 1, marginRight: 5}}>
                    <div className={'card-header'}>
                        Marginal Risk Contribution
                    </div>
                    <BarChartSorted
                        labels={riskExpLabel}
                        values={riskExpData}/>
                </div>

                <div className={'card'} style={{height: 400, width: 400, marginRight: 5}}>
                    <div className={'card-header'}>
                        Risk Exposure Concentration
                    </div>
                    <PieChartSorted values={riskExpData} labels={riskExpLabel}/>
                </div>

                <div className={'card'} style={{height: 400, width: 400}}>
                    <div className={'card-header'} style={{
                        justifyContent: 'space-between'
                    }}>
                        <span>Position Correlation</span>
                    </div>
                    <Heatmap data={exposureData[exposureData.length - 1]['data']['correlation']}/>
                </div>


            </div>

            <div style={{display: "flex", marginTop: 5}}>
                <div className={'card'} style={{flex: 1, height: 400, marginRight: 5}}>
                    <div className={'card-header'} style={{
                        justifyContent: 'space-between'
                    }}>
                        <span>Risk History</span>
                    </div>
                    <LineChart data={[
                        {
                            name: "Total Risk",
                            data: std_hist
                        },
                        {
                            name: "Lev Free Risk",
                            data: normalRisks
                        }
                    ]} labels={std_dates}/>
                </div>

                <div className={'card'} style={{flex: 1, height: 400, marginRight: 5}}>
                    <div className={'card-header'} style={{
                        justifyContent: 'space-between'
                    }}>
                        <span>Net Exposure History</span>
                    </div>
                    <BarChart
                        labels={std_dates}
                        values={exp_hist}/>
                </div>

                <div className={'card'} style={{flex: 1, height: 400}}>
                    <div className={'card-header'} style={{
                        justifyContent: 'space-between'
                    }}>
                        <span>Leverage History</span>
                    </div>
                    <BarChart
                        labels={std_dates}
                        values={leverages}/>
                </div>

            </div>

        </div>
    );
};