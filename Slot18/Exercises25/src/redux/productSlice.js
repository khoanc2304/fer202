const initialState = {
  list: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, list: [...state.list, action.payload] };
    default:
      return state;
  }
};

export const addProduct = (product) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: 'ADD_PRODUCT', payload: product });
    }, 500);
  };
};

export default productReducer;
