import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, {useContext, useRef} from "react";
import axios from "axios";

// Context
import AuthContext from "../../context/AuthProvider";

export default function Login(props) {
  const { setAuth } = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'login/', {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        })
            .then(response => setAuth(response.data))
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
                <div className="mb-3">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Username
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter username" ref={usernameRef}/>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                    >
                      <p className="small">
                        <a className="text-primary" href="#!">
                          Forgot password?
                        </a>
                      </p>
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit" style={{width: '100%'}} onClick={submitHandler}>
                        Login
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <a href="/register" className="text-primary fw-bold">
                        Sign Up
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