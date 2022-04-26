import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CartContext } from '../Contexts/CartContext';

import Button from './Button';
import CartItem from './CartItem';
import "./CartDropdown.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  }

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {
          cartItems.map((item) => (<CartItem key={item.id} cartItem={item}/>))
        }
      </div>
      <Link to="/checkout">
        <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
      </Link>
    </div>
  );
}

export default CartDropdown;