/** Action Type Constants: */
export const LOAD_ALL_PRODUCTS = "products/LOAD_ALL_PRODUCTS";

/**  Action Creators: */
export const loadAllProducts = (products) => ({
  type: LOAD_ALL_PRODUCTS,
  products,
});

/** Thunk Action Creators: */
export const getAllProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products");
  if (res.ok) {
    const products = await res.json();
    dispatch(loadAllProducts(products));
  } else {
    const errors = await res.json();
    console.log(errors);
    return errors;
  }
};

/** Products Reducer: */
const initialState = {allProducts: {}, singleProduct: {}};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_PRODUCTS: {
      const newState = {};
      action.products.forEach((product) => {
        newState[product.id] = product;
      });
      return {
        ...state,
        allProducts: newState,
        singleProduct: {},
      };
    }
    default:
      return state;
  }
};

export default productReducer;
