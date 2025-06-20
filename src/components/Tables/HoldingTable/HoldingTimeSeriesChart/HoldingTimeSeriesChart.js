import './HoldingTimeSeriesChart.css'
import React, { useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import HoldingTimeSeriesModal from "../HoldingTimeSeriesModal/HoldingTimeSeriesModal";

const HoldingTimeSeriesChart = ({portfolioCode, holdingData}) => {

    const [cumulative, setCumulative] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [historyChartData, setHistoryChartData] = useState(null);
    const [selectedMetrics, setSelectedMetric] = useState([]);

    const getSeries = useMemo(() => {
        if (!historyChartData || selectedMetrics.length === 0) return [];
        // console.log(data)
        const series = [];

        Object.entries(historyChartData).forEach(([instrumentName, metricMap]) => {
            selectedMetrics.forEach((metric) => {
                const values = metricMap[metric] || [];
                let cumValue = 0;

                const seriesData = values.map(({date, value}) => {
                    cumValue = cumulative ? cumValue + value : value;
                    return {
                        x: date,
                        y: +cumValue.toFixed(2),
                    };
                });

                series.push({
                    name: `${instrumentName} - ${metric.replace(/_/g, ' ').toUpperCase()}`,
                    data: seriesData,
                });
            });
        });

        return series;
    }, [historyChartData, selectedMetrics, cumulative]);

    const chartOptions = {
        chart: {
            type: cumulative ? 'area' : 'bar',
            height: 400,
            stacked: !cumulative,
            toolbar: {show: true}
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'top'
                }
            }
        },
        xaxis: {
            labels: {show: false},
            axisTicks: {show: false},
            axisBorder: {show: false},
            title: {text: ''}
        },
        yaxis: {
            title: {
                text: selectedMetrics.length === 1
                    ? selectedMetrics[0].replace(/_/g, ' ').toUpperCase()
                    : ''
            }
        },
        dataLabels: {
            enabled: false,
            enabledOnSeries: []
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: cumulative
            ? {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.6,
                    opacityTo: 0.05,
                    stops: [0, 90, 100]
                }
            }
            : {},
        legend: {position: 'top'},
        tooltip: {
            shared: true,
            intersect: false
        }
    };
    console.log(getSeries)
    return (
        <div className="holding-chart-card">
            <div className="holding-chart-header">
                <h3>Holding Time Series</h3>

                <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                    <button
                        onClick={() => setShowHistoryModal(true)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            width: 200,
                        }}
                    >
                        Show History
                    </button>

                    <label style={{display: "flex", alignItems: "center", gap: "6px", cursor: "pointer"}}>
                        <input
                            type="checkbox"
                            checked={cumulative}
                            onChange={(e) => setCumulative(e.target.checked)}
                        />
                        Cumulative View
                    </label>
                </div>

            </div>

            <Chart
                options={chartOptions}
                series={getSeries}
                type={cumulative ? 'area' : 'bar'}
                height={400}
            />

            <HoldingTimeSeriesModal
                show={showHistoryModal}
                close={() => setShowHistoryModal(!showHistoryModal)}
                portfolioList={portfolioCode}
                data={holdingData}
                setChartData={setHistoryChartData}
                setSelectedMetric={setSelectedMetric}
            />

        </div>
    );
};

export default HoldingTimeSeriesChart;