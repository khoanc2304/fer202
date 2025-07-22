import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/products.json')
      .then(res => {
        const found = res.data.products.find(p => p.id === id);
        if (found) setProduct(found);
        else setError('Product not found!');
      })
      .catch(() => setError('Failed to fetch product'));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Updated:', product);
    navigate(`/product/${id}`);
  };

  if (error) return <Container><p>{error}</p></Container>;
  if (!product) return <Container><p>Loading...</p></Container>;

  return (
    <Container className="mt-4">
      <h2>Edit Product</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-2">
          <Form.Control value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control value={product.currentPrice} onChange={e => setProduct({ ...product, currentPrice: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control value={product.image} onChange={e => setProduct({ ...product, image: e.target.value })} required />
        </Form.Group>
        <Button type="submit" variant="primary">Save</Button>
      </Form>
    </Container>
  );
}
