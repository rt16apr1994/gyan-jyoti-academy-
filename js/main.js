// ============================================================
//  GYAN JYOTI ACADEMY — Main JS
//  All dynamic functionality via Google Apps Script
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Hamburger menu ──────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('header nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // ── Init based on page ──────────────────────────────────
  if (document.getElementById('notif-bar')) loadNotifications('all');
  if (document.getElementById('toppers-slider')) loadTopperSlider();
  if (document.getElementById('inquiry-form')) initForm();
  if (document.getElementById('branch-notif-panel')) {
    const branch = document.body.dataset.branch;
    loadBranchNotifications(branch);
  }
  if (document.getElementById('branch-gallery')) {
    const branch = document.body.dataset.branch;
    loadBranchGallery(branch);
  }
});

// ============================================================
//  FETCH helper — Apps Script URL ke saath
// ============================================================
async function gjFetch(params) {
  const url = new URL(GJA_CONFIG.APPS_SCRIPT_URL);
  Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  return res.json();
}

/*async function gjPost(body) {
  const res = await fetch(GJA_CONFIG.APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
} */

// Is function ko apne existing gjPost function se replace karein
async function gjPost(formData) {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwPfHgkmj6VfEVRZja_8-h_yAfJBUIc1qFHrRtdavqbt7dAjRFET0yHrMFTqHIBX06OVQ/exec';

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors', // Browser ko batata hai ki yeh cross-origin request hai
      /* CRITICAL: 'Content-Type': 'application/json' YAHAAN NAHI LIKHNA HAI.
         Agar aap json header bhejenge to Google use simple request nahi manega 
         aur preflight OPTIONS check fail ho jayega, jisse CORS error aata hai.
      */
      body: JSON.stringify(formData) 
    });

    // Google script text formats me response bhejta hai jise hum parse karenge
    const textData = await response.text(); 
    return JSON.parse(textData);

  } catch (error) {
    console.error("gjPost Error Details:", error);
    return { success: false, error: error.message };
  }
}

// ============================================================
//  NOTIFICATIONS — top scrolling bar
// ============================================================
async function loadNotifications(branch) {
  const container = document.getElementById('notif-list');
  if (!container) return;

  try {
    const data = await gjFetch({ action: 'getNotifications', branch });
    if (!data.success || !data.notifications.length) {
      container.innerHTML = '<span style="font-size:13px;color:#555">Admissions Open 2026-27 — Contact us for details</span>';
      return;
    }

    container.innerHTML = data.notifications.map(n => `
      <span class="notif-item">
        ${n.isNew ? '<span class="new-badge">NEW</span>' : ''}
        <span class="notif-date">${n.date}</span>
        <span class="notif-dot">•</span>
        <span>${n.title}</span>
      </span>
    `).join('<span class="notif-dot" style="color:#ccc">|</span>');
  } catch(e) {
    console.log('Notifications fetch error:', e);
  }
}

// ============================================================
//  BRANCH NOTIFICATIONS PANEL
// ============================================================
async function loadBranchNotifications(branch) {
  const panel = document.getElementById('branch-notif-panel');
  if (!panel) return;

  try {
    const data = await gjFetch({ action: 'getNotifications', branch });
    const list = panel.querySelector('.notif-panel-list');

    if (!data.success || !data.notifications.length) {
      list.innerHTML = '<div class="notif-panel-item"><span style="color:#888;font-size:13px">No notifications at this time.</span></div>';
      return;
    }

    list.innerHTML = data.notifications.map(n => `
      <div class="notif-panel-item">
        <div class="notif-panel-date">${n.date.replace(' ', '<br>')}</div>
        <div class="notif-panel-text">
          <strong>${n.title} ${n.isNew ? '<span class="new-badge">NEW</span>' : ''}</strong>
          <span>${n.message}</span>
        </div>
      </div>
    `).join('');
  } catch(e) {
    console.log('Branch notif error:', e);
  }
}

// ============================================================
//  TOPPER SLIDER — Google Drive se photos load karna
// ============================================================
async function loadTopperSlider() {
  const wrap = document.getElementById('toppers-slider');
  if (!wrap) return;

  const track = wrap.querySelector('.slider-track');
  const dotsWrap = wrap.querySelector('.slider-dots');
  const loading = wrap.querySelector('.slider-loading');

  // Both branches toppers
  try {
    const [b1, b2] = await Promise.all([
      gjFetch({ action: 'getDrivePhotos', folder: 'toppers', branch: 'branch1' }),
      gjFetch({ action: 'getDrivePhotos', folder: 'toppers', branch: 'branch2' }),
    ]);

    const allPhotos = [
      ...(b1.photos || []).map(p => ({ ...p, branch: 'Branch 1' })),
      ...(b2.photos || []).map(p => ({ ...p, branch: 'Branch 2' })),
    ];

    if (!allPhotos.length) {
      if (loading) loading.textContent = 'Topper photos coming soon!';
      return;
    }

    if (loading) loading.style.display = 'none';

    track.innerHTML = allPhotos.map((p, i) => `
      <div class="topper-card">
        <img class="topper-photo" src="${p.thumb}" alt="${p.name}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/300x400?text=Photo'">
        <div class="topper-info">
          <h4>${formatName(p.name)}</h4>
          <p>${p.branch}</p>
        </div>
      </div>
    `).join('');

    initSlider(wrap, track, dotsWrap, allPhotos.length);
  } catch(e) {
    console.log('Slider error:', e);
    if (loading) loading.textContent = 'Unable to load photos.';
  }
}

// ============================================================
//  BRANCH GALLERY
// ============================================================
async function loadBranchGallery(branch) {
  const grid = document.getElementById('branch-gallery');
  if (!grid) return;

  try {
    const data = await gjFetch({ action: 'getDrivePhotos', folder: 'gallery', branch });
    if (!data.success || !data.photos.length) {
      grid.innerHTML = '<p style="color:#888;grid-column:1/-1;text-align:center">Gallery photos coming soon!</p>';
      return;
    }
    grid.innerHTML = data.photos.map(p => `
      <div class="gallery-item" onclick="openLightbox('${p.url}','${formatName(p.name)}')">
        <img src="${p.thumb}" alt="${formatName(p.name)}" loading="lazy">
        <div class="gallery-overlay"><span>${formatName(p.name)}</span></div>
      </div>
    `).join('');
  } catch(e) {
    console.log('Gallery error:', e);
  }
}

// ── Simple lightbox ─────────────────────────────────────────
function openLightbox(url, caption) {
  const lb = document.createElement('div');
  lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;cursor:pointer;';
  lb.innerHTML = `<div style="max-width:800px;text-align:center">
    <img src="${url}" alt="${caption}" style="max-height:80vh;border-radius:8px;">
    <p style="color:#fff;margin-top:12px;font-size:14px;">${caption}</p>
    <p style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:6px;">Click anywhere to close</p>
  </div>`;
  lb.onclick = () => lb.remove();
  document.body.appendChild(lb);
}

// ============================================================
//  SLIDER LOGIC
// ============================================================
function initSlider(wrap, track, dotsWrap, total) {
  const perView = getPerView();
  const maxIndex = Math.max(0, total - perView);
  let current = 0;
  let autoTimer;

  // Create dots
  const dotCount = Math.ceil(total / perView);
  if (dotsWrap) {
    dotsWrap.innerHTML = Array.from({length: dotCount}, (_, i) =>
      `<button class="slider-dot ${i===0?'active':''}" onclick=""></button>`
    ).join('');
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIndex));
    const cardWidth = track.firstElementChild?.offsetWidth || 200;
    const gap = 18;
    track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;
    if (dotsWrap) {
      const dotIdx = Math.floor(current / perView);
      dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) =>
        d.classList.toggle('active', i === dotIdx)
      );
    }
  }

  wrap.querySelector('.slider-prev')?.addEventListener('click', () => {
    goTo(current - perView);
    resetAuto();
  });
  wrap.querySelector('.slider-next')?.addEventListener('click', () => {
    goTo(current + perView);
    resetAuto();
  });

  if (dotsWrap) {
    dotsWrap.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i * perView); resetAuto(); });
    });
  }

  function autoPlay() { goTo(current + perView > maxIndex ? 0 : current + perView); }
  autoTimer = setInterval(autoPlay, 4000);
  function resetAuto() { clearInterval(autoTimer); autoTimer = setInterval(autoPlay, 4000); }

  window.addEventListener('resize', () => goTo(0));
}

function getPerView() {
  return window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 2 : 4;
}

// ============================================================
//  INQUIRY FORM — Google Sheet pe submit karna
// ============================================================
function initForm() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const successMsg = document.getElementById('form-success');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.disabled = true;

    const formData = {
      action:       'submitInquiry',
      parentName:   form.querySelector('[name="parentName"]')?.value,
      contact:      form.querySelector('[name="contact"]')?.value,
      email:        form.querySelector('[name="email"]')?.value,
      studentName:  form.querySelector('[name="studentName"]')?.value,
      classSeeking: form.querySelector('[name="classSeeking"]')?.value,
      branch:       form.querySelector('[name="branch"]')?.value,
      message:      form.querySelector('[name="message"]')?.value,
      source:       'website',
    };

    try {
      const result = await gjPost(formData);
      if (result.success) {
        form.reset();
        if (successMsg) successMsg.style.display = 'block';
        btn.textContent = '✓ Submitted!';
        btn.style.background = '#27ae60';
        setTimeout(() => {
          if (successMsg) successMsg.style.display = 'none';
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error(result.error);
      }
    } catch(err) {
      alert('Sorry, submission failed. Please call us directly at +91 7000115232');
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}

// ── Utility: format filename to name ────────────────────────
function formatName(filename) {
  return filename
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}
