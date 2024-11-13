import {useContext, useEffect, useState} from "react";
import DateContext from "../../../context/date-context";
import axios from "axios";
import {BarChart} from "../../Charts/BarCharts";
import {PieChart} from "../../Charts/PieCharts";
import {Heatmap} from "../../Charts/Heatmaps";
import {LineChart} from "../../Charts/LineCharts";


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
            "risk_structure": []
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
    const riskExpData = lastRecordData['risk_structure'].map((d) => d.value)
    const riskExpLabel = lastRecordData['risk_structure'].map((d) => d.label)
    console.log(lastRecordData)
    return (
        <div style={{padding: 10}}>

            <div style={{
                borderBottom: "1px solid #000",
                paddingBottom: "2px",
                display: "flex",
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <p style={{padding: 0}}>Position Risk Exposure</p>

                <div>
                    <span style={{paddingRight: 10}}>Net Exposure</span>
                    <span
                        style={{paddingRight: 10}}>{(exposureData[exposureData.length - 1]['data']['lev_exp'] * 100).toFixed(2)} %</span>
                </div>

                <div>
                    <span style={{paddingRight: 10}}>Risk</span>
                    <span
                        style={{paddingRight: 10}}>{(exposureData[exposureData.length - 1]['data']['port_std'] * 100).toFixed(2)} %</span>
                </div>

                <div>
                    <span style={{paddingRight: 10}}>Correlation Days</span>
                    <input type={'number'}
                           min={0}
                           defaultValue={correlPeriod}
                           onChange={(e) => setCorrelPeriod(e.target.value)}
                           style={{width: 100}}
                    />
                </div>

                <div>
                    <span style={{paddingRight: 10}}>Sample Period</span>
                    <input type={'number'}
                           min={0}
                           defaultValue={samplePeriod}
                           onChange={(e) => setSamplePeriod(e.target.value)}
                           style={{width: 100}}
                    />
                </div>

            </div>

            <div style={{display: "flex"}}>

                <div className={'card'} style={{height: 400, width: 400, marginTop: 10, marginRight: 5}}>
                    <div className={'card-header'}>
                        Position Exposure
                    </div>
                    <BarChart
                        labels={expLabel}
                        values={expData}/>
                </div>

                <div className={'card'} style={{height: 400, width: 400, marginTop: 10, marginRight: 5}}>
                    <div className={'card-header'}>
                        Risk Exposure
                    </div>
                    <BarChart
                        labels={riskExpLabel}
                        values={riskExpData}/>
                </div>

                <div className={'card'} style={{height: 400, width: 400, marginTop: 10, marginRight: 5, marginLeft: 5}}>
                    <div className={'card-header'}>
                        Position Exposure Concentration
                    </div>
                    <PieChart data={exposureData[exposureData.length - 1]['data']['exposures']}
                              labels={'instrument__name'}
                              values={'weight'}/>
                </div>

                <div className={'card'} style={{height: 400, width: 400, marginTop: 10, marginLeft: 5}}>
                    <div className={'card-header'} style={{
                        justifyContent: 'space-between'
                    }}>
                        <span>Position Correlation</span>
                    </div>
                    <Heatmap data={exposureData[exposureData.length - 1]['data']['correlation']}/>
                </div>


            </div>

            <div style={{display: "flex"}}>
                <div className={'card'} style={{flex: 1, height: 400, width: 400, marginTop: 10, marginLeft: 5}}>
                    <div className={'card-header'} style={{
                        justifyContent: 'space-between'
                    }}>
                        <span>Risk History</span>
                    </div>
                    <LineChart data={std_hist} labels={std_dates}/>
                </div>

                <div className={'card'} style={{flex: 1, height: 400, width: 400, marginTop: 10, marginLeft: 5}}>
                    <div className={'card-header'} style={{
                        justifyContent: 'space-between'
                    }}>
                        <span>Exposure History</span>
                    </div>
                    <BarChart
                        labels={std_dates}
                        values={exp_hist}/>
                </div>

            </div>

        </div>
    );
};