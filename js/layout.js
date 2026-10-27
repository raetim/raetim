/* ------------------------------------------------------------
   공통 레이아웃 (모든 페이지에서 가장 먼저 불러옵니다)
   - 메뉴 버튼 / 메뉴 패널 / 푸터 / (raetim) 배경 / 우측 하단 SNS 를 한 곳에서 만듭니다.
   - 메뉴 항목이나 SNS 링크를 바꾸려면 아래 MENUS, SNS 만 고치면 됩니다.
   - 각 html 의 <body> 에 아래 두 가지를 적어주세요.
       data-site="raetim" 또는 "raemin"   : 어느 쪽 사이트인지
       data-home                           : 그 사이트의 메인 페이지일 때만 (메뉴의 main 을 숨김)
------------------------------------------------------------ */
(function () {
  var body = document.body;
  var site = body.dataset.site || 'raetim';
  var isHome = body.hasAttribute('data-home');

  /* [이름, 주소, 추가 class] */
  var MENUS = {
    raetim: [
      ['main', 'index.html', ''],
      ['profile', 'profile.html', ''],
      ['discography', 'index.html#discography', ''],
      ['@raemin2scence', 'raemin2scence.html', 'menu-raemin']
    ],
    raemin: [
      ['main', 'raemin2scence.html', ''],
      ['mv', 'works.html?type=mv&v=20261027p', ''],
      ['illust', 'works.html?type=illust&v=20261027p', ''],
      ['@raetim', 'index.html', 'menu-raetim']
    ]
  };

  /* raetim 사이트 우측 하단 고정 SNS */
  var SNS = [
    {href:'https://youtube.com/@raetim', label:'YouTube', ext:true, svg:'<path d="M3.2 7.2Q3.2 5.6 4.8 5.4C9 4.8 15 4.8 19.2 5.4Q20.8 5.6 20.8 7.2L20.8 16.8Q20.8 18.4 19.2 18.6C15 19.2 9 19.2 4.8 18.6Q3.2 18.4 3.2 16.8Z"/><path d="M10 9.4L15 12L10 14.6Z"/>'},
    {href:'https://instagram.com/r.ae.t.im', label:'Instagram', ext:true, svg:'<path d="M7.2 3.5H16.8A3.7 3.7 0 0 1 20.5 7.2V16.8A3.7 3.7 0 0 1 16.8 20.5H7.2A3.7 3.7 0 0 1 3.5 16.8V7.2A3.7 3.7 0 0 1 7.2 3.5Z"/><circle cx="12" cy="12" r="4.1"/><path d="M17 7.1L17.05 7.1"/>'},
    {href:'mailto:raetim@naver.com', label:'Email', ext:false, svg:'<path d="M3.4 5.8H20.6V18.2H3.4Z"/><path d="M3.6 6.4L12 12.8L20.4 6.4"/>'}
  ];

  var items = MENUS[site].slice();
  if (isHome) {
    items.shift();                                  /* 메인 페이지에서는 main 숨김 */
    if (site === 'raetim') items[1][1] = '#discography';   /* 같은 페이지 안에서 이동 */
  }

  var html = '';
  if (site === 'raetim') {
    html += '<div class="site-bg"></div>';
    /* 손그림 같은 거친 가장자리 + 마커가 마른 듯한 질감 */
    html += '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
      '<filter id="snsRough" x="-15%" y="-15%" width="130%" height="130%">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="2" result="warp"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="warp" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter></defs></svg>';
    html += '<div class="side-social">' + SNS.map(function (s) {
      return '<a href="' + s.href + '" aria-label="' + s.label + '"' +
        (s.ext ? ' target="_blank" rel="noopener"' : '') +
        '><svg viewBox="0 0 24 24"><g filter="url(#snsRough)">' + s.svg + '</g></svg></a>';
    }).join('') + '</div>';
  }
  html += '<nav id="siteNav"><button class="menu-btn" id="menuBtn" aria-label="메뉴 열기">' +
    '<span></span><span></span><span></span></button></nav>';
  html += '<div class="menu-panel" id="menuPanel">' + items.map(function (m) {
    return '<a href="' + m[1] + '" class="menu-link' + (m[2] ? ' ' + m[2] : '') + '">' + m[0] + '</a>';
  }).join('') + '</div>';
  body.insertAdjacentHTML('afterbegin', html);

  /* 푸터: 스크롤 영역 맨 아래 */
  var wrap = document.querySelector('.scroll-wrap') || body;
  wrap.insertAdjacentHTML('beforeend',
    '<footer><img class="footer-logo" src="images/footer-logo.png" alt="raetim"></footer>');

  /* 메뉴 동작 */
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  var menuBtn = document.getElementById('menuBtn');
  var menuPanel = document.getElementById('menuPanel');
  function closeMenu() {
    menuPanel.classList.remove('open');
    menuBtn.classList.remove('open');
  }
  menuBtn.addEventListener('click', function () {
    var willOpen = !menuPanel.classList.contains('open');
    menuPanel.classList.toggle('open', willOpen);
    menuBtn.classList.toggle('open', willOpen);
  });
  document.querySelectorAll('.menu-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  menuPanel.addEventListener('click', function (e) {
    if (e.target === menuPanel) closeMenu();
  });
})();
