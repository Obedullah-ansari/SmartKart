import React, {  useEffect, useState } from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Navbar = ({ update}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalitems, setTotalitems] = useState()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
 
    const cartItem = JSON.parse(localStorage.getItem("cartItems"));
    
    
    if (cartItem && Array.isArray(cartItem)) {
      setTotalitems(cartItem.length);
    } else {
      setTotalitems(0); 
    }
  }, [update]);
  
 

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span >
            <span className={styles.brandName}>SmartKart</span>
          </span>
        </div>

        <form className={styles.searchContainer} >
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}

          />
          <button type="submit" className={styles.searchButton}>
            <Search size={18} />
          </button>
        </form>

        <Link to="/" className={styles.navLink}>
            <Home size={20} />
            <span>Home</span>
          </Link>

        <div className={styles.actions}>
          <button className={styles.cartButton} onClick={()=>window.location.href="/cart"} >
            <ShoppingCart size={20} />
            <span className={styles.cartCount}>{totalitems}</span>
          </button>
        </div>

        <button className={styles.menuButton} onClick={toggleMenu}>
          <Menu size={24} />
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <form className={styles.mobileSearchContainer} >
            <input
              type="text"
              placeholder="Search products..."
              className={styles.mobileSearchInput}
            />
            <button type="submit" className={styles.mobileSearchButton}>
              <Search size={18} />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
