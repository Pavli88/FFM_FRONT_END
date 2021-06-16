import {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from '@material-ui/core/Slider';
import Form from "react-bootstrap/Form";
const SliderWidget = (props) => {

    const [value, setValue] = useState(props.defaultValue);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    // console.log(value)
    return (
        <div>
            {/*<Typography id="continuous-slider" gutterBottom>*/}
            {/*    {props.name}  {value} %*/}
            {/*</Typography>*/}
            {/*<Grid >*/}
            {/*    <Grid item xs>*/}
            {/*        <Slider*/}
            {/*            defaultValue={value}*/}
            {/*            onChange={handleChange}*/}
            {/*            aria-labelledby="continuous-slider"*/}
            {/*            marks*/}
            {/*            min={0.0001}*/}
            {/*            max={1.0100}*/}
            {/*            steps={0.0025}*/}
            {/*            valueLabelDisplay="auto"/>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
            <Form>
                <Form.Group controlId="formBasicRange">
                    <Form.Label>Risk per Trade {value} %</Form.Label>
                    <Form.Control onChange={handleChange} type="range" min={0.00} max={0.1} step={0.0025} value={value}/>
                </Form.Group>
            </Form>
        </div>
    );
};

export default SliderWidget;