import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from '../../components/CartIcon';
import CartDropdown from '../../components/CartDropdown';

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../Contexts/User";
import { CartContext } from '../../Contexts/CartContext';

import { signOutUser } from "../../util/firebase/firebase";
import "./Navigation.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon/>
        </div>
        { 
          isOpen ? <CartDropdown/> : ""
        }
        {false}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
