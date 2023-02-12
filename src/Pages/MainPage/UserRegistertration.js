import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import axios from "axios";
import {useRef} from "react";

export default function Registration(props) {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'register/', {
            user_name: userNameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
        })
            .then(response => alert(response.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
  return (
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Logo
                  </h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" ref={userNameRef}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
                      </Form.Group>

                      {/*<Form.Group*/}
                      {/*  className="mb-3"*/}
                      {/*  controlId="formBasicPassword"*/}
                      {/*>*/}
                      {/*  <Form.Label>Confirm Password</Form.Label>*/}
                      {/*  <Form.Control type="password" placeholder="Password" />*/}
                      {/*</Form.Group>*/}

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" style={{width: '100%'}} onClick={submitHandler}>
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{' '}
                        <a href="/login" className="text-primary fw-bold">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
  );
}
