(() => {
  const data = window.EVENT_DATA;

  if (!data) {
    console.error('EVENT_DATA를 불러오지 못했습니다.');
    return;
  }

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const eventDate = data.event?.date;
  const formatEventDate = (format) => {
    if (!eventDate) return '';

    const date = new Date(`${eventDate.iso}T12:00:00Z`);
    const month = date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }).toUpperCase();

    const formats = {
      hero: `${month} ${eventDate.day} · ${weekday}`,
      schedule: `${String(eventDate.month).padStart(2, '0')}.${String(eventDate.day).padStart(2, '0')} ${weekday}`,
      'full-ko': `${eventDate.year}년 ${eventDate.month}월 ${eventDate.day}일 ${date.toLocaleDateString('ko-KR', { weekday: 'long', timeZone: 'UTC' })}`,
      year: String(eventDate.year),
      iso: eventDate.iso
    };

    return formats[format] ?? '';
  };

  document.querySelectorAll('[data-event-date]').forEach((node) => {
    node.textContent = formatEventDate(node.dataset.eventDate);
  });

  const venue = data.event?.venue;
  const formatVenue = (format) => {
    if (!venue) return '';

    const formats = {
      name: venue.name,
      label: venue.label,
      'address-short': venue.addressShort,
      'address-with-floor': venue.addressWithFloor,
      subway: venue.directions.subway,
      bus: venue.directions.bus,
      entrance: venue.directions.entrance
    };

    return formats[format] ?? '';
  };

  document.querySelectorAll('[data-event-venue]').forEach((node) => {
    node.textContent = formatVenue(node.dataset.eventVenue);
  });
  document.querySelectorAll('[data-event-venue-map]').forEach((node) => {
    node.href = venue?.mapUrl ?? '#';
  });
  const venueTitle = document.querySelector('[data-event-venue-title]');
  if (venueTitle && venue) {
    venue.titleLines.forEach((line, index) => {
      if (index) venueTitle.append(document.createElement('br'));
      venueTitle.append(line);
    });
  }

  const renderSessions = (sessions = []) => {
    if (!sessions.length) return '<p class="session-pending">SESSIONS TBA</p>';

    return `
      <dl class="session-list">
        ${sessions.map((session) => `
          <div>
            <dt>${escapeHtml(session.role)}</dt>
            <dd>${session.names.map(escapeHtml).join(', ')}</dd>
          </div>
        `).join('')}
      </dl>
    `;
  };

  const scheduleList = document.querySelector('#schedule-list');
  scheduleList.innerHTML = data.schedule.map((item, index) => `
    <li>
      <time datetime="${escapeHtml(formatEventDate('iso'))}T${escapeHtml(item.time)}">
        <strong>${escapeHtml(item.time)}</strong>
        <span>${escapeHtml(item.endTime)}</span>
      </time>
      <div>
        <span>${String(index + 1).padStart(2, '0')}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.detail)}</p>
      </div>
    </li>
  `).join('');

  const renderSong = (song, index) => `
    <li class="song${song.secret ? ' song-secret' : ''}">
      <details>
        <summary class="song-summary">
          <span class="song-number">${String(song.order ?? index + 1).padStart(2, '0')}</span>
          <div class="song-copy">
            ${song.secret
              ? `<div class="secret-title-line"><h4>${escapeHtml(song.title)}</h4><span class="secret-label">SECRET TRACK</span></div>`
              : `<h4>${escapeHtml(song.title)}</h4>`}
            ${song.secret
              ? `<p class="song-hint"><span>HINT</span><b>“${escapeHtml(song.hint)}”</b></p>`
              : song.originalArtist || song.duration
                ? `<p>${[song.originalArtist, song.duration].filter(Boolean).map(escapeHtml).join(' · ')}</p>`
                : ''}
          </div>
          <span class="song-actions">
            ${song.videoUrl ? `
              <a class="video-link" href="${escapeHtml(song.videoUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(song.title)} YouTube 영상 열기">
                <svg viewBox="0 0 28 20" aria-hidden="true" focusable="false">
                  <rect width="28" height="20" rx="5"></rect>
                  <path d="M11 5.5 20 10l-9 4.5Z"></path>
                </svg>
              </a>
            ` : '<span class="video-slot" aria-hidden="true"></span>'}
            <span class="song-toggle" aria-hidden="true"></span>
          </span>
        </summary>
        <div class="song-sessions">
          <p>PLAYED BY</p>
          ${renderSessions(song.sessions)}
        </div>
      </details>
    </li>
  `;

  const bandList = document.querySelector('#band-list');
  const panels = data.bands.map((band, index) => `
    <section class="band-panel" aria-labelledby="band-${escapeHtml(band.id)}">
      <header class="band-summary">
        <div><span>ACT ${String(index + 1).padStart(2, '0')}</span><h3 id="band-${escapeHtml(band.id)}">${escapeHtml(band.name)}</h3></div>
        <dl>
          <div><dt>TIME</dt><dd>${escapeHtml(band.time)}</dd></div>
        </dl>
      </header>
      <div class="setlist-heading"><span>QUEUE</span><span>TAP A TRACK FOR PLAYERS</span></div>
      <ol class="setlist">${band.songs.slice().sort((a, b) => a.order - b.order).map(renderSong).join('')}</ol>
    </section>
  `).join('');

  bandList.innerHTML = panels;

  const guideLabels = [
    { eyebrow: 'START TIME', title: '공연 시작' },
    { eyebrow: 'SEATING', title: '관람 형태' },
    { eyebrow: 'UPDATES', title: '주차 안내' }
  ];

  const noticeList = document.querySelector('#notice-list');
  noticeList.innerHTML = data.notices.map((notice, index) => `
    <article class="guide-item">
      <div class="guide-static">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <div><small>${guideLabels[index]?.eyebrow ?? 'NOTICE'}</small><strong>${guideLabels[index]?.title ?? '공연 안내'}</strong></div>
      </div>
      <p>${escapeHtml(notice)}</p>
    </article>
  `).join('');

  // Keep motion decorative: content is visible without JavaScript or reduced motion.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sectionNav = document.querySelector('.section-nav');
  const sectionLinks = [...document.querySelectorAll('.section-nav a')];
  const sectionTargets = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const navIndicator = document.createElement('span');
  const navFx = document.createElement('span');
  navIndicator.className = 'nav-indicator';
  navFx.className = 'nav-fx';
  [navIndicator, navFx].forEach((node) => node.setAttribute('aria-hidden', 'true'));
  sectionNav?.prepend(navFx, navIndicator);
  sectionLinks.forEach((link) => {
    link.dataset.label = link.textContent;
    link.setAttribute('aria-label', link.textContent);
  });

  const scrambleGlyphs = '#$%&@!?/<>01';
  const scrambleLabel = (link) => {
    const label = link.dataset.label;
    const frames = 8;
    let frame = 0;
    window.clearInterval(link.scrambleTimer);
    link.scrambleTimer = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor(label.length * frame / frames);
      link.textContent = [...label]
        .map((char, index) => (index < settled ? char : scrambleGlyphs[Math.floor(Math.random() * scrambleGlyphs.length)]))
        .join('');
      if (frame >= frames) {
        window.clearInterval(link.scrambleTimer);
        link.textContent = label;
      }
    }, 40);
  };

  let activeLink = null;
  let glitchTimer;
  let navLockedUntil = 0;
  const moveIndicator = () => {
    if (!activeLink) return;
    navIndicator.style.translate = `${activeLink.offsetLeft}px 0`;
    navIndicator.style.width = `${activeLink.offsetWidth}px`;
  };
  const setActiveLink = (link) => {
    if (!link || link === activeLink) return;
    const isFirst = !activeLink;
    activeLink = link;
    sectionLinks.forEach((item) => {
      const selected = item === link;
      item.classList.toggle('is-active', selected);
      if (selected) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });
    moveIndicator();
    if (isFirst) {
      window.requestAnimationFrame(() => sectionNav?.classList.add('is-ready'));
      return;
    }
    if (reducedMotion) return;
    sectionNav.classList.remove('is-glitching');
    void sectionNav.offsetWidth;
    sectionNav.classList.add('is-glitching');
    window.clearTimeout(glitchTimer);
    glitchTimer = window.setTimeout(() => sectionNav.classList.remove('is-glitching'), 450);
    scrambleLabel(link);
  };

  const updateActiveSection = () => {
    if (Date.now() < navLockedUntil) return;
    const marker = window.scrollY + Math.min(window.innerHeight * .45, 380);
    let activeId = sectionTargets[0]?.id;
    sectionTargets.forEach((section) => {
      if (section.offsetTop <= marker) activeId = section.id;
    });
    setActiveLink(sectionLinks.find((link) => link.getAttribute('href') === `#${activeId}`));
  };

  sectionLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLockedUntil = Date.now() + 1000;
      setActiveLink(link);
    });
  });
  window.addEventListener('scrollend', () => {
    navLockedUntil = 0;
    updateActiveSection();
  });
  const updateHeader = () => document.body.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', moveIndicator);
  document.fonts?.ready.then(moveIndicator);
  updateActiveSection();
  updateHeader();

  const bootNodes = [...document.querySelectorAll('.terminal-log > span, .terminal-log > .boot-logo')];
  const pause = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  const playTerminalBoot = async () => {
    document.documentElement.classList.add('booting');
    await pause(40);
    for (const node of bootNodes) {
      if (node.matches('.boot-logo')) {
        node.classList.add('is-visible');
        await pause(90);
        continue;
      }
      const text = node.textContent;
      node.textContent = '';
      node.classList.add('is-visible', 'is-typing');
      for (let index = 1; index <= text.length; index += 1) {
        node.textContent = text.slice(0, index);
        await pause(6);
      }
      node.classList.remove('is-typing');
      await pause(35);
    }
    document.documentElement.classList.remove('booting');
  };
  if (!reducedMotion) playTerminalBoot();
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    const revealTargets = [...document.querySelectorAll('main > section:not(.cover), footer')];
    revealTargets.forEach((target) => target.classList.add('reveal-on-scroll'));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -5% 0px' });
    revealTargets.forEach((target) => revealObserver.observe(target));
  }

  // Collapse only the empty top/bottom space; logs and logo stay fully visible.
  const hero = document.querySelector('.cover');
  const terminalLog = document.querySelector('.terminal-log');
  const heroTopline = document.querySelector('.cover-topline');
  const updateHeroHeight = () => {
    if (!hero || !terminalLog || !heroTopline) return;
    if (!window.matchMedia('(max-width: 599px)').matches) {
      hero.style.removeProperty('--hero-log-space-top');
      hero.style.removeProperty('--hero-bottom-space');
      return;
    }
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const headerHeight = heroTopline.getBoundingClientRect().height;
    const logHeight = terminalLog.getBoundingClientRect().height;
    const minimumSpace = 18;
    const availableSpace = Math.max(minimumSpace * 2, viewportHeight - headerHeight - logHeight);
    const collapse = Math.min(Math.max(window.scrollY, 0) * 1.35, availableSpace - minimumSpace * 2);
    const topSpace = Math.max(minimumSpace, availableSpace * .5 - collapse * .55);
    const bottomSpace = Math.max(minimumSpace, availableSpace * .5 - collapse * .45);
    hero.style.setProperty('--hero-log-space-top', `${topSpace}px`);
    hero.style.setProperty('--hero-bottom-space', `${bottomSpace}px`);
  };
  window.addEventListener('scroll', updateHeroHeight, { passive: true });
  window.addEventListener('resize', updateHeroHeight);
  window.visualViewport?.addEventListener('resize', updateHeroHeight);
  updateHeroHeight();
})();
