'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setIsSubscribed(true);
      setEmail('');
    } catch {
      setIsSubscribed(true);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo logo-dark">
              <span className="logo-text">Zerolt</span>
              <span className="logo-dot"></span>
            </Link>
            <p>
              An elite freelance collective crafting high-converting storefronts, custom CMS websites, and autonomous marketing engines at fair market prices.
            </p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '16px', fontSize: '1.05rem' }}>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: '#9ba1b0' }} aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#9ba1b0' }} aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
              <a href="https://github.com/amanshrma1310/zerolt" target="_blank" rel="noreferrer" style={{ color: '#9ba1b0' }} aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Zerolt</Link></li>
              <li><Link href="/services">Services & Pricing</Link></li>
              <li><Link href="/#leadspark">LeadSpark Automation</Link></li>
              <li><Link href="/#work">Selected Work</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Capabilities</h4>
            <ul>
              <li><Link href="/services">Webflow & Shopify</Link></li>
              <li><Link href="/services">GoHighLevel (GHL)</Link></li>
              <li><Link href="/services">n8n Automations</Link></li>
              <li><Link href="/services">Zoho Suite & Flow</Link></li>
              <li><Link href="/services">Lovable AI MVPs</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-newsletter">
            <h4>Stay Ahead</h4>
            <p>Receive bi-weekly playbooks on marketing automation, n8n workflows, and high-conversion design.</p>
            {isSubscribed ? (
              <div style={{ color: '#10b981', fontWeight: 600, fontSize: '0.9rem', marginTop: '10px' }}>
                <i className="fa-solid fa-circle-check"></i> Subscribed to Zerolt Insights!
              </div>
            ) : (
              <form className="footer-input-wrap" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" aria-label="Subscribe"><i className="fa-solid fa-arrow-right"></i></button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} Zerolt.com. All rights reserved. Crafting digital advantage since 2021.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/about">Privacy Policy</Link>
            <Link href="/about">Terms of Service</Link>
            <Link href="/contact">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
