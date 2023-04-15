import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const RobotTrades = (props) => {
    // let losingTradeNumber = 0;
    // let winningTradeNumber = 0;
    // let losingTrades = [];
    // let winningTrades = [];
    // let totalWinner = 0.0;
    // let totalLoser= 0.0;
    //
    // for (const val of props.data) {
    //     if (val < 0) {
    //         losingTradeNumber=+losingTradeNumber+1;
    //         losingTrades.push(val);
    //     } else if (val > 0){
    //         winningTradeNumber=+winningTradeNumber+1;
    //         winningTrades.push(val);
    //     };
    //
    // };
    //
    // for (let i = 0; i < losingTrades.length; i++) {
    //     totalLoser += losingTrades[i];
    // };
    //
    // for (let i = 0; i < winningTrades.length; i++) {
    //     totalWinner += winningTrades[i];
    // };
    //
    // let winPerc = Math.round((winningTradeNumber) / (losingTradeNumber + winningTradeNumber)*100)/100;
    // let lossPerc = Math.round(losingTradeNumber / (losingTradeNumber + winningTradeNumber)*100)/100;
    // let avgWinner = Math.round(totalWinner/winningTrades.length*100)/100;
    // let avgLoser = Math.round(totalLoser/losingTrades.length*100)/100;

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
            <Card.Title className="card-header-first">Profit and Loss</Card.Title>
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

export default RobotTrades;