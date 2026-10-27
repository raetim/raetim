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
