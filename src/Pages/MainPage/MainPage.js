import UserRegistration from "./UserRegistertration";
import UserLogin from "./UserLogin";
import {Route, Switch} from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
const MainPage = (props) => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Button href="/login">Login</Button>
                </Col>
                <Col>
                    <Button href="/register">Create Account</Button>
                </Col>
            </Row>
            <Switch>
                <Route path="/login">
                    <UserLogin/>
                </Route>
                <Route path="/register">
                    <UserRegistration server={props.server}/>
                </Route>
            </Switch>
        </Container>
    )
};
export default MainPage;