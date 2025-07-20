import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import productReducer from './productSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
