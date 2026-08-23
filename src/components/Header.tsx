'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  UtensilsCrossed, 
  Menu as MenuIcon, 
  X, 
  ShoppingBag, 
  Calendar, 
  Info, 
  Star, 
  MapPin, 
  Phone,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import OpenStatusBadge from './OpenStatusBadge';
import ReservationModal from './ReservationModal';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Prevent scrolling when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Link href="/" className="logo" onClick={closeMenu}>
            <span className="logo-chinese">黄河人餐厅</span>
            <span className="logo-title">Yellow River</span>
          </Link>
          <div className="desktop-only">
            <OpenStatusBadge />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links desktop-only">
          <Link href="#about" className="nav-link">About Us</Link>
          <Link href="#menu" className="nav-link">Our Menu</Link>
          <Link href="#reviews" className="nav-link">Reviews</Link>
          <Link href="#location" className="nav-link">Find Us</Link>

          {/* Book a Table Button */}
          <button
            className="btn-secondary"
            onClick={() => setIsReservationOpen(true)}
            style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem', cursor: 'pointer' }}
          >
            <Calendar size={15} color="var(--accent-gold)" /> Book Table
          </button>

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
            Order Menu
          </a>
        </nav>

        {/* Mobile Header Actions */}
        <div className="mobile-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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
          <button 
            className={`mobile-menu-toggle ${isOpen ? 'active' : ''}`} 
            onClick={toggleMenu} 
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} color="var(--primary-red)" /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Backdrop */}
        {isOpen && (
          <div className="mobile-backdrop" onClick={closeMenu} />
        )}

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
          <div className="mobile-nav-header">
            <OpenStatusBadge />
            <a 
              href="tel:254706546644" 
              className="mobile-call-btn"
              title="Call Restaurant"
            >
              <Phone size={15} color="var(--accent-gold)" /> 0706 546 644
            </a>
          </div>

          <nav className="mobile-nav-links">
            <Link href="#menu" className="mobile-nav-item" onClick={closeMenu}>
              <div className="mobile-nav-item-icon">
                <UtensilsCrossed size={20} color="var(--primary-red)" />
              </div>
              <div className="mobile-nav-item-content">
                <span className="mobile-nav-item-title">Our Menu</span>
                <span className="mobile-nav-item-sub">Lanzhou Noodles, BBQ & Dim Sum</span>
              </div>
              <ChevronRight size={18} className="mobile-nav-arrow" />
            </Link>

            <Link href="#about" className="mobile-nav-item" onClick={closeMenu}>
              <div className="mobile-nav-item-icon">
                <Info size={20} color="var(--accent-gold)" />
              </div>
              <div className="mobile-nav-item-content">
                <span className="mobile-nav-item-title">About Us</span>
                <span className="mobile-nav-item-sub">Our Lanzhou heritage & fresh ingredients</span>
              </div>
              <ChevronRight size={18} className="mobile-nav-arrow" />
            </Link>

            <Link href="#reviews" className="mobile-nav-item" onClick={closeMenu}>
              <div className="mobile-nav-item-icon">
                <Star size={20} color="#ffc107" />
              </div>
              <div className="mobile-nav-item-content">
                <span className="mobile-nav-item-title">Customer Reviews</span>
                <span className="mobile-nav-item-sub">5.0 ⭐ Ratings from Kilimani diners</span>
              </div>
              <ChevronRight size={18} className="mobile-nav-arrow" />
            </Link>

            <Link href="#location" className="mobile-nav-item" onClick={closeMenu}>
              <div className="mobile-nav-item-icon">
                <MapPin size={20} color="#81c784" />
              </div>
              <div className="mobile-nav-item-content">
                <span className="mobile-nav-item-title">Location & Hours</span>
                <span className="mobile-nav-item-sub">Kindaruma Rd, Kilimani, Nairobi</span>
              </div>
              <ChevronRight size={18} className="mobile-nav-arrow" />
            </Link>

            <div className="mobile-nav-ctas">
              <button
                className="btn-secondary mobile-cta-btn"
                onClick={() => {
                  closeMenu();
                  setIsReservationOpen(true);
                }}
              >
                <Calendar size={18} color="var(--accent-gold)" /> Reserve a Table
              </button>

              <a 
                href="#menu" 
                className="btn-primary mobile-cta-btn" 
                onClick={closeMenu}
              >
                <UtensilsCrossed size={18} /> Order Online (WhatsApp)
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </>
  );
}
