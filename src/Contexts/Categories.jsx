import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../util/firebase/firebase';

export const CategoriesContext = createContext({
  categoriesMap: {},
  // setProducts: () => null,
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  useEffect(() => {
    const getCategoryMap = async () => {
      setCategoriesMap(await getCategoriesAndDocuments());
    }
    getCategoryMap();
  }, []);

  return <CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>
}