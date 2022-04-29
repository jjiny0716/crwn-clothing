import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../util/reducer/reducer.util"

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, addCartItem(cartItems, productToAdd));
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, removeCartItem(cartItems, productToRemove));
};

export const clearItemFromCart = (cartItems, productToClear) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, clearCartItem(cartItems, productToClear));
};

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
