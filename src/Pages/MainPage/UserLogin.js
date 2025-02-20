import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Card, Col, Alert, Container } from "react-bootstrap";

// Context
import AuthContext from "../../context/AuthProvider";

export default function Login({ server }) {
  const { setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(`${server}user/login/`, formData);
      console.log(response)
      setAuth(response.data);
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Col md={6} lg={5} sm={8} xs={12}>
        <Card className="shadow-lg p-4">
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Link to="#" className="text-primary small">Forgot password?</Link>
              </div>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Login
              </Button>
            </Form>

            <p className="mt-3 text-center">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}