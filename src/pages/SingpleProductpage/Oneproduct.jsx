import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Styles.module.css";
import { Star } from "lucide-react";

import { useParams } from "react-router-dom";

function Oneproduct() {
  const [productdetails, setProductdetails] = useState();
  const [dummy, setDummy] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    const handelSingleProjectDetail = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Set the correct content type
          },
        });
        if (res.ok) {
          const data = await res.json();
          setProductdetails(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handelSingleProjectDetail();
  }, [id]);
 
  const handleCartItems = () => {
    let cartItems = [];
  
    const existingCart = localStorage.getItem("cartItems");
    if (existingCart) {
      cartItems = JSON.parse(existingCart);
    }
  
    const isAlreadyAdded = cartItems.some(
      (item) => item.id === productdetails.id
    );
  
    if (!isAlreadyAdded) {
      cartItems.push(productdetails);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    setDummy((prev)=>!prev)
  };
  
  
  

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  return (
    <>
      <section className={styles.container}>
        <Navbar update={dummy} />
        {productdetails && (
          <div className={styles.subcontainer}>
            <div className={styles.imageSection}>
              <img
                src={productdetails.image}
                alt="Product"
                className={styles.productImage}
              />
            </div>
            <div className={styles.detailSection}>
              <h2 className={styles.title}>{productdetails.title}</h2>
              <p className={styles.description}>{productdetails.description}</p>
              <div className={styles.rating}>
                {stars.map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= productdetails.rating.rate
                        ? styles.starFilled
                        : styles.star
                    }
                    fill={
                      star <= productdetails.rating.rate
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
                <span className={styles.ratingText}>
                  ({productdetails.rating.rate.toFixed(1)})
                </span>
              </div>
              <div className={styles.price}>{`$${productdetails.price}`}</div>
              <button className={styles.buyBtn} onClick={handleCartItems} >Add to Cart</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Oneproduct;
