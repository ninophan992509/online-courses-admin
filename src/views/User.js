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
} from "react-bootstrap";
import { CgUserRemove } from "react-icons/cg";

function User() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const loadUsers = async (page) => {
    const res = await request({
      url: "/users",
      method: "GET",
      params: {
        type: "student",
        page,
      },
    });

    if (res.code) {
      setUsers(page === 0 ? res.data.rows : users.concat(res.data.rows));
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
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Students Management</Card.Title>
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

export default User;
