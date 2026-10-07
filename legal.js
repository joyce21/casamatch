(() => {
  const routes = { privacy: './privacy.html', terms: './terms.html' };

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-l]');
    if (!trigger) return;
    const target = routes[trigger.dataset.l];
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = target;
  }, true);

  const style = document.createElement('style');
  style.textContent = `
    .legal-consent{display:flex;gap:10px;align-items:flex-start;margin:14px 0;padding:12px 13px;border:1px solid #ece6e3;border-radius:13px;background:#fffaf8;color:#5d5652;font-size:12px;line-height:1.45}
    .legal-consent input{width:17px;height:17px;margin:1px 0 0;flex:0 0 auto;accent-color:#ef5c67}
    .legal-consent a,.foot-contact{color:#a83e47;text-decoration:underline;font-weight:800}
  `;
  document.head.appendChild(style);

  function enhanceLegalUi() {
    const footerLinks = document.querySelector('.footlinks');
    if (footerLinks && !footerLinks.querySelector('[data-contact]')) {
      const contact = document.createElement('a');
      contact.href = 'mailto:contatocasamatch@gmail.com';
      contact.dataset.contact = 'true';
      contact.className = 'foot-contact';
      contact.textContent = 'Contacto';
      footerLinks.appendChild(contact);
    }

    const form = document.getElementById('af');
    if (!form || form.querySelector('#legalConsent')) return;
    const submit = form.querySelector('button[type="submit"], button:not([type])');
    const heading = form.closest('.card')?.querySelector('h2')?.textContent || '';
    if (!submit || !heading.includes('Criar conta')) return;

    const consent = document.createElement('label');
    consent.className = 'legal-consent';
    consent.id = 'legalConsent';
    consent.innerHTML = '<input type="checkbox" required><span>Confirmo que tenho 18 anos ou mais e aceito os <a href="./terms.html" target="_blank" rel="noopener">Termos de Utilização</a> e a <a href="./privacy.html" target="_blank" rel="noopener">Política de Privacidade</a>.</span>';
    form.insertBefore(consent, submit);
  }

  new MutationObserver(enhanceLegalUi).observe(document.body, { childList: true, subtree: true });
  enhanceLegalUi();
})();
