import { useSelector } from "react-redux";
import { selectCartTotal, selectCartItems } from '../../store/cart/cart.selector';

import CheckoutItem from "../../components/CheckoutItem";

import { CheckoutContainer } from "./CheckoutPage.styles.jsx";

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <header className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </header>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className="total">Total: {totalPrice}</span>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
