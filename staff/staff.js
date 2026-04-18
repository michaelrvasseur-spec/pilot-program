// Shared staff portal shell: sidebar, topbar user, research banner.
(function(){
  const file = (location.pathname.split('/').pop()||'dashboard.html').toLowerCase();
  const items = [
    {href:'dashboard.html', label:'Dashboard', icon:'<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>'},
    {href:'appointments.html', label:'Appointments', icon:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/>'},
    {href:'clients.html', label:'Clients', icon:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2"/><path d="M15 20c0-2.5 2-4 4-4"/>'},
    {href:'payments.html', label:'Payments', icon:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/>'},
    {href:'settings.html', label:'Settings', icon:'<circle cx="12" cy="12" r="3"/><path d="M19 12c0 .6-.1 1.1-.2 1.6l2 1.5-2 3.4-2.4-.9c-.8.6-1.7 1.1-2.7 1.3L13.4 22h-4l-.3-2.1c-1-.3-1.9-.7-2.7-1.3l-2.4.9-2-3.4 2-1.5C4.1 13.1 4 12.6 4 12s.1-1.1.2-1.6l-2-1.5 2-3.4 2.4.9c.8-.6 1.7-1.1 2.7-1.3L9.6 3h4l.3 2.1c1 .3 1.9.7 2.7 1.3l2.4-.9 2 3.4-2 1.5c.1.5.2 1 .2 1.6z"/>'},
  ];
  const html = `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">P</div>
        <div>
          <div class="brand-name">THE · PILOT · PROGRAM</div>
          <div class="brand-sub">Staff Portal</div>
        </div>
      </div>
      <div class="nav-group">Workspace</div>
      ${items.map(i=>`<a href="${i.href}" class="nav-item ${file===i.href?'active':''}"><svg viewBox="0 0 24 24">${i.icon}</svg>${i.label}</a>`).join('')}
      <div class="user">
        <div class="av">MR</div>
        <div>
          <div class="nm">Marcus Reid</div>
          <div class="rl">Admin · Front Desk</div>
        </div>
      </div>
    </aside>
  `;
  const mount = document.getElementById('sidebar-mount');
  if (mount) mount.outerHTML = html;

  const bn = document.createElement('div');
  bn.className='research-banner portal';
  bn.innerHTML = `<strong>Not a real business</strong> The Pilot Program is a simulated brand for UX research purposes only. No real bookings, clients, or payments exist here.`;
  document.body.appendChild(bn);
})();
