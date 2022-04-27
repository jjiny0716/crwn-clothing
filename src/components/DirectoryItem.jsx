import { CategoryContainer } from "./DirectoryItem.styles.jsx";

const CategoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <CategoryContainer>
      <div className='background-image' style={{
        backgroundImage: `url(${imageUrl})`,
      }}></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </CategoryContainer>
  );
};

export default CategoryItem;
