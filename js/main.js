/**
 * ZEROLT.COM - INTERACTIVE UI & 3D CARD SCRIPTS
 * Manages mobile navigation, 3D tilt effects, accordion preview switcher, and modals.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. STICKY HEADER
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. MOBILE NAVIGATION TOGGLE
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      const expanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. CAPABILITIES ACCORDION & 3D STAGE SWITCHER
  const accordionItems = document.querySelectorAll('.accordion-item');
  const stageMockupBadge = document.getElementById('stage-badge-text');
  const stageTitle = document.getElementById('stage-title');
  const stageDesc = document.getElementById('stage-desc');
  const stageVisual = document.getElementById('stage-visual-content');
  const stageCard = document.querySelector('.capabilities-3d-card');

  // Capability showcase data
  const capabilityData = {
    brand: {
      badge: 'Brand Systems & Strategy',
      title: 'Digital-First Brand Architecture',
      desc: 'Crafting unforgettable identities, high-conversion design systems, typography rules, and responsive component libraries engineered for scale.',
      visual: `
        <div style="text-align: center;">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">🎨 ⚡</div>
          <div style="display:flex; gap:8px; justify-content:center; margin-top:12px;">
            <span style="background:rgba(255,255,255,0.1); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">Design System</span>
            <span style="background:rgba(255,255,255,0.1); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">Figma Assets</span>
            <span style="background:rgba(255,255,255,0.1); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">Motion Specs</span>
          </div>
        </div>
      `
    },
    websites: {
      badge: 'Next-Gen Web Platforms',
      title: 'High-Converting Web Experiences',
      desc: 'Engineered on Webflow, Shopify Plus, Lovable AI, Wix Studio, and WordPress. Sub-second load times, mobile perfection, and seamless CRM integrations.',
      visual: `
        <div style="text-align: center;">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">💻 🚀</div>
          <div style="display:flex; gap:8px; justify-content:center; margin-top:12px; flex-wrap:wrap;">
            <span style="background:rgba(94,67,243,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">Webflow 100/100</span>
            <span style="background:rgba(16,185,129,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">Shopify Plus</span>
            <span style="background:rgba(245,158,11,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">Lovable AI</span>
          </div>
        </div>
      `
    },
    ghl: {
      badge: 'GoHighLevel Ecosystem',
      title: 'Autonomous CRM & Sales Pipelines',
      desc: 'Bespoke GoHighLevel setup, snapshot builds, two-way lead syncing, custom funnels, AI appointment booking bots, and multi-channel automated SMS/email sequences.',
      visual: `
        <div style="text-align: center;">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">⚡ 📊</div>
          <div style="display:flex; gap:8px; justify-content:center; margin-top:12px;">
            <span style="background:rgba(94,67,243,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">GHL Snapshots</span>
            <span style="background:rgba(16,185,129,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">Auto Pipeline</span>
            <span style="background:rgba(255,94,98,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">24/7 AI Followup</span>
          </div>
        </div>
      `
    },
    n8n: {
      badge: 'Workflow Orchestration',
      title: 'n8n & Enterprise Automations',
      desc: 'Self-hosted or cloud n8n workflows connecting your frontend, Zoho CRM, Slack, database, and marketing platforms with zero per-zap fees and total data sovereignty.',
      visual: `
        <div style="text-align: center;">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">🔄 🧠</div>
          <div style="display:flex; gap:8px; justify-content:center; margin-top:12px;">
            <span style="background:rgba(255,94,98,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">n8n Nodes</span>
            <span style="background:rgba(94,67,243,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">Zoho Flow</span>
            <span style="background:rgba(16,185,129,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">Webhook Routing</span>
          </div>
        </div>
      `
    },
    seo: {
      badge: 'Revenue Optimization',
      title: 'Conversion Rate & SEO Scale',
      desc: 'Full technical SEO, semantic structured data, page speed optimization, and high-converting landing page layouts designed to maximize lead-to-opportunity ratio.',
      visual: `
        <div style="text-align: center;">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">📈 🎯</div>
          <div style="display:flex; gap:8px; justify-content:center; margin-top:12px;">
            <span style="background:rgba(16,185,129,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">+280% Organic</span>
            <span style="background:rgba(94,67,243,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">4.8% Opt-in</span>
            <span style="background:rgba(245,158,11,0.3); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#fff;">Core Web Vitals</span>
          </div>
        </div>
      `
    }
  };

  accordionItems.forEach(item => {
    item.addEventListener('click', function () {
      accordionItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');

      const key = this.getAttribute('data-capability');
      if (capabilityData[key] && stageCard) {
        // Subtle 3D pulse & content transition
        stageCard.style.transform = 'scale(0.97) rotateY(4deg)';
        setTimeout(() => {
          stageMockupBadge.textContent = capabilityData[key].badge;
          stageTitle.textContent = capabilityData[key].title;
          stageDesc.textContent = capabilityData[key].desc;
          stageVisual.innerHTML = capabilityData[key].visual;
          stageCard.style.transform = 'scale(1) rotateY(0deg)';
        }, 180);
      }
    });
  });

  // 4. HERO 3D CARD INTERACTIVE TILT (Vanilla Tilt Fallback)
  const tiltCards = document.querySelectorAll('[data-tilt]');
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(tiltCards, {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      perspective: 1000
    });
  } else {
    // Custom lightweight 3D tilt engine
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // 5. LIVE ANIMATED CHART BARS IN HERO STATS
  const chartBars = document.querySelectorAll('.chart-bar');
  if (chartBars.length > 0) {
    setInterval(() => {
      chartBars.forEach((bar, index) => {
        const minHeight = 25;
        const maxHeight = 95;
        const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        bar.style.height = `${randomHeight}%`;
        if (index === 3 || index === 4) {
          bar.classList.add('active');
        }
      });
    }, 2200);
  }

  // 6. VIDEO MODAL ENGINE
  const videoModal = document.getElementById('video-modal');
  const videoTriggers = document.querySelectorAll('.trigger-video-modal');
  const videoClose = document.querySelector('.video-modal-close');
  const videoIframe = document.getElementById('video-iframe');

  const demoVideoUrl = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1'; // placeholder or demo reel

  if (videoModal && videoTriggers) {
    videoTriggers.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        videoModal.classList.add('active');
        if (videoIframe) {
          videoIframe.src = 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0';
        }
      });
    });

    function closeModal() {
      videoModal.classList.remove('active');
      if (videoIframe) {
        videoIframe.src = '';
      }
    }

    if (videoClose) {
      videoClose.addEventListener('click', closeModal);
    }

    videoModal.addEventListener('click', function (e) {
      if (e.target === videoModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 7. LEADSPARK WAITLIST SUBMISSION SIMULATOR
  const waitlistForm = document.getElementById('leadspark-waitlist-form');
  const waitlistResponse = document.getElementById('waitlist-response');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = waitlistForm.querySelector('input[type="email"]');
      const submitBtn = waitlistForm.querySelector('button');

      if (input && input.value) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enrolling...';
        submitBtn.disabled = true;

        setTimeout(() => {
          waitlistForm.style.display = 'none';
          if (waitlistResponse) {
            waitlistResponse.style.display = 'block';
            waitlistResponse.innerHTML = `
              <div style="background:rgba(16, 185, 129, 0.15); border:1px solid #10b981; padding:16px 24px; border-radius:999px; display:inline-flex; align-items:center; gap:12px; color:#34d399; font-weight:600;">
                <span>✨</span> You're #184 on the VIP Waitlist for LeadSpark! We just dispatched early beta details to <strong>${input.value}</strong>.
              </div>
            `;
          }
        }, 800);
      }
    });
  }
});
