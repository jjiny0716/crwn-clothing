import { useContext } from 'react';

import { ProductsContext } from '../../Contexts/Products';
import ProductCard from '../../components/ProductCard';

import "./ShopPage.scss";

const ShopPage = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className='products-container'>
      {
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </div>
  );
}

export default ShopPage;