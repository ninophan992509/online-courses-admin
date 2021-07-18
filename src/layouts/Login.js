import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "../assets/css/demo.css";
import request from "../config/request";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const location = useLocation();
  useEffect(() => {
    let user = localStorage.getItem("userInfo");
    if (user)
    {
      user = JSON.parse(user);
      if (user.type === 'admin')
      {
        history.push('/admin/dashboard');
      }
    }
    
  },[location]);

  const onLogin = async(e) => {
    e.preventDefault();
    if (email, password)
    {
      try {
        const res = await request(
          {
            method: 'POST',
            url: '/auth/signin',
            data: {
              email,
              password,
            }
          }
        );
        if (res.code)
        {
          localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.rfToken);
          history.push("/admin/dashboard");
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message)
        {
          alert(error.response.data.message);
        }
      }
    } else {
      alert('You must be fill email and password');
    }
  }
    return (
      <Container fluid>
        <Row>
          <Col md="6" className="mx-auto mt-5">
            <Card>
              <Card.Header>
                <Card.Title className="d-flex justify-content-center mt-3">
                  Novus <small>Admin</small>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="" xs="12">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter email"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" xs="12">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="btn-fill pull-right w-50 mb-3"
                      type="submit"
                      variant="info"
                      onClick={(e)=>onLogin(e)}
                    >
                      Login
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
}

export default Login;
