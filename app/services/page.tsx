'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import TiltCard from '@/components/TiltCard';

interface ServiceItem {
  id: string;
  category: 'web' | 'ghl' | 'n8n' | 'zoho' | 'ai';
  badges: string[];
  title: string;
  description: string;
  deliverables: string[];
  ctaText: string;
  url: string;
  image: string;
  imageAlt: string;
  statusBadge: {
    icon: string;
    text: string;
    color: string;
  };
  metricsPill: string;
  reversed?: boolean;
}

const servicesData: ServiceItem[] = [
  {
    id: 'webflow',
    category: 'web',
    badges: ['Webflow Enterprise', 'GSAP 3D', 'Lighthouse 99+'],
    title: 'High-Converting Webflow Builds & Custom Frontends',
    description: "We don't build generic cookie-cutter templates. We craft award-winning Webflow architectures engineered with modular Client-First frameworks, semantic HTML5, sub-second load times, and custom 3D WebGL interactions that capture high-intent buyers.",
    deliverables: [
      'Custom Figma to Webflow Build',
      '100/100 Core Web Vitals',
      'CMS Collection Architecture',
      'Two-Way CRM Form Hooks',
    ],
    ctaText: 'Start Webflow Project',
    url: 'https://zerolt.com/showcase/saas-fintech',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Webflow Enterprise SaaS Platform',
    statusBadge: {
      icon: 'pulse',
      text: 'Live Webflow Build',
      color: '#10b981',
    },
    metricsPill: 'Score: 99 / 100 Speed',
    reversed: false,
  },
  {
    id: 'ghl',
    category: 'ghl',
    badges: ['GoHighLevel (GHL)', 'Custom Snapshots', 'AI Booking'],
    title: 'GoHighLevel (GHL) CRM & Autonomous Sales Pipelines',
    description: 'Turn traffic into booked revenue. We architect bespoke GoHighLevel snapshots, sub-account setups, dynamic booking calendars, pipeline opportunity stages, and multi-channel SMS/voice bots that respond to incoming leads in under 60 seconds.',
    deliverables: [
      'Turnkey GHL Snapshot Deployments',
      'AI SMS & WhatsApp Sequences',
      'Multi-Stage Opportunity Tracking',
      'Stripe & Calendar Sync',
    ],
    ctaText: 'Deploy GHL Infrastructure',
    url: 'https://app.gohighlevel.com/v2/location/zerolt-pipeline',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'GoHighLevel Pipeline Architecture',
    statusBadge: {
      icon: 'fa-solid fa-diagram-project',
      text: 'GHL Pipeline Active',
      color: '#60a5fa',
    },
    metricsPill: '<60s Auto SMS Follow-up',
    reversed: true,
  },
  {
    id: 'n8n',
    category: 'n8n',
    badges: ['n8n Autonomous Workflows', 'Self-Hosted Docker', 'Zero Zapier Fees'],
    title: 'n8n Workflow Automation & Enterprise Data Routing',
    description: 'Eliminate recurring Zapier subscription bloat. We engineer self-hosted or managed n8n automation pipelines that connect webhooks, databases, AI models, and internal communications with 100% data privacy and infinite scaling capacity.',
    deliverables: [
      'Custom Webhook Routing Nodes',
      'Self-Hosted Docker Setup & Security',
      'AI Agent & LLM Data Enrichment',
      'Automated Error Catching & Logs',
    ],
    ctaText: 'Build n8n Automations',
    url: 'https://n8n.zerolt.com/workflow/lead-enrichment-v4',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'n8n Enterprise Automation Canvas',
    statusBadge: {
      icon: 'fa-solid fa-bolt',
      text: 'n8n Cluster: 14 Nodes',
      color: '#ff7a59',
    },
    metricsPill: '140K Executions / mo',
    reversed: false,
  },
  {
    id: 'shopify',
    category: 'web',
    badges: ['Shopify Plus', 'Liquid Architecture', 'Checkout Extensibility'],
    title: 'High-AOV Shopify Plus & E-Commerce Scaled Storefronts',
    description: 'Custom 2.0 themes crafted for scale. We engineer lightning-fast product pages, one-click upsells, checkout extensions, and automated ERP/inventory synchronization with Zoho and external warehouses.',
    deliverables: [
      'Custom Bespoke Liquid Engineering',
      'High AOV Sticky Cart & Upsell Engine',
      'ERP & Zoho Inventory Sync',
      'Blazing-Fast Mobile Performance',
    ],
    ctaText: 'Scale Shopify Store',
    url: 'https://store.zerolt.com/products/engineered-scale',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Shopify Plus E-Commerce Experience',
    statusBadge: {
      icon: 'fa-brands fa-shopify',
      text: 'Shopify 2.0 Storefront',
      color: '#34d399',
    },
    metricsPill: '+38% Cart Conversion',
    reversed: true,
  },
  {
    id: 'zoho',
    category: 'zoho',
    badges: ['Zoho Suite', 'Zoho Flow & Creator', 'Deluge Scripting'],
    title: 'Zoho CRM & Multi-System Enterprise Synchronization',
    description: 'Connect disparate platforms into a single unified source of truth. We build automated data flows between Zoho CRM, Zoho Books, customer support portals, and website lead forms using custom Deluge scripting and secure API webhooks.',
    deliverables: [
      'Deluge Scripting & Custom Functions',
      'Zoho Creator Internal Portals',
      'Automated Billing & Invoicing Loops',
      'Multi-Currency Financial Sync',
    ],
    ctaText: 'Integrate Zoho Suite',
    url: 'https://crm.zoho.com/crm/org8429104/tab/Potentials',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Zoho CRM Enterprise Integration',
    statusBadge: {
      icon: 'fa-solid fa-database',
      text: 'Zoho Two-Way Sync',
      color: '#fb7185',
    },
    metricsPill: 'Real-Time Replication',
    reversed: false,
  },
  {
    id: 'lovable',
    category: 'ai',
    badges: ['Lovable AI Apps', 'Supabase DB', 'Rapid MVPs'],
    title: 'Lovable AI Applications & Rapid Interactive Prototypes',
    description: 'Why wait 6 months for software development? We utilize cutting-edge AI builder platforms like Lovable to design, engineer, and deploy fully functional web applications, internal tools, and client dashboards backed by Supabase in days.',
    deliverables: [
      'Production-Ready React & Tailwind Apps',
      'Live Supabase Database & Auth Setup',
      'AI Agent Features & Chat Assistants',
      'Instant Deployment to Custom Domains',
    ],
    ctaText: 'Launch AI App',
    url: 'https://lovable.dev/projects/zerolt-ai-agent-v1',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Lovable AI App Architecture',
    statusBadge: {
      icon: 'fa-solid fa-wand-magic-sparkles',
      text: 'Lovable AI MVP',
      color: '#ec4899',
    },
    metricsPill: 'Shipped in 7 Days',
    reversed: true,
  },
];

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('filter') || 'all';
  const [filter, setFilter] = useState<string>(initialCategory);

  useEffect(() => {
    const param = searchParams.get('filter');
    if (param) setFilter(param);
  }, [searchParams]);

  const filteredServices = filter === 'all'
    ? servicesData
    : servicesData.filter(s => s.category === filter);

  return (
    <>
      {/* ========================================================================
           1. HERO SECTION & FILTER PILLS
           ======================================================================== */}
      <section className="page-hero">
        <div className="container">
          <div className="hero-badge-pill">
            <span className="pulse-indicator"></span>
            <span>Transparent Freelance Pricing • Friend-First 24/7 Support</span>
          </div>
          <h1>
            Our Core <span className="highlight-text">Services</span> & Live Platforms
          </h1>
          <p>
            Enterprise-grade Webflow, Shopify, GoHighLevel and n8n architectures delivered directly by passionate freelance engineers at 50% below agency market rates.
          </p>

          {/* Category Filter Pills */}
          <div className="service-filter-bar">
            {[
              { id: 'all', label: 'All Capabilities' },
              { id: 'web', label: 'Webflow & Shopify' },
              { id: 'ghl', label: 'GoHighLevel (GHL)' },
              { id: 'n8n', label: 'n8n Automations' },
              { id: 'zoho', label: 'Zoho CRM & Flow' },
              { id: 'ai', label: 'Lovable AI Apps' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`filter-btn ${filter === tab.id ? 'active' : ''}`}
                onClick={() => setFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================
           2. PRICING ADVANTAGE BANNER
           ======================================================================== */}
      <div className="container">
        <div className="pricing-advantage-banner">
          <div className="pricing-advantage-text">
            <div className="hero-badge-pill" style={{ marginBottom: '8px', background: 'white' }}>
              <i className="fa-solid fa-handshake" style={{ color: 'var(--primary)', marginRight: '6px' }}></i> The Zerolt Price Promise
            </div>
            <h3>World-Class Engineering at 40% – 60% Lower Than Market Rates</h3>
            <p>
              We work directly as your technical friends. No fancy agency overhead, no account manager salaries, no ticket delays. You get direct access to top-tier builders who troubleshoot problems at any hour of the day.
            </p>
          </div>
          <div>
            <Link href="/contact" className="btn btn-primary">
              Request Fair Quote <span className="btn-pill-icon"><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================
           3. SERVICES SHOWCASE: 3D BROWSER MOCKUPS & DELIVERABLES
           ======================================================================== */}
      <section className="container services-showcase-list">
        {filteredServices.map(service => (
          <TiltCard
            key={service.id}
            id={service.id}
            className={`service-showcase-row ${service.reversed ? 'reversed' : ''}`}
          >
            {/* Content Side */}
            <div className="content-side service-showcase-content">
              <div className="service-tech-badges">
                {service.badges.map((badge, idx) => (
                  <span key={idx} className="service-tech-pill">
                    {badge}
                  </span>
                ))}
              </div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>

              <div className="deliverables-grid">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="deliverable-item">
                    <i className="fa-solid fa-check"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="btn btn-primary">
                {service.ctaText} <span className="btn-pill-icon"><i className="fa-solid fa-arrow-right"></i></span>
              </Link>
            </div>

            {/* Mockup Side */}
            <div className="mockup-side">
              <div className="browser-mockup-frame">
                <div className="browser-top-bar">
                  <div className="browser-dots"><span></span><span></span><span></span></div>
                  <div className="browser-address-bar">
                    <i className="fa-solid fa-lock" style={{ fontSize: '0.65rem', color: 'var(--emerald)' }}></i>
                    <span>{service.url}</span>
                  </div>
                </div>
                <div className="browser-content">
                  <img src={service.image} alt={service.imageAlt} />
                  <div className="browser-live-overlay">
                    <span className="live-metrics-pill" style={{ color: service.statusBadge.color }}>
                      {service.statusBadge.icon === 'pulse' ? (
                        <span className="pulse-indicator"></span>
                      ) : (
                        <i className={service.statusBadge.icon}></i>
                      )}
                      {service.statusBadge.text}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 700 }}>
                      {service.metricsPill}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </section>

      {/* ========================================================================
           4. CTA BANNER
           ======================================================================== */}
      <section className="footer-cta-banner">
        <div className="container footer-cta-content">
          <div>
            <h2>Need A Custom Multi-Platform Proposal?</h2>
            <p>Tell us your tech stack and target outcomes. We&apos;ll send an honest proposal in 4 hours.</p>
          </div>
          <div>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '16px 32px' }}>
              Request Proposal <span className="btn-pill-icon"><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>Loading Services...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
