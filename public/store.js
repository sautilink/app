(() => {
  const root = document.documentElement;
  const get = id => document.getElementById(id);
  const media = matchMedia('(prefers-color-scheme: dark)');
  const url = new URL(location.href);
  let selected = ['light','dark'].includes(url.searchParams.get('theme')) ? url.searchParams.get('theme') : null;
  function applyTheme() {
    const theme = selected || (media.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0b0b0e' : '#ffffff';
    get('theme-toggle').setAttribute('aria-pressed', String(theme === 'dark'));
  }
  applyTheme();
  get('theme-toggle').addEventListener('click', () => {
    selected = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const next = new URL(location.href);
    next.searchParams.set('theme', selected);
    try { history.replaceState(null, '', next); } catch {}
    applyTheme();
  });
  media.addEventListener?.('change', applyTheme);
  const font = get('font-css');
  if (font) {
    const activate = () => { font.media = 'all'; };
    if (font.sheet) activate();
    else font.addEventListener('load', activate, {once:true});
  }
  const play = get('play-badge');
  const fallback = () => { play.hidden = true; get('play-fallback').hidden = false; };
  play.addEventListener('error', fallback, {once:true});
  if (play.complete && !play.naturalWidth) fallback();

  async function checkIOS() {
    try {
      const response = await fetch('/ios?status=1', {cache:'no-store',signal:AbortSignal.timeout(6000)});
      if (!response.ok || (await response.json()).available !== true) return;
      const link = get('ios-link');
      get('ios-caption').textContent = 'Download on the';
      get('ios-status').textContent = 'Available';
      get('ios-store-caption').textContent = 'iOS · Available now';
      get('ios-dot').classList.remove('pending');
      get('availability').textContent = 'Get SautiLink from official stores for Android and iOS.';
      link.setAttribute('aria-label','Download SautiLink on the App Store');
      const badge = new Image(158,52);
      badge.alt = 'Download on the App Store';
      badge.onload = () => { link.replaceChildren(badge); link.style.border = '0'; link.style.background = 'transparent'; };
      badge.src = 'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83';
    } catch { /* Preserve the pre-release UI. */ }
  }
  checkIOS();
})();
