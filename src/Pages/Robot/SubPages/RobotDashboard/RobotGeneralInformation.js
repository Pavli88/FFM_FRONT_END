import Col from "react-bootstrap/Col";
import CardWidgetMiddle from "../../../../components/CardWidgetMiddle";
import Row from "react-bootstrap/Row";

//CSS
import './RobotGeneralInformation.css'

const RobotGeneralInformation = (props) => {
    return (
        <Row style={{height:'100px'}}>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Strategy'}>
                        <p className={'card-paragraph'}>{props.data['strategy']}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Security'}>
                        <p className={'card-paragraph'}>{props.data['security']}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Inception Date'}>
                        <p className={'card-paragraph'}>{props.data['inception_date']}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Broker'}>
                        <p className={'card-paragraph'}>{props.data['broker']}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Account Number'}>
                        <p className={'card-paragraph'}>{props.data['account_number']}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Last Price'}>
                        <p className={'card-paragraph'}>{props.data['price']}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Last Pricing Date'}>
                        <p className={'card-paragraph'} style={{color: props.data['date'] < props.data['end_date'] ? 'red': 'green'}}>{props.data['date']}</p>
                    </CardWidgetMiddle>
                </Col>
            </Row>
    )
};
export default RobotGeneralInformation;