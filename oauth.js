(() => {
  const SUPABASE_AUTH = 'https://upnfwizmumysgwudyfsp.supabase.co/auth/v1/authorize';
  const PRODUCTION_URL = 'https://casamatch-five.vercel.app';

  const style = document.createElement('style');
  style.textContent = `
    .oauth-block{margin:18px 0 16px}
    .oauth-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:48px;border:1px solid #ded7d3;border-radius:14px;background:#fff;color:#282522;font:inherit;font-weight:800;cursor:pointer;transition:.18s ease}
    .oauth-btn:hover{background:#fffaf8;border-color:#cfc5bf;transform:translateY(-1px)}
    .google-g{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;font-weight:900;font-size:18px;font-family:Arial,sans-serif;color:#4285f4;background:#fff;box-shadow:inset 0 0 0 1px #ececec}
    .oauth-sep{display:flex;align-items:center;gap:10px;margin:16px 0;color:#938983;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
    .oauth-sep::before,.oauth-sep::after{content:"";height:1px;background:#ece6e3;flex:1}
  `;
  document.head.appendChild(style);

  function beginGoogle(isSignup) {
    if (isSignup) {
      const consent = document.querySelector('#legalConsent input[type="checkbox"]');
      if (!consent || !consent.checked) {
        const box = document.getElementById('legalConsent');
        if (box) {
          box.scrollIntoView({ behavior: 'smooth', block: 'center' });
          box.style.outline = '2px solid #ef5c67';
          setTimeout(() => { box.style.outline = ''; }, 1800);
        }
        return;
      }
    }

    const redirect = window.location.hostname.includes('vercel.app') ? PRODUCTION_URL : window.location.origin;
    window.location.href = `${SUPABASE_AUTH}?provider=google&redirect_to=${encodeURIComponent(redirect)}`;
  }

  function enhance() {
    const form = document.getElementById('af');
    if (!form || document.getElementById('googleOAuthBlock')) return;
    const card = form.closest('.card');
    if (!card) return;
    const isSignup = (card.querySelector('h2')?.textContent || '').includes('Criar conta');
    if (isSignup && !document.getElementById('legalConsent')) return;

    const block = document.createElement('div');
    block.className = 'oauth-block';
    block.id = 'googleOAuthBlock';
    block.innerHTML = `<button class="oauth-btn" type="button" id="googleOAuthBtn"><span class="google-g" aria-hidden="true">G</span>${isSignup ? 'Criar conta com Google' : 'Continuar com Google'}</button><div class="oauth-sep"><span>ou</span></div>`;
    form.parentNode.insertBefore(block, form);
    block.querySelector('#googleOAuthBtn').onclick = () => beginGoogle(isSignup);
  }

  new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true });
  enhance();
})();
