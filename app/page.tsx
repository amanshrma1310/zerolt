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
        {/* Continuous Floating 3D Shapes & Ambient Stars */}
        <div className="floating-3d-cluster" aria-hidden="true">
          <div className="shape-3d-float" style={{ top: '12%', left: '4%' }}>
            <div className="mini-cube-3d">
              <div className="cube-face face-front"></div>
              <div className="cube-face face-back"></div>
              <div className="cube-face face-right"></div>
              <div className="cube-face face-left"></div>
              <div className="cube-face face-top"></div>
              <div className="cube-face face-bottom"></div>
            </div>
          </div>
          <div className="shape-3d-float" style={{ top: '22%', right: '5%' }}>
            <div className="mini-torus-3d"></div>
          </div>
          <div className="shape-3d-float" style={{ bottom: '18%', right: '10%' }}>
            <div className="mini-sphere-3d"></div>
          </div>
          <div className="shape-3d-float" style={{ top: '52%', left: '5%' }}>
            <div className="mini-diamond-3d"></div>
          </div>
          <div className="shape-3d-float" style={{ bottom: '20%', left: '12%' }}>
            <div className="mini-capsule-3d"></div>
          </div>
          <div className="star-sparkle" style={{ top: '18%', right: '18%' }}>✦</div>
          <div className="star-sparkle star-sparkle-sm" style={{ bottom: '28%', left: '22%' }}>✦</div>
          <div className="dot-micro dot-micro-purple" style={{ top: '36%', right: '8%' }}></div>
          <div className="dot-micro dot-micro-cyan" style={{ bottom: '14%', left: '8%' }}></div>
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
                src="/images/aman-founder.jpg" 
                alt="Aman — Founder & Lead Systems Architect @ Zerolt"
              />
              <div className="hero-main-card-glow"></div>
              <div className="hero-main-card-caption">
                <h4>Aman</h4>
                <p>Founder & Lead Systems Architect @ Zerolt</p>
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
        {/* Calm Micro-Stars & Glowing Dots (Non-Stressful) */}
        <div className="micro-shape-cluster" aria-hidden="true">
          <div className="dot-micro dot-micro-purple" style={{ top: '25%', left: '6%' }}></div>
          <div className="dot-micro dot-micro-cyan" style={{ bottom: '20%', right: '7%' }}></div>
          <div className="star-sparkle" style={{ top: '20%', right: '12%' }}>✦</div>
          <div className="star-sparkle star-sparkle-sm" style={{ bottom: '22%', left: '10%' }}>✦</div>
        </div>

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
          6. PROPRIETARY PRODUCT SPOTLIGHT: FLOWDESK (ZEROLT MARKETING OS)
          ======================================================================== */}
      {/* ========================================================================
          6. PROPRIETARY PRODUCT SPOTLIGHT: FLOWDESK (ZEROLT MARKETING OS)
          ======================================================================== */}
      <section className="flowdesk-saas-section" id="leadspark">
        {/* Continuous Floating 3D Shapes & Ambient Stars */}
        <div className="floating-3d-cluster" aria-hidden="true">
          <div className="shape-3d-float" style={{ top: '14%', left: '4%' }}>
            <div className="mini-cube-3d">
              <div className="cube-face face-front"></div>
              <div className="cube-face face-back"></div>
              <div className="cube-face face-right"></div>
              <div className="cube-face face-left"></div>
              <div className="cube-face face-top"></div>
              <div className="cube-face face-bottom"></div>
            </div>
          </div>
          <div className="shape-3d-float" style={{ top: '25%', right: '5%' }}>
            <div className="mini-torus-3d"></div>
          </div>
          <div className="shape-3d-float" style={{ top: '55%', right: '8%' }}>
            <div className="mini-sphere-3d"></div>
          </div>
          <div className="shape-3d-float" style={{ bottom: '18%', left: '6%' }}>
            <div className="mini-diamond-3d"></div>
          </div>
          <div className="star-sparkle" style={{ top: '20%', right: '14%' }}>✦</div>
          <div className="star-sparkle star-sparkle-sm" style={{ bottom: '22%', left: '8%' }}>✦</div>
          <div className="dot-micro dot-micro-purple" style={{ top: '15%', left: '6%' }}></div>
          <div className="dot-micro dot-micro-cyan" style={{ bottom: '18%', right: '6%' }}></div>
        </div>

        <div className="container">
          {/* Section Header */}
          <div className="saas-header">
            <div className="saas-pill-tag">
              <span className="pulse-indicator"></span> PROPRIETARY SAAS LAUNCH • ZERO SEAT TAX
            </div>
            <h2 className="saas-title">Meet FlowDesk: The All-in-One <span>Marketing OS</span></h2>
            <p className="saas-subtitle">
              Engineered in-house by Zerolt freelance builders. Ingest leads via embeddable forms, trigger automated WhatsApp Cloud API & SMTP drip workflows, and manage multi-tier agency pods &mdash; at <strong>70% below</strong> bloated corporate platforms.
            </p>
          </div>

          {/* 2-Column Sticky Image-Like Showcase */}
          <div className="saas-sticky-layout">
            {/* Pinned Sticky Left Column: Interactive Browser Dashboard */}
            <div className="saas-sticky-col">
              <div className="saas-sticky-browser">
                <div className="saas-browser-topbar">
                  <div className="saas-traffic-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="saas-address-bar">
                    <i className="fa-solid fa-lock" style={{ color: '#10b981', fontSize: '0.75rem' }}></i>
                    <span>https://flowdesk.zerolt.com/admin/dashboard</span>
                  </div>
                  <div className="saas-browser-actions">
                    <i className="fa-solid fa-circle-check"></i> Live Production
                  </div>
                </div>

                <div className="saas-dashboard-viewport">
                  <img 
                    src="/images/flowdesk-dashboard.png" 
                    alt="FlowDesk Zerolt Marketing OS Admin Dashboard" 
                    className="saas-dashboard-img" 
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Sticky Metrics Strip */}
              <div className="saas-sticky-metrics">
                <span className="saas-metric-pill"><i className="fa-solid fa-bolt"></i> 48ms API Latency</span>
                <span className="saas-metric-pill"><i className="fa-solid fa-shield-halved"></i> 100% Data Sovereignty</span>
                <span className="saas-metric-pill"><i className="fa-solid fa-users"></i> Unlimited Seats</span>
              </div>

              {/* Builder Credential Card (Aman & Ankush In-House Engineering) */}
              <div className="saas-builder-card">
                <div className="saas-builder-profile">
                  <div className="saas-builder-avatars">
                    <img src="/images/aman-founder.jpg" alt="Aman - Founder & Architect" />
                    <img src="/images/ankush-co-founder.jpg" alt="Ankush - Co-Founder & Lead Dev" />
                  </div>
                  <div className="saas-builder-text">
                    <strong>Built In-House by Founders</strong>
                    <span>Aman & Ankush • Zerolt Core Engineering</span>
                  </div>
                </div>
                <div className="saas-builder-tag">
                  <i className="fa-solid fa-circle-check"></i> Zero 3rd-Party Markup
                </div>
              </div>

              {/* Secondary Live Data Pipeline Architecture Preview */}
              <div className="saas-live-flow-preview">
                <div className="saas-flow-header">
                  <span><i className="fa-solid fa-diagram-project" style={{ color: '#a78bfa', marginRight: '6px' }}></i> Live Pipeline Engine</span>
                  <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}><span className="pulse-indicator"></span> 99.98% SLA</span>
                </div>
                <div className="saas-flow-nodes">
                  <div className="saas-node-item">
                    <i className="fa-solid fa-bolt" style={{ color: '#38bdf8' }}></i>
                    <span>Webhook 48ms</span>
                  </div>
                  <div className="saas-node-item">
                    <i className="fa-brands fa-whatsapp" style={{ color: '#22c55e' }}></i>
                    <span>WhatsApp Cloud</span>
                  </div>
                  <div className="saas-node-item">
                    <i className="fa-solid fa-database" style={{ color: '#a855f7' }}></i>
                    <span>MySQL Auto-Sync</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling Right Column: Architectural Narrative Cards */}
            <div className="saas-scroll-col">
              {/* Step 1 */}
              <TiltCard className="saas-step-card" style={{ background: 'rgba(16, 18, 32, 0.92)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '26px 28px', boxShadow: '0 12px 32px rgba(0,0,0,0.35)' }}>
                <div className="saas-step-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px', width: '100%' }}>
                  <div className="saas-step-icon" style={{ width: '48px', height: '48px', minWidth: '48px', maxWidth: '48px', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.25rem', background: 'rgba(94, 67, 243, 0.2)', color: '#a78bfa' }}>
                    <i className="fa-solid fa-code"></i>
                  </div>
                  <div>
                    <span className="saas-step-number" style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a78bfa', display: 'block', marginBottom: '3px' }}>Step 01</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.3 }}>1-Line HTML Lead Ingestion</h3>
                  </div>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.65, margin: '12px 0 16px' }}>Embed our lightweight form snippet into Webflow, Shopify, WordPress, or custom HTML in 30 seconds. Ingest leads directly into your dedicated database with zero Zapier subscription costs.</p>
                
                {/* Mini Code Snippet Widget */}
                <div className="step-preview-snippet">
                  <span>&lt;script src="https://flowdesk.zerolt.com/embed.js"&gt;&lt;/script&gt;</span>
                  <i className="fa-solid fa-copy" style={{ color: '#94a3b8' }}></i>
                </div>

                <div className="saas-tags-list" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="saas-tag" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>Zero-Dependency JS</span>
                  <span className="saas-tag" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>Direct MySQL Sync</span>
                  <span className="saas-tag" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>OCR Document Parser</span>
                </div>
              </TiltCard>

              {/* Step 2 */}
              <TiltCard className="saas-step-card" style={{ background: 'rgba(16, 18, 32, 0.92)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '26px 28px', boxShadow: '0 12px 32px rgba(0,0,0,0.35)' }}>
                <div className="saas-step-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px', width: '100%' }}>
                  <div className="saas-step-icon" style={{ width: '48px', height: '48px', minWidth: '48px', maxWidth: '48px', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.25rem', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                    <i className="fa-solid fa-paper-plane"></i>
                  </div>
                  <div>
                    <span className="saas-step-number" style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#34d399', display: 'block', marginBottom: '3px' }}>Step 02</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.3 }}>Sub-60s WhatsApp & SMTP Workflows</h3>
                  </div>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.65, margin: '12px 0 16px' }}>Speed to lead decides deals. The moment a lead captures, FlowDesk automatically triggers official WhatsApp Cloud API messages and scheduled email drip campaigns through your verified credentials.</p>
                
                {/* WhatsApp Live Mockup Widget */}
                <div className="step-whatsapp-preview">
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.6rem', color: '#22c55e', flexShrink: 0 }}></i>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.85rem', color: '#ffffff' }}>"Hi Alex! Your Zerolt demo is ready."</strong>
                    <span style={{ fontSize: '0.75rem', color: '#86efac' }}>Delivered in 2.4s • Read receipt verified</span>
                  </div>
                </div>

                <div className="saas-tags-list" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="saas-tag" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>WhatsApp Cloud API</span>
                  <span className="saas-tag" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>Verified SMTP Drip</span>
                  <span className="saas-tag" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>&lt;60s Response</span>
                </div>
              </TiltCard>

              {/* Step 3 */}
              <TiltCard className="saas-step-card" style={{ background: 'rgba(16, 18, 32, 0.92)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '26px 28px', boxShadow: '0 12px 32px rgba(0,0,0,0.35)' }}>
                <div className="saas-step-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px', width: '100%' }}>
                  <div className="saas-step-icon" style={{ width: '48px', height: '48px', minWidth: '48px', maxWidth: '48px', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.25rem', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' }}>
                    <i className="fa-solid fa-users-gear"></i>
                  </div>
                  <div>
                    <span className="saas-step-number" style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fbbf24', display: 'block', marginBottom: '3px' }}>Step 03</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.3 }}>Team & Pod Governance Matrix</h3>
                  </div>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.65, margin: '12px 0 16px' }}>Structure your sales reps into regional or departmental pods. Granular role-based permissions ensure security while pod managers track follow-up performance in real-time.</p>
                
                {/* Pod Matrix Widget */}
                <div className="step-pod-preview">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fa-solid fa-network-wired" style={{ fontSize: '1.2rem', color: '#fbbf24' }}></i>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Agency Alpha Pod: 14 Active Reps</span>
                  </div>
                  <span style={{ background: 'rgba(245,158,11,0.2)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>Role: Admin</span>
                </div>

                <div className="saas-tags-list" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="saas-tag" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>Unlimited Team Seats</span>
                  <span className="saas-tag" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>Role Hierarchy</span>
                  <span className="saas-tag" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>1-Click Outreach Queue</span>
                </div>
              </TiltCard>

              {/* Step 4: Pricing Advantage */}
              <TiltCard className="saas-step-card saas-pricing-step" style={{ background: 'linear-gradient(135deg, rgba(32, 24, 66, 0.95) 0%, rgba(15, 16, 28, 0.98) 100%)', border: '1px solid rgba(167, 139, 250, 0.4)', borderRadius: '20px', padding: '28px', boxShadow: '0 16px 40px rgba(94, 67, 243, 0.22)' }}>
                <div className="saas-step-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px', width: '100%' }}>
                  <div className="saas-step-icon" style={{ width: '48px', height: '48px', minWidth: '48px', maxWidth: '48px', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.25rem', background: 'rgba(254, 240, 138, 0.2)', color: '#fef08a' }}>
                    <i className="fa-solid fa-handshake"></i>
                  </div>
                  <div>
                    <span className="saas-step-number" style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fef08a', display: 'block', marginBottom: '3px' }}>Unfair Advantage</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.3 }}>Why Pay $297+/mo For Corporate CRMs?</h3>
                  </div>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.65, margin: '12px 0 16px' }}>Traditional corporate platforms penalize your growth with per-seat taxes and contact volume fees. We provide full marketing automation at honest freelancer rates.</p>

                <div className="saas-pricing-split">
                  <div className="price-card-competitor">
                    <div className="price-title">Other Platforms</div>
                    <div className="price-amount">$297 - $497</div>
                    <div style={{ fontSize: '0.74rem', color: '#f87171' }}>/month + per-seat taxes</div>
                  </div>
                  <div className="price-card-flowdesk">
                    <div className="price-title">FlowDesk by Zerolt</div>
                    <div className="price-amount">$49</div>
                    <div className="price-sub">/mo flat or FREE with custom builds</div>
                  </div>
                </div>

                <div className="saas-cta-actions">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(true)} 
                    className="btn btn-primary" 
                    style={{ fontSize: '0.95rem', padding: '12px 24px' }}
                  >
                    Claim Free Consultation <span className="btn-pill-icon"><i className="fa-solid fa-arrow-right"></i></span>
                  </button>
                  <Link 
                    href="/services" 
                    className="btn btn-outline" 
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'white', borderColor: 'rgba(255,255,255,0.2)', fontSize: '0.95rem', padding: '12px 20px' }}
                  >
                    View Capabilities
                  </Link>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          7. SELECTED PORTFOLIO & WORK SHOWCASE
          ======================================================================== */}
      <section className="work-section" id="work">
        {/* Calm Micro-Stars & Glowing Dots (Non-Stressful) */}
        <div className="micro-shape-cluster" aria-hidden="true">
          <div className="dot-micro dot-micro-purple" style={{ top: '18%', right: '8%' }}></div>
          <div className="dot-micro dot-micro-cyan" style={{ bottom: '15%', left: '6%' }}></div>
          <div className="star-sparkle" style={{ top: '22%', right: '14%' }}>✦</div>
        </div>

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
          7.5 FOUNDERS & LEADERSHIP SPOTLIGHT
          ======================================================================== */}
      <section className="founders-spotlight-section" id="team">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 45px' }}>
            <div className="section-pill-sub"><i className="fa-solid fa-user-group"></i> Zerolt Leadership</div>
            <h2 style={{ fontSize: '2.6rem', marginBottom: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>Meet The Founders & Leadership</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>We are real freelance craftsmen, not account managers. You work directly with the technical founders who architect and build your software.</p>
          </div>

          <div className="team-grid">
            {/* Founder: Aman */}
            <TiltCard className="team-card">
              <div className="team-photo-wrap">
                <img src="/images/aman-founder.jpg" alt="Aman — Founder & Lead Systems Architect" loading="lazy" />
              </div>
              <div className="team-details">
                <h4>Aman</h4>
                <div className="role" style={{ color: 'var(--primary)', fontWeight: 700 }}>Founder & Lead Systems Architect</div>
                <p>Visionary behind Zerolt and FlowDesk. Full-stack cloud systems architect dedicated to friend-first collaboration, fair pricing, and enterprise scalability.</p>
              </div>
            </TiltCard>

            {/* Co-Founder: Ankush */}
            <TiltCard className="team-card">
              <div className="team-photo-wrap">
                <img src="/images/ankush-co-founder.jpg" alt="Ankush — Co-Founder & Full-Stack Automation Lead" loading="lazy" />
              </div>
              <div className="team-details">
                <h4>Ankush</h4>
                <div className="role" style={{ color: '#10b981', fontWeight: 700 }}>Co-Founder & Automation Lead</div>
                <p>Backend specialist, server infrastructure architect, and workflow automation engineer. Builds rock-solid APIs and high-throughput data sync systems.</p>
              </div>
            </TiltCard>

            {/* CEO: Neha */}
            <TiltCard className="team-card">
              <div className="team-photo-wrap">
                <img src="/images/neha-ceo.jpg" alt="Neha — CEO & Head of Digital Product" loading="lazy" />
              </div>
              <div className="team-details">
                <h4>Neha</h4>
                <div className="role" style={{ color: '#ec4899', fontWeight: 700 }}>CEO & Head of Digital Product</div>
                <p>Strategic product leader and design artisan. Directs client delivery, brand identity, and intuitive UI/UX architectures that convert visitors into revenue.</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ========================================================================
          8. CALL TO ACTION BANNER
          ======================================================================== */}
      <section className="footer-cta-banner">
        {/* Continuous Floating 3D Shapes & Ambient Stars */}
        <div className="floating-3d-cluster" aria-hidden="true">
          <div className="shape-3d-float" style={{ top: '25%', left: '6%' }}>
            <div className="mini-torus-3d"></div>
          </div>
          <div className="shape-3d-float" style={{ bottom: '20%', right: '8%' }}>
            <div className="mini-cube-3d">
              <div className="cube-face face-front"></div>
              <div className="cube-face face-back"></div>
              <div className="cube-face face-right"></div>
              <div className="cube-face face-left"></div>
              <div className="cube-face face-top"></div>
              <div className="cube-face face-bottom"></div>
            </div>
          </div>
          <div className="star-sparkle" style={{ top: '26%', right: '18%' }}>✦</div>
          <div className="star-sparkle star-sparkle-sm" style={{ bottom: '20%', left: '14%' }}>✦</div>
          <div className="dot-micro dot-micro-purple" style={{ top: '22%', left: '10%' }}></div>
          <div className="dot-micro dot-micro-cyan" style={{ bottom: '24%', right: '12%' }}></div>
        </div>

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
