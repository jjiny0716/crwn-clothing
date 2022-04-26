import { createContext, useState } from "react";

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
  isOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const value = { isOpen, setIsOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
