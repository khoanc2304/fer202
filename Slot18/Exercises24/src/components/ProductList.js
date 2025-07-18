import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, updateCart, deleteFromCart } from '../redux/cartSlice';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const product = {
  id: '123456',
  name: 'Example Product',
  price: 9.99,
  description: 'This is an example product.',
  catalogs: ['catalog1', 'catalog2'],
};
const ProductList = () => {
  const dispatch = useDispatch();
  return (
    <Container className="mb-5">
      <h2 className="mb-4">Products</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>
                <strong>${product.price}</strong>
              </Card.Text>
              <div className="d-flex gap-2">
                <Button variant="primary" onClick={() => dispatch(addToCart(product))}> Add to Cart</Button>
                <Button  variant="warning"
                  onClick={() => dispatch(updateCart({ ...product, quantity: 2 }))}>
                  Update to Cart
                </Button>
                <Button variant="danger"
                  onClick={() => dispatch(deleteFromCart(product.id))} >
                  Delete from Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
