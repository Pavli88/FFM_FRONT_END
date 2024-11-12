import {useContext, useEffect, useState} from "react";
import DateContext from "../../../context/date-context";
import axios from "axios";
import {BarChart} from "../../Charts/BarCharts";
import {PieChart} from "../../Charts/PieCharts";
import {Heatmap} from "../../Charts/Heatmaps";

export const PositionExposures = ({portfolioCodes, server}) => {
    const currentDate = useContext(DateContext)['currentDate'];
    // const [correlationData, setCorrelationData] = useState({})
    const [exposureData, setExposureData] = useState({
            "correlation": {},
            "exposures": [],
            "port_std": 0,
            "lev_exp": 0
        });
    const [correlPeriod, setCorrelPeriod] = useState(60);

    // Debounce the correlPeriod
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchExposures();
        }, 1000);
        return () => clearTimeout(handler);
    }, [correlPeriod, portfolioCodes]);

    const fetchExposures = async () => {
        const response = await axios.post(`${server}portfolios/get/position_exposures/`, {
            portfolio_code: portfolioCodes,
            period: correlPeriod,
            date: currentDate
        })
        setExposureData(response.data)
        // setCorrelationData(response.data['correlation'])
    };

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
                    <span style={{paddingRight: 10}}>Leverage</span>
                    <span style={{paddingRight: 10}}>{(exposureData['lev_exp'] * 100).toFixed(2)} %</span>
                </div>

                <div>
                    <span style={{paddingRight: 10}}>Risk</span>
                    <span style={{paddingRight: 10}}>{(exposureData['port_std'] * 100).toFixed(2)} %</span>
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
            </div>

            <div style={{display: "flex"}}>

                <div className={'card'} style={{height: 400, width: 400, marginTop: 10, marginRight: 5}}>
                    <div className={'card-header'}>
                        Position Exposure
                    </div>
                    <BarChart data={exposureData['exposures']} labels={'instrument__name'} values={'weight'}/>
                </div>

                <div className={'card'} style={{height: 400, width: 400, marginTop: 10, marginRight: 5, marginLeft: 5}}>
                    <div className={'card-header'}>
                        Position Exposure Concentration
                    </div>
                    <PieChart data={exposureData['exposures']} labels={'instrument__name'} values={'weight'}/>
                </div>

                <div className={'card'} style={{height: 400, width: 400, marginTop: 10, marginLeft: 5}}>
                    <div className={'card-header'} style={{
                        justifyContent: 'space-between'
                    }}>
                        <span>Position Correlation</span>
                    </div>
                    <Heatmap data={exposureData['correlation']}/>
                </div>

            </div>
        </div>
    );
};