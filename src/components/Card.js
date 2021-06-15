import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardWidget = (props) => {
    const height = props.height
    const width = props.width

    return (
        <Card style={{height: height, width: width, margin: '5px'}}>
            <Card.Header as="h5">{props.name}</Card.Header>
            <Card.Body>
                {props.children}
            </Card.Body>
        </Card>
    );
};

export default CardWidget