(async () => {
  const res = await fetch('site.json');
  const site = await res.json();
  let lang = 'pt';

  function t(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.pt || '';
  }

  function render() {
    document.title = site.meta.title;
    const app = document.getElementById('app');
    app.innerHTML = '';

    // NAV
    const nav = document.createElement('nav');
    nav.className = 'nav-premium';
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="#" class="nav-logo">${site.nav.logo.replace('.', '<span>.</span>')}</a>
        <div class="nav-divider"></div>
        <div class="nav-links">
          ${site.nav.links.map(l => `<a href="${l.href}">${t(l.label)}</a>`).join('')}
        </div>
        <div class="nav-divider"></div>
        <div class="nav-actions">
          <div class="lang-toggle">
            <button class="${lang === 'pt' ? 'active' : ''}" onclick="window.switchLang('pt')">PT</button>
            <button class="${lang === 'en' ? 'active' : ''}" onclick="window.switchLang('en')">EN</button>
          </div>
        </div>
      </div>
    `;
    app.appendChild(nav);

    // HERO
    const hero = site.hero;
    const heroEl = document.createElement('section');
    heroEl.id = hero.id;
    heroEl.className = 'hero-premium';
    heroEl.innerHTML = `
      <div class="page-shell hero-inner">
        <div class="hero-copy">
          <div class="section-kicker">${t(hero.kicker)}</div>
          <h1 class="hero-title">
            <span>${hero.title.firstName}</span>
            <strong>${hero.title.lastName}</strong>
          </h1>
          <p class="hero-lead">${t(hero.lead)}</p>
          <div class="btn-row hero-actions">
            ${hero.buttons.map(b => `<a class="btn-${b.type}" href="${b.href}">${t(b.label)}</a>`).join('')}
          </div>
          <div class="hero-metrics">
            ${hero.metrics.map(m => `<div><strong>${m.value}</strong><span>${t(m.label)}</span></div>`).join('')}
          </div>
        </div>
        <div class="hero-panel premium-card">
          <div class="code-label">${hero.codePanel.filename}</div>
          <pre><code>${hero.codePanel.code}</code></pre>
        </div>
      </div>
    `;
    app.appendChild(heroEl);

    // ECOSYSTEM
    const eco = site.ecosystem;
    const ecoEl = document.createElement('section');
    ecoEl.id = eco.id;
    ecoEl.className = 'section ecosystem-section';
    ecoEl.innerHTML = `
      <div class="page-shell">
        <div class="section-kicker">${t(eco.kicker)}</div>
        <h2 class="section-title">${t(eco.title)}</h2>
        <p class="section-lead">${t(eco.lead)}</p>
        <div class="ecosystem-map">
          ${eco.cards.map(c => `
            <article class="premium-card ecosystem-card">
              <span>${c.num}</span>
              <h3>${t(c.title)}</h3>
              <p>${t(c.desc)}</p>
            </article>
          `).join('')}
        </div>
      </div>
    `;
    app.appendChild(ecoEl);

    // PROJECTS
    const proj = site.projects;
    const projEl = document.createElement('section');
    projEl.id = proj.id;
    projEl.className = 'section projects-section';
    projEl.innerHTML = `
      <div class="page-shell">
        <div class="section-kicker">${t(proj.kicker)}</div>
        <h2 class="section-title">${t(proj.title)}</h2>
        <p class="section-lead">${t(proj.lead)}</p>
        <div class="projects-grid">
          ${proj.items.map(p => `
            <article class="premium-card project-card ${p.featured ? 'project-featured' : ''}">
              <div class="project-top">
                <span>${t(p.tag)}</span>
                <small>${t(p.sub)}</small>
              </div>
              <h3>${p.name}</h3>
              <p>${t(p.desc)}</p>
              <div class="tag-row">
                ${p.tags.map(tg => `<span>${tg}</span>`).join('')}
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
    app.appendChild(projEl);

    // PURPOSE
    const why = site.purpose;
    const whyEl = document.createElement('section');
    whyEl.id = why.id;
    whyEl.className = 'section why-section';
    whyEl.innerHTML = `
      <div class="page-shell">
        <div class="why-layout">
          <div>
            <div class="section-kicker">${t(why.kicker)}</div>
            <h2 class="section-title">${t(why.title)}</h2>
          </div>
          <div class="why-points">
            ${why.points.map(p => `
              <div class="why-point">
                <h4>${t(p.title)}</h4>
                <p>${t(p.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    app.appendChild(whyEl);

    // BUILDING
    const build = site.building;
    const buildEl = document.createElement('section');
    buildEl.id = build.id;
    buildEl.className = 'section building-section';
    buildEl.innerHTML = `
      <div class="page-shell">
        <div class="section-kicker">${t(build.kicker)}</div>
        <h2 class="section-title">${t(build.title)}</h2>
        <p class="section-lead">${t(build.lead)}</p>
        <div class="build-grid">
          ${build.items.map((item, i) => `
            <div class="build-item">
              <strong>0${i + 1}</strong>
              <span>${t(item)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    app.appendChild(buildEl);

    // CTA
    const cta = site.cta;
    const ctaEl = document.createElement('section');
    ctaEl.id = cta.id;
    ctaEl.className = 'final-cta';
    ctaEl.innerHTML = `
      <div class="page-shell">
        <div class="premium-card final-cta-card">
          <div class="section-kicker">${t(cta.kicker)}</div>
          <h2>${t(cta.title)}</h2>
          <p>${t(cta.desc)}</p>
          <div class="btn-row">
            ${cta.buttons.map(b => `<a class="btn-${b.type}" href="${b.href}">${t(b.label)}</a>`).join('')}
          </div>
        </div>
      </div>
    `;
    app.appendChild(ctaEl);

    // FOOTER
    const ft = site.footer;
    const ftEl = document.createElement('footer');
    ftEl.id = ft.id;
    ftEl.className = 'footer-premium';
    ftEl.innerHTML = `
      <div class="page-shell footer-inner">
        <h2 class="footer-word">${ft.wordmark}</h2>
        <div class="footer-links">
          ${ft.links.map(l => `<a href="${l.href}" target="_blank" rel="noreferrer">${l.label}</a>`).join('')}
          <p class="footer-copy">${t(ft.copy)}</p>
        </div>
      </div>
    `;
    app.appendChild(ftEl);
  }

  window.switchLang = function(l) {
    lang = l;
    render();
  };

  render();
})();
