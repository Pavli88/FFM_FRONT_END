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

export const PieChart = ({ labels, values, title }) => {
    const chartOptions = {
        chart: {
            type: 'pie',
        },
        labels: labels,
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
        <div className={'card'} style={{paddingBottom: 20}}>
            <div className={'card-header'}>
                <label>{title}</label>
            </div>
            <div style={{height: '100%'}}>
                <Chart options={chartOptions} series={values} type="pie" width="100%" height="90%"/>
            </div>
        </div>
    );
}

export const PieChartSorted = ({ labels, values, title }) => {
    // Combine labels and values into an array of objects for sorting
    const data = labels.map((label, index) => ({
        label: label,
        value: values[index],
    }));

    // Sort the data based on the values in descending order
    const sortedData = data.sort((a, b) => b.value - a.value);

    // Extract sorted labels and values
    const sortedLabels = sortedData.map(item => item.label);
    const sortedValues = sortedData.map(item => item.value);

    // Chart options
    const chartOptions = {
        chart: {
            type: 'pie',
        },
        labels: sortedLabels,
        legend: {
            show: false,
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
            <div className={'card-header'}>
                <label>{title}</label>
            </div>
            <Chart options={chartOptions} series={sortedValues} type="pie" width="100%" height="90%" />
        </div>
    );
};

