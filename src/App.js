import { Routes, Route } from "react-router-dom";

import Navigation from './routes/Navigation/Navigation';
import Home from "./routes/Home/Home";
import AuthenticationPage from './routes/AuthenticationPage/AuthenticationPage';

const Shop = () => {
  return (<h1>I am the shop</h1>);
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="shop" element={<Shop/>}/>
        <Route path="auth" element={<AuthenticationPage/>}/>
      </Route>
    </Routes>
  );
};

export default App;
