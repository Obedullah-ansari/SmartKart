import React from 'react';
import { Pointer, Star } from 'lucide-react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({
  id,
  title,
  description,
  image,
  price,
  rating,
}) => {
  
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  
 const navigate = useNavigate()
  const authHandelRoute = ()=>{
  const token = localStorage.getItem("token")
    if(token){
      navigate(`/product/${id}`)
    }else{
      navigate(`/auth`)
    }
  }

  return (
  <div onClick={authHandelRoute} style={{cursor:"pointer"}}>
      <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <div className={styles.price}>${price.toFixed(2)}</div>
          <div className={styles.rating}>
            {stars.map((star) => (
              <Star
                key={star}
                size={16}
                className={star <= rating ? styles.starFilled : styles.star}
                fill={star <= rating ? 'currentColor' : 'none'}
              />
            ))}
            <span className={styles.ratingText}>({rating.toFixed(1)})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProductCard;
