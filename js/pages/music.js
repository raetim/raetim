/* music.html : albums-data.js 의 전체 음원을 최신순으로 3열 갤러리로 보여줍니다 */
(function () {
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  document.title = 'raetim';
  document.getElementById('musicGrid').innerHTML = window.ALBUMS.slice()
    .sort(function (a, b) { return b.date.localeCompare(a.date); })
    .map(function (a) {
      return '<a class="archive-item" href="album.html?id=' + encodeURIComponent(a.id) + '">' +
        '<div class="thumb"><img src="' + esc(a.cover) + '" alt="' + esc(a.title) + '">' +
        '<div class="thumb-gradient"></div>' +
        '<div class="thumb-cap"><span class="thumb-date">' + esc(a.format) + '</span>' +
        '<span class="thumb-title">' + esc(a.title) + '</span></div></div></a>';
    }).join('');
})();
