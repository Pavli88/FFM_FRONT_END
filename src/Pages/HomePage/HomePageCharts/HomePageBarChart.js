import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const HomePageBarChart = (props) => {
    const chartOptions = {
        options: {
            chart: {
                toolbar: false,
                id: props.id,
            },
            colors: [function(value){
                if (value['value'] < 0){
                    return '#E32227'
                }else {
                    return '#007500'
                }
            }],
            xaxis: {
                categories: [],
                labels: {show: false},
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
                    height: 6,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            title: {
                text: props.title,
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: '#263238'
                },
            },
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0);
                        }
                    },
                    title: {
            text: 'Profit'
          }
                }
            ],
            dataLabels: {
                enabled: false
            },
        },
        series: [
            {
                name: "series-1",
                data: props.data,
            }
        ]
    };
    return (
        <Card className="card" style={{margin: '2px', height: '100%'}}>
            <Card.Body style={{padding: '0px'}}>
                <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type={props.type}
                    width="100%"
                    height="100%"/>
            </Card.Body>
        </Card>
    );
};
export default HomePageBarChart;