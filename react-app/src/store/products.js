/** Action Type Constants: */
export const LOAD_ALL_PRODUCTS = "products/LOAD_ALL_PRODUCTS";

export const LOAD_ONE_PRODUCT = "products/LOAD_ONE_PRODUCT";

export const LOAD_USER_PRODUCTS = "products/LOAD_USER_PRODUCTS";

export const DELETE_PRODUCT = "products/DELETE_PRODUCT";

export const ADD_PRODUCT = "products/ADD_PRODUCT";

export const UPDATE_PRODUCT = "products/UPDATE_PRODUCT";

/**  Action Creators: */
export const loadAllProducts = (products) => ({
  type: LOAD_ALL_PRODUCTS,
  products,
});

export const loadOneProduct = (product) => ({
  type: LOAD_ONE_PRODUCT,
  product,
});

export const loadUserProducts = (products) => ({
  type: LOAD_USER_PRODUCTS,
  products,
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
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

export const getUserProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products/user");

  if (res.ok) {
    const products = await res.json();
    dispatch(loadUserProducts(products));
    return products;
  } else {
    const errors = await res.json();
    console.log(errors);
    return errors;
  }
};

export const deleteProductThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const product = await res.json();
    console.log("INSIDE RES OK DELETE THUNK");
    dispatch(deleteProduct(productId));
    return product;
  } else {
    const errors = await res.json();
    console.log(errors);
    return errors;
  }
};

export const addProductThunk = (product) => async (dispatch) => {
  try {
    console.log("I AM INSIDE THUNK, before res ");
    const res = await fetch("/api/products", {
      method: "POST",
      body: product,
    });

    if (res.ok) {
      const newProduct = await res.json();
      console.log("INSIDE ADD PRO THUNK AFTER RES OK");
      dispatch(addProduct(newProduct));
      return newProduct;
    } else {
      const errors = await res.json();
      console.log("an error occurred", errors);
      return errors;
    }
  } catch (error) {
    console.error("An error occurred while fetching:", error);
    // You can handle the error further or return an error object
    return {error: "An error occurred while fetching"};
  }
};

export const updateProductThunk = (product) => async (dispatch) => {
  console.log("inside update product thunk");
  const res = await fetch(`/api/products/${product.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(product),
  });
  if (res.ok) {
    const editProduct = await res.json();
    console.log("INISDE UPDATE THUNK", editProduct);
    dispatch(updateProduct(editProduct));
    return editProduct;
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
    case LOAD_USER_PRODUCTS: {
      const newState = {};
      action.products.forEach((product) => {
        newState[product.id] = product;
      });
      return {
        ...state,
        allProducts: newState,
      };
    }
    case DELETE_PRODUCT: {
      const newState = {
        ...state,
        allProducts: {...state.allProducts},
        singleProduct: {...state.singleProduct},
      };
      delete newState.allProducts[action.productId];
      delete newState.singleProduct[action.productId];
      return newState;
    }
    case ADD_PRODUCT: {
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.product.id]: action.product,
        },
      };
    }
    case UPDATE_PRODUCT: {
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.product.id]: action.product,
        },
      };
    }
    default:
      return state;
  }
};

export default productReducer;
