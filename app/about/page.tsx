import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import TiltCard from '@/components/TiltCard';

export const metadata: Metadata = {
  title: 'About Us — Zerolt | Elite Freelancers & Automation Builders',
  description: 'Discover Zerolt: an elite collective of passionate freelance builders who work like friends to solve your problems at fair, market-beating prices.',
  openGraph: {
    title: 'About Zerolt — Freelancers Who Build Like Friends',
    description: 'We are passionate freelance builders creating platforms to show the world. Fair pricing, zero agency overhead, 24/7 personal care.',
    url: 'https://zerolt.com/about',
  },
};

export default function AboutPage() {
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
          <div className="shape-3d-float" style={{ bottom: '18%', right: '12%' }}>
            <div className="mini-sphere-3d"></div>
          </div>
          <div className="shape-3d-float" style={{ bottom: '22%', left: '12%' }}>
            <div className="mini-diamond-3d"></div>
          </div>
          <div className="star-sparkle" style={{ top: '24%', right: '16%' }}>✦</div>
          <div className="star-sparkle star-sparkle-sm" style={{ bottom: '28%', left: '14%' }}>✦</div>
          <div className="dot-micro dot-micro-purple" style={{ top: '20%', left: '10%' }}></div>
          <div className="dot-micro dot-micro-cyan" style={{ bottom: '25%', right: '10%' }}></div>
        </div>
        <div className="container">
          <div className="hero-badge-pill">
            <span className="pulse-indicator"></span>
            <span>Our Story & Mission</span>
          </div>
          <h1>
            We Are Freelancers Who Build Like <span className="highlight-text">Friends</span>
          </h1>
          <p>
            Zerolt is an elite collective of passionate freelance builders. We don&apos;t hide behind account managers or inflated retainers &mdash; we work side-by-side with you to solve your problems at any hour of the day.
          </p>

          {/* Metrics Strip */}
          <div className="metrics-strip">
            <TiltCard className="metric-card">
              <div className="metric-value">150+</div>
              <div className="metric-label">Completed Systems</div>
            </TiltCard>
            <TiltCard className="metric-card">
              <div className="metric-value">50%</div>
              <div className="metric-label">Below Market Price</div>
            </TiltCard>
            <TiltCard className="metric-card">
              <div className="metric-value">24/7</div>
              <div className="metric-label">Friend-First Support</div>
            </TiltCard>
            <TiltCard className="metric-card">
              <div className="metric-value">&lt;60s</div>
              <div className="metric-label">Lead Response Engine</div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ========================================================================
           2. WHO WE ARE: THE ZEROLT MANIFESTO
           ======================================================================== */}
      <section className="container">
        <div className="story-block">
          <div className="story-grid">
            <div>
              <div className="section-pill-sub">
                <i className="fa-solid fa-heart"></i> The Zerolt Philosophy
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '18px', lineHeight: 1.2 }}>
                Not Just An Agency. We Are Builders Creating Platforms To Show The World.
              </h2>
              <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                Most traditional web agencies exist to bill hours. They assign you junior account executives, charge thousands of dollars for basic modifications, and take 3 days to reply to a simple email.
              </p>
              <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                <strong>Zerolt was created to do things differently.</strong> We are a tightly knit group of elite freelance engineers, Webflow craftsmen, and automation specialists. When you hire us, you are working directly with the creator of your software &mdash; treating your business like a friend would, jumping in whenever an issue arises, and charging an honest, fraction-of-market fee.
              </p>
              <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
                And we don&apos;t just build client projects &mdash; we engineer our own products, such as <strong>LeadSpark</strong>, to showcase what modern marketing automation is truly capable of when built without compromises.
              </p>
              <Link href="/services" className="btn btn-primary">
                Explore Our Platforms <span className="btn-pill-icon"><i className="fa-solid fa-arrow-right"></i></span>
              </Link>
            </div>

            <div style={{ position: 'relative' }}>
              <TiltCard className="browser-mockup-frame">
                <div className="browser-top-bar">
                  <div className="browser-dots"><span></span><span></span><span></span></div>
                  <div className="browser-address-bar">
                    <i className="fa-solid fa-lock" style={{ fontSize: '0.65rem', color: 'var(--emerald)' }}></i>
                    <span>https://zerolt.com/manifesto/friend-first-builders</span>
                  </div>
                </div>
                <div className="browser-content" style={{ height: '340px' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" 
                    alt="Zerolt Team Workstation" 
                  />
                  <div className="browser-live-overlay">
                    <span className="live-metrics-pill" style={{ color: '#10b981' }}>
                      <i className="fa-solid fa-code"></i> Direct Engineer Access
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 700 }}>Zero Bureaucracy</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
           3. TRADITIONAL AGENCY VS ZEROLT COMPARISON
           ======================================================================== */}
      <section className="container">
        <div className="comparison-section">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 35px' }}>
            <div className="section-pill-sub">
              <i className="fa-solid fa-scale-balanced"></i> Honest Comparison
            </div>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>How We Compare To Traditional Agencies</h2>
            <p style={{ color: 'var(--text-secondary)' }}>See why high-growth founders and businesses choose Zerolt&apos;s freelance model.</p>
          </div>

          <div className="comparison-grid">
            {/* Traditional Agency */}
            <div className="comparison-col">
              <h3 style={{ color: '#ef4444' }}>
                <i className="fa-solid fa-circle-xmark"></i> Traditional Corporate Agency
              </h3>
              <ul className="comparison-list">
                <li>
                  <i className="fa-solid fa-xmark" style={{ color: '#ef4444', marginTop: '3px' }}></i>
                  <span><strong>Expensive Markups:</strong> $15,000+ retainers to pay for account executives and lavish office rent.</span>
                </li>
                <li>
                  <i className="fa-solid fa-xmark" style={{ color: '#ef4444', marginTop: '3px' }}></i>
                  <span><strong>Slow Ticket Queues:</strong> 48-hour response times; you never speak directly to the actual coder.</span>
                </li>
                <li>
                  <i className="fa-solid fa-xmark" style={{ color: '#ef4444', marginTop: '3px' }}></i>
                  <span><strong>Hidden Extra Costs:</strong> Nickel-and-dime billing for every minor bug fix or small layout tweak.</span>
                </li>
                <li>
                  <i className="fa-solid fa-xmark" style={{ color: '#ef4444', marginTop: '3px' }}></i>
                  <span><strong>Template Resellers:</strong> Rebranding existing templates without understanding backend automation.</span>
                </li>
              </ul>
            </div>

            {/* Zerolt Model */}
            <TiltCard className="comparison-col highlighted">
              <h3 style={{ color: 'var(--primary)' }}>
                <i className="fa-solid fa-circle-check"></i> The Zerolt Freelance Collective
              </h3>
              <ul className="comparison-list">
                <li>
                  <i className="fa-solid fa-check" style={{ color: 'var(--emerald)', marginTop: '3px' }}></i>
                  <span><strong>40% – 60% Below Market Rates:</strong> Lean freelance efficiency delivering higher quality for less money.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check" style={{ color: 'var(--emerald)', marginTop: '3px' }}></i>
                  <span><strong>Friend-First 24/7 Problem Solving:</strong> We answer at any hour. Need an urgent fix on Sunday? We hop on.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check" style={{ color: 'var(--emerald)', marginTop: '3px' }}></i>
                  <span><strong>Transparent & Fair:</strong> Upfront pricing, zero hidden surprises, and free ongoing peace-of-mind support.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check" style={{ color: 'var(--emerald)', marginTop: '3px' }}></i>
                  <span><strong>Real Product Builders:</strong> We build our own platforms (LeadSpark) to push modern automation forward.</span>
                </li>
              </ul>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ========================================================================
           4. CORE FREELANCE BUILDERS
           ======================================================================== */}
      <section className="container">
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 30px' }}>
          <div className="section-pill-sub">
            <i className="fa-solid fa-laptop-code"></i> The Builders
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>Meet Your Technical Friends</h2>
          <p style={{ color: 'var(--text-secondary)' }}>The craftsmen who will personally engineer and support your systems.</p>
        </div>

        <div className="team-grid">
          <TiltCard className="team-card">
            <div className="team-photo-wrap">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
                alt="Alex Vance" 
              />
            </div>
            <div className="team-details">
              <h4>Alex Vance</h4>
              <div className="role">Chief Systems Architect</div>
              <p>GoHighLevel and n8n specialist. Spends his nights building automated pipelines and helping founders scale.</p>
            </div>
          </TiltCard>

          <TiltCard className="team-card">
            <div className="team-photo-wrap">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" 
                alt="Julian Meyer" 
              />
            </div>
            <div className="team-details">
              <h4>Julian Meyer</h4>
              <div className="role">Creative Technologist</div>
              <p>Webflow, 3D WebGL, and Shopify frontend artisan dedicated to 100/100 Lighthouse speed scores.</p>
            </div>
          </TiltCard>

          <TiltCard className="team-card">
            <div className="team-photo-wrap">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                alt="Sophia Lin" 
              />
            </div>
            <div className="team-details">
              <h4>Sophia Lin</h4>
              <div className="role">Lead Product Engineer (LeadSpark)</div>
              <p>Architect of our proprietary LeadSpark engine, specializing in real-time lead enrichment and instant CRM dispatch.</p>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ========================================================================
           5. CTA BANNER
           ======================================================================== */}
      <section className="footer-cta-banner">
        <div className="floating-3d-cluster" aria-hidden="true">
          <div className="shape-3d-float" style={{ top: '25%', left: '6%' }}>
            <div className="mini-torus-3d"></div>
          </div>
          <div className="shape-3d-float" style={{ bottom: '22%', right: '8%' }}>
            <div className="mini-cube-3d">
              <div className="cube-face face-front"></div>
              <div className="cube-face face-back"></div>
              <div className="cube-face face-right"></div>
              <div className="cube-face face-left"></div>
              <div className="cube-face face-top"></div>
              <div className="cube-face face-bottom"></div>
            </div>
          </div>
          <div className="star-sparkle" style={{ top: '24%', right: '16%' }}>✦</div>
          <div className="star-sparkle star-sparkle-sm" style={{ bottom: '22%', left: '12%' }}>✦</div>
          <div className="dot-micro dot-micro-purple" style={{ top: '25%', left: '9%' }}></div>
          <div className="dot-micro dot-micro-cyan" style={{ bottom: '26%', right: '11%' }}></div>
        </div>
        <div className="container footer-cta-content">
          <div>
            <h2>Ready To Work With Builders Who Care?</h2>
            <p>Get in touch directly with our team and receive an honest architecture plan in 4 hours.</p>
          </div>
          <div>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '16px 32px' }}>
              Say Hello To A Friend <span className="btn-pill-icon"><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
