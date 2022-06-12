import { Fragment } from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../../components/CategoryPreview";
import Spinner from "../../components/Spinner";

import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
  const isLoading = useSelector(selectCategoriesIsLoading);
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products} />;
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
