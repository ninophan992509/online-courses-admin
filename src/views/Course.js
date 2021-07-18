import React, { useEffect, useState } from "react";
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
import { MdRemoveCircleOutline } from "react-icons/md";

function TableList() {
  const [courses, setCourse] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const loadCourses = async (page) => {
    const res = await request({
      url: "/courses",
      method: "GET",
      params: {
        page,
      },
    });

    if (res.code) {
      setCourse(page=== 0 ? res.data.rows : courses.concat(res.data.rows));
      setPage(res.pageNumber);
      setTotalPage(Math.floor(res.data.count / res.pageSize) + 1);
    }
  };
  
  const delCourse = async (id) => {
    try {
       const res = await request({
         url: `/courses/${id}`,
         method: "DELETE",
       });

       if (res.code) {
         loadCourses(1);
         alert("Success");
       }
    } catch (error) {
      alert('Error. Please try again!');
    }
   
  };

  useEffect(() => {
    loadCourses(1);
  }, [])

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Courses Management</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Lock</th>
                      <th className="border-0">ID</th>
                      <th className="border-0">Category</th>

                      <th className="border-0">Name</th>
                      <th className="border-0">Tuition fee</th>
                      <th className="border-0">Sale price</th>
                      <th className="border-0">Teacher</th>
                      <th className="border-0">Rating</th>
                      <th className="border-0">Students</th>
                      <th className="border-0">Create At</th>
                      <th className="border-0">Update At</th>
                      <th className="border-0">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses &&
                      courses.map((course, index) => {
                        return (
                          <tr key={index}>
                            <td className="btn-icon" onClick={() => delCourse(course.id)}>
                              <MdRemoveCircleOutline/>
                            </td>
                            <td>{course.id}</td>
                            <td>{course.category_name}</td>

                            <td>{course.course_name}</td>
                            <td>${course.tuition_fee}</td>
                            <td>
                              ${course.sale === -1 ? "No sale" : course.sale}
                            </td>
                            <td>{course.teacher_name}</td>
                            <td>{course.rating}</td>
                            <td>{course.number_enrolled}</td>
                            <td>{course.createdAt}</td>
                            <td>{course.updatedAt}</td>
                            <td>{course.picture}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {page < totalPage && (
          <div className="d-flex justify-content-end">
            <Button className="btn btn-info">Load more courses</Button>
          </div>
        )}
      </Container>
    </>
  );
}

export default TableList;
