import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from '../../components/CartIcon';
import CartDropdown from '../../components/CartDropdown';

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../Contexts/User";
import { CartContext } from '../../Contexts/CartContext';

import { signOutUser } from "../../util/firebase/firebase";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './Navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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
