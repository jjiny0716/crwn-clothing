import { CategoryItem } from "../categories/categories.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../util/reducer/reducer.util";

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  return setCartItems(addCartItem(cartItems, productToAdd));
};

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
  return setCartItems(removeCartItem(cartItems, productToRemove));
};

export const clearItemFromCart = (cartItems: CartItem[], productToClear: CartItem) => {
  return setCartItems(clearCartItem(cartItems, productToClear));
};

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
  const targetItemIndex = cartItems.findIndex((item) => item.id === productToRemove.id);
  const targetItem = cartItems[targetItemIndex];

  if (targetItem.quantity === 1) {
    cartItems.splice(targetItemIndex, 1);
  } else {
    targetItem.quantity--;
  }

  return [...cartItems];
};

const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => {
  const targetItemIndex = cartItems.findIndex((item) => item.id === productToClear.id);
  cartItems.splice(targetItemIndex, 1);

  return [...cartItems];
};
