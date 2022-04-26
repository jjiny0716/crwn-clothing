import { useContext } from 'react';
import { CartContext } from '../Contexts/CartContext';

import { ReactComponent as ShoppingIcon } from "../assets/shopping-bag.svg"
import "./CardIcon.scss";

const CartIcon = () => {
  const { isOpen, setIsOpen, cartItems } = useContext(CartContext);
  const onClickHandler = (e) => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='cart-icon-container' onClick={onClickHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className='item-count'>{cartItems.reduce((sum, item) => sum += item.quantity, 0)}</span>
    </div>
  )
}

export default CartIcon;