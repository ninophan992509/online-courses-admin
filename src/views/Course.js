import React, { useEffect, useState } from "react";
import request from "config/request";
// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
  Spinner,
} from "react-bootstrap";
import { MdRemoveCircleOutline } from "react-icons/md";

function TableList() {
  const [courses, setCourse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [catId, setCatId] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    setLoading(true);
    const res = await request({
      url: "/categories",
      method: "GET",
    });

    if (res.code) {
      setCategories(res.data.rows);
    }
    setLoading(false);
  };

  const loadCourses = async (page, catId) => {
    setLoading(true);
    const res = await request({
      url: "/courses",
      method: "GET",
      params: {
        page,
        categoryId: +catId !== 0 ? catId : null,
      },
    });

    if (res.code) {
      setCourse(page === 1 ? res.data.rows : courses.concat(res.data.rows));
      setPage(res.pageNumber);
      setTotalPage(Math.floor(res.data.count / res.pageSize) + 1);
    }
    setLoading(false);
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
      alert("Error. Please try again!");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadCourses(1, catId);
    
  }, [catId]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Courses Management</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={catId}
                    onChange={(e) => setCatId(e.target.value)}
                  >
                    <option value={0}>All</option>
                    {categories &&
                      categories.map((cat, index) => {
                        return (
                          <option value={cat.id} key={index}>
                            {cat.category_name}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
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
                      !loading &&
                      courses.map((course, index) => {
                        return (
                          <tr key={index}>
                            <td
                              className="btn-icon"
                              onClick={() => delCourse(course.id)}
                            >
                              <MdRemoveCircleOutline />
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
                    <tr colSpan={16}>
                      {loading && <Spinner animation="border" variant="info" />}
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {page < totalPage && (
          <div className="d-flex justify-content-end">
            <Button
              className="btn btn-info"
              onClick={() => loadCourses(page + 1, catId)}
            >
              Load more courses
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}

export default TableList;
