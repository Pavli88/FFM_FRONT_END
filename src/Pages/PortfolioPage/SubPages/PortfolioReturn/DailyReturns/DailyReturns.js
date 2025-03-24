import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const returnOptions = [
    { value: 'dtd', label: 'DTD' },
    { value: 'mtd', label: 'MTD' },
    { value: 'qtd', label: 'QTD' },
    { value: 'qtd', label: 'YTD' },
    { value: '1m', label: '1M' },
     { value: '3m', label: '3M' },
     { value: '6m', label: '6M' },
    { value: 'si', label: 'SI' },

];

const DailyReturns = ({ returns, dates, changeReturnType }) => {
    const [selectedReturnType, setSelectedReturnType] = useState('dtd');

    const handleButtonClick = (value) => {
        setSelectedReturnType(value);
        changeReturnType({ value }); // Mimic select onChange shape
    };

    const x = {
        options: {
            chart: {
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                    },
                },
                type: 'bar',
            },
            colors: [function (value) {
                return value["value"] < 0 ? '#ee7d8b' : '#00a59a';
            }],
            xaxis: {
                categories: dates,
                type: 'date',
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: [{
                labels: {
                    formatter: (val) => val.toFixed(2) + "%",
                },
            }],
            dataLabels: {
                enabled: false,
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: (val) => val.toFixed(2) + "%",
                },
            },
        },
        series: [{
            name: 'Performance',
            data: returns.map((d) => d * 100),
        }],
    };

    return (
        <div className="card" style={{ height: '100%', width: '100%', margin: '0px' }}>
            <div className="card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Total Returns</span>

                <div style={{ display: 'flex', gap: '8px' }}>
                    {returnOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleButtonClick(option.value)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                backgroundColor: selectedReturnType === option.value ? '#007BFF' : '#fff',
                                color: selectedReturnType === option.value ? '#fff' : '#000',
                                cursor: 'pointer',
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ height: '100%' }}>
                <Chart
                    options={x.options}
                    series={x.series}
                    type="bar"
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default DailyReturns;
