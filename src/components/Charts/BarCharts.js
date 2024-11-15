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

export const StackedBarChart = ( { labels, data, yName} ) => {
    const options = {
        chart: {
            type: 'bar',
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    enabled: false, // Hides the data labels on the bars
                },
            },

        },
        dataLabels: {
            enabled: false, // Global setting to disable data labels
        },
        xaxis: {
            categories: labels,
        },
        yaxis: {
            title: {
                text: yName,
            },
            labels: {
                formatter: (value) => value.toFixed(2), // Formats y-axis values to two decimal places
            },
        },
        legend: {
            position: 'top', // Legend position
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val}`, // Tooltip value formatting
            },
        },
    };

    const series = data;

    return (
        <div>
            <Chart
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </div>
    );
}