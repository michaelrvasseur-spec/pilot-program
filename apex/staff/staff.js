// Shared staff portal shell — sidebar, date utilities, session reset, research banner.
(function(){
  // ── Date helpers (exposed globally for page scripts) ──────────────────────
  const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const FULL_MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const WDAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const WDAYS_S=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  function _off(n){const d=new Date();d.setDate(d.getDate()+n);return d;}

  // relDate(n, 'short') → "Apr 18"   relDate(n, 'long') → "Apr 18, 2026"
  window.relDate=function(n,fmt){
    const d=_off(n);
    const s=MONTHS[d.getMonth()]+' '+d.getDate();
    return fmt==='long'?s+', '+d.getFullYear():s;
  };
  window.relDay=window.relDate;

  // relDayLabel(0)→"Today"  relDayLabel(-1)→"Fri"  etc.
  window.relDayLabel=function(n){
    if(n===0)return'Today';
    if(n===-1)return'Yesterday';
    return WDAYS_S[_off(n).getDay()];
  };

  // "Saturday, April 18, 2026"
  window.fullDateStr=function(){
    const d=new Date();
    return WDAYS[d.getDay()]+', '+FULL_MONTHS[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
  };

  // First day of next calendar month → "May 1, 2026"
  window.nextMonthFirst=function(){
    const d=new Date();
    const n=new Date(d.getFullYear(),d.getMonth()+1,1);
    return MONTHS[n.getMonth()]+' 1, '+n.getFullYear();
  };

  // "Apr 1" — first day of the current month (no year)
  window.currentMonthFirst=function(){
    const d=new Date();
    return MONTHS[d.getMonth()]+' 1';
  };

  // Clear all pp_ sessionStorage keys
  window.ppClearSession=function(){
    Object.keys(sessionStorage).filter(k=>k.startsWith('pp_')).forEach(k=>sessionStorage.removeItem(k));
  };

  // ── Sidebar ───────────────────────────────────────────────────────────────
  const file=(location.pathname.split('/').pop()||'dashboard.html').toLowerCase();
  const items=[
    {href:'dashboard.html',label:'Dashboard',icon:'<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>'},
    {href:'appointments.html',label:'Appointments',icon:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/>'},
    {href:'clients.html',label:'Clients',icon:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2"/><path d="M15 20c0-2.5 2-4 4-4"/>'},
    {href:'payments.html',label:'Payments',icon:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/>'},
    {href:'settings.html',label:'Settings',icon:'<circle cx="12" cy="12" r="3"/><path d="M19 12c0 .6-.1 1.1-.2 1.6l2 1.5-2 3.4-2.4-.9c-.8.6-1.7 1.1-2.7 1.3L13.4 22h-4l-.3-2.1c-1-.3-1.9-.7-2.7-1.3l-2.4.9-2-3.4 2-1.5C4.1 13.1 4 12.6 4 12s.1-1.1.2-1.6l-2-1.5 2-3.4 2.4.9c.8-.6 1.7-1.1 2.7-1.3L9.6 3h4l.3 2.1c1 .3 1.9.7 2.7 1.3l2.4-.9 2 3.4-2 1.5c.1.5.2 1 .2 1.6z"/>'},
  ];

  const html=`
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
      <div id="pp-reset-wrap" style="padding:4px 10px 2px">
        <button id="pp-reset-btn" style="display:flex;align-items:center;gap:7px;background:transparent;border:0;color:rgba(255,255,255,0.35);font-size:11px;font-family:inherit;cursor:pointer;padding:7px 0;width:100%;line-height:1">
          <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2;flex-shrink:0"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Reset session
        </button>
        <div id="pp-reset-confirm" style="display:none;font-size:11px;color:rgba(255,255,255,0.55);padding:2px 0 6px;line-height:1.4">
          Reset all session data?
          <div style="display:flex;gap:6px;margin-top:7px">
            <button id="pp-reset-yes" style="font-size:11px;font-family:inherit;padding:4px 9px;border-radius:3px;border:1px solid #C23B3B;background:#C23B3B;color:#fff;cursor:pointer">Confirm</button>
            <button id="pp-reset-no" style="font-size:11px;font-family:inherit;padding:4px 9px;border-radius:3px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,0.55);cursor:pointer">Cancel</button>
          </div>
        </div>
      </div>
      <div class="user">
        <div class="av">MR</div>
        <div>
          <div class="nm">Marcus Reid</div>
          <div class="rl">Admin · Front Desk</div>
        </div>
      </div>
    </aside>
  `;

  const mount=document.getElementById('sidebar-mount');
  if(mount) mount.outerHTML=html;

  // Wire reset controls (now in DOM)
  const rBtn=document.getElementById('pp-reset-btn');
  const rConf=document.getElementById('pp-reset-confirm');
  const rYes=document.getElementById('pp-reset-yes');
  const rNo=document.getElementById('pp-reset-no');
  if(rBtn) rBtn.addEventListener('click',()=>{rBtn.style.display='none';rConf.style.display='block';});
  if(rNo)  rNo.addEventListener('click',()=>{rConf.style.display='none';rBtn.style.display='flex';});
  if(rYes) rYes.addEventListener('click',()=>{ppClearSession();location.href='dashboard.html?reset=1';});

  // ── Research banner ───────────────────────────────────────────────────────
  const bn=document.createElement('div');
  bn.className='research-banner portal';
  bn.innerHTML=`<strong>Not a real business</strong> The Pilot Program is a simulated brand for UX research purposes only. No real bookings, clients, or payments exist here.`;
  document.body.appendChild(bn);
})();
