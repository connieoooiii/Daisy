/** Action Type Constants: */
export const LOAD_CART = "carts/LOAD_CART";

export const DELETE_CART_PRODUCT = "carts/DELETE_CART_PRODUCT";

export const DELETE_ALL_CART = "carts/DELETE_ALL_CART";

export const ADD_CART = "carts/ADD_CART";

export const UPDATE_CART = "carts/UPDATE_CART";

export const CART_TOTAL = "carts/CART_TOTAL";

/**  Action Creators: */
export const loadCart = (products) => ({
  type: LOAD_CART,
  products,
});

export const deleteCartProduct = (productId) => ({
  type: DELETE_CART_PRODUCT,
  productId,
});

export const deleteAllCart = (products) => ({
  type: DELETE_ALL_CART,
  products,
});

export const addCart = (product) => ({
  type: ADD_CART,
  product,
});

export const updateCart = (product) => ({
  type: UPDATE_CART,
  product,
});

export const cartTotal = (total) => ({
  type: CART_TOTAL,
  total,
});

/** Thunk Action Creators: */
export const loadCartThunk = () => async (dispatch) => {
  const res = await fetch("/api/carts");

  if (res.ok) {
    const products = await res.json();
    dispatch(loadCart(products));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteCartProductThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/carts/product/${productId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const product = await res.json();
    dispatch(deleteCartProduct(productId));
    return product;
  }
};

export const deleteAllCartThunk = (products) => async (dispatch) => {
  const res = await fetch("/api/carts", {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteAllCart(products));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const addToCartThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/carts/product/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const product = await res.json();
    dispatch(addCart(product));
    return product;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const updateCartThunk = (productId, amount) => async (dispatch) => {
  const res = await fetch(
    `/api/carts/product/${productId}/quantity/${amount}`,
    {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
    }
  );
  if (res.ok) {
    const product = await res.json();
    dispatch(updateCart(product));
    return product;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const cartTotalThunk = () => async (dispatch) => {
  const res = await fetch("/api/carts/total");
  if (res.ok) {
    const total = await res.json();
    dispatch(cartTotal(total));
    return total;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const productAlreadyInThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/carts/product/${productId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
  });
  if (res.ok) {
    const product = await res.json();
    dispatch(updateCart(product));
    return product;
  } else {
    const errors = await res.json();
    return errors;
  }
};

/** Products Reducer: */
const initialState = {cartProducts: {}, total: {}};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART: {
      const newState = {};
      action.products.forEach((product) => {
        newState[product.id] = product;
      });
      return {
        ...state,
        cartProducts: newState,
        total: {...state.total},
      };
    }
    case DELETE_CART_PRODUCT: {
      const newState = {
        ...state,
        cartProducts: {...state.cartProducts},
        total: {...state.total},
      };
      delete newState.cartProducts[action.productId];
      return newState;
    }
    case DELETE_ALL_CART: {
      const newState = {
        ...state,
        cartProducts: {...state.cartProducts},
        total: {total_price: 0},
      };
      for (let product of action.products) {
        delete newState.cartProducts[product.id];
      }
      return newState;
    }
    case ADD_CART: {
      return {
        ...state,
        cartProducts: {
          ...state.cartProducts,
          [action.product.id]: action.product,
        },
      };
    }
    case UPDATE_CART: {
      return {
        ...state,
        cartProducts: {
          ...state.cartProducts,
          [action.product.id]: action.product,
        },
      };
    }
    case CART_TOTAL: {
      const newState = {
        ...state,
        cartProducts: {...state.cartProducts},
        total: {},
      };
      newState.total = action.total;
      return newState;
    }
    default:
      return state;
  }
};

export default cartReducer;
