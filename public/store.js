(async () => {
  try {
    const response = await fetch('/ios?status=1', {cache:'no-store',signal:AbortSignal.timeout(6000)});
    if (!response.ok || !(await response.json()).available) return;
    const link = document.getElementById('ios-link');
    const badge = new Image();
    badge.alt = 'Download on the App Store';
    badge.height = 48;
    badge.style.height = '48px';
    badge.style.width = 'auto';
    badge.onload = () => { link.replaceChildren(badge); link.style.padding = '0'; link.style.border = '0'; link.style.background = 'transparent'; };
    badge.src = 'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83';
    document.getElementById('ios-caption').textContent = 'Download on the';
    document.getElementById('ios-status').textContent = 'App Store';
    document.getElementById('ios-dot').classList.remove('pending');
    document.getElementById('availability').textContent = 'Available for Android and iOS.';
    link.setAttribute('aria-label','Download SautiLink on the App Store');
  } catch { /* Keep the honest pre-release state. */ }
})();
