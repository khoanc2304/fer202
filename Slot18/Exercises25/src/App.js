import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <Link to="/" className="navbar-brand">Shop</Link>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Product List</Link>
          <Link to="/add" className="nav-link">Add Product</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
