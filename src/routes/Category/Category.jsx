import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/ProductCard";
import { CategoriesContext } from "../../Contexts/Categories";

import { CategoryContainer } from "./Category.styles.jsx";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="title">{category.toUpperCase()}</h2>
      <CategoryContainer>{products && products.map((product) => <ProductCard key={product.id} product={product} />)}</CategoryContainer>
    </Fragment>
  );
};

export default Category;
