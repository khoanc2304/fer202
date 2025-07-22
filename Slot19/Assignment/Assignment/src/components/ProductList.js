import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    currentPrice: '',
    image: ''
  });

  useEffect(() => {
    axios.get('/products.json')
      .then(res => setProducts(res.data.products))
      .catch(() => setError('Failed to fetch products'));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    const addedProduct = { id, ...newProduct };
    setProducts([...products, addedProduct]);
    setNewProduct({ name: '', description: '', price: '', currentPrice: '', image: '' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Product List</h2>
      {error && <p className="text-danger">{error}</p>}

      <Row xs={1} md={3} className="g-4">
        {products.map(p => (
          <Col key={p.id}>
            <Card className="h-100 shadow-sm">
              <div className="text-center" style={{ height: '200px', overflow: 'hidden' }}>
                <Card.Img
                  variant="top"
                  src={process.env.PUBLIC_URL + '/' + p.image}
                  style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{p.name}</Card.Title>
                <Card.Text style={{ flexGrow: 1 }}>
                  {p.description}
                </Card.Text>
                <Card.Text>
                  <strong>Price:</strong> {p.price} VND<br/>
                  <strong>Current:</strong> {p.currentPrice} VND
                </Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                  <Link to={`/product/${p.id}`} className="btn btn-primary btn-sm">Detail</Link>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="mt-5">Add New Product</h3>
      <Form onSubmit={handleAddProduct} className="mt-3">
        <Row className="g-2">
          <Col md={2}><Form.Control placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required /></Col>
          <Col md={3}><Form.Control placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} required /></Col>
          <Col md={1}><Form.Control placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required /></Col>
          <Col md={1}><Form.Control placeholder="Current" value={newProduct.currentPrice} onChange={e => setNewProduct({ ...newProduct, currentPrice: e.target.value })} required /></Col>
          <Col md={3}><Form.Control placeholder="Image file" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} required /></Col>
          <Col md={2}><Button type="submit" variant="success" className="w-100">Add</Button></Col>
        </Row>
      </Form>
    </Container>
  );
}
