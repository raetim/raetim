/* news.html : news-data.js 의 전체 소식을 최신순으로 보여줍니다 (캐러셀에서 내려도 여기엔 남음) */
(function () {
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  document.title = 'raetim';
  document.getElementById('newsGrid').innerHTML = window.NEWS.slice()
    .sort(function (a, b) { return b.date.localeCompare(a.date); })
    .map(function (n) {
      return '<a class="archive-item" href="' + esc(n.link) + '" target="_blank" rel="noopener">' +
        '<div class="thumb"><img src="' + esc(n.image) + '" alt="' + esc(n.title) + '">' +
        '<div class="thumb-gradient"></div>' +
        '<div class="thumb-cap"><span class="thumb-date">' + esc(n.date) + '</span>' +
        '<span class="thumb-title">' + esc(n.title) + '</span></div></div></a>';
    }).join('');
})();
