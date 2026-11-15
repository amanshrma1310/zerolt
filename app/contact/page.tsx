'use client';

import React, { useState, useEffect } from 'react';
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

  // Security Hardening: Honeypot & Interactive Dynamic CAPTCHA
  const [honeypot, setHoneypot] = useState('');
  const [captcha, setCaptcha] = useState<{ equation: string; expected: number }>({ equation: '4 + 3', expected: 7 });
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 7) + 1;
    const isPlus = Math.random() > 0.25;
    const equation = isPlus ? `${n1} + ${n2}` : `${n1 + n2} - ${n1}`;
    const expected = isPlus ? n1 + n2 : n2;
    setCaptcha({ equation, expected });
    setCaptchaInput('');
    setCaptchaError('');
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const sanitize = (val: string) => (val ? val.replace(/<[^>]*>/g, '').trim() : '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    // 1. Bot Honeypot Check
    if (honeypot && honeypot.trim().length > 0) {
      console.warn('[Security] Bot trap triggered. Dropping request.');
      setIsSubmitted(true);
      return;
    }

    // 2. Interactive CAPTCHA Check
    if (!captchaInput || parseInt(captchaInput.trim(), 10) !== captcha.expected) {
      setCaptchaError('Security verification failed. Please enter the correct calculation answer.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setCaptchaError('');

    const cleanName = sanitize(formData.name);
    const cleanEmail = sanitize(formData.email);
    const cleanPhone = sanitize(formData.phone);
    const cleanCompany = sanitize(formData.company);
    const cleanNotes = sanitize(formData.message);

    try {
      // Destination A: Direct Delivery to zerolthelp@gmail.com via FormSubmit AJAX
      try {
        fetch('https://formsubmit.co/ajax/zerolthelp@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            'Full Name': cleanName || 'Anonymous',
            'Work Email': cleanEmail,
            'Phone / WhatsApp': cleanPhone || 'Not provided',
            'Company Name': cleanCompany || 'Not provided',
            'Selected Platforms': selectedPlatforms.join(', '),
            'Estimated Budget': formData.budget,
            'Requirements / Notes': cleanNotes || 'General Consultation Request',
            'Security Status': 'VERIFIED HUMAN (Dynamic CAPTCHA Passed)',
            'Submission Timestamp': new Date().toLocaleString(),
            _subject: `⚡ [Zerolt Contact Lead]: New inquiry from ${cleanName || cleanEmail}`,
            _replyto: cleanEmail,
            _template: 'table',
            _captcha: 'false',
          }),
        }).catch(() => {});
      } catch {}

      // Destination B: FlowDesk CRM intake
      try {
        const fd = new FormData();
        fd.append('name', cleanName);
        fd.append('phone', cleanPhone);
        fd.append('email', cleanEmail);
        fd.append('company', cleanCompany);
        fd.append('notes', `Platforms: ${selectedPlatforms.join(', ')}\nBudget: ${formData.budget}\nDetails: ${cleanNotes}`);

        fetch('https://wheat-raccoon-340819.hostingersite.com/api/v1/forms/form-1/submit', {
          method: 'POST',
          body: fd,
          mode: 'no-cors',
        }).catch(() => {});
      } catch {}

      // Destination C: Internal Database Endpoint (/api/contact)
      try {
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            company: cleanCompany,
            platforms: selectedPlatforms,
            budget: formData.budget,
            message: cleanNotes,
          }),
        }).catch(() => {});
      } catch {}

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
    } catch {
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
        <div className="floating-3d-cluster" aria-hidden="true">
          <div className="shape-3d-float" style={{ top: '18%', left: '6%' }}>
            <div className="mini-cube-3d">
              <div className="cube-face face-front"></div>
              <div className="cube-face face-back"></div>
              <div className="cube-face face-right"></div>
              <div className="cube-face face-left"></div>
              <div className="cube-face face-top"></div>
              <div className="cube-face face-bottom"></div>
            </div>
          </div>
          <div className="shape-3d-float" style={{ top: '25%', right: '6%' }}>
            <div className="mini-torus-3d"></div>
          </div>
          <div className="shape-3d-float" style={{ bottom: '20%', right: '12%' }}>
            <div className="mini-sphere-3d"></div>
          </div>
          <div className="star-sparkle" style={{ top: '25%', right: '14%' }}>✦</div>
          <div className="star-sparkle star-sparkle-sm" style={{ bottom: '22%', left: '12%' }}>✦</div>
          <div className="dot-micro dot-micro-purple" style={{ top: '22%', left: '8%' }}></div>
          <div className="dot-micro dot-micro-cyan" style={{ bottom: '24%', right: '10%' }}></div>
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

              {/* Invisible Bot Trap (Honeypot) */}
              <input
                type="text"
                name="_zerolt_shield_trap"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                className="zerolt-honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Interactive Anti-Bot CAPTCHA Verification */}
              <div className="zerolt-security-captcha-wrap" style={{ marginBottom: '22px' }}>
                <div className="captcha-header">
                  <span className="captcha-title">
                    <i className="fa-solid fa-shield-halved"></i> Security Verification
                  </span>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="captcha-refresh-btn"
                    title="Refresh Calculation"
                    aria-label="Refresh Calculation"
                  >
                    <i className="fa-solid fa-rotate-right"></i>
                  </button>
                </div>
                <div className="captcha-body">
                  <span className="captcha-calc-pill">{captcha.equation} = ?</span>
                  <input
                    type="number"
                    className="captcha-input"
                    placeholder="Answer"
                    value={captchaInput}
                    onChange={e => {
                      setCaptchaInput(e.target.value);
                      if (captchaError) setCaptchaError('');
                    }}
                    required
                    aria-label="Captcha Answer"
                  />
                </div>
                {captchaError && (
                  <div className="captcha-error-alert" style={{ display: 'flex' }}>
                    <i className="fa-solid fa-triangle-exclamation"></i> {captchaError}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ width: '100%', fontSize: '1.05rem', padding: '16px' }}
              >
                {isSubmitting ? 'Securing & Submitting...' : 'Get Free Consultation'}
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
                    href="mailto:zerolthelp@gmail.com"
                    style={{ color: 'var(--primary)', fontSize: '0.92rem', fontWeight: 600 }}
                  >
                    zerolthelp@gmail.com
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
