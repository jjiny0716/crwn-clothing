import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";
import { CategoryPreviewContainer } from "./CategoryPreview.styles";
import { CategoryItem } from '../store/categories/categories.types';

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
}

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Link to={`${title}`}>
          <span className="title">{title.toUpperCase()}</span>
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, i) => i < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
