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
      ['mv', 'works.html?type=mv', ''],
      ['illust', 'works.html?type=illust', ''],
      ['@raetim', 'index.html', 'menu-raetim']
    ]
  };

  /* raetim 사이트 우측 하단 고정 SNS */
  var SNS = [
    {href:'https://youtube.com/@raetim', label:'YouTube', ext:true, svg:'M22 12s0-3.2-.4-4.7a2.8 2.8 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.8 2.8 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.8 2.8 0 0 0 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.8 2.8 0 0 0 2-2C22 15.2 22 12 22 12zM10 15.5v-7l6 3.5-6 3.5z'},
    {href:'https://instagram.com/r.ae.t.im', label:'Instagram', ext:true, svg:'M12 2c2.7 0 3 .01 4.1.06 1.1.05 1.8.22 2.4.46.6.24 1.1.56 1.6 1.06.5.5.82 1 1.06 1.6.24.6.41 1.3.46 2.4.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1.1-.22 1.8-.46 2.4a4.3 4.3 0 0 1-1.06 1.6c-.5.5-1 .82-1.6 1.06-.6.24-1.3.41-2.4.46-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1.1-.05-1.8-.22-2.4-.46a4.3 4.3 0 0 1-1.6-1.06 4.3 4.3 0 0 1-1.06-1.6c-.24-.6-.41-1.3-.46-2.4C2.01 15 2 14.7 2 12s.01-3 .06-4.1c.05-1.1.22-1.8.46-2.4.24-.6.56-1.1 1.06-1.6.5-.5 1-.82 1.6-1.06.6-.24 1.3-.41 2.4-.46C9 2.01 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z'},
    {href:'mailto:raetim@naver.com', label:'Email', ext:false, svg:'M2 6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6zm2 0l8 6 8-6H4zm0 2.4V18h16V8.4l-8 6-8-6z'}
  ];

  var items = MENUS[site].slice();
  if (isHome) {
    items.shift();                                  /* 메인 페이지에서는 main 숨김 */
    if (site === 'raetim') items[1][1] = '#discography';   /* 같은 페이지 안에서 이동 */
  }

  var html = '';
  if (site === 'raetim') {
    html += '<div class="site-bg"></div>';
    html += '<div class="side-social">' + SNS.map(function (s) {
      return '<a href="' + s.href + '" aria-label="' + s.label + '"' +
        (s.ext ? ' target="_blank" rel="noopener"' : '') +
        '><svg viewBox="0 0 24 24"><path d="' + s.svg + '"/></svg></a>';
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
