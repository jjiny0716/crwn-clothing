import { useSelector, useDispatch } from "react-redux";
import { selectIsCartOpen, selectCartCount } from '../store/cart/cart.selector';
import { setIsCartOpen } from '../store/cart/cart.action';

import { ShoppingIcon, CartIconContainer, ItemCount } from "./CartIcon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const onClickHandler = () => {
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
