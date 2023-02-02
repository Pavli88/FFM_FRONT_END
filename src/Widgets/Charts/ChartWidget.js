import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const ChartWidget = (props) => {
    return (
        <Card className="card" style={{height: '100%', width: '100%', margin:'0px'}}>
            <Chart
                options={props.options}
                series={props.series}
                type={props.options.chart.type}
                width="100%"
                height="100%"/>
        </Card>
    )
};
export default ChartWidget;