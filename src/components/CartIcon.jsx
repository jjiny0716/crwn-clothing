import { useContext } from "react";
import { CartContext } from "../Contexts/CartContext";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./CartIcon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const onClickHandler = (e) => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={onClickHandler}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
