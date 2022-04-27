import CategoryItem from './DirectoryItem';
import  { DirectoryContainer } from "./Directory.styles.jsx";

const Directory = ({ categories }) => {
  return (
    <DirectoryContainer>
      {categories.map(category => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  )
}

export default Directory;