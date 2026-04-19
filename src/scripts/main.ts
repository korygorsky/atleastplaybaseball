import { inject, track } from '@vercel/analytics';

inject();

/* ========================================================================
   Nav: active section + scroll progress + chip-end mask
   ======================================================================== */
function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const progress = document.querySelector<HTMLElement>('[data-nav-progress]');
  const chips = Array.from(document.querySelectorAll<HTMLAnchorElement>('.chip[data-section]'));
  const panel = document.querySelector<HTMLElement>('[data-nav-panel]');
  const panelLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-panel-link[data-section]'));
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  if (!nav) return;

  const ids = ['park', 'project', 'demand', 'concerns', 'comments', 'precedent', 'questions', 'about', 'sources'];

  const setActive = (id: string) => {
    chips.forEach((c) => c.classList.toggle('active', c.dataset.section === id));
    panelLinks.forEach((l) => l.classList.toggle('active', l.dataset.section === id));
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive((e.target as HTMLElement).id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });

  const onScroll = () => {
    const scrolled = window.scrollY > 120;
    nav.classList.toggle('scrolled', scrolled);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progress.style.width = (pct * 100).toFixed(2) + '%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav panel */
  if (toggle && panel) {
    const closePanel = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      panel.setAttribute('hidden', '');
    };
    const openPanel = () => {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
      panel.removeAttribute('hidden');
    };
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) closePanel();
      else openPanel();
    });
    panelLinks.forEach((link) => link.addEventListener('click', closePanel));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closePanel();
        toggle.focus();
      }
    });
    // Close if viewport grows past the mobile breakpoint
    const mq = window.matchMedia('(min-width: 861px)');
    const onMq = () => {
      if (mq.matches) closePanel();
    };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else mq.addListener(onMq);
  }
}

/* ========================================================================
   Section permalink: copy link + "link copied" confirmation
   ======================================================================== */
function initPermalinks() {
  document.querySelectorAll<HTMLAnchorElement>('[data-permalink]').forEach((link) => {
    let timer: number | null = null;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.dataset.permalink;
      if (!id) return;
      const url = window.location.origin + window.location.pathname + '#' + id;
      history.replaceState(null, '', '#' + id);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).catch(() => {});
      }
      link.classList.add('copied');
      link.textContent = 'link copied';
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        link.classList.remove('copied');
        link.textContent = '§ copy link';
      }, 1400);
    });
  });
}

/* ========================================================================
   Sidenotes: click marker toggles adjacent .sn-body (mobile disclosure).
   On desktop the body is always visible; click still toggles highlight.
   ======================================================================== */
function initSidenotes() {
  document.querySelectorAll<HTMLAnchorElement>('[data-sidenote-marker]').forEach((marker) => {
    const n = marker.dataset.sidenoteMarker;
    if (!n) return;
    const body = document.querySelector<HTMLElement>(`[data-sidenote-body="${n}"]`);
    if (!body) return;

    marker.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = body.getAttribute('data-open') === 'true';
      // close all other sidenotes (mobile only — desktop they stay visible regardless)
      document.querySelectorAll<HTMLElement>('[data-sidenote-body]').forEach((el) => {
        if (el !== body) {
          el.setAttribute('data-open', 'false');
          const otherN = el.dataset.sidenoteBody;
          const otherMarker = document.querySelector<HTMLAnchorElement>(`[data-sidenote-marker="${otherN}"]`);
          if (otherMarker) otherMarker.setAttribute('aria-expanded', 'false');
        }
      });
      body.setAttribute('data-open', isOpen ? 'false' : 'true');
      marker.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      if (!isOpen) {
        history.replaceState(null, '', '#sn-' + n);
      }
    });
  });
}

/* ========================================================================
   Comments filter: buttons toggle [hidden] on cat-group
   ======================================================================== */
function initCommentsFilter() {
  const bar = document.querySelector<HTMLElement>('[data-comment-filter]');
  if (!bar) return;
  const buttons = Array.from(bar.querySelectorAll<HTMLButtonElement>('button[data-filter]'));
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-cat-group]'));

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter ?? 'all';
      buttons.forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
      groups.forEach((g) => {
        const key = g.dataset.catGroup;
        if (filter === 'all' || key === filter) g.removeAttribute('hidden');
        else g.setAttribute('hidden', '');
      });
    });
  });
}

/* ========================================================================
   Analytics: nav section clicks + scroll depth thresholds
   ======================================================================== */
function initAnalyticsTracking() {
  document.querySelectorAll<HTMLAnchorElement>('[data-section]').forEach((link) => {
    link.addEventListener('click', () => {
      const section = link.dataset.section;
      if (section) track('nav_section_click', { section });
    });
  });

  const thresholds = [25, 50, 75, 100] as const;
  const fired = new Set<number>();
  const check = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const pct = Math.min(100, (window.scrollY / max) * 100);
    for (const t of thresholds) {
      if (!fired.has(t) && pct >= t) {
        fired.add(t);
        track('scroll_depth', { percent: String(t) });
      }
    }
  };
  window.addEventListener('scroll', check, { passive: true });
  check();
}

/* ------------------------------------------------------------------------ */

function init() {
  initNav();
  initPermalinks();
  initSidenotes();
  initCommentsFilter();
  initAnalyticsTracking();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
