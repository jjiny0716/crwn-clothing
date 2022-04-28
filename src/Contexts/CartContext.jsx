import { createContext, useReducer } from "react";

import { createAction } from "../util/reducer/reducer.util";

const addCartItem = (cartItems, productToAdd) => {
  const targetItem = cartItems.find((item) => item.id === productToAdd.id);

  if (targetItem) {
    targetItem.quantity++;
  } else {
    cartItems.push({
      ...productToAdd,
      quantity: 1,
    });
  }

  return [...cartItems];
};

const removeCartItem = (cartItems, productToRemove) => {
  const targetItemIndex = cartItems.findIndex((item) => item.id === productToRemove.id);
  const targetItem = cartItems[targetItemIndex];

  if (targetItem.quantity === 1) {
    cartItems.splice(targetItemIndex, 1);
  } else {
    targetItem.quantity--;
  }

  return [...cartItems];
};

const clearCartItem = (cartItems, productToClear) => {
  const targetItemIndex = cartItems.findIndex((item) => item.id === productToClear.id);
  cartItems.splice(targetItemIndex, 1);

  return [...cartItems];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = Object.freeze({
  SET_CART_ITEMS: Symbol("SET_CART_ITEMS"),
  SET_IS_CART_OPEN: Symbol("SET_IS_CART_OPEN"),
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type of action ${action} in cartReducer`);
  }
};

export const CartContextProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartItems.reduce((sum, item) => (sum += item.quantity), 0),
        cartTotal: newCartItems.reduce((sum, item) => (sum += item.quantity * item.price), 0),
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    updateCartItemsReducer(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    updateCartItemsReducer(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    updateCartItemsReducer(clearCartItem(cartItems, productToClear));
  };

  const setIsCartOpen = (newIsCartOpen) => {
    dispatch(createAction(
      CART_ACTION_TYPES.SET_IS_CART_OPEN,
      newIsCartOpen,
    ));
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, cartCount, cartTotal, addItemToCart, removeItemFromCart, clearItemFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
