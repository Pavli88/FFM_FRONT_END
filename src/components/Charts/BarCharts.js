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

export const BarChart = ({ labels, values, showLabel=false, showInPercent=true }) => {

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
        colors: [function (value) {
                return value["value"] < 0 ? '#ee7d8b' : '#00a59a';
            }],
        xaxis: {
            categories: labels,
            labels: {
                show: showLabel, // Hides x-axis labels
            },
            axisTicks: {
                show: false, // Hides x-axis ticks
            },
            axisBorder: {
                show: false, // Hides x-axis border
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    // Convert to percentage format
                    if (showInPercent == true) {
                        return (val * 100).toFixed(2) + '%';
                    }
                    else {
                        return (val).toFixed(2);
                    }

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

export const BarChartSorted = ({ labels, values }) => {
    // Combine labels and values for sorting
    const sortedData = labels
        .map((label, index) => ({ label, value: values[index] })) // Pair labels and values
        .sort((a, b) => a.value - b.value); // Sort by value (ascending order)

    // Extract sorted labels and values
    const sortedLabels = sortedData.map((item) => item.label);
    const sortedValues = sortedData.map((item) => item.value);

    const chartOptions = {
        chart: {
            type: 'bar',
        },
        series: [{
            name: 'Values',
            data: sortedValues, // Use sorted values
        }],
        xaxis: {
            categories: sortedLabels,
        },
        colors: [function (value) {
                return value["value"] < 0 ? '#ee7d8b' : '#00a59a';
            }],
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
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],
    };

    return (
        <div style={{ height: '100%' }}>
            <Chart options={chartOptions} series={chartOptions.series} type="bar" height="100%" />
        </div>
    );
};

export const StackedBarChart = ({ labels, data, yName = '', title }) => {
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
            labels: {
                show: false, // Hides x-axis labels
            },
            axisTicks: {
                show: false, // Hides x-axis ticks
            },
            axisBorder: {
                show: false, // Hides x-axis border
            },
        },
        grid: {
            borderColor: "#ccc", // Grid line color
            strokeDashArray: 1,  // Dashed grid lines (set to 0 for solid lines)
            xaxis: {
                lines: {
                    show: false, // Hide vertical grid lines
                },
            },
            yaxis: {
                lines: {
                    show: true, // Show horizontal grid lines
                },
            },
        },
        yaxis: {
            ...(yName ? { title: { text: yName } } : {}), // Conditionally show y-axis title
            labels: {
                formatter: (value) => value.toFixed(2), // Formats y-axis values to two decimal places
            },
        },
        legend: {
            position: 'bottom', // Legend position
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
        <div className={'card'} style={{paddingBottom: 20}}>
            <div className={'card-header'}>
                <label>{title}</label>
            </div>
            <div style={{height: '100%'}}>
                 <Chart
                options={options}
                series={series}
                type="bar"
                height={'100%'}
            />
            </div>

        </div>
    );
};
