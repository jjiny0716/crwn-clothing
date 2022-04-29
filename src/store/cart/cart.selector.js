import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector([selectCartReducer], (cartReducer) => cartReducer.isCartOpen);

export const selectCartItems = createSelector([selectCartReducer], (cartReducer) => cartReducer.cartItems);

export const selectCartCount = createSelector([selectCartItems], (cartItems) => cartItems.length ? cartItems.reduce((sum, item) => sum += item.quantity, 0) : 0);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => cartItems.length ? cartItems.reduce((sum, item) => sum += item.quantity * item.price, 0) : 0);
