import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import Navbar from '../../components/Navbar/Navbar'
import CategoryBar from '../../components/CategoryBar/CategoryBar'
import ProductCard from '../../components/Card/ProductCard'


function Product() {
 
    const [products, setProducts]= useState([]);
    const [allProducts, setAllProducts] = useState([]);

     useEffect(()=>{

         const handelProductData = async()=>{
            try{
                const res = await fetch("https://fakestoreapi.com/products",{
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json", // Set the correct content type
                  },
                })
                if(res.ok){
                    const data = await res.json();
                    setProducts(data)
                    setAllProducts(data);
                }
              }catch(err){
                console.log(err)
              }
         }
         handelProductData()

     },[])


     const handelFilter = (query) => {
        const temp = allProducts.filter(
          (eachproduct) => eachproduct.category === query
        )
        setProducts(temp);
      };



  return (
    <section className={styles.Productpage}>
      <Navbar />

      <div className={styles.ProductContainer}>
      <CategoryBar filterfun={handelFilter} />
      <div className={styles.productlist}>
         {products && Array.isArray(products) && products.length > 0 ? (
           products.map((productdetails)=>(
            <ProductCard
            key={productdetails.id}
            id={productdetails.id}
            title={productdetails.title}
            description={productdetails.description}
            image={productdetails.image}
            price={productdetails.price}
            rating={productdetails.rating?.rate}
          />
           ))
         ):(<div className={styles.load}>
             Loading
         </div>)
        }
      </div>
      </div>
    </section>
  )
}

export default Product
