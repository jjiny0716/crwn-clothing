import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CartContext } from '../Contexts/CartContext';

import Button from './Button';
import CartItem from './CartItem';
import { CartDropdownContainer, EmptyMessage, CartItems } from "./CartDropdown.styles.jsx";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
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