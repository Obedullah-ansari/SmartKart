import React, { useState, useEffect } from "react";
import { Home, ShoppingCart, LogOut, Menu, X, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const HomeNav = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [,setUpadte] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handelLogout = () => {
    localStorage.removeItem("token");
    setUpadte((prev)=>!prev)
  };
  const handelLogin = () => {
     navigate("/auth")
     setUpadte((prev)=>!prev)
  };
  const token = localStorage.getItem("token");

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.brandName}>SMARTKART</span>
        </Link>

        <div className={styles.desktopMenu}>
          <Link to="/" className={styles.navLink}>
            <Home size={20} />
            <span>Home</span>
          </Link>
          {token && (
            <Link to="/cart" className={styles.navLink}>
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>
          )}

          {token ? (
            <button className={styles.navLink} onClick={handelLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          ) : (
            <button className={styles.navLink} onClick={handelLogin}>
              <LogIn size={20} />
              <span>LogIn</span>
            </button>
          )}
        </div>

        <button className={styles.menuButton} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.active : ""
        }`}
      >
        <Link
          to="/"
          className={styles.mobileNavLink}
          onClick={toggleMobileMenu}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        {token && (
            <Link to="/cart" className={styles.navLink}>
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>
          )}
         {token ? (
            <button className={styles.navLink} onClick={handelLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          ) : (
            <button className={styles.navLink} onClick={handelLogin}>
              <LogIn size={20} />
              <span>LogIn</span>
            </button>
          )}
      </div>
    </nav>
  );
};

export default HomeNav;
