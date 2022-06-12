import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../Category/Category.tsx';
import { fetchCategoiresStart } from '../../store/categories/categories.action';

import "./ShopPage.scss";

const ShopPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoiresStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}></Route>
      <Route path=':category' element={<Category/>}></Route>
    </Routes>
  );
};

export default ShopPage;
