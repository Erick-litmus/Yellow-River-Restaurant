'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
        <a href="#menu" className="btn-primary">
          <UtensilsCrossed size={18} />
          View Menu
        </a>
      </nav>

      {/* Hamburger Toggle Button for Mobile */}
      <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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

