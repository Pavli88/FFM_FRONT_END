import Card from "react-bootstrap/Card";

const CardWithHeader = (props) => {
    return(
        <Card className="card" style={{height: '100%', width: '100%', margin:'0px'}}>
            <Card.Header>{props.headerContent}</Card.Header>
            {props.children}
        </Card>
    )
};
export default CardWithHeader;