import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"

import { selectCartItems } from '../store/cart/cart.selector';

import Button from './Button';
import CartItem from './CartItem';
import { CartDropdownContainer, EmptyMessage, CartItems } from "./CartDropdown.styles";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? cartItems.map((item) => (<CartItem key={item.id} cartItem={item}/>)) : ( 
            <EmptyMessage>Your cart is empty</EmptyMessage>
          )
        }
      </CartItems>
      <Link to="/checkout">
        <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
      </Link>
    </CartDropdownContainer>
  );
}

export default CartDropdown;