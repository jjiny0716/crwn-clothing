import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";

import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/categories.selector";

import { CategoryContainer } from "./Category.styles.jsx";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState([]);
  console.log(isLoading);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>{products && products.map((product) => <ProductCard key={product.id} product={product} />)}</CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
