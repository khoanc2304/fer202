import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductList = () => {
  const products = useSelector(state => state.products.list);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      <div className="row">
        {products.map(prod => (
          <div className="col-md-4" key={prod.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5>{prod.name}</h5>
                <p>Price: ${prod.price}</p>
                <p>Catalogs: {prod.catalogs.join(', ')}</p>
                <button className="btn btn-primary" onClick={() => dispatch(addToCart(prod))}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
