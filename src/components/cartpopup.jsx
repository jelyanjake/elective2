// components/CartPopup.jsx
import React from 'react';

const CartPopup = ({ showCart, setShowCart, cart, updateQuantity, removeFromCart }) => {
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={`cart-popup ${showCart ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
      </div>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.avatar} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button className="remove-item" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-footer">
        <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPopup;