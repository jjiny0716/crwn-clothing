import { createContext, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const targetItem =  cartItems.find((item) => item.id === productToAdd.id);

  if (targetItem) {
    targetItem.quantity++;
  }
  else {
    cartItems.push({
      ...productToAdd,
      quantity: 1,
    })
  }

  return [...cartItems];
}

export const CartContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }
  const value = { isOpen, setIsOpen, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
}