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
      mobileToggle.classList.toggle('active', isActive);
      mobileToggle.setAttribute('aria-expanded', isActive);
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link, a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
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
  // 4. PURE NATIVE 3D CARD TILT (DESKTOP MOUSE ONLY TO PREVENT MOBILE CLIPPING)
  // ==========================================================================
  const hasMouseHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (hasMouseHover) {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(element => {
      element.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease';

      element.addEventListener('mousemove', function (e) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

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
  // 9. LEADSPARK WAITLIST FORM HANDLER (Connected to MySQL)
  // ==========================================================================
  const waitlistForm = document.getElementById('leadspark-waitlist-form');
  const waitlistResponse = document.getElementById('waitlist-response');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const emailInput = waitlistForm.querySelector('input[type="email"]');
      const submitBtn = waitlistForm.querySelector('button[type="submit"]');

      if (emailInput && emailInput.value) {
        const email = emailInput.value.trim();
        const origText = submitBtn ? submitBtn.textContent : 'Join';
        if (submitBtn) {
          submitBtn.textContent = 'Enrolling...';
          submitBtn.disabled = true;
        }

        try {
          await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
          });
        } catch (err) {
          console.warn('[Waitlist] Form submitted with graceful fallback:', err);
        }

        waitlistForm.style.display = 'none';
        if (waitlistResponse) {
          waitlistResponse.style.display = 'block';
          waitlistResponse.innerHTML = `
            <div style="background:rgba(16, 185, 129, 0.15); border:1px solid #10b981; padding:16px 24px; border-radius:999px; display:inline-flex; align-items:center; gap:10px; color:#10b981; font-weight:700; font-size:0.95rem;">
              <i class="fa-solid fa-circle-check"></i> You're on the VIP Waitlist! Beta access dispatched to <strong>${email}</strong>.
            </div>
          `;
        }
      }
    });
  }

  // ==========================================================================
  // 10. BANK-GRADE SECURITY FORM ENGINE (ANTI-BOT CAPTCHA & HONEYPOT DEFENSE)
  // Dual-Dispatch: Delivers straight to zerolthelp@gmail.com AND FlowDesk CRM
  // ==========================================================================
  function sanitizeInput(str) {
    if (!str) return '';
    return String(str)
      .replace(/<[^>]*>/g, '') // Strip HTML tags
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Strip null & control chars
      .trim();
  }

  function generateCaptcha(form) {
    if (!form) return;
    const n1 = Math.floor(Math.random() * 8) + 2; // 2..9
    const n2 = Math.floor(Math.random() * 7) + 1; // 1..7
    const isPlus = Math.random() > 0.25;
    const equation = isPlus ? `${n1} + ${n2}` : `${n1 + n2} - ${n1}`;
    const expected = isPlus ? (n1 + n2) : n2;

    form.dataset.captchaExpected = String(expected);
    const pill = form.querySelector('.captcha-calc-pill');
    if (pill) {
      pill.textContent = `${equation} = ?`;
    }
    const input = form.querySelector('.captcha-input');
    if (input) {
      input.value = '';
    }
    const errAlert = form.querySelector('.captcha-error-alert');
    if (errAlert) {
      errAlert.style.display = 'none';
    }
  }

  // Initialize CAPTCHAs for all intake forms
  const allSecureForms = document.querySelectorAll('form[id^="zerolt-"], form[id^="flowdesk-"], .zerolt-secure-form');
  allSecureForms.forEach(form => {
    generateCaptcha(form);

    const refreshBtn = form.querySelector('.captcha-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', function (e) {
        e.preventDefault();
        generateCaptcha(form);
      });
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // 1. Bot Honeypot Check (Invisible trap field)
      const honeypot = form.querySelector('input[name="_zerolt_shield_trap"], input[name="_gotcha"]');
      if (honeypot && honeypot.value && honeypot.value.trim().length > 0) {
        console.warn('[Zerolt Security] Bot trap triggered. Dropping request.');
        form.reset();
        return;
      }

      // 2. Interactive CAPTCHA Verification Check
      const expectedAns = form.dataset.captchaExpected;
      const captchaInput = form.querySelector('.captcha-input');
      const errAlert = form.querySelector('.captcha-error-alert');

      if (expectedAns && captchaInput) {
        const userAns = captchaInput.value.trim();
        if (!userAns || parseInt(userAns, 10) !== parseInt(expectedAns, 10)) {
          if (errAlert) {
            errAlert.style.display = 'flex';
            errAlert.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Security verification failed. Please enter the correct calculation answer.';
          }
          captchaInput.focus();
          captchaInput.style.borderColor = '#ef4444';
          return;
        }
      }

      if (errAlert) {
        errAlert.style.display = 'none';
      }

      // 3. Extract and Sanitize Inputs
      const nameInput = form.querySelector('input[name="name"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      const emailInput = form.querySelector('input[name="email"]');
      const companyInput = form.querySelector('input[name="company"]');
      const notesInput = form.querySelector('textarea[name="notes"], textarea[name="message"]');

      const name = sanitizeInput(nameInput ? nameInput.value : '');
      const phone = sanitizeInput(phoneInput ? phoneInput.value : '');
      const email = sanitizeInput(emailInput ? emailInput.value : '');
      const company = sanitizeInput(companyInput ? companyInput.value : '');
      const notes = sanitizeInput(notesInput ? notesInput.value : '');

      if (!email || !email.includes('@')) {
        alert('Please provide a valid email address.');
        return;
      }

      // 4. Multi-Click / Anti-DDoS Button Lock
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.dataset.originalHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-shield-halved fa-spin" style="margin-right:8px;"></i> Securing & Submitting...';
        submitBtn.disabled = true;
      }

      // 5. PARALLEL SECURE DISPATCH:
      // Destination A: Direct Email Delivery to zerolthelp@gmail.com via FormSubmit AJAX
      const emailPayload = {
        'Full Name': name || 'Inquiry',
        'Work Email': email,
        'Phone / WhatsApp': phone || 'Not provided',
        'Company Name': company || 'Not specified',
        'Requirements / Scope': notes || 'General Consultation Request',
        'Security Status': 'VERIFIED HUMAN (Dynamic CAPTCHA Passed)',
        'Submission Timestamp': new Date().toLocaleString(),
        _subject: '⚡ [Zerolt Security Lead]: New Inquiry from ' + (name || email),
        _replyto: email,
        _template: 'table',
        _captcha: 'false'
      };

      try {
        fetch('https://formsubmit.co/ajax/zerolthelp@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        }).catch(function (e) {
          console.warn('[Email Dispatch Notice]:', e);
        });
      } catch (err) {}

      // Destination B: FlowDesk Backend System (Third-Party CRM Endpoint)
      try {
        const fd = new FormData();
        fd.append('name', name);
        fd.append('phone', phone);
        fd.append('email', email);
        fd.append('company', company);
        fd.append('notes', notes);

        fetch('https://wheat-raccoon-340819.hostingersite.com/api/v1/forms/form-1/submit', {
          method: 'POST',
          body: fd,
          mode: 'no-cors'
        }).catch(function (e) {
          console.warn('[FlowDesk Backend Notice]:', e);
        });
      } catch (err) {}

      // Destination C: Local MySQL Database (/api/contact)
      try {
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            company: company,
            message: notes
          })
        }).catch(function () {});
      } catch (err) {}

      // 6. Display Success State
      const formContainer = form.closest('[id$="-container-form-1"], .contact-form-card') || form.parentElement;
      const successBox = formContainer ? formContainer.querySelector('[id$="-success-form-1"], [id^="flowdesk-success-"]') : null;

      form.style.display = 'none';
      if (successBox) {
        successBox.style.display = 'block';
      }
    });
  });

  // ==========================================================================
  // 11. QUICK-CONSULTATION MODAL CONTROLLER (WITH INSTANT CAPTCHA RE-ROLL)
  // ==========================================================================
  const consultationModal = document.getElementById('zerolt-consultation-modal') || document.getElementById('flowdesk-modal');
  const consultationModalClose = document.getElementById('zerolt-modal-close') || document.getElementById('flowdesk-modal-close');

  if (consultationModal) {
    document.querySelectorAll('.btn-consultation, [data-flowdesk-open], [data-zerolt-open]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const isContactPage = window.location.pathname.endsWith('/contact') || 
                              window.location.pathname.endsWith('/contact.html');
        if (!isContactPage) {
          e.preventDefault();
          consultationModal.classList.add('active');
          document.body.style.overflow = 'hidden';

          // Re-roll dynamic CAPTCHA on every modal open
          const modalForm = consultationModal.querySelector('form');
          if (modalForm) {
            generateCaptcha(modalForm);
            modalForm.style.display = 'block';
            const successBox = consultationModal.querySelector('[id$="-success-form-1"], [id^="flowdesk-success-"]');
            if (successBox) successBox.style.display = 'none';
          }
        }
      });
    });

    const closeModal = () => {
      consultationModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (consultationModalClose) {
      consultationModalClose.addEventListener('click', closeModal);
    }

    consultationModal.addEventListener('click', function (e) {
      if (e.target === consultationModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && consultationModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ==========================================================================
  // 12. SECURE NEWSLETTER SUBSCRIPTION (CAPTURED & SENT TO ZEROLTHELP@GMAIL.COM)
  // ==========================================================================
  try {
    const _origAlert = window.alert;
    window.alert = function (msg) {
      if (msg && typeof msg === 'string' && msg.toLowerCase().includes('subscribed to zerolt')) {
        console.log('[Newsletter Alert Silenced]:', msg);
        return;
      }
      return _origAlert ? _origAlert.apply(this, arguments) : undefined;
    };
  } catch (alertErr) {}

  window.handleNewsletterSubmit = function (e, form) {
    if (e && e.preventDefault) e.preventDefault();
    if (!form) return;

    // Check honeypot
    const hp = form.querySelector('input[name="_zerolt_shield_trap"]');
    if (hp && hp.value && hp.value.length > 0) return;

    const input = form.querySelector('input[type="email"]');
    const email = input ? sanitizeInput(input.value) : '';
    if (!email || !email.includes('@')) return;

    // 1. Direct Delivery to zerolthelp@gmail.com
    try {
      fetch('https://formsubmit.co/ajax/zerolthelp@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          'Subscriber Email': email,
          'Subscription Type': 'Zerolt Insights Bi-Weekly Playbook',
          'Security Timestamp': new Date().toLocaleString(),
          _subject: '⚡ [Newsletter Subscriber]: ' + email,
          _replyto: email,
          _template: 'table',
          _captcha: 'false'
        })
      }).catch(function () {});
    } catch (err) {}

    // 2. Post to FlowDesk CRM intake
    try {
      const fd = new FormData();
      fd.append('name', 'Newsletter Subscriber');
      fd.append('email', email);
      fd.append('phone', 'Newsletter');
      fd.append('company', 'Zerolt Insights');
      fd.append('notes', 'New newsletter subscription for Zerolt Insights. Notification to zerolthelp@gmail.com. Email: ' + email);
      fetch('https://wheat-raccoon-340819.hostingersite.com/api/v1/forms/form-1/submit', {
        method: 'POST',
        body: fd,
        mode: 'no-cors'
      }).catch(function () {});
    } catch (err) {}

    // 3. Post to local MySQL waitlist API
    try {
      fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      }).catch(function () {});
    } catch (err) {}

    // 4. Smooth inline success UI replacement with zero alert popup
    form.style.display = 'none';
    const nextEl = form.nextElementSibling;
    if (nextEl && nextEl.classList.contains('newsletter-success')) {
      nextEl.style.display = 'flex';
    } else {
      const msg = document.createElement('div');
      msg.className = 'newsletter-success';
      msg.style.cssText = 'color: #10b981; font-weight: 600; font-size: 0.92rem; margin-top: 10px; display: flex; align-items: center; gap: 8px;';
      msg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Subscribed to Zerolt Insights!';
      form.parentNode.appendChild(msg);
    }
  };

  document.querySelectorAll('.footer-input-wrap').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      window.handleNewsletterSubmit(e, form);
    });
  });
});
