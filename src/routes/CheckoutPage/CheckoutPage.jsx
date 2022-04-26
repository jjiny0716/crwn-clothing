import { useContext } from 'react';

import CheckoutItem from '../../components/CheckoutItem';

import { CartContext } from '../../Contexts/CartContext';
import "./CheckoutPage.scss";

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);
  const totalPrice = cartItems ? cartItems.reduce((sum, item) => sum += item.quantity * item.price, 0) : 0;

  return (
    <div className='checkout-container'>
      <header className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </header>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
      ))}
      <span className='total'>Total: {totalPrice}</span>
    </div>
  );
}

export default CheckoutPage;