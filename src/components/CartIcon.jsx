import { useContext } from "react";
import { CartContext } from "../Contexts/CartContext";

import { ReactComponent as ShoppingIcon } from "../assets/shopping-bag.svg";
import { CartIconContainer } from "./CartIcon.styles.jsx";

const CartIcon = () => {
  const { isOpen, setIsOpen, cartItems } = useContext(CartContext);
  const onClickHandler = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <CartIconContainer onClick={onClickHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItems.reduce((sum, item) => (sum += item.quantity), 0)}</span>
    </CartIconContainer>
  );
};

export default CartIcon;
