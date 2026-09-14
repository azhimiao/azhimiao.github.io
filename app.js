(() => {
  'use strict';

  const CONFIG = window.NYRA_CONFIG || {};
  const byId = id => document.getElementById(id);
  const all = selector => Array.from(document.querySelectorAll(selector));
  const EN = {
    'aria.skip': 'Skip to main content',
    'aria.home': 'Nyra home',
    'aria.nav': 'Main navigation',
    'aria.menu': 'Open menu',
    'aria.mobileNav': 'Mobile navigation',
    'aria.scenes': 'Life with Nyra',
    'aria.top': 'Back to top',
    'nav.showcase': 'Meet Nyra',
    'nav.space': 'Life together',
    'nav.community': 'Come say hello',
    'nav.download': 'Meet your companion',
    'hero.beta': 'Android Beta · Your story starts here',
    'hero.line1': 'A world out there.',
    'hero.line2': 'Someone ',
    'hero.accent': 'right here.',
    'hero.lead': 'An AI companion with a personality and memories.\nFrom a simple goodnight to a life shared in little moments.',
    'hero.download': 'Make room for Nyra',
    'hero.look': 'Get to know Nyra',
    'hero.note': 'Local first · Yours to shape · At your pace',
    'hero.message': 'Take your time. I’m here.',
    'hero.caption': 'A little light for the everyday.',
    'hero.scroll': 'Discover what life together could be',
    'alt.moon': 'A warm crescent moon holding a little home with its lights on',
    'intro.eyebrow': 'Familiarity grows into companionship',
    'intro.line1': 'Every hello',
    'intro.line2': 'can pick up where you left off.',
    'intro.desc': 'A favorite nickname. A thought left unfinished. Time spent together.\nLittle things that make your next conversation feel familiar.',
    'memory.title': 'The little things, remembered',
    'memory.desc': 'Keep what matters, and let familiarity grow.',
    'diary.title': 'An ordinary day, worth keeping',
    'diary.desc': 'Conversations, feelings, and shared moments become pages in your diary.',
    'presence.title': 'Company beyond the chat',
    'presence.desc': 'Listen together, or simply share a quiet corner of your desktop.',
    'demo.space': 'our space',
    'demo.here': 'Right here',
    'demo.today': 'Today · 21:36',
    'demo.user': 'I’m tired today. Don’t really feel like talking.',
    'demo.reply': 'Then we don’t have to.\nPut on a song you like. I’ll stay a while.',
    'demo.memoryLabel': 'A little thing to remember',
    'demo.memory': '“When I’m tired, quiet company means more than advice.”',
    'demo.input': 'Say something, or simply stay…',
    'demo.diaryTag': 'A page of us',
    'demo.diaryTitle': 'Nothing much happened.\nBut you were here.',
    'demo.diaryText': 'We didn’t say much tonight. The music was soft, and time seemed to slow down.\n\nSome days don’t need a big story. Being here together is enough to remember.',
    'demo.presence': 'Doing our own thing.\nKnowing we’re not alone.',
    'demo.song': 'A moment to slow down',
    'demo.listening': 'Listening with Nyra',
    'demo.caption': 'Illustrative companion scenes · Sample conversations and content',
    'space.eyebrow': 'Make it feel like you',
    'space.line1': 'One companion.',
    'space.line2': 'So many ways to be together.',
    'space.desc': 'Life doesn’t have to be extraordinary to be worth sharing.\nThere’s room here for the little things.',
    'space.identityTitle': 'A personality you can shape.',
    'space.identityDesc': 'A name, a personality, a voice, a world. Create or import a character who brings their own personality to every conversation.',
    'space.momentNote': 'This song made me think of you.',
    'space.momentsTitle': 'More than pressing send.',
    'space.momentsDesc': 'A song, a photo, a diary entry. Build a collection of shared moments that reaches beyond the chat.',
    'space.shellTitle': 'A different view. The same bond.',
    'space.shellDesc': 'A simple app or a little virtual phone filled with your everyday life. Two interfaces, one character, and the same shared memories.',
    'privacy.eyebrow': 'Closeness, with room to breathe',
    'privacy.line1': 'Let them closer.',
    'privacy.line2': 'On your terms.',
    'privacy.desc': 'Memories and everyday moments stay on your device first. Microphone, camera, and location access are requested when needed. Online models receive the content needed for the services you choose.',
    'privacy.local': 'Local first',
    'privacy.permission': 'Permissions you control',
    'privacy.model': 'Choose your model',
    'privacy.link': 'Privacy and permissions',
    'community.eyebrow': 'Still growing. Better with you.',
    'community.title': 'Come in. Stay a while.',
    'community.desc': 'Nyra is still in beta. Share your days, your ideas,\nor what you’d love to find here next.',
    'community.github': 'Follow our progress on GitHub',
    'community.qqLabel': 'QQ COMMUNITY',
    'community.copyQq': 'Copy group number',
    'community.copyDiscord': 'Copy username',
    'community.copiedQq': 'QQ group number copied',
    'community.copiedDiscord': 'Discord username copied',
    'community.copyFailed': 'Copy is unavailable. Select the contact below to copy it manually.',
    'community.contactValue': 'Contact to copy',
    'download.eyebrow': 'Your story starts with hello',
    'download.line1': 'A little moonlight.',
    'download.line2': 'Every day.',
    'download.desc': 'Nyra for Android is now in beta.',
    'download.button': 'Download for Android',
    'download.mirror': 'GitHub mirror',
    'download.version': 'Version',
    'download.details': 'Installation and file verification',
    'download.instructions': 'Open the downloaded APK on your Android device and follow the system instructions to allow this installation. Beta features are still being refined. AI features require a configured model or a hosted service.',
    'download.source': 'Direct download: download.memprism.com · Mirror: GitHub Pages',
    'download.checksumUnavailable': 'Checksum not provided',
    'footer.line': 'Let time together remain.',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.legal': 'Legal',
    'footer.rights': 'All rights reserved.'
  };
  const ZH = {
    'community.copiedQq': 'QQ 群号已复制',
    'community.copiedDiscord': 'Discord 用户名已复制',
    'community.copyFailed': '暂时无法自动复制，可选择下方联系方式手动复制。',
    'community.contactValue': '待复制的联系方式',
    'download.checksumUnavailable': '暂未提供校验值'
  };

  // Chinese copy comes from the authored page. Only text and line breaks are
  // translated; translated strings never become executable HTML.
  function readText(node) {
    return Array.from(node.childNodes).map(child => child.nodeName === 'BR'
      ? '\n' : child.nodeType === 3 ? child.textContent : readText(child)).join('');
  }
  const textNodes = all('[data-i18n]').map(element => {
    const key = element.dataset.i18n;
    const original = readText(element);
    if (!(key in ZH)) ZH[key] = original;
    return { element, key, original };
  });
  const attributeNodes = [
    ...all('[data-i18n-alt]').map(element => ({ element, key: element.dataset.i18nAlt, attr: 'alt' })),
    ...all('[data-i18n-aria]').map(element => ({ element, key: element.dataset.i18nAria, attr: 'aria-label' }))
  ].map(item => {
    item.original = item.element.getAttribute(item.attr) || '';
    if (!(item.key in ZH)) ZH[item.key] = item.original;
    return item;
  });
  function savedLocale() {
    try { return localStorage.getItem('nyra-locale'); } catch { return null; }
  }
  function detectLocale() {
    const saved = savedLocale();
    if (saved === 'zh' || saved === 'en') return saved;
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language || 'zh'];
    return languages.some(language => String(language).toLowerCase().startsWith('zh')) ? 'zh' : 'en';
  }
  let locale = detectLocale();
  const t = (key, fallback = '') => (locale === 'zh' ? ZH[key] : EN[key]) ?? fallback;
  const localeToggle = byId('localeToggle');
  const menu = byId('mobileMenu');
  const menuButton = byId('menuBtn');
  const toast = byId('toast');
  let toastTimer;

  function setText(element, value) {
    const fragment = document.createDocumentFragment();
    String(value).split('\n').forEach((piece, index) => {
      if (index) fragment.append(document.createTextNode(' '), document.createElement('br'));
      fragment.append(document.createTextNode(piece));
    });
    element.replaceChildren(fragment);
  }
  function updateMenuLabel() {
    if (menuButton) menuButton.setAttribute('aria-label', locale === 'zh'
      ? (menu && !menu.hidden ? '关闭菜单' : '打开菜单')
      : (menu && !menu.hidden ? 'Close menu' : 'Open menu'));
  }
  function applyLocale(next, remember = false) {
    locale = next === 'en' ? 'en' : 'zh';
    if (remember) {
      try { localStorage.setItem('nyra-locale', locale); } catch { /* Language still works for this visit. */ }
    }
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    textNodes.forEach(({ element, key, original }) => setText(element, t(key, original)));
    attributeNodes.forEach(({ element, key, attr, original }) => element.setAttribute(attr, t(key, original)));
    if (localeToggle) {
      localeToggle.textContent = locale === 'zh' ? 'EN ↗' : '中文 ↗';
      localeToggle.setAttribute('aria-label', locale === 'zh' ? 'Switch to English' : '切换为中文');
      localeToggle.setAttribute('lang', locale === 'zh' ? 'en' : 'zh-CN');
    }
    if (byId('heroTitle')) {
      const title = locale === 'zh' ? '月栖 Nyra — 世界很大。这里，有 TA。' : 'Nyra — A world out there. Someone right here.';
      const description = locale === 'zh'
        ? '月栖 Nyra，一个有记忆、有个性的 AI 伙伴。从一句晚安，到只属于你们的日常。Android 测试版现已开放。'
        : 'An AI companion with a personality and memories. From a simple goodnight to a life shared in little moments. Android beta now available.';
      document.title = title;
      all('meta[property="og:title"], meta[name="twitter:title"]').forEach(meta => { meta.content = title; });
      all('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').forEach(meta => { meta.content = description; });
      const ogLocale = document.querySelector('meta[property="og:locale"]');
      const alternateLocale = document.querySelector('meta[property="og:locale:alternate"]');
      if (ogLocale) ogLocale.content = locale === 'zh' ? 'zh_CN' : 'en_US';
      if (alternateLocale) alternateLocale.content = locale === 'zh' ? 'en_US' : 'zh_CN';
    }
    const sha = byId('releaseSha');
    if (sha && !validChecksum) sha.textContent = t('download.checksumUnavailable');
    updateMenuLabel();
    if (toast) {
      clearTimeout(toastTimer);
      toast.classList.remove('show');
      toast.replaceChildren();
    }
  }
  localeToggle?.addEventListener('click', () => applyLocale(locale === 'zh' ? 'en' : 'zh', true));

  function setMenu(open, returnFocus = false) {
    if (!menu || !menuButton) return;
    menu.hidden = !open;
    menu.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    updateMenuLabel();
    if (returnFocus) menuButton.focus({ preventScroll: true });
  }
  menuButton?.addEventListener('click', () => setMenu(menu?.hidden !== false));
  menu?.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu && !menu.hidden) {
      setMenu(false, true);
      event.preventDefault();
    }
  });
  document.addEventListener('click', event => {
    if (menu && !menu.hidden && !menu.contains(event.target) && !menuButton?.contains(event.target)) setMenu(false);
  });

  const tabs = all('[role="tab"][data-scene]').filter(tab => byId(tab.getAttribute('aria-controls')));
  function selectScene(selected, focus = false) {
    tabs.forEach(tab => {
      const active = tab === selected;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      byId(tab.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) selected.focus({ preventScroll: true });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectScene(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectScene(tabs[next], true);
      }
    });
  });
  if (tabs.length) selectScene(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);

  function safeWebUrl(value, fallback = '') {
    try {
      const url = new URL(String(value));
      if ((url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password) return url.href;
    } catch { /* Invalid configuration uses the established download destination. */ }
    return fallback;
  }
  function setContent(id, value) {
    const element = byId(id);
    if (element) element.textContent = String(value);
  }
  const checksum = String(CONFIG.sha256 || '').trim();
  const validChecksum = /^[a-f0-9]{64}$/i.test(checksum);
  function bindConfig() {
    const apk = byId('apkDownload');
    const mirror = byId('githubDownload');
    if (apk) apk.href = safeWebUrl(CONFIG.downloadUrl, 'https://download.memprism.com/nyra-latest.apk');
    if (mirror) mirror.href = safeWebUrl(CONFIG.githubDownloadUrl, 'https://azhimiao.github.io/downloads/nyra-latest.apk');
    setContent('releaseVersion', CONFIG.version || 'Beta');
    setContent('releaseSystem', CONFIG.minAndroid || 'Android 10+');
    setContent('releaseSize', CONFIG.fileSize || '—');
    setContent('releaseSha', validChecksum ? checksum : t('download.checksumUnavailable'));
    setContent('copyrightOwner', CONFIG.copyrightOwner || 'MemPrism');
    setContent('qqGroup', String(CONFIG.qqGroup || '').trim() || '—');
    setContent('discordHandle', String(CONFIG.discordHandle || '').trim() || '—');
    const qq = byId('qqContact');
    const discord = byId('discordContact');
    if (qq) qq.disabled = !String(CONFIG.qqGroup || '').trim();
    if (discord) discord.disabled = !String(CONFIG.discordHandle || '').trim();
    const github = byId('githubLink');
    const githubUrl = safeWebUrl(CONFIG.githubUrl);
    if (github) {
      github.hidden = !githubUrl;
      github.classList.toggle('hidden', !githubUrl);
      if (githubUrl) github.href = githubUrl;
    }
    const contact = byId('contactLink');
    const email = String(CONFIG.contactEmail || '').trim();
    const validEmail = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email);
    if (contact) {
      contact.hidden = !validEmail;
      contact.classList.toggle('hidden', !validEmail);
      if (validEmail) contact.href = `mailto:${email}`;
    }
  }

  function showToast(message, selectableValue = '') {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.replaceChildren(document.createTextNode(message));
    toast.classList.add('show');
    if (selectableValue) {
      const field = document.createElement('input');
      field.className = 'toast-copy-value';
      field.type = 'text';
      field.readOnly = true;
      field.value = selectableValue;
      field.setAttribute('aria-label', t('community.contactValue'));
      field.addEventListener('focus', () => field.select());
      field.addEventListener('click', () => field.select());
      toast.append(field);
      field.focus({ preventScroll: true });
      field.select();
    }
    const dismiss = () => {
      if (toast.contains(document.activeElement)) {
        toastTimer = setTimeout(dismiss, 4000);
      } else {
        toast.classList.remove('show');
        toast.replaceChildren();
      }
    };
    toastTimer = setTimeout(dismiss, selectableValue ? 12000 : 2600);
  }
  async function copyContact(value, successKey) {
    const text = String(value || '').trim();
    if (!text) return;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard_unavailable');
      await navigator.clipboard.writeText(text);
      showToast(t(successKey));
    } catch {
      showToast(t('community.copyFailed'), text);
    }
  }
  byId('qqContact')?.addEventListener('click', () => copyContact(CONFIG.qqGroup, 'community.copiedQq'));
  byId('discordContact')?.addEventListener('click', () => copyContact(CONFIG.discordHandle, 'community.copiedDiscord'));

  const reducedMotion = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
  const heroMedia = byId('heroMedia');
  const finePointer = typeof matchMedia === 'function' ? matchMedia('(pointer: fine)') : null;
  heroMedia?.addEventListener('pointermove', event => {
    if (!finePointer?.matches || reducedMotion?.matches || event.pointerType === 'touch') return;
    const rect = heroMedia.getBoundingClientRect();
    heroMedia.style.setProperty('--moon-x', `${((event.clientX - rect.left) / rect.width - .5) * 9}px`);
    heroMedia.style.setProperty('--moon-y', `${((event.clientY - rect.top) / rect.height - .5) * 9}px`);
  }, { passive: true });
  heroMedia?.addEventListener('pointerleave', () => {
    heroMedia.style.removeProperty('--moon-x');
    heroMedia.style.removeProperty('--moon-y');
  });
  let revealObserver;
  function revealAll() {
    revealObserver?.disconnect();
    all('.reveal').forEach(element => {
      element.classList.remove('is-pending');
      element.classList.add('visible');
    });
  }
  function setupReveals() {
    if (reducedMotion?.matches || typeof IntersectionObserver !== 'function') return revealAll();
    try {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px 40px 0px', threshold: 0.01 });
      all('.reveal').forEach(element => {
        if (element.getBoundingClientRect().top > window.innerHeight + 40) {
          revealObserver.observe(element);
          element.classList.add('is-pending');
        } else element.classList.add('visible');
      });
    } catch { revealAll(); }
  }
  if (reducedMotion?.addEventListener) reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) revealAll();
  });

  const navLinks = all('.desktop-nav a[href^="#"], .mobile-menu a[href^="#"]');
  const sections = Array.from(new Set(navLinks.map(link => byId(link.hash.slice(1))).filter(Boolean)));
  const toTop = byId('toTop');
  let scrollQueued = false;
  function updateScrollState() {
    scrollQueued = false;
    let current = '';
    const offset = (byId('top')?.getBoundingClientRect().height || 80) + 70;
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= offset) current = section.id;
    });
    navLinks.forEach(link => {
      const active = Boolean(current) && link.hash === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (toTop) {
      const shown = window.scrollY > 640;
      toTop.hidden = !shown;
      toTop.classList.toggle('show', shown);
    }
  }
  function queueScrollState() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(updateScrollState);
  }
  function syncResponsiveControls() {
    // Read the actual layout so navigation stays in sync with CSS breakpoints.
    if (menuButton && getComputedStyle(menuButton).display === 'none') setMenu(false);
    const tablist = tabs[0]?.closest('[role="tablist"]');
    if (tablist) tablist.setAttribute('aria-orientation',
      getComputedStyle(tablist).flexDirection.startsWith('row') ? 'horizontal' : 'vertical');
  }
  window.addEventListener('scroll', queueScrollState, { passive: true });
  window.addEventListener('resize', () => {
    syncResponsiveControls();
    queueScrollState();
  }, { passive: true });
  document.addEventListener('focusin', event => {
    const pending = event.target.closest?.('.reveal.is-pending');
    if (pending) {
      pending.classList.remove('is-pending');
      pending.classList.add('visible');
      revealObserver?.unobserve(pending);
    }
  });
  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion?.matches ? 'instant' : 'smooth' });
    document.querySelector('.topbar .brand')?.focus({ preventScroll: true });
  });
  bindConfig();
  applyLocale(locale);
  setMenu(false);
  syncResponsiveControls();
  setupReveals();
  updateScrollState();
})();
