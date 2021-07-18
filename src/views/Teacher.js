import React, { useState, useEffect } from "react";
import request from "config/request";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Form
} from "react-bootstrap";
import { CgUserRemove } from "react-icons/cg";

const AddModal = (props) => {
  const { onHide, loadUsers, show } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addTeacher = async () => {
    if (name && email && password) {
      const res = await request({
        url: "/users/teacher",
        method: "POST",
        data: {
          fullname: name,
          email,
          password,
        },
      });

      if (res.code) {
        onHide();
        loadUsers(1);
      }
    } else {
      alert("You must be fill name, email, password");
    }
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add new teacher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter teacher name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button className="btn btn-primary" onClick={() => addTeacher()}>
          Add teacher
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function Teacher() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [show, setShow] = useState(false);

  const loadUsers = async (page) => {
    const res = await request({
      url: "/users",
      method: "GET",
      params: {
        type: "teacher",
        page,
      },
    });

    if (res.code) {
      setUsers(res.pageNumber === 1 ? res.data.rows : users.concat(res.data.rows));
      setPage(res.pageNumber);
      setTotalPage(Math.floor(res.data.count / res.pageSize) + 1);
    }
  };

  const delUser = async (id) => {
    try {
      const res = await request({
        url: `/users/${id}`,
        method: "DELETE",
      });

      if (res.code) {
        loadUser(1);
        alert("Success");
      }
    } catch (error) {
      alert("Error. Please try again!");
    }
  };

  useEffect(() => {
    loadUsers(1);
  }, []);

  return (
    <>
      <Container fluid>
        <AddModal loadUsers={loadUsers} show={show} onHide={()=>setShow(false)}  />
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Teachers Management</Card.Title>
                <button className="btn btn-info" onClick={() => setShow(true)}>Add Teacher</button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((user, index) => {
                        return (
                          <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td
                              className="btn-icon"
                              onClick={() => delUser(user.id)}
                            >
                              <CgUserRemove />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Teacher;
