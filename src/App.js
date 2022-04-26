import { Routes, Route } from "react-router-dom";

import Navigation from './routes/Navigation/Navigation';
import Home from "./routes/Home/Home";
import AuthenticationPage from './routes/AuthenticationPage/AuthenticationPage';
import ShopPage from './routes/ShopPage/ShopPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="shop" element={<ShopPage/>}/>
        <Route path="auth" element={<AuthenticationPage/>}/>
      </Route>
    </Routes>
  );
};

export default App;
