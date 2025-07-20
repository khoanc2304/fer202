import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      <ul className="list-group">
        {cartItems.map((item, index) => (
          <li className="list-group-item" key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
