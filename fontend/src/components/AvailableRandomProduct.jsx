import React, { useState, useMemo } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Sample products
const sampleProducts = [
  {
    id: 1,
    title: 'Premium Cotton Top',
    description: 'Soft, breathable, luxurious cotton material for all-day comfort.',
    price: 49.99,
    rating: 4.7,
    imageUrl:
      'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Classic Denim Shorts',
    description: 'Versatile and stylish denim shorts perfect for summer days.',
    price: 59.99,
    rating: 4.3,
    imageUrl:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Elegant Blue Jeans',
    description: 'Tailored jeans with a sleek fit and superior denim quality.',
    price: 89.99,
    rating: 4.9,
    imageUrl:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
  },
];

// Fixed Stars component using react-icons for full, half, and empty stars
const Stars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} color="var(--accent)" />);
    } else if (i === fullStars + 1 && halfStar) {
      stars.push(<FaStarHalfAlt key={i} color="var(--accent)" />);
    } else {
      stars.push(<FaRegStar key={i} color="var(--accent)" />);
    }
  }
  return <div style={{ fontSize: '1rem' }}>{stars}</div>;
};

export default function SimpleShop({ handleAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered.sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));
    return filtered;
  }, [searchTerm, sortAsc]);

  const handlePurchase = (product) => {
    alert(`Purchased "${product.title}"!`);
  };

  return (
    <>
      <section
        id="shop"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--light)',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          padding: '5rem 1rem 4rem', // increased top padding to clear fixed navbar
          maxWidth: '1200px',
          margin: '0 auto',
          minHeight: '100vh',
        }}
      >
        <h2
          style={{
            color: 'var(--accent)',
            fontSize: '3rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          Featured Collection
        </h2>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1.25rem',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Explore our latest arrivals — crafted for elegance and comfort.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            style={{
              flex: 1,
              maxWidth: '400px',
              padding: '0.6rem 1rem',
              borderRadius: '25px',
              border: `2px solid var(--accent)`,
              fontSize: '1rem',
              color: 'var(--light)',
              backgroundColor: 'var(--primary)',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--dark-accent)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--accent)')}
          />

          <button
            onClick={() => setSortAsc(!sortAsc)}
            aria-label={`Sort by price ${sortAsc ? 'descending' : 'ascending'}`}
            style={{
              padding: '0.6rem 2rem',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: 'var(--accent)',
              color: 'var(--text-dark)',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--dark-accent)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--accent)')
            }
          >
            Sort: {sortAsc ? 'Low to High' : 'High to Low'}
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '2rem',
            justifyItems: 'center',
          }}
        >
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <img
                src={p.imageUrl}
                alt={p.title}
                style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '0.75rem',
                }}
                loading="lazy"
                onClick={() => setSelectedProduct(p)}
              />

              <div style={{ marginBottom: '0.25rem', fontWeight: '600' }}>
                {p.title}
              </div>

              <div
                style={{
                  color: 'var(--accent)',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem',
                }}
              >
                ${p.price.toFixed(2)}
              </div>

              <Stars rating={p.rating} />

              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '1rem',
                  width: '100%',
                  maxWidth: '220px',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={() => handlePurchase(p)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '25px',
                    border: 'none',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--text-dark)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--dark-accent)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--accent)')
                  }
                >
                  Purchase
                </button>

                <button
                  onClick={() => handleAddToCart(p)}
                  style={{
                    flex: 3,
                    padding: '1rem',
                    borderRadius: '25px',
                    border: 'none',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--text-dark)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--dark-accent)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--accent)')
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onClick={() => setSelectedProduct(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            zIndex: 10000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--light)',
              borderRadius: '1rem',
              maxWidth: '600px',
              width: '100%',
              padding: '1.5rem 2rem',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <button
              aria-label="Close"
              onClick={() => setSelectedProduct(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontSize: '2rem',
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>

            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.title}
              style={{
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                objectFit: 'cover',
                margin: '0 auto 1rem auto',
              }}
              loading="lazy"
            />

            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              {selectedProduct.title}
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {selectedProduct.description}
            </p>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                marginBottom: '2rem',
                color: 'var(--accent)',
              }}
            >
              ${selectedProduct.price.toFixed(2)}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                onClick={() => alert(`Purchased '${selectedProduct.title}'!`)}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '25px',
                  border: 'none',
                  backgroundColor: 'var(--accent)',
                  color: 'var(--text-dark)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  flex: 1,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--dark-accent)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--accent)')
                }
              >
                Purchase
              </button>

              <button
                onClick={() => handleAddToCart(selectedProduct)}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '25px',
                  border: 'none',
                  backgroundColor: 'var(--accent)',
                  color: 'var(--text-dark)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  flex: 1,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--dark-accent)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--accent)')
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        body {
          margin: 0;
          background-color: var(--primary);
          color: var(--light);
          transition: background-color 0.3s ease, color 0.3s ease;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }
        body.light-mode {
          --primary: #fff;
          --accent: #B22222;
          --dark-accent: #7a1919;
          --light: #222;
          --text-muted: #555;
          --text-dark: #fff;
        }
        body.dark-mode {
          --primary: #121212;
          --accent: #c4b24b;
          --dark-accent: #8f8217;
          --light: #eee;
          --text-muted: #bbb;
          --text-dark: #000;
        }
        @media (max-width: 600px) {
          #shop {
            padding: 5rem 0.5rem 2rem;
          }
          #shop div[style*="grid"] {
            gap: 1rem !important;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important;
          }
          #shop img {
            width: 140px !important;
            height: 140px !important;
          }
          #shop div[style*="flexDirection: column"] > div {
            font-size: 0.9rem !important;
          }
          #shop button {
            padding: 0.4rem 1rem !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </>
  );
}
