import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../Category/Category';
import { getCategoriesAndDocuments } from '../../util/firebase/firebase';
import { setCategories } from '../../store/categories/categories.action';

import "./ShopPage.scss";

const ShopPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoryMap = async () => {
      const categories = await getCategoriesAndDocuments();
      dispatch(setCategories(categories));
    }

    getCategoryMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}></Route>
      <Route path=':category' element={<Category/>}></Route>
    </Routes>
  );
};

export default ShopPage;
