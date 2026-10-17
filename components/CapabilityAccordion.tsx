'use client';

import React, { useState } from 'react';
import TiltCard from './TiltCard';

interface CapabilityInfo {
  badge: string;
  title: string;
  desc: string;
  visual: React.ReactNode;
}

const capabilityData: Record<string, CapabilityInfo> = {
  brand: {
    badge: 'Brand Systems & Strategy',
    title: 'Digital-First Brand Architecture',
    desc: 'Crafting unforgettable visual identities, high-conversion design systems, and responsive component libraries engineered for scale.',
    visual: (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>🎨 ⚡</div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(255,255,255,0.12)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>Design System</span>
          <span style={{ background: 'rgba(255,255,255,0.12)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>Figma Specs</span>
        </div>
      </div>
    ),
  },
  websites: {
    badge: 'Next-Gen Web Platforms',
    title: 'High-Converting Web Experiences',
    desc: 'Engineered on Webflow, Shopify Plus, Lovable AI, and WordPress. Sub-second load times, mobile perfection, and two-way CRM lead hooks.',
    visual: (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>💻 🚀</div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(94,67,243,0.35)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>Webflow 100/100</span>
          <span style={{ background: 'rgba(16,185,129,0.35)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>Shopify Plus</span>
          <span style={{ background: 'rgba(245,158,11,0.35)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>Lovable AI</span>
        </div>
      </div>
    ),
  },
  ghl: {
    badge: 'GoHighLevel Ecosystem',
    title: 'Autonomous CRM & Sales Pipelines',
    desc: 'Bespoke GoHighLevel setup, snapshot builds, two-way lead syncing, custom funnels, AI appointment booking, and multi-channel SMS/voice bots.',
    visual: (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>⚡ 📊</div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(94,67,243,0.35)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>GHL Snapshots</span>
          <span style={{ background: 'rgba(16,185,129,0.35)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>Auto SMS &lt;60s</span>
        </div>
      </div>
    ),
  },
  n8n: {
    badge: 'Workflow Orchestration',
    title: 'n8n & Enterprise Automations',
    desc: 'Self-hosted or cloud n8n workflows connecting your frontend, Zoho CRM, Slack, database, and marketing platforms with zero Zapier fees.',
    visual: (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>🔄 🧠</div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(255,94,98,0.35)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>n8n Nodes</span>
          <span style={{ background: 'rgba(94,67,243,0.35)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>Zoho Sync</span>
        </div>
      </div>
    ),
  },
  seo: {
    badge: 'Revenue Optimization',
    title: 'Conversion Rate & SEO Scale',
    desc: 'Full technical SEO, semantic structured data, page speed optimization, and high-converting landing page layouts designed to maximize revenue.',
    visual: (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>📈 🎯</div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(16,185,129,0.35)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>+320% Leads</span>
          <span style={{ background: 'rgba(94,67,243,0.35)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>99+ Speed</span>
        </div>
      </div>
    ),
  },
};

export default function CapabilityAccordion() {
  const [activeTab, setActiveTab] = useState<string>('websites');
  const activeData = capabilityData[activeTab];

  return (
    <div className="capabilities-wrapper">
      {/* Left Accordion Column */}
      <div className="accordion-col">
        <div 
          className={`accordion-item ${activeTab === 'brand' ? 'active' : ''}`}
          onClick={() => setActiveTab('brand')}
        >
          <div className="accordion-header">
            <h4>Brand Identity & Systems</h4>
            <span className="accordion-icon"><i className="fa-solid fa-chevron-down"></i></span>
          </div>
          <div className="accordion-body">
            <p>Design guidelines, high-conversion Figma assets, typography systems, and scalable UI component libraries.</p>
          </div>
        </div>

        <div 
          className={`accordion-item ${activeTab === 'websites' ? 'active' : ''}`}
          onClick={() => setActiveTab('websites')}
        >
          <div className="accordion-header">
            <h4>Websites & Modern CMS</h4>
            <span className="accordion-icon"><i className="fa-solid fa-chevron-down"></i></span>
          </div>
          <div className="accordion-body">
            <p>Bespoke Webflow, Shopify Plus, Lovable AI, and WordPress builds engineered with sub-second speeds and automated CRM form hooks.</p>
          </div>
        </div>

        <div 
          className={`accordion-item ${activeTab === 'ghl' ? 'active' : ''}`}
          onClick={() => setActiveTab('ghl')}
        >
          <div className="accordion-header">
            <h4>GoHighLevel CRM & Pipelines</h4>
            <span className="accordion-icon"><i className="fa-solid fa-chevron-down"></i></span>
          </div>
          <div className="accordion-body">
            <p>Snapshots, sub-accounts, two-way lead syncing, custom funnels, AI appointment booking, and multi-channel SMS/voice automation.</p>
          </div>
        </div>

        <div 
          className={`accordion-item ${activeTab === 'n8n' ? 'active' : ''}`}
          onClick={() => setActiveTab('n8n')}
        >
          <div className="accordion-header">
            <h4>n8n Autonomous Automations</h4>
            <span className="accordion-icon"><i className="fa-solid fa-chevron-down"></i></span>
          </div>
          <div className="accordion-body">
            <p>Self-hosted or cloud n8n orchestrations connecting your site to Zoho, internal databases, AI agents, and Slack without Zapier limits.</p>
          </div>
        </div>

        <div 
          className={`accordion-item ${activeTab === 'seo' ? 'active' : ''}`}
          onClick={() => setActiveTab('seo')}
        >
          <div className="accordion-header">
            <h4>Technical SEO & Conversion</h4>
            <span className="accordion-icon"><i className="fa-solid fa-chevron-down"></i></span>
          </div>
          <div className="accordion-body">
            <p>100/100 Core Web Vitals, rich JSON-LD Schema integration, on-page optimization, and high-converting funnel architectures.</p>
          </div>
        </div>
      </div>

      {/* Right 3D Interactive Stage Column */}
      <div className="stage-col">
        <TiltCard className="capabilities-3d-card">
          <div className="stage-mockup-header">
            <span className="stage-mockup-badge">{activeData.badge}</span>
            <div className="browser-dots"><span></span><span></span><span></span></div>
          </div>
          <div className="stage-mockup-body">
            <h3>{activeData.title}</h3>
            <p>{activeData.desc}</p>
            <div className="stage-visual-area">
              {activeData.visual}
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
