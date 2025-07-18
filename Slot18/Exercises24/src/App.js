import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <h1>Shopping Cart with Redux</h1>
      <ProductList />
      <Cart />
    </div>
  );
}

export default App; 

