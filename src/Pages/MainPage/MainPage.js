import UserRegistration from "./UserRegistertration";
import UserLogin from "./UserLogin";
import {Route, Switch} from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
const MainPage = (props) => {
    return (
        <Container fluid>
            <Row style={{width: '100%', marginTop: 5, padding: 0}}>
                <Col sm={10} style={{display:'flex'}}>
                    <div style={{margin: 2}}>
                        <h2 stlye={{margin:0, height:'100%'}}>Fractal</h2>
                    </div>
                    <div style={{margin: 2, padding: 5}}>
                        <p style={{textAlign: 'center'}}>Investment & Trade System</p>
                    </div>
                </Col>
                <Col>
                    <Button md="auto" href="/register" style={{marginTop: 6}}>Create Account</Button>
                    <Button md="auto" href="/login" style={{marginTop: 6, marginLeft: 20}}>Login</Button>
                </Col>
            </Row>
            <Switch>
                <Route path="/login">
                    <UserLogin server={props.server}/>
                </Route>
                <Route path="/register">
                    <UserRegistration server={props.server}/>
                </Route>
            </Switch>
        </Container>
    )
};
export default MainPage;