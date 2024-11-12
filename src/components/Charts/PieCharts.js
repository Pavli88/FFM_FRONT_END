import {useState} from "react";
import Chart from "react-apexcharts";


export const PieChartGrouped = ({ data, groupBy, value }) => {
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
    const series = groupedData.map(item => Math.abs(item[value]));
    const labels = groupedData.map(item => item[groupBy]);

    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'pie',
        },
        labels: labels,
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
        <div>
            <Chart options={chartOptions} series={series} type="pie" width="400"/>
        </div>
    );
}

export const PieChart = ({ data, labels, values }) => {
    const labelArray = data.map((l) => l[labels])
    const valueArray = data.map((v) => Math.abs(v[values]))

    const chartOptions = {
        chart: {
            type: 'pie',
        },
        labels: labelArray,
        legend: {
            position: 'top', // Place the legend on top
            horizontalAlign: 'center', // Center the legend horizontally
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300
                },
                legend: {
                    position: 'top'
                }
            }
        }]
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            flexDirection: 'column'
        }}>
            <Chart options={chartOptions} series={valueArray} type="pie" width="100%" height="90%"/>
        </div>
    );
}


