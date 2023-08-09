/** Action Type Constants: */
export const LOAD_ALL_PRODUCTS = "products/LOAD_ALL_PRODUCTS";

export const LOAD_ONE_PRODUCT = "products/LOAD_ONE_PRODUCT";

/**  Action Creators: */
export const loadAllProducts = (products) => ({
  type: LOAD_ALL_PRODUCTS,
  products,
});

export const loadOneProduct = (product) => ({
  type: LOAD_ONE_PRODUCT,
  product,
});

/** Thunk Action Creators: */
export const getAllProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products");
  if (res.ok) {
    const products = await res.json();
    console.log("products type:", products);
    dispatch(loadAllProducts(products));
  } else {
    const errors = await res.json();
    console.log(errors);
    return errors;
  }
};

export const getOneProductThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`);

  if (res.ok) {
    const product = await res.json();
    console.log("ONE PRODUCT AFTER RES.Ok", product);
    dispatch(loadOneProduct(product));
    return product;
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
    case LOAD_ONE_PRODUCT: {
      const newState = {...state};
      newState.singleProduct = action.product;
      return newState;
    }
    default:
      return state;
  }
};

export default productReducer;
