/* index.html (raetim 메인) */

/* DISCOGRAPHY 캐러셀: albums-data.js 에서 자동 생성 (최신 발매일 순) */
(function () {
  var box = document.getElementById('discoScroll');
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  box.innerHTML = window.ALBUMS.slice()
    .sort(function (a, b) { return b.date.localeCompare(a.date); })
    .map(function (a) {
      return '<a class="gallery-item disco-item" href="album.html?id=' + encodeURIComponent(a.id) + '">' +
        '<div class="thumb"><img src="' + esc(a.cover) + '" alt="' + esc(a.title) + '">' +
        '<div class="thumb-gradient"></div>' +
        '<div class="thumb-cap"><span class="thumb-date">' + esc(a.format) + '</span>' +
        '<span class="thumb-title">' + esc(a.title) + '</span></div></div></a>';
    }).join('');
})();

/* VIDEO: 가장 최신 비디오 1개 */
(function () {
  var box = document.getElementById('videoLatest');
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var v = window.VIDEOS.slice().sort(function (a, b) { return b.date.localeCompare(a.date); })[0];
  if (!v) { box.parentNode.style.display = 'none'; return; }
  box.innerHTML = '<a class="gallery-item" href="' + esc(v.link) + '" target="_blank" rel="noopener">' +
    '<div class="thumb"><img src="' + esc(v.image) + '" alt="' + esc(v.title) + '">' +
    '<div class="thumb-gradient"></div>' +
    '<div class="thumb-cap"><span class="thumb-date">' + esc(v.date) + '</span>' +
    '<span class="thumb-title">' + esc(v.title) + '</span></div></div></a>';
})();

initCarousel('newsScroll', 'newsDashes');
initCarousel('discoScroll', 'discoDashes');

const modal = document.getElementById('itemModal');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.news-item').forEach(item => {
  // 링크(href)가 있는 뉴스 아이템은 바로 이동하므로 모달을 띄우지 않음
  if (item.tagName === 'A' && item.getAttribute('href')) return;
  item.addEventListener('click', () => {
    modalTitle.textContent = item.dataset.title || '';
    modalDate.textContent = item.dataset.date || '';
    modalDesc.textContent = item.dataset.desc || '';
    modalDesc.style.display = item.dataset.desc ? '' : 'none';
    modal.classList.add('open');
  });
});
modalClose.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

/* ------------------------------------------------------------
   인트로 → 내용 전환 (큰 이미지가 위로 걷히며 내용이 올라옴 / 맨 위에서 위로 스크롤하면 다시 인트로)
------------------------------------------------------------ */
(function () {
  var body = document.body;
  var scroller = document.querySelector('.scroll-wrap');
  var intro = document.getElementById('intro');
  if (!scroller || !intro) return;

  var state = 'hero';          /* hero | content */
  var busy = false;
  var lastScroll = 0;
  var DUR = 950;

  function lock() { busy = true; setTimeout(function () { busy = false; }, DUR + 150); }

  function enter(after) {
    if (state === 'content' || busy) return;
    state = 'content';
    lock();
    body.classList.add('in-content');
    setTimeout(function () { scroller.style.overflowY = 'auto'; if (after) after(); }, DUR);
  }

  function leave() {
    if (state === 'hero' || busy) return;
    state = 'hero';
    lock();
    scroller.style.overflowY = '';
    scroller.scrollTop = 0;
    body.classList.remove('in-content');
  }

  function scrollToId(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
    scroller.scrollTo({ top: Math.max(0, top - 24), behavior: 'smooth' });
  }

  scroller.addEventListener('scroll', function () { lastScroll = Date.now(); }, { passive: true });

  window.addEventListener('wheel', function (e) {
    if (busy) { e.preventDefault(); return; }
    if (state === 'hero') {
      e.preventDefault();
      if (e.deltaY > 8) enter();
    } else if (e.deltaY < -8 && scroller.scrollTop <= 0 && Date.now() - lastScroll > 250) {
      e.preventDefault();
      leave();
    }
  }, { passive: false });

  var ty = 0, startedAtTop = false;
  window.addEventListener('touchstart', function (e) {
    ty = e.touches[0].clientY;
    startedAtTop = scroller.scrollTop <= 0;
  }, { passive: true });
  window.addEventListener('touchend', function (e) {
    if (busy) return;
    var dy = e.changedTouches[0].clientY - ty;
    if (state === 'hero' && dy < -40) enter();
    else if (state === 'content' && startedAtTop && dy > 70 && scroller.scrollTop <= 0) leave();
  }, { passive: true });

  window.addEventListener('keydown', function (e) {
    var down = ['ArrowDown', 'PageDown', ' ', 'End'].indexOf(e.key) >= 0;
    var up = ['ArrowUp', 'PageUp', 'Home'].indexOf(e.key) >= 0;
    if (state === 'hero' && down) { e.preventDefault(); enter(); }
    else if (state === 'content' && up && scroller.scrollTop <= 0) { e.preventDefault(); leave(); }
  });

  /* 사이드바/모바일 메뉴의 #주소 링크 */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    e.preventDefault();
    if (!id) {                               /* 로고: 인트로로 돌아가기 */
      if (state === 'content') { scroller.scrollTop = 0; leave(); }
      return;
    }
    if (state === 'hero') enter(function () { scrollToId(id); });
    else scrollToId(id);
  });

  /* 다른 페이지에서 index.html#news 처럼 들어온 경우: 인트로 없이 바로 내용 */
  if (location.hash.length > 1) {
    body.classList.add('no-anim', 'in-content');
    state = 'content';
    scroller.style.overflowY = 'auto';
    requestAnimationFrame(function () {
      scrollToId(location.hash.slice(1));
      requestAnimationFrame(function () { body.classList.remove('no-anim'); });
    });
  }

  /* 사이드바 현재 위치 표시: NEWS / MUSIC / VIDEO / PROFILE */
  var spy = ['news', 'music', 'video', 'profile'].map(function (n) { return [n, document.getElementById(n)]; });
  function updateSpy() {
    var cur = '';
    if (state === 'content') {
      var line = scroller.getBoundingClientRect().top + window.innerHeight * 0.4;
      spy.forEach(function (s) { if (s[1] && s[1].getBoundingClientRect().top <= line) cur = s[0]; });
      if (!cur) cur = 'news';
    }
    document.querySelectorAll('.side-link[href^="#"]').forEach(function (a) {
      a.classList.toggle('is-current', a.getAttribute('href') === '#' + cur);
    });
  }
  scroller.addEventListener('scroll', updateSpy, { passive: true });
  new MutationObserver(updateSpy).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  updateSpy();
})();
