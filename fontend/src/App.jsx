import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SimpleShop from './components/AvailableRandomProduct';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const itemExists = prev.find(item => item.id === product.id);
      if (itemExists) {
        // Increase quantity for existing product
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new product with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleCart = () => setCartOpen(open => !open);

  return (
    <>
      <Navbar cartCount={cartItems.length} toggleCart={toggleCart} />
      <SimpleShop handleAddToCart={handleAddToCart} />
      {cartOpen && (
        <Cart 
          cartItems={cartItems} 
          removeFromCart={removeFromCart} 
          closeCart={() => setCartOpen(false)} 
        />
      )}
    </>
  );
}

export default App;
