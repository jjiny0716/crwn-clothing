import { useContext } from "react";
import { CartContext } from "../Contexts/CartContext";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./CartIcon.styles.jsx";

const CartIcon = () => {
  const { isOpen, setIsOpen, cartItems } = useContext(CartContext);
  const onClickHandler = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <CartIconContainer onClick={onClickHandler}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartItems.reduce((sum, item) => (sum += item.quantity), 0)}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
