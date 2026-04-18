// Shared header, footer, and research banner injection for all Apex pages.
(function(){
  const pathFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const navItems = [
    {href:'index.html', label:'Home'},
    {href:'classes.html', label:'Classes'},
    {href:'training.html', label:'Personal Training'},
    {href:'memberships.html', label:'Memberships'},
    {href:'about.html', label:'About'},
    {href:'contact.html', label:'Contact'},
  ];

  const navHtml = `
    <nav class="nav">
      <div class="nav-inner">
        <a href="index.html" class="logo" aria-label="The Pilot Program home">
          <span class="logo-mark">P</span>
          <span class="logo-text">THE<em>·</em>PILOT<em>·</em>PROGRAM</span>
        </a>
        <div class="nav-links" id="navLinks">
          ${navItems.map(n => `<a href="${n.href}" class="${pathFile===n.href?'active':''}">${n.label}</a>`).join('')}
          <a href="book.html" class="btn btn-primary btn-sm nav-cta">Book Now</a>
        </div>
        <button class="hamburger" aria-label="Menu" onclick="document.getElementById('navLinks').classList.toggle('open')">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `;

  const footerHtml = `
    <footer class="site-footer">
      <div class="container">
        <div class="f-grid">
          <div class="f-brand">
            <div class="logo" style="color:#fff">
              <span class="logo-mark">P</span>
              <span class="logo-text" style="color:#fff">THE<em>·</em>PILOT<em>·</em>PROGRAM</span>
            </div>
            <p>Your training. Tested and proven. A boutique training studio in Riverside, CA where coaches know your name.</p>
            <div class="socials" aria-label="Social links">
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="#fff"/></svg></a>
              <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M13 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M13 3c.5 2.5 2.5 4 5 4"/></svg></a>
              <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10 9l5 3-5 3z"/></svg></a>
              <a href="#" aria-label="Strava"><svg viewBox="0 0 24 24"><path d="M7 14l4-8 4 8h-3l-1-2-1 2z"/><path d="M13 14l2 4 2-4"/></svg></a>
            </div>
          </div>
          <div>
            <h5>Studio</h5>
            <ul>
              <li><a href="classes.html">Classes</a></li>
              <li><a href="training.html">Personal Training</a></li>
              <li><a href="memberships.html">Memberships</a></li>
              <li><a href="book.html">Book an Appointment</a></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h5>Visit</h5>
            <ul>
              <li>482 Ironworks Ave<br/>Riverside, CA 92501</li>
              <li>(951) 555-0174</li>
              <li>hello@thepilotprogram.fit</li>
              <li>Mon–Fri 6a–8p · Sat 7a–6p · Sun 8a–2p</li>
            </ul>
          </div>
        </div>
        <div class="f-bottom">
          <div>© 2026 The Pilot Program. All rights reserved.</div>
          <div>Privacy · Terms · Accessibility · <a href="staff/login.html" style="color:rgba(255,255,255,0.65)">Staff Login</a></div>
        </div>
      </div>
    </footer>
  `;

  const bannerHtml = `
    <div class="research-banner" role="status" aria-label="Research simulation banner">
      <strong>Not a real business</strong>
      <span>The Pilot Program is a simulated brand created for UX research purposes only. No bookings are accepted and no payments are processed.</span>
    </div>
  `;

  // Inject
  const navMount = document.getElementById('site-nav');
  if (navMount) navMount.outerHTML = navHtml;

  const footerMount = document.getElementById('site-footer');
  if (footerMount) footerMount.outerHTML = footerHtml;

  // Always append banner
  const banner = document.createElement('div');
  banner.innerHTML = bannerHtml;
  document.body.appendChild(banner.firstElementChild);
})();
