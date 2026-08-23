'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <Link href="/" className="logo" onClick={closeMenu}>
        <span className="logo-chinese">黄河人餐厅</span>
        <span>Yellow River</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="nav-links desktop-only">
        <Link href="#about" className="nav-link">About Us</Link>
        <Link href="#menu" className="nav-link">Our Menu</Link>
        <Link href="#location" className="nav-link">Find Us</Link>

        {/* Cart Icon Button */}
        <button
          className="header-cart-btn"
          onClick={() => setIsCartOpen(true)}
          aria-label="View Cart"
        >
          <ShoppingBag size={20} />
          <span>Cart</span>
          {totalCount > 0 && <span className="cart-badge-pill">{totalCount}</span>}
        </button>

        <a href="#menu" className="btn-primary">
          <UtensilsCrossed size={18} />
          View Menu
        </a>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Mobile Cart Button */}
        <button
          className="header-cart-btn mobile-only-inline"
          onClick={() => {
            setIsCartOpen(true);
            closeMenu();
          }}
          aria-label="View Cart"
        >
          <ShoppingBag size={20} />
          {totalCount > 0 && <span className="cart-badge-pill">{totalCount}</span>}
        </button>

        {/* Hamburger Toggle Button for Mobile */}
        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer/Dropdown */}
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link href="#about" className="mobile-nav-link" onClick={closeMenu}>About Us</Link>
          <Link href="#menu" className="mobile-nav-link" onClick={closeMenu}>Our Menu</Link>
          <Link href="#location" className="mobile-nav-link" onClick={closeMenu}>Find Us</Link>
          <a href="#menu" className="btn-primary" onClick={closeMenu}>
            <UtensilsCrossed size={18} />
            View Menu
          </a>
        </nav>
      </div>
    </header>
  );
}

