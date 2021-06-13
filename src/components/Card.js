import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardWidget = (props) => {
    return (
        <Card>
            <Card.Header as="h5">{props.name}</Card.Header>
            <Card.Body>
                {props.children}
                <Button variant="primary">{props.buttonName}</Button>
            </Card.Body>
        </Card>
    );
};

export default CardWidget