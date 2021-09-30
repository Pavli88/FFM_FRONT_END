import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardWidget = (props) => {
    const height = props.height
    const width = props.width

    return (
        <Card style={props.style}>
            <Card.Header as="h5">{props.name}</Card.Header>
            <Card.Body style={{padding: '0px'}}>
                {props.children}
            </Card.Body>
        </Card>
    );
};

export default CardWidget