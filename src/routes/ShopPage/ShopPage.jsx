import { Routes, Route } from "react-router-dom";

import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../Category/Category';

import "./ShopPage.scss";

const ShopPage = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}></Route>
      <Route path=':category' element={<Category/>}></Route>
    </Routes>
  );
};

export default ShopPage;
