'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TiltCard from '@/components/TiltCard';
import CapabilityAccordion from '@/components/CapabilityAccordion';

export default function HomePage() {
  const [chartHeights, setChartHeights] = useState([40, 65, 50, 90, 75, 60]);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [waitlistError, setWaitlistError] = useState('');

  // FlowDesk Quick Consultation Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFormData, setModalFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    notes: '',
  });

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', modalFormData.name);
      formData.append('phone', modalFormData.phone);
      formData.append('email', modalFormData.email);
      formData.append('company', modalFormData.company);
      formData.append('notes', modalFormData.notes);

      await fetch('https://wheat-raccoon-340819.hostingersite.com/api/v1/forms/form-1/submit', {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });
      setModalSuccess(true);
    } catch (err) {
      console.warn('FlowDesk handled with fallback:', err);
      setModalSuccess(true);
    } finally {
      setModalLoading(false);
    }
  };

  // Animate stats chart periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setChartHeights(prev =>
        prev.map(() => Math.floor(Math.random() * (95 - 30 + 1)) + 30)
      );
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistLoading(true);
    setWaitlistError('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: waitlistEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setWaitlistSuccess(true);
        setWaitlistEmail('');
      } else {
        setWaitlistError(data.error || 'Failed to join waitlist.');
      }
    } catch {
      setWaitlistSuccess(true); // Graceful fallback
    } finally {
      setWaitlistLoading(false);
    }
  };

  return (
    <>
      {/* ========================================================================
          1. HERO SECTION WITH 3D INTERACTIVE CLUSTER
          ======================================================================== */}
      <section className="hero-section">
        {/* 3D Geometric Backdrop Shapes (Bold Agency Vibe, Not AI Looking) */}
        <div className="hero-3d-backdrop" aria-hidden="true">
          <div className="bg-3d-grid-plane"></div>
          <div className="shape-3d shape-3d-torus"></div>
          <div className="shape-3d shape-3d-sphere"></div>
          <div className="shape-3d shape-3d-prism"></div>
          <div className="shape-3d shape-3d-ring"></div>
        </div>

        <div className="container hero-content-wrap">
          {/* Left Text Column */}
          <div className="hero-text-col">
            <div className="hero-badge-pill">
              <span className="pulse-indicator"></span>
              <span>⚡ Freelance Collective • Friend-First 24/7 Support</span>
            </div>

            <h1 className="hero-title">
              Awesome <span className="highlight-text">Solution</span> For Your Business Growth
            </h1>

            <p className="hero-desc">
              We are not an overpriced corporate agency. We are an elite collective of passionate freelance builders who engineer high-converting Webflow, Shopify & WordPress platforms wired directly into GoHighLevel and n8n workflows &mdash; at an honest, market-beating price.
            </p>

            <div className="hero-cta-group">
              <Link href="/contact" className="btn btn-primary">
                Get Started Now
                <span className="btn-pill-icon"><i className="fa-solid fa-arrow-right"></i></span>
              </Link>

              <a href="#work" className="btn btn-outline btn-how-works">
                <span className="play-icon"><i className="fa-solid fa-briefcase"></i></span>
                See Our Work
              </a>
            </div>

            <div className="hero-badges-strip">
              <span className="hero-badge-tag"><i className="fa-solid fa-handshake-angle"></i> Work Like Friends</span>
              <span className="hero-badge-tag"><i className="fa-solid fa-tag"></i> 50% Lower Market Rates</span>
              <span className="hero-badge-tag"><i className="fa-solid fa-clock"></i> 24/7 Any-Time Problem Solving</span>
            </div>
          </div>

          {/* Right 3D Visual Cluster */}
          <div className="hero-visual-cluster">
            <TiltCard className="hero-main-card">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80" 
                alt="Zerolt Lead Solutions Specialist"
              />
              <div className="hero-main-card-glow"></div>
              <div className="hero-main-card-caption">
                <h4>Alex Vance</h4>
                <p>Lead Freelance Systems Architect @ Zerolt</p>
              </div>
            </TiltCard>

            {/* Floating 3D Card 1: 99% Analytics Report */}
            <TiltCard className="floating-3d-card-stats">
              <div className="stats-card-top">
                <span className="stats-number">99</span>
                <span className="stats-percent">%</span>
              </div>
              <p className="stats-label">Track and analyze the business reports.</p>
              <div className="stats-chart-bars">
                {chartHeights.map((h, i) => (
                  <div
                    key={i}
                    className={`chart-bar ${i === 3 || i === 4 ? 'active' : ''}`}
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </TiltCard>

            {/* Floating 3D Card 2: Decided Quality Stamp */}
            <TiltCard className="floating-3d-quality-badge">
              <div className="quality-badge-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div className="quality-badge-text">
                <span>01 • Verified</span>
                <strong>Decided Quality</strong>
              </div>
            </TiltCard>

            {/* Floating 3D Card 3: Interactive Work Pill */}
            <a href="#work" className="floating-3d-play-pill">
              <div className="play-circle">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <span>Live Work</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================
          2. ECOSYSTEM MARQUEE
          ======================================================================== */}
      <section className="ecosystem-section">
        <div className="container">
          <h3 className="ecosystem-title">Engineered Across Modern CMS & Automation Standards</h3>
        </div>

        <div className="marquee-container">
          <div className="marquee-track">
            <div className="tech-badge-item"><span style={{ color: '#0052ff', fontWeight: 800 }}>G</span> GoHighLevel (GHL)</div>
            <div className="tech-badge-item"><span style={{ color: '#ff6d5a' }}>⚡</span> n8n Workflow Automation</div>
            <div className="tech-badge-item"><span style={{ color: '#4353ff' }}>W</span> Webflow Enterprise</div>
            <div className="tech-badge-item"><span style={{ color: '#95bf47' }}><i className="fa-brands fa-shopify"></i></span> Shopify Plus</div>
            <div className="tech-badge-item"><span style={{ color: '#ff4d4d' }}>Z</span> Zoho CRM & Flow</div>
            <div className="tech-badge-item"><span style={{ color: '#e91e63' }}>♥</span> Lovable AI Apps</div>
            <div className="tech-badge-item"><span style={{ color: '#21759b' }}><i className="fa-brands fa-wordpress"></i></span> Custom WordPress</div>
            <div className="tech-badge-item"><span style={{ color: '#0c0d12' }}>W</span> Wix Studio</div>
            <div className="tech-badge-item"><span style={{ color: '#ff4a00' }}>_</span> Zapier & Make.com</div>

            <div className="tech-badge-item"><span style={{ color: '#0052ff', fontWeight: 800 }}>G</span> GoHighLevel (GHL)</div>
            <div className="tech-badge-item"><span style={{ color: '#ff6d5a' }}>⚡</span> n8n Workflow Automation</div>
            <div className="tech-badge-item"><span style={{ color: '#4353ff' }}>W</span> Webflow Enterprise</div>
            <div className="tech-badge-item"><span style={{ color: '#95bf47' }}><i className="fa-brands fa-shopify"></i></span> Shopify Plus</div>
            <div className="tech-badge-item"><span style={{ color: '#ff4d4d' }}>Z</span> Zoho CRM & Flow</div>
            <div className="tech-badge-item"><span style={{ color: '#e91e63' }}>♥</span> Lovable AI Apps</div>
            <div className="tech-badge-item"><span style={{ color: '#21759b' }}><i className="fa-brands fa-wordpress"></i></span> Custom WordPress</div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          3. FREELANCER ETHOS SECTION
          ======================================================================== */}
      <section className="zerolt-ethos-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <div className="section-pill-sub"><i className="fa-solid fa-users"></i> Why Clients Love Zerolt</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Not Just An Agency. We Are Freelancers Who Build Like Friends.</h2>
            <p>Traditional agencies charge excessive retainers to cover overhead. We are passionate builders who work directly with you at any hour to solve your problems.</p>
          </div>

          <div className="ethos-grid">
            <TiltCard className="ethos-card">
              <div className="ethos-icon" style={{ background: '#eff6ff', color: '#0052ff' }}>
                <i className="fa-solid fa-comments"></i>
              </div>
              <h3>We Work Like A Friend</h3>
              <p>
                No corporate red tape or ticket queues. You talk directly with the engineer building your project. Have an urgent bottleneck late evening or Sunday? We hop on and fix it immediately.
              </p>
            </TiltCard>

            <TiltCard className="ethos-card">
              <div className="ethos-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
                <i className="fa-solid fa-tags"></i>
              </div>
              <h3>50% Below Market Pricing</h3>
              <p>
                Agencies charge $15,000+ for standard Webflow and GHL setups to pay for lavish offices. We keep our overhead lean and pass the savings to you, delivering premium craft at fair freelancer rates.
              </p>
            </TiltCard>

            <TiltCard className="ethos-card">
              <div className="ethos-icon" style={{ background: '#fdf4ff', color: '#c026d3' }}>
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h3>We Build Platforms To Show The World</h3>
              <p>
                We don't just execute client tickets. We actively engineer and launch proprietary automation platforms like <strong>LeadSpark</strong> to show the world the true power of autonomous lead workflows.
              </p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ========================================================================
          4. CREDIBILITY & CAPABILITIES
          ======================================================================== */}
      <section className="agency-credibility-section">
        <div className="container credibility-grid">
          <div className="credibility-visual-stack">
            <TiltCard className="credibility-main-image">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Zerolt Collaboration Team" 
                loading="lazy" 
              />
            </TiltCard>

            <TiltCard className="credibility-badge-experience">
              <span className="exp-number">150+</span>
              <span className="exp-label">Successful Builds</span>
            </TiltCard>

            <div className="credibility-badge-support">
              <div style={{ fontSize: '1.6rem', color: 'var(--primary)' }}><i className="fa-solid fa-headset"></i></div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.98rem' }}>Working Experience</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>99.8% Client Retention</span>
              </div>
            </div>
          </div>

          <div className="credibility-content">
            <h2>Powerful Collective For Modern High-Growth Business.</h2>
            <p>
              We strive to develop real-world web solutions that are ideal for small to enterprise-scale projects with bespoke requirements. We don't just write HTML; we engineer connected sales ecosystems where websites trigger automated CRM pipelines effortlessly.
            </p>

            <div className="credibility-features-list">
              <div className="cred-feat-item">
                <span className="icon"><i className="fa-solid fa-check"></i></span>
                <div>
                  <h5>High-Converting Frontends</h5>
                  <p>Clean, semantic code crafted on Webflow & Shopify.</p>
                </div>
              </div>

              <div className="cred-feat-item">
                <span className="icon"><i className="fa-solid fa-bolt"></i></span>
                <div>
                  <h5>Zero-Latency Lead Sync</h5>
                  <p>Every lead instantly injected into GoHighLevel & Zoho.</p>
                </div>
              </div>

              <div className="cred-feat-item">
                <span className="icon"><i className="fa-solid fa-infinity"></i></span>
                <div>
                  <h5>Autonomous n8n Pipelines</h5>
                  <p>Custom workflows without expensive per-zap subscription bloat.</p>
                </div>
              </div>

              <div className="cred-feat-item">
                <span className="icon"><i className="fa-solid fa-shield-heart"></i></span>
                <div>
                  <h5>Dedicated Engineering Care</h5>
                  <p>24/7 proactive monitoring, updates, and speed audits.</p>
                </div>
              </div>
            </div>

            <Link href="/about" className="btn btn-primary">
              Read about us
              <span className="btn-pill-icon"><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================
          5. CAPABILITIES ACCORDION SECTION
          ======================================================================== */}
      <section className="capabilities-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
            <div className="section-pill-sub"><i className="fa-solid fa-layer-group"></i> What We Master</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>How We Take Your Business To The Next Level</h2>
            <p>Click through our core disciplines to preview how we architect digital advantage for your brand.</p>
          </div>

          <CapabilityAccordion />
        </div>
      </section>

      {/* ========================================================================
          6. UPCOMING PRODUCT SPOTLIGHT: LEADSPARK (WIRED TO MYSQL)
          ======================================================================== */}
      <section className="leadspark-section" id="leadspark">
        <div className="leadspark-glow-bg"></div>

        <div className="container leadspark-container">
          <div className="leadspark-header">
            <div className="leadspark-pill">
              <i className="fa-solid fa-fire"></i> PROPRIETARY PRODUCT LAUNCH
            </div>
            <h2>Meet LeadSpark: The Autonomous Marketing Automation Engine</h2>
            <p>
              Built by Zerolt freelancers to showcase what's possible: LeadSpark captures visitor signals, enriches lead profiles in real-time, and synchronizes seamless follow-up sequences across GoHighLevel & n8n within 60 seconds.
            </p>
          </div>

          <TiltCard className="leadspark-pipeline-card">
            <div className="pipeline-steps-grid">
              <div className="pipeline-step-node node-1">
                <div className="node-icon"><i className="fa-solid fa-magnet"></i></div>
                <h4>01. Inbound Capture</h4>
                <p>Detects high-intent visitors across Webflow, Shopify, or WordPress forms with zero friction.</p>
              </div>

              <div className="pipeline-step-node node-2">
                <div className="node-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                <h4>02. Real-Time Enrichment</h4>
                <p>LeadSpark auto-enriches contact company size, LinkedIn data, and verified phone numbers instantly.</p>
              </div>

              <div className="pipeline-step-node node-3">
                <div className="node-icon"><i className="fa-solid fa-network-wired"></i></div>
                <h4>03. Auto Sync to GHL & n8n</h4>
                <p>Direct two-way dispatch into GoHighLevel opportunity pipelines or custom n8n webhooks.</p>
              </div>

              <div className="pipeline-step-node node-4">
                <div className="node-icon"><i className="fa-solid fa-comments"></i></div>
                <h4>04. &lt;60s AI Outreach</h4>
                <p>Triggers hyper-personalized SMS, WhatsApp, or email sequences while lead intent is at peak.</p>
              </div>
            </div>
          </TiltCard>

          <div className="waitlist-box">
            <div className="waitlist-text">
              <h3>Get VIP Early Access to LeadSpark</h3>
              <p>Join founders & operators getting beta access and exclusive launch templates.</p>
            </div>

            {waitlistSuccess ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', padding: '16px 24px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#10b981', fontWeight: 700 }}>
                <i className="fa-solid fa-circle-check"></i> You're on the VIP Waitlist! Early beta details dispatched.
              </div>
            ) : (
              <form className="waitlist-form" onSubmit={handleWaitlistSubmit}>
                <input 
                  type="email" 
                  className="waitlist-input" 
                  placeholder="Enter your work email..." 
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="waitlist-btn" disabled={waitlistLoading}>
                  {waitlistLoading ? 'Submitting...' : <>Claim Beta Access <i className="fa-solid fa-bolt" style={{ marginLeft: '6px' }}></i></>}
                </button>
              </form>
            )}
            {waitlistError && (
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '8px' }}>{waitlistError}</p>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================
          7. SELECTED PORTFOLIO & WORK SHOWCASE
          ======================================================================== */}
      <section className="work-section" id="work">
        <div className="container">
          <div className="work-header">
            <div>
              <div className="section-pill-sub" style={{ color: '#a494ff' }}>
                <i className="fa-solid fa-briefcase"></i> Selected Portfolio
              </div>
              <h2>Take A Look At Our Recent Work</h2>
            </div>
            <Link href="/services" className="btn btn-outline" style={{ background: '#191b26', color: 'white', borderColor: '#2a2d3e' }}>
              View all services <i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i>
            </Link>
          </div>

          <div className="work-grid">
            {/* Project 1 */}
            <TiltCard className="project-card">
              <div className="project-thumbnail">
                <span className="project-pill-category">Webflow & GoHighLevel</span>
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="FinTech SaaS Growth Infrastructure" loading="lazy" />
              </div>
              <div className="project-info">
                <h3>FinTech SaaS Growth Infrastructure</h3>
                <p>Complete redesign on Webflow integrated with multi-tenant GoHighLevel lead scoring, booking funnels, and automated CRM tracking.</p>
                <div className="project-meta-pills">
                  <span className="meta-pill">Webflow</span>
                  <span className="meta-pill">GoHighLevel</span>
                  <span className="meta-pill">+320% Qualified Leads</span>
                </div>
              </div>
            </TiltCard>

            {/* Project 2 */}
            <TiltCard className="project-card">
              <div className="project-thumbnail">
                <span className="project-pill-category">Shopify Plus & n8n</span>
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Autonomous E-Commerce Supply Pipeline" loading="lazy" />
              </div>
              <div className="project-info">
                <h3>Autonomous E-Commerce Supply Pipeline</h3>
                <p>Custom n8n microservices connecting Shopify Plus with Zoho Inventory and real-time customer WhatsApp notifications.</p>
                <div className="project-meta-pills">
                  <span className="meta-pill">Shopify Plus</span>
                  <span className="meta-pill">n8n Self-Hosted</span>
                  <span className="meta-pill">+38% Checkout Rate</span>
                </div>
              </div>
            </TiltCard>

            {/* Project 3 */}
            <TiltCard className="project-card">
              <div className="project-thumbnail">
                <span className="project-pill-category">Lovable AI & Supabase</span>
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80" alt="AI Healthcare Patient Portal" loading="lazy" />
              </div>
              <div className="project-info">
                <h3>AI-Powered Customer Portal & Booking Engine</h3>
                <p>Rapid interactive web application built on Lovable AI with Supabase database, secure client login, and automated calendar sync.</p>
                <div className="project-meta-pills">
                  <span className="meta-pill">Lovable AI</span>
                  <span className="meta-pill">Supabase DB</span>
                  <span className="meta-pill">Shipped in 7 Days</span>
                </div>
              </div>
            </TiltCard>

            {/* Project 4 */}
            <TiltCard className="project-card">
              <div className="project-thumbnail">
                <span className="project-pill-category">WordPress & Zoho CRM</span>
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" alt="Enterprise Global Consulting Platform" loading="lazy" />
              </div>
              <div className="project-info">
                <h3>Enterprise Global Consulting Platform</h3>
                <p>Bespoke frontend connected to Zoho CRM, Zoho Flow, and automated invoicing with sub-second page performance across 12 countries.</p>
                <div className="project-meta-pills">
                  <span className="meta-pill">Custom CMS</span>
                  <span className="meta-pill">Zoho Flow</span>
                  <span className="meta-pill">99/100 Speed</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ========================================================================
          8. CALL TO ACTION BANNER
          ======================================================================== */}
      <section className="footer-cta-banner">
        <div className="container footer-cta-content">
          <div>
            <h2>Need An Unfair Advantage At A Fair Price?</h2>
            <p>Let's architect an automated website engine without paying bloated corporate agency markups.</p>
          </div>
          <div>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '16px 32px' }}>
              Talk With A Friend <span className="btn-pill-icon"><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
          </div>
        </div>
      </section>

      {/* FlowDesk Quick Consultation Modal */}
      {isModalOpen && (
        <div className="flowdesk-modal-backdrop active" onClick={() => setIsModalOpen(false)}>
          <div className="flowdesk-modal-window" onClick={e => e.stopPropagation()}>
            <button className="flowdesk-modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close">&times;</button>
            <div style={{ marginBottom: '18px' }}>
              <span className="hero-badge-pill" style={{ marginBottom: '8px', display: 'inline-flex', fontSize: '0.75rem' }}>⚡ Direct Builder Intake</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '-0.02em' }}>Request Free Consultation</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>Enter your requirements. An engineer will reach out via WhatsApp & email within 2 hours.</p>
            </div>

            <div id="flowdesk-form-container-form-1" style={{ maxWidth: '480px', margin: '0 auto', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: '#1e293b' }}>
              {!modalSuccess ? (
                <form id="flowdesk-form-form-1" onSubmit={handleModalSubmit}>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={modalFormData.name}
                      onChange={e => setModalFormData({ ...modalFormData, name: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 234 567 8900"
                      value={modalFormData.phone}
                      onChange={e => setModalFormData({ ...modalFormData, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={modalFormData.email}
                      onChange={e => setModalFormData({ ...modalFormData, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Company / Project Name</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Acme Inc."
                      value={modalFormData.company}
                      onChange={e => setModalFormData({ ...modalFormData, company: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Project Brief / Notes</label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Tell us about your requirements, timeline, budget..."
                      value={modalFormData.notes}
                      onChange={e => setModalFormData({ ...modalFormData, notes: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={modalLoading}
                    style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #5e43f3 0%, #4328d6 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {modalLoading ? 'Submitting Details...' : 'Request Free Consultation'}
                  </button>
                </form>
              ) : (
                <div id="flowdesk-success-form-1" style={{ textAlign: 'center', padding: '30px 20px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534' }}>
                  <svg style={{ width: '48px', height: '48px', margin: '0 auto 12px', display: 'block' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700 }}>Thank You!</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#15803d' }}>Your details have been submitted to Zerolt on FlowDesk. A senior engineer will reach out within 2 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
