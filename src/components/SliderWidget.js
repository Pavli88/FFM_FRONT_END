import {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from '@material-ui/core/Slider';

const SliderWidget = (props) => {

    const [value, setValue] = useState(30);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Typography id="continuous-slider" gutterBottom>
                {props.name}  {value} %
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider"/>
                </Grid>
            </Grid>
        </div>
    );
};

export default SliderWidget;