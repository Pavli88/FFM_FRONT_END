import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const HomePageBarChart = (props) => {
    const chartOptions = {
        options: {
            chart: {
                toolbar: false,
                id: "basic-bar"
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
                labels: {show: false}
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
            <Card.Title className="card-header-first">{props.title}</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type={'bar'}
                    width="100%"
                    height="100%"/>
            </Card.Body>
        </Card>
    );
};
export default HomePageBarChart;