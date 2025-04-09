import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const categories = [
  { id: 1, name: 'Men', url: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png?q=100',category :"men's clothing" },
  { id: 2, name: 'Women', url: 'https://media0.giphy.com/media/ObEnfxX2UBEkMwXgGa/giphy.gif?cid=6c09b952jjplw9uus946njpyhr9rh4a5cx2je5soxgoiowcs&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s',category :"women's clothing" },
  { id: 3, name: 'Electronics', url: 'https://rukminim2.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100',category :"electronics" },
  { id: 4, name: 'Jewellery', url: 'https://i.pinimg.com/originals/c4/4a/7b/c44a7b7f1aed5003d438f90ef063f4df.gif',category :"jewelery" },
];

const CategoryBar = ({ filterfun}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (url) => {
    navigate(url);
  };

  return (
    <div className={styles.categoryBar}>
      <div className={styles.container}>
      
          {categories.map((category) => (
            <div key={category.id} className={styles.categoryItem}  onClick={()=> filterfun(category.category)}>
              <div className={styles.logimage}>
              <img src={category.url}  />
              </div>
              <span
                className={styles.categoryButton}
                onClick={() => handleCategoryClick(category.url)}
              >
                {category.name}
              </span>
            </div>
          ))}
     
      </div>
    </div>
  );
};

export default CategoryBar;
