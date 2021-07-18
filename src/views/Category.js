import request from "config/request";
import React, { useState, useEffect } from "react";

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
  From,
  Modal,
  Form
} from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";



const ParentCatAddModal = (props) => {
  const { onHide, loadCategories, show } = props;
  const [name, setName] = useState('');
  const addCategory = async() => {
    if (name)
    {
      const res = await request({
        url: "/categories",
        method: "POST",
        data: {
          category_name:name,
        },
      });

      if (res.code)
      {
        onHide();
        loadCategories();
      }
    } else {
      alert('You must be fill category name');
    }
  }
  return (
    <Modal show={show} onHide={onHide} >
      <Modal.Header closeButton>
        <Modal.Title>Add new category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Category name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter category name" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button className="btn btn-primary" onClick={()=>addCategory()}>
          Add category
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const ChildCatAddModal = (props) => {
  const { onHide, loadCategories, show, categories } = props;
  const [name, setName] = useState('');
  const [catId, setCatId] = useState(0);
  const addCategory = async() => {
    if (name && catId !== 0)
    {
      const res = await request({
        url: "/categories",
        method: "POST",
        data: {
          category_name: name,
          parentId: +catId,
        },
      });

      if (res.code)
      {
        onHide();
        loadCategories();
      }
    } else {
      alert('You must be fill category name');
    }
  }
  return (
    <Modal show={show} onHide={onHide} >
      <Modal.Header closeButton>
        <Modal.Title>Add new category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Parent category</Form.Label>
          <Form.Control as="select" value={catId} onChange={e => setCatId(e.target.value)}>
            <option disabled>Select Parent Category</option>
            {categories && categories.map((cat, index) => {
              return (
                <option value={cat.id} key={index}>
                  {cat.category_name}
                </option>
              );
              
             })}
          </Form.Control>
        </Form.Group>
        <Form.Group >
          <Form.Label>Category name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter category name" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button className="btn btn-primary" onClick={()=>addCategory()}>
          Add category
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function TableList() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showAddParent, setShowAddParent] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);

  const loadCategories = async() => {
    const res = await request(
      {
        url: '/categories',
        method: 'GET',
      }
    );


    if (res.code)
    {
      setCategories(res.data.rows);
    }
  }


  const delCategory = async (id) => {
    try {
      const res = await request({
        url: `/categories/${id}`,
        method: "DELETE",
      });
      if (res.code) {
        loadCategories();
      }
    } catch (error)
    {
      alert('You must not remove the category which has course');
    }
    
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0)
    {
      const cats = categories.reduce((arr, cat) => {
        return arr.concat(cat.categories);
      },[]);

      setSubCategories(cats);
    }
  }, [categories]);

 

  return (
    <>
      <Container fluid>
        <ParentCatAddModal
          show={showAddParent}
          onHide={() => setShowAddParent(false)}
          loadCategories={() => loadCategories()}
        />
        <ChildCatAddModal
          show={showAddChild}
          onHide={() => setShowAddChild(false)}
          loadCategories={() => loadCategories()}
          categories={categories}
        />
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Categories</Card.Title>
                <Button
                  className="btn btn-info"
                  onClick={() => setShowAddParent(true)}
                >
                  Add Category
                </Button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Child Categories</th>
                      {/* <th className="border-0">Edit</th> */}
                      <th className="border-0">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length > 0 &&
                      categories.map((cat, index) => {
                        return (
                          <tr key={index}>
                            <td>{cat.id}</td>
                            <td>{cat.category_name}</td>
                            <td>{cat.categories.length}</td>
                            {/* <td>
                              <GoPencil />
                            </td> */}
                            <td
                              onClick={() => delCategory(cat.id)}
                              className="btn-icon"
                            >
                              <RiDeleteBin6Line />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">SubCategories</Card.Title>
                <Button
                  className="btn btn-info"
                  onClick={() => setShowAddChild(true)}
                >
                  Add SubCategory
                </Button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Parent Category</th>
                      {/* <th className="border-0">Edit</th> */}
                      <th className="border-0">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subCategories.length > 0 &&
                      subCategories.map((cat, index) => {
                        return (
                          <tr key={index}>
                            <td>{cat.id}</td>
                            <td>{cat.category_name}</td>
                            <td>{cat.parentId}</td>
                            {/* <td>
                              <GoPencil />
                            </td> */}
                            <td
                              className="btn-icon"
                              onClick={() => delCategory(cat.id)}
                              className="btn-icon"
                            >
                              <RiDeleteBin6Line />
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

export default TableList;
