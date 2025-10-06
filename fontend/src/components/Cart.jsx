import React from 'react';

export default function Cart({ cartItems, removeFromCart, closeCart }) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={closeCart}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        zIndex: 10000,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--light)',
          borderRadius: '1rem',
          maxWidth: '600px',
          width: '100%',
          padding: '2rem',
          position: 'relative',
        }}
      >
        <button
          aria-label="Close cart"
          onClick={closeCart}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>

        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map(item => (
              <li
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #ccc',
                  padding: '0.5rem 0',
                }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>{item.title}</h3>
                  <p style={{ margin: '0.25rem 0' }}>
                    Price: ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: '#B22222',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.4rem 0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3 style={{ textAlign: 'right' }}>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
}
