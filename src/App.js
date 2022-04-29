import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./util/firebase/firebase";

import Navigation from './routes/Navigation/Navigation';
import Home from "./routes/Home/Home";
import AuthenticationPage from './routes/AuthenticationPage/AuthenticationPage';
import ShopPage from './routes/ShopPage/ShopPage';
import CheckoutPage from './routes/CheckoutPage/CheckoutPage';

import { setCurrentUser } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="shop/*" element={<ShopPage/>}/>
        <Route path="auth" element={<AuthenticationPage/>}/>
        <Route path="checkout" element={<CheckoutPage/>}/>
      </Route>
    </Routes>
  );
};

export default App;
