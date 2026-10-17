'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-wrapper">
          {/* Logo with rounded typography */}
          <Link href="/" className="logo">
            <span className="logo-text">Zerolt</span>
            <span className="logo-dot"></span>
          </Link>

          {/* Desktop & Mobile Navigation Menu */}
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link 
                href="/" 
                className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/services" 
                className={`nav-link ${pathname === '/services' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                href="/#leadspark" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                LeadSpark <span className="nav-tag-new">NEW</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/#work" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Work
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Action CTAs */}
          <div className="nav-actions">
            <Link href="/contact" className="btn btn-consultation">
              Free Consultation <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.75rem', marginLeft: '5px' }}></i>
            </Link>
            <button 
              className={`mobile-nav-toggle ${isMenuOpen ? 'active' : ''}`} 
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
