
import React, { useState } from 'react';
import { Trash, Plus, Minus, ShoppingBag } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate} from "react-router-dom";
import { useRef } from 'react';


// Sample cart data

const initialCartItems = JSON.parse(localStorage.getItem("cartItems"))
const Cart = () => {
    const ref  = useRef(null)
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [quantities, setQuantities] = useState(() => {
    const initial = {};
    cartItems.forEach(item => initial[item.id] = 1);
    return initial;
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(cartItems.filter(item => item.id !== id));
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
     
  };
  
  const updateQuantity = (id, delta) => {
    setQuantities(prev => {
      const newQty = (prev[id] || 1) + delta;
      if (newQty < 1) return prev;
      return { ...prev, [id]: newQty };
    });
  };
  
  const calculateSubtotal = () => {
    return initialCartItems.reduce((total, item) => total + (item.price * quantities[item.id]), 0);
  };
  
  const subtotal = calculateSubtotal();
  const shipping = 10.00;
  const total = subtotal + shipping;

  const handelCheckOut = ()=>{
    if(!ref.current){
        toast.error("Please Fill Your Address details")
        return
    }
    localStorage.setItem("cartItems", JSON.stringify([]));
    toast.success("Your order is placed sucessfully Thankyou 😊 for shopping from smartcart you can track your order in your profile page")
    setCartItems([]);
  }
  const naviagte  = useNavigate()
  return (
    <>
    <div className={styles.container}>
      <Navbar />
      
      <div className={styles.cartContainer}>
        <h1 className={styles.pageTitle}>Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <ShoppingBag size={64} strokeWidth={1} />
            <p>Your cart is empty</p>
            <button className={styles.continueShopping} onClick={()=>naviagte("/product")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.cartItems}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControl}>
                        <button 
                          onClick={() => updateQuantity(item.id,  -1)}
                          className={styles.quantityButton}
                        >
                          <Minus size={16} />
                        </button>
                        <span className={styles.quantity}>{quantities[item.id] || 1}</span>
                        <button 
                          onClick={() => updateQuantity(item.id,1)}
                          className={styles.quantityButton}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className={styles.removeButton}
                      >
                        <Trash size={16} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className={styles.itemPrice}  >
                    ${(item.price * quantities[item.id] ).toFixed(2) }
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.cartSummary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {!showAddressForm ? (
                <button 
                  className={styles.addressButton}
                  onClick={() => setShowAddressForm(true)}
                >
                  + Add Shipping Address
                </button>
              ) : (
                <div className={styles.addressForm}>
                  <h3>Shipping Address</h3>
                  <input type="text"  placeholder="Full name" className={styles.addressInput} />
                  <input type="text" placeholder="Address line " ref={ref} className={styles.addressInput} />
                  <div className={styles.addressRow}>
                    <input type="text" placeholder="City" className={styles.addressInput} />
                    <input type="text" placeholder="State" className={styles.addressInput} />
                  </div>
                
                </div>
              )}
               
              <button className={styles.checkoutButton} onClick={handelCheckOut} >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    <ToastContainer/>
    </>
  );
};

export default Cart