import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';

const ProductForm = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    catalogs: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      price: parseFloat(product.price),
      catalogs: product.catalogs.split(',').map(c => c.trim())
    };
    dispatch(addProduct(newProduct));
    setProduct({ id: '', name: '', price: '', catalogs: '' });
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="id" placeholder="ID" value={product.id} onChange={handleChange} className="form-control mb-2" />
        <input name="name" placeholder="Name" value={product.name} onChange={handleChange} className="form-control mb-2" />
        <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} className="form-control mb-2" />
        <input name="catalogs" placeholder="Catalogs (comma separated)" value={product.catalogs} onChange={handleChange} className="form-control mb-2" />
        <button className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
