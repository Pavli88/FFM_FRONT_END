import {useEffect, useState} from "react";
import Chart from "react-apexcharts";

export const Heatmap = ({data}) => {
    const [heatmapData, setHeatmapData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const matrix = data;

        // Format data for the heatmap
        const formattedData = Object.keys(matrix).map(asset => ({
            name: asset,
            data: Object.keys(matrix[asset]).map(key => ({
                x: key,
                y: matrix[asset][key]
            }))
        }));

        setHeatmapData(formattedData);
        setCategories(Object.keys(matrix));
    }, [data]);


    const chartOptions = {
        chart: {
            type: 'heatmap',
            toolbar: {show: false},
            height: '100%'
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                colorScale: {
                    ranges: [
                        {from: -1, to: -0.5, color: '#F15B46'},
                        {from: -0.5, to: 0, color: '#FEB019'},
                        {from: 0, to: 0.5, color: '#A9D8A5'},
                        {from: 0.5, to: 1, color: '#1E90FF'}
                    ]
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(2);
            },
            style: {colors: ['#000']}
        },
        xaxis: {
            type: 'category',
            categories: categories // Use the updated categories from state
        },
        yaxis: {
            show: true
        },
    };

    return (
        <div style={{height: '100%', width: '100%'}}>
            <Chart
                options={chartOptions}
                series={heatmapData}
                type="heatmap"
                height="100%"
                width="100%"
            />
        </div>
    );
};