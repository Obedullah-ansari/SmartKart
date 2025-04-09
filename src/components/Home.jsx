import React, { useEffect, useState } from 'react';
import ProductCard from '../components/Card/ProductCard';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import styles from './styles.module.css';
import { useNavigate} from 'react-router-dom';
import HomeNav from './HomeNav/HomeNav';
function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const naviagte  = useNavigate();

  const sampleProducts = [
    {
      id: 2,
      title: 'Mens Casual Premium Slim Fit T-Shirt',
      description: 'A comfortable slim-fit t-shirt made with 100% cotton. Perfect for casual wear.',
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      price: 22.3,
      rating: 4.1,
    },
    {
      id: 11,
      title: 'External Hard Drive',
      description: '3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability',
      image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
      price: 319.99,
      rating: 4.8,
    },
    {
      id: 16,
      title: "Lock and Love Women's",
      description: " Removable Hooded Faux Leather Moto Biker Jacket",
      image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
      price: 340.99,
      rating: 2.9,
    },
  ];
  

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handelRoute =()=>{
    const token = localStorage.getItem("token")
    if(token){
      naviagte("/product")
    }else
    naviagte("/auth")
  }

  return (
    <div className={`${styles.container} ${isLoaded ? styles.loaded : ''}`}>
      <HomeNav/>
      <section id="hero" className={`${styles.heroSection} ${activeSection === 'hero' ? styles.active : ''}`}>
        <div className={styles.heroContent}>
          <h1>Discover Your Style</h1>
          <p>Shop the latest trends with amazing deals and exclusive offers</p>
          <button className={styles.shopNowBtn} onClick={handelRoute}  >
            Shop Now
            <ArrowRight className={styles.btnIcon} size={18} />
          </button>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.circle}></div>
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Shopping Experience" 
          />
        </div>
      </section>

      <section id="featured" className={`${styles.featuredSection} ${activeSection === 'featured' ? styles.active : ''}`}>
        <div className={styles.sectionHeading}>
          <h2>Featured Products</h2>
          <p>Handpicked just for you</p>
        </div>

        <div className={styles.productsGrid}>
          {sampleProducts.map((product) => (
            <div key={product.id} className={styles.productWrapper}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className={`${styles.categoriesSection} ${activeSection === 'categories' ? styles.active : ''}`}>
        <div className={styles.sectionHeading}>
          <h2>Shop By Category</h2>
          <p>Find what you're looking for</p>
        </div>

        <div className={styles.categoriesGrid}>
          <div className={`${styles.categoryCard} ${styles.menCategory}`}>
            <div className={styles.categoryOverlay}>
              <h3>Men</h3>
              <button>Explore</button>
            </div>
          </div>
          <div className={`${styles.categoryCard} ${styles.womenCategory}`}>
            <div className={styles.categoryOverlay}>
              <h3>Women</h3>
              <button>Explore</button>
            </div>
          </div>
          <div className={`${styles.categoryCard} ${styles.electronicsCategory}`}>
            <div className={styles.categoryOverlay}>
              <h3>Electronics</h3>
              <button>Explore</button>
            </div>
          </div>
          <div className={`${styles.categoryCard} ${styles.jewelryCategory}`}>
            <div className={styles.categoryOverlay}>
              <h3>Jewelry</h3>
              <button>Explore</button>
            </div>
          </div>
        </div>
      </section>

      <section id="promotion" className={`${styles.promotionSection} ${activeSection === 'promotion' ? styles.active : ''}`}>
        <div className={styles.promotionContent}>
          <ShoppingBag size={40} />
          <h2>Summer Sale</h2>
          <p>Get up to 50% off on selected items</p>
          <div className={styles.countdown}>
            <div className={styles.countdownItem}>
              <span>23</span>
              <span>Days</span>
            </div>
            <div className={styles.countdownItem}>
              <span>12</span>
              <span>Hours</span>
            </div>
            <div className={styles.countdownItem}>
              <span>45</span>
              <span>Mins</span>
            </div>
            <div className={styles.countdownItem}>
              <span>30</span>
              <span>Secs</span>
            </div>
          </div>
          <button className={styles.couponBtn}>Get Coupon</button>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <span>SMARTKART</span>
            <p>Your one stop shopping destination</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerLinkGroup}>
              <h4>Shop</h4>
              <a href="#">Men</a>
              <a href="#">Women</a>
              <a href="#">Electronics</a>
              <a href="#">Jewelry</a>
            </div>
            <div className={styles.footerLinkGroup}>
              <h4>Help</h4>
              <a href="#">Customer Service</a>
              <a href="#">Track Order</a>
              <a href="#">Returns & Exchanges</a>
              <a href="#">Shipping</a>
            </div>
            <div className={styles.footerLinkGroup}>
              <h4>About</h4>
              <a href="#">Our Story</a>
              <a href="#">Careers</a>
              <a href="#">Corporate Responsibility</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 Smartkart Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home
