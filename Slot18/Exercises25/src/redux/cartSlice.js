const initialState = {
  items: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

export const addToCart = (product) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }, 300); 
  };
};

export default cartReducer;
