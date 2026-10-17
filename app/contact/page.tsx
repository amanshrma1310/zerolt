'use client';

import React, { useState } from 'react';
import TiltCard from '@/components/TiltCard';

const platformsList = [
  'GoHighLevel (GHL)',
  'n8n Automations',
  'Webflow',
  'Shopify Plus',
  'Zoho CRM & Flow',
  'Lovable AI Apps',
  'Custom WordPress',
  'Wix Studio',
  '⚡ LeadSpark Beta Access',
];

const faqs = [
  {
    question: "Why are Zerolt's prices lower than traditional agencies?",
    answer:
      "We are a distributed collective of senior freelance builders. We don't have expensive skyscraper offices, enterprise sales teams, or layers of middle management. You pay solely for top-tier engineering talent.",
  },
  {
    question: 'What does "working like a friend" mean in practice?',
    answer:
      "It means direct communication via Slack, WhatsApp, or email with the actual developer. When you have an urgent weekend issue or need quick help before a product launch, we jump on and solve it without demanding extra change-order fees.",
  },
  {
    question: 'How fast can we launch a Webflow + GoHighLevel setup?',
    answer:
      'Because we work with dedicated focus and zero agency bureaucracy, standard high-converting websites with integrated GoHighLevel pipelines are typically shipped and tested within 10 to 14 business days.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    budget: '$3,000 – $6,000 (Full Website + GHL Pipeline)',
    message: '',
  });

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'GoHighLevel (GHL)',
    'Webflow',
  ]);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        company: formData.company,
        notes: `Platforms: ${selectedPlatforms.join(', ')}\nBudget: ${formData.budget}\nDetails: ${formData.message}`,
      };

      const res = await fetch('https://wheat-raccoon-340819.hostingersite.com/api/v1/forms/form-1/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
          return;
        }
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          website: '',
          budget: '$3,000 – $6,000 (Full Website + GHL Pipeline)',
          message: '',
        });
      } else {
        setErrorMessage(data.error || 'Submission failed. Please try again.');
      }
    } catch {
      // Fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ========================================================================
           1. HERO SECTION
           ======================================================================== */}
      <section className="page-hero">
        <div className="micro-shape-cluster" aria-hidden="true">
          <div className="dot-micro dot-micro-purple" style={{ top: '22%', left: '8%' }}></div>
          <div className="dot-micro dot-micro-cyan" style={{ bottom: '24%', right: '10%' }}></div>
          <div className="star-sparkle" style={{ top: '25%', right: '14%' }}>✦</div>
          <div className="star-sparkle star-sparkle-sm" style={{ bottom: '22%', left: '12%' }}>✦</div>
        </div>
        <div className="container">
          <div className="hero-badge-pill">
            <span className="pulse-indicator"></span>
            <span>Friend-First Collaboration • Guaranteed 4-Hour Response</span>
          </div>
          <h1>
            Talk Directly With <span className="highlight-text">Your Builders</span>
          </h1>
          <p>
            No sales reps, no bureaucratic delays. Describe what you need and our lead engineers will reply with an honest architecture proposal within 4 hours.
          </p>
        </div>
      </section>

      {/* ========================================================================
           2. MAIN CONTACT SECTION
           ======================================================================== */}
      <section className="container">
        <div className="contact-main-grid">
          {/* Contact Form Card */}
          <TiltCard className="contact-form-card">
            <h2 style={{ fontSize: '1.9rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
              Project Consultation Request
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '26px', fontSize: '0.95rem' }}>
              Tell us what you&apos;re building. We charge 50% below agency market rates with zero compromise on quality.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Work Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Platforms & Technologies You Need:</label>
                <div className="chip-group">
                  {platformsList.map(platform => {
                    const isChecked = selectedPlatforms.includes(platform);
                    return (
                      <label key={platform} className="chip-item">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => togglePlatform(platform)}
                        />
                        <span className="chip-label">{platform}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label>Estimated Project Budget (USD):</label>
                <select
                  className="form-control"
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="$1,500 – $3,000 (Quick Sprint / Landing Page)">$1,500 – $3,000 (Quick Sprint / Landing Page)</option>
                  <option value="$3,000 – $6,000 (Full Website + GHL Pipeline)">$3,000 – $6,000 (Full Website + GHL Pipeline)</option>
                  <option value="$6,000 – $12,000 (Enterprise Multi-App Ecosystem)">$6,000 – $12,000 (Enterprise Multi-App Ecosystem)</option>
                  <option value="Custom Retainer / Ongoing Dedicated Help">Custom Retainer / Ongoing Dedicated Help</option>
                </select>
              </div>

              <div className="form-group">
                <label>Requirements / Notes:</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Tell us about your needs (Webflow, GoHighLevel, n8n, Zoho, Shopify, AI apps)..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ width: '100%', fontSize: '1.05rem', padding: '16px' }}
              >
                {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
                <span className="btn-pill-icon"><i className="fa-solid fa-arrow-right"></i></span>
              </button>

              {isSubmitted && (
                <div
                  style={{
                    marginTop: '20px',
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    padding: '24px',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                    color: '#065f46',
                  }}
                >
                  <svg style={{ width: '40px', height: '40px', margin: '0 auto 12px', display: 'block', stroke: '#059669' }} viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <h3 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: 800, color: '#047857' }}>Thank You!</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#065f46' }}>Thank you! Our marketing specialist will WhatsApp and email you shortly.</p>
                </div>
              )}

              {errorMessage && (
                <div
                  style={{
                    marginTop: '20px',
                    background: '#fef2f2',
                    border: '1px solid #ef4444',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-lg)',
                    color: '#991b1b',
                  }}
                >
                  {errorMessage}
                </div>
              )}
            </form>
          </TiltCard>

          {/* Contact Sidebar */}
          <div className="contact-sidebar">
            <TiltCard
              className="sidebar-card"
              style={{
                background: 'linear-gradient(135deg, #1b1736 0%, #11121d 100%)',
                color: 'white',
                borderColor: '#2a2c42',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📅 ⚡</div>
              <h3 style={{ color: 'white' }}>Need An Immediate Chat?</h3>
              <p style={{ color: '#b0b4c8', fontSize: '0.95rem', marginBottom: '20px' }}>
                Skip the email queue. Grab a 30-minute discovery call directly on our founder&apos;s calendar.
              </p>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', fontSize: '0.95rem' }}
              >
                Book 30-Min Discovery Call <i className="fa-solid fa-calendar-check" style={{ marginLeft: '6px' }}></i>
              </a>
            </TiltCard>

            <TiltCard className="sidebar-card">
              <h3>Direct Contact Coordinates</h3>
              <div className="sidebar-info-item">
                <div className="sidebar-info-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Inquiries & Proposals</strong>
                  <a
                    href="mailto:hello@zerolt.com"
                    style={{ color: 'var(--primary)', fontSize: '0.92rem', fontWeight: 600 }}
                  >
                    hello@zerolt.com
                  </a>
                </div>
              </div>

              <div className="sidebar-info-item">
                <div className="sidebar-info-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Response Commitment</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    Within 4 hours (Mon - Sat)
                  </span>
                </div>
              </div>

              <div className="sidebar-info-item">
                <div className="sidebar-info-icon">
                  <i className="fa-solid fa-earth-americas"></i>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Global Operations</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    USA, UK, Europe, India & Worldwide
                  </span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ========================================================================
           3. FAQ ACCORDION SECTION
           ======================================================================== */}
      <section className="faq-section">
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <div className="section-pill-sub">
              <i className="fa-solid fa-circle-question"></i> Common Questions
            </div>
            <h2 style={{ fontSize: '2.6rem' }}>Frequently Asked Questions</h2>
          </div>

          <div className="accordion-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`accordion-item ${isOpen ? 'active' : ''}`}
                >
                  <div
                    className="accordion-trigger"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <h3>{faq.question}</h3>
                    <span className="chevron">
                      <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </span>
                  </div>
                  {isOpen && (
                    <div className="accordion-body" style={{ display: 'block' }}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
