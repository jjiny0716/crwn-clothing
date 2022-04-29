import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

import CartIcon from '../../components/CartIcon';
import CartDropdown from '../../components/CartDropdown';

import { selectCurrentUser } from '../../store/user/user.selector';

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import { signOutUser } from "../../util/firebase/firebase";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './Navigation.styles';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon/>
        </NavLinks>
        { 
          isCartOpen ? <CartDropdown/> : ""
        }
        {false}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
