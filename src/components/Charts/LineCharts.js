import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export const LineChart = ( { data, labels } ) => {
    // Define initial state for chart data and options
    const chartData = {
        series: [
            {
                name: "Sales",
                data: data
            }
        ],
        options: {
            chart: {
                type: 'line',
                height: 350,
                toolbar: {
                    show: true
                }
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: labels
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        // Convert to percentage format
                        return (val * 100).toFixed(2) + '%';
                    }
                },
            },
            // title: {
            //     text: 'Monthly Sales Data',
            //     align: 'left'
            // },
            markers: {
                size: 4,
                colors: ['#FFA41B'],
                strokeColors: '#fff',
                strokeWidth: 2,
            },
            colors: ['#00BAEC']
        }
    };

    return (
        <div style={{height: "100%"}}>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />
        </div>
    );
};