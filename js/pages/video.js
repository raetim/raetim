/* video.html : videos-data.js 의 전체 비디오를 최신순으로 보여줍니다 */
(function () {
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  document.title = 'raetim';
  document.getElementById('videoGrid').innerHTML = window.VIDEOS.slice()
    .sort(function (a, b) { return b.date.localeCompare(a.date); })
    .map(function (v) {
      return '<a class="archive-item" href="' + esc(v.link) + '" target="_blank" rel="noopener">' +
        '<div class="thumb"><img src="' + esc(v.image) + '" alt="' + esc(v.title) + '">' +
        '<div class="thumb-gradient"></div>' +
        '<div class="thumb-cap"><span class="thumb-date">' + esc(v.date) + '</span>' +
        '<span class="thumb-title">' + esc(v.title) + '</span></div></div></a>';
    }).join('');
})();
