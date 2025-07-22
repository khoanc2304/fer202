import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/products.json')
      .then(res => {
        const found = res.data.products.find(p => p.id === id);
        if (found) setProduct(found);
        else setError('Product not found');
      })
      .catch(() => setError('Failed to fetch product'));
  }, [id]);

  if (error) return <Container><p>{error}</p></Container>;
  if (!product) return <Container><p>Loading...</p></Container>;

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <div className="text-center" style={{ height: '300px', overflow: 'hidden' }}>
          <Card.Img
            variant="top"
            src={process.env.PUBLIC_URL + '/' + product.image}
            style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
          />
        </div>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>
            <strong>Price:</strong> {product.price} VND<br/>
            <strong>Current Price:</strong> {product.currentPrice} VND
          </Card.Text>
          <Link to={`/edit/${product.id}`}>
            <Button variant="primary">Edit</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
