'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { PlusCircle, ShoppingBag } from 'lucide-react';

type MenuItem = {
  id: string;
  name: string;
  chineseName?: string | null;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
};

export default function MenuSection({ initialItems }: { initialItems: MenuItem[] }) {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const categories = ['All', 'Noodles', 'Dim Sum & Appetizers', 'Main Dishes', 'Barbecue'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const getDishBadges = (item: MenuItem) => {
    const text = (item.name + ' ' + item.description).toLowerCase();
    const badges: { label: string; bg: string; color: string }[] = [];

    if (text.includes('beef') || text.includes('lamb') || text.includes('chicken')) {
      badges.push({ label: '🥩 Halal', bg: 'rgba(76, 175, 80, 0.18)', color: '#81c784' });
    }
    if (text.includes('chili') || text.includes('sichuan') || text.includes('cumin') || text.includes('kung pao') || text.includes('spicy')) {
      badges.push({ label: '🌶️ Spicy', bg: 'rgba(244, 67, 54, 0.18)', color: '#e57373' });
    }
    if (text.includes('veggie') || text.includes('vegetable') || text.includes('tofu')) {
      badges.push({ label: '🌿 Vegetarian', bg: 'rgba(0, 150, 136, 0.18)', color: '#80cbc4' });
    }

    return badges;
  };

  return (
    <section id="menu" className="section">
      <div className="section-title-wrap">
        <span className="section-tag">Authentic Culinary Experience</span>
        <h2 className="section-title">Our Signature Menu</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
          💡 Click on any food image or button to add it to your order cart!
        </p>
      </div>

      <div className="menu-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.map((item) => {
          const badges = getDishBadges(item);
          return (
            <div key={item.id} className="menu-card">
              {/* Clickable Image Container */}
              <div
                className="menu-card-image-wrap"
                onClick={() => addToCart(item)}
                title={`Click to add ${item.name} to cart`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="menu-card-image"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Badges overlay */}
                {badges.length > 0 && (
                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '0.35rem', zIndex: 2 }}>
                    {badges.map((b, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          background: b.bg,
                          color: b.color,
                          backdropFilter: 'blur(4px)',
                          border: `1px solid ${b.color}44`,
                        }}
                      >
                        {b.label}
                      </span>
                    ))}
                  </div>
                )}

                <div className="image-hover-overlay">
                  <PlusCircle size={28} color="#fff" />
                  <span>Add to Cart</span>
                </div>
              </div>

              <div className="menu-card-body">
                <div className="menu-card-header">
                  <h3 className="menu-card-title">{item.name}</h3>
                  <span className="menu-card-price">KSh {item.price.toLocaleString()}</span>
                </div>
                {item.chineseName && (
                  <span className="menu-card-chinese">{item.chineseName}</span>
                )}
                <p className="menu-card-desc">{item.description}</p>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
          No items found in this category.
        </p>
      )}
    </section>
  );
}
