import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Card } from 'react-bootstrap';

const Cart = () => {
  const cartItems = useSelector(state => state.cart);

  return (
    <Container>
      <h2 className="mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-muted">No products in cart.</p>
      ) : (
        cartItems.map(product => (
          <Card key={product.id} className="mb-3">
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>Price: ${product.price}</Card.Text>
              <Card.Text>Catalogs: {product.catalogs.join(', ')}</Card.Text>
              <Card.Text>Quantity: {product.quantity}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Cart;
