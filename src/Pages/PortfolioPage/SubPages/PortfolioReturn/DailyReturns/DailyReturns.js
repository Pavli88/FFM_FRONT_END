import Card from "react-bootstrap/Card";
import {CSVLink} from "react-csv";
import Chart from "react-apexcharts";
import Select from "react-select";

const DailyReturns = ( {returns, dates, changeReturnType} ) => {
    // const returns = props.data.map((data) => data.period_return * 100)
    // const dates = props.data.map((data) => data.date)
    const x = {
        options: {
            chart: {
                toolbar: {
                    show: true,
                    tools: {
                        download: true, // Enables the download button
                    }
                },
                type: 'bar',
                // zoom: {
                //     enabled: true,
                //     type: 'x',
                //     autoScaleYaxis: false,
                //     zoomedArea: {
                //         fill: {
                //             color: '#90CAF9',
                //             opacity: 0.4
                //         },
                //         stroke: {
                //             color: '#0D47A1',
                //             opacity: 0.4,
                //             width: 1
                //         }
                //     }
                // }
            },
            colors: [function(value){
                if (value["value"] < 0){
                    return '#E32227'
                }else {
                    return '#007500'
                }
            }],
            xaxis: {
                categories: dates,
                type: 'date',
                labels: {
                    show: false,
                    // formatter: function (value) {
                    //     return value.toFixed(2) + "%"; // Format x-axis labels as percentages
                    // }
                },
                axisBorder: {
                    show: false,
                    color: '#78909C',
                    height: 1,
                    width: '100%',
                    offsetX: 0,
                    offsetY: 0
                },
                axisTicks: {
                    show: false,
                    borderType: 'solid',
                    color: '#78909C',
                    height: 10,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(2) + "%";
                        }
                    },
                },
            ],
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 1
            },
            // legend: {
            //     position: 'right',
            //     offsetY: 40
            // },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val.toFixed(2) + "%"; // Display tooltip values as percentages
                    }
                }
            }
        },
        series: [
            {
                name: 'Performance',
                data: returns.map((d) => d*100),
            },
        ]
    }
    return(
        <div className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <div className={'card-header'}>


                <span>Total Returns</span>
                {/*<CSVLink data={props.data} style={{paddingLeft: 15}}>Download</CSVLink>*/}

                <div style={{paddingLeft: 15, paddingTop: 0, width: 200}}>
                    <Select
                        options={[
                            {value: 'dtd', label: 'Day to Date'},
                            {value: 'mtd', label: 'Month to Date'},
                            {value: 'qtd', label: 'Quarter to Date'},
                            {value: 'si', label: 'Inception to Date'},
                            {value: '1m', label: '1 Month'}
                        ]}
                        onChange={changeReturnType}
                        defaultValue={{value: 'dtd', label: 'Day to Date'}}
                    />
                </div>
            </div>
            <div style={{height: '100%'}}>
                <Chart
                    options={x.options}
                    series={x.series}
                    type={'bar'}
                    width="100%"
                    height="100%"/>
            </div>
        </div>
    )
};
export default DailyReturns;