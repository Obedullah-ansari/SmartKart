import React, {  useEffect, useState } from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Navbar = ({ update}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalitems, setTotalitems] = useState()
  const [searchValue, setSearchValue] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchValue);
    // Implement search functionality here
  };
 
  useEffect(()=>{
    const cartItem = JSON.parse(localStorage.getItem("cartItems"));
    setTotalitems(cartItem.length)
  },[update])
  
 

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">
            <span className={styles.brandName}>SmartKart</span>
          </a>
        </div>

        <form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}
            value={searchValue}
            onChange={handleSearchChange}
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
          <form className={styles.mobileSearchContainer} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              className={styles.mobileSearchInput}
              value={searchValue}
              onChange={handleSearchChange}
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
