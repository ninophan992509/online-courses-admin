import React from "react";

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

function User() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Students Management</Card.Title>
                {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Edit</th>
                      <th className="border-0">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Phan Ngan</td>
                      <td>ptkngan7@gmail.com</td>
                      <td><i className="nc-icon nc-simple-add"></i></td>
                      <td><i className="nc-icon nc-simple-delete"></i></td>
                    </tr><tr>
                      <td>2</td>
                      <td>Phan Ngan</td>
                      <td>ptkngan7@gmail.com</td>
                      <td><i className="nc-icon nc-simple-add"></i></td>
                      <td><i className="nc-icon nc-simple-delete"></i></td>
                    </tr><tr>
                      <td>3</td>
                      <td>Phan Ngan</td>
                      <td>ptkngan7@gmail.com</td>
                      <td><i className="nc-icon nc-simple-add"></i></td>
                      <td><i className="nc-icon nc-simple-delete"></i></td>
                    </tr><tr>
                      <td>4</td>
                      <td>Phan Ngan</td>
                      <td>ptkngan7@gmail.com</td>
                      <td><i className="nc-icon nc-simple-add"></i></td>
                      <td><i className="nc-icon nc-simple-delete"></i></td>
                    </tr>
                    
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
