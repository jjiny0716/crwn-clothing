import { useSelector, useDispatch } from "react-redux";
import { selectIsCartOpen, selectCartCount } from '../store/cart/cart.selector.js';
import { setIsCartOpen } from '../store/cart/cart.action.js';

import { ShoppingIcon, CartIconContainer, ItemCount } from "./CartIcon.styles.jsx";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const onClickHandler = (e) => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={onClickHandler}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
