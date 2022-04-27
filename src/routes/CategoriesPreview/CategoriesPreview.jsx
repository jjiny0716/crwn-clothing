import { useContext, Fragment } from "react";

import CategoryPreview from "../../components/CategoryPreview";
import { CategoriesContext } from "../../Contexts/Categories";

import "./CategoriesPreview.scss";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={products}/>;
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
