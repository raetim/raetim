/* album.html : 주소의 id 값으로 albums-data.js 에서 앨범을 찾아 그려줍니다.
   예) album.html?id=birds */
(function () {
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var id = new URLSearchParams(location.search).get('id');
  var album = window.ALBUMS.filter(function (a) { return a.id === id; })[0] || window.ALBUMS[0];
  var card = document.getElementById('albumCard');
  if (!album) { card.textContent = '앨범을 찾을 수 없습니다.'; return; }

  document.title = 'raetim';
  var html = '<div class="album-cover"><img src="' + esc(album.cover) + '" alt="' + esc(album.title) + '"></div>' +
    '<h1 class="album-title">' + esc(album.title) + '</h1>' +
    '<p class="album-format">' + esc(album.format) + '</p>' +
    '<div class="track-list">';
  album.tracks.forEach(function (t, i) {
    var no = (i + 1 < 10 ? '0' : '') + (i + 1) + '.';
    var credits = (t.credits || []).map(function (p) { return '<p>' + p.map(esc).join('<br>') + '</p>'; }).join('');
    html += '<div class="track">' +
      '<button class="track-head" data-track="track' + (i + 1) + '">' +
        '<span class="track-num">' + no + '</span><span class="track-name">' + esc(t.title) + '</span>' +
        '<span class="track-arrow">&#8250;</span></button>' +
      '<div class="track-credits" id="track' + (i + 1) + '">' + credits + '</div></div>';
  });
  html += '</div><div class="stream-links">' + (album.streaming || []).map(function (s) {
    return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a>';
  }).join('') + '</div>';
  card.innerHTML = html;

  document.querySelectorAll('.track-head').forEach(function (head) {
    head.addEventListener('click', function () {
      var credits = document.getElementById(head.dataset.track);
      var isOpen = credits.classList.toggle('open');
      head.classList.toggle('open', isOpen);
    });
  });
})();
