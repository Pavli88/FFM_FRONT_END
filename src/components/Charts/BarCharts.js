import {useState} from "react";
import Chart from "react-apexcharts";

export const BarChartGrouped = ({ data, groupBy, value }) => {
    const groupData = (data, groupBy, value) => {
        return data.reduce((acc, curr) => {
            const existing = acc.find(item => item[groupBy] === curr[groupBy]);
            if (existing) {
                existing[value] += curr[value];
            } else {
                acc.push({[groupBy]: curr[groupBy], [value]: curr[value]});
            }
            return acc;
        }, []);
    };

    const groupedData = groupData(data, groupBy, value);
    const seriesData = groupedData.map(item => item[value]);
    const labels = groupedData.map(item => item[groupBy]);

    // Fix the structure of series
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'bar', // change to 'pie' if you're using a pie chart
        },
        series: [{
            name: 'Values', // a name for your series
            data: seriesData, // pass the seriesData here
        }],
        labels: labels,
        dataLabels: {
            enabled: false,  // Disable values on the bars
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    // Convert to percentage format
                    return (val * 100).toFixed(2) + '%';
                }
            },
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    });

    return (
        <div style={{height: "100%"}}>
            <Chart options={chartOptions} series={chartOptions.series} type="bar" height="100%"/>
        </div>
    );
}

export const BarChart = ({ labels, values }) => {

    const chartOptions = {
        chart: {
            type: 'bar',
        },
        series: [{
            name: 'Values',
            data: values,
        }],
        labels: labels ,
        dataLabels: {
            enabled: false,
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    // Convert to percentage format
                    return (val * 100).toFixed(2) + '%';
                }
            },
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    return (
        <div style={{height: "100%"}}>
            <Chart options={chartOptions} series={chartOptions.series} type="bar" height="100%"/>
        </div>
    );
}