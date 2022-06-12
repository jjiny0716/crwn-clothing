import { useNavigate } from 'react-router-dom';
import { DirectoryCategory } from './Directory.js';

import { DirectoryItemContainer, BackgroundImage, Body } from "./DirectoryItem.styles";

type DirectoryItemProps = {
  category: DirectoryCategory;
}

const DirectoryItem = ({ category }: DirectoryItemProps) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();

  function onNavigateHandler()  {
    navigate(route);
  }

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
