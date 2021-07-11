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

function TableList() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Courses Management</Card.Title>
                {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Tuition fee</th>
                      <th className="border-0">Sale price</th>
                      <th className="border-0">Teacher</th>
                      <th className="border-0">Rating</th>
                      <th className="border-0">Students</th>
                      <th className="border-0">Create At</th>
                      <th className="border-0">Update At</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Python</td>
                      <td>No Imgage</td>
                      <td>2021 Complete Python Bootcamp From Zero to Hero in Python</td>
                      <td>$94,99</td>
                      <td>$79,99</td>
                      <td>Jose Portilla</td>
                      <td>4,6</td>
                      <td>1200</td>
                      <td>22/10/2018</td>
                      <td>14/07/2020</td>
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

export default TableList;
