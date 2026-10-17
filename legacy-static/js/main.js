/**
 * ZEROLT.COM - CORE INTERACTIVE ENGINE
 * 100% Pure Vanilla JavaScript (Zero external libraries or dependencies)
 * Handles mobile navigation, smooth scrolling, lightweight 3D card tilt,
 * capability previews, service category filtering, and lead forms.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ==========================================================================
  // 1. STICKY HEADER WITH SCROLL EFFECT
  // ==========================================================================
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ==========================================================================
  // 2. MOBILE NAVIGATION TOGGLE (FLUID & TOUCH-FRIENDLY)
  // ==========================================================================
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('open', isActive);
      mobileToggle.setAttribute('aria-expanded', isActive);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // 3. SMOOTH SCROLLING FOR IN-PAGE ANCHORS
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 70;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 15;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ==========================================================================
  // 4. PURE NATIVE 3D CARD TILT (ZERO DEPENDENCIES)
  // Only runs on desktop devices with mouse hover support
  // ==========================================================================
  const isHoverSupported = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isHoverSupported) {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(element => {
      element.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease';

      element.addEventListener('mousemove', function (e) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        element.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      element.addEventListener('mouseleave', function () {
        element.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease';
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });

      element.addEventListener('mouseenter', function () {
        element.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease';
      });
    });
  }

  // ==========================================================================
  // 5. HOMEPAGE CAPABILITIES ACCORDION SWITCHER
  // ==========================================================================
  const accordionItems = document.querySelectorAll('.accordion-item');
  const stageMockupBadge = document.getElementById('stage-badge-text');
  const stageTitle = document.getElementById('stage-title');
  const stageDesc = document.getElementById('stage-desc');
  const stageVisual = document.getElementById('stage-visual-content');
  const stageCard = document.querySelector('.capabilities-3d-card');

  const capabilityData = {
    brand: {
      badge: 'Brand Systems & Strategy',
      title: 'Digital-First Brand Architecture',
      desc: 'Crafting unforgettable visual identities, high-conversion design systems, and responsive component libraries engineered for scale.',
      visual: `
        <div style="text-align:center;">
          <div style="font-size:2.8rem; margin-bottom:8px;">🎨 ⚡</div>
          <div style="display:flex; gap:8px; justify-content:center; margin-top:12px; flex-wrap:wrap;">
            <span style="background:rgba(255,255,255,0.12); padding:5px 14px; border-radius:999px; font-size:0.75rem; color:#fff;">Design System</span>
            <span style="background:rgba(255,255,255,0.12); padding:5px 14px; border-radius:999px; font-size:0.75rem; color:#fff;">Figma Specs</span>
          </div>
        </div>
      `
    },
    websites: {
      badge: 'Next-Gen Web Platforms',
      title: 'High-Converting Web Experiences',
      desc: 'Engineered on Webflow, Shopify Plus, Lovable AI, and WordPress. Sub-second load times, mobile perfection, and two-way CRM lead hooks.',
      visual: `
        <div style="text-align:center;">
          <div style="font-size:2.8rem; margin-bottom:8px;">💻 🚀</div>
          <div style="display:flex; gap:8px; justify-content:center; margin-top:12px; flex-wrap:wrap;">
            <span style="background:rgba(94,67,243,0.35); padding:5px 14px; border-radius:999px; font-size:0.75rem; color:#fff;">Webflow 100/100</span>
            <span style="background:rgba(16,185,129,0.35); padding:5px 14px; border-radius:999px; font-size:0.75rem; color:#fff;">Shopify Plus</span>
            <span style="background:rgba(245,158,11,0.35); padding:5px 14px; border-radius:999px; font-size:0.75rem; color:#fff;">Lovable AI</span>
          </div>
        </div>
      `
    },
    ghl: {
      badge: 'GoHighLevel Ecosystem',
      title: 'Autonomous CRM & Sales Pipelines',
      desc: 'Bespoke GoHighLevel setup, snapshot builds, two-way lead syncing, custom funnels, AI appointment booking, and multi-channel SMS/voice bots.',
      visual: `
        <div style="text-align:center;">
          <div style="font-size:2.8rem; margin-bottom:8px;">⚡ 📊</div>
          <div style="display:flex; gap:8px; justify-content:center; margin-top:12px; flex-wrap:wrap;">
            <span style="background:rgba(94,67,243,0.35); padding:5px 14px; border-radius:999px; font-size:0.75rem; color:#fff;">GHL Snapshots</span>
            <span style="background:rgba(16,185,129,0.35); padding:5px 14px; border-radius:999px; font-size:0.75rem; color:#fff;">Auto SMS <60s</span>
          </div>
        </div>
      `
    },
    n8n: {
      badge: 'Workflow Orchestration',
      title: 'n8n & Enterprise Automations',
      desc: 'Self-hosted or cloud n8n workflows connecting your frontend, Zoho CRM, Slack, database, and marketing platforms with zero Zapier fees.',
      visual: `
        <div style="text-align:center;">
          <div style="font-size:2.8rem; margin-bottom:8px;">🔄 🧠</div>
          <div style="display:flex; gap:8px; justify-content:center; margin-top:12px; flex-wrap:wrap;">
            <span style="background:rgba(255,94,98,0.35); padding:5px 14px; border-radius:999px; font-size:0.75rem; color:#fff;">n8n Nodes</span>
            <span style="background:rgba(94,67,243,0.35); padding:5px 14px; border-radius:999px; font-size:0.75rem; color:#fff;">Zoho Sync</span>
          </div>
        </div>
      `
    },
    seo: {
      badge: 'Revenue Optimization',
      title: 'Conversion Rate & SEO Scale',
      desc: 'Full technical SEO, semantic structured data, page speed optimization, and high-converting landing page layouts designed to maximize revenue.',
      visual: `
        <div style="text-align:center;">
          <div style="font-size:2.8rem; margin-bottom:8px;">📈 🎯</div>
          <div style="display:flex; gap:8px; justify-content:center; margin-top:12px; flex-wrap:wrap;">
            <span style="background:rgba(16,185,129,0.35); padding:5px 14px; border-radius:999px; font-size:0.75rem; color:#fff;">+320% Leads</span>
            <span style="background:rgba(94,67,243,0.35); padding:5px 14px; border-radius:999px; font-size:0.75rem; color:#fff;">99+ Speed</span>
          </div>
        </div>
      `
    }
  };

  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      item.addEventListener('click', function () {
        accordionItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        const key = this.getAttribute('data-capability');
        if (capabilityData[key] && stageCard) {
          stageCard.style.opacity = '0.7';
          stageCard.style.transform = 'scale(0.98)';

          setTimeout(() => {
            if (stageMockupBadge) stageMockupBadge.textContent = capabilityData[key].badge;
            if (stageTitle) stageTitle.textContent = capabilityData[key].title;
            if (stageDesc) stageDesc.textContent = capabilityData[key].desc;
            if (stageVisual) stageVisual.innerHTML = capabilityData[key].visual;
            stageCard.style.opacity = '1';
            stageCard.style.transform = 'scale(1)';
          }, 150);
        }
      });
    });
  }

  // ==========================================================================
  // 6. SERVICES CATEGORY FILTER (ON SERVICES.HTML)
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceRows = document.querySelectorAll('.service-showcase-row');

  if (filterButtons.length > 0 && serviceRows.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        serviceRows.forEach(row => {
          const category = row.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            row.style.display = 'grid';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================================================
  // 7. HERO TELEMETRY CHART ANIMATION
  // ==========================================================================
  const chartBars = document.querySelectorAll('.chart-bar');
  if (chartBars.length > 0) {
    setInterval(() => {
      chartBars.forEach((bar, index) => {
        const heights = [40, 65, 50, 90, 75, 60, 85, 45];
        const nextHeight = heights[(index + Math.floor(Math.random() * 3)) % heights.length];
        bar.style.height = `${nextHeight}%`;
      });
    }, 2800);
  }

  // ==========================================================================
  // 8. CONTACT FORM PLATFORM CHIP SELECTORS
  // ==========================================================================
  const platformChips = document.querySelectorAll('.platform-chip');
  if (platformChips.length > 0) {
    platformChips.forEach(chip => {
      chip.addEventListener('click', function () {
        this.classList.toggle('active');
      });
    });
  }

  // ==========================================================================
  // 9. LEADSPARK WAITLIST FORM HANDLER
  // ==========================================================================
  const waitlistForm = document.getElementById('leadspark-waitlist-form');
  const waitlistResponse = document.getElementById('waitlist-response');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = waitlistForm.querySelector('input[type="email"]');
      const submitBtn = waitlistForm.querySelector('button[type="submit"]');

      if (emailInput && emailInput.value) {
        const email = emailInput.value;
        if (submitBtn) {
          submitBtn.textContent = 'Enrolling...';
          submitBtn.disabled = true;
        }

        setTimeout(() => {
          waitlistForm.style.display = 'none';
          if (waitlistResponse) {
            waitlistResponse.style.display = 'block';
            waitlistResponse.innerHTML = `
              <div style="background:rgba(16, 185, 129, 0.15); border:1px solid #10b981; padding:16px 24px; border-radius:999px; display:inline-flex; align-items:center; gap:10px; color:#10b981; font-weight:700; font-size:0.95rem;">
                <i class="fa-solid fa-circle-check"></i> You're #184 on the VIP Waitlist! Beta access dispatched to <strong>${email}</strong>.
              </div>
            `;
          }
        }, 600);
      }
    });
  }
});
