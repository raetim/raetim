/* 작품 목록(works-data.js)을 2열 그리드로 그려주는 함수 */
// containerId: 렌더링할 그리드의 id
// filterType: "mv" | "illust" | null(전체, raemin2scence 메인 아카이브용)
window.renderWorks = function(containerId, filterType) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var items = window.WORKS.slice();
  if (filterType) items = items.filter(function(w) { return w.type === filterType; });
  items.sort(function(a, b) { return b.date.localeCompare(a.date); }); // 최신순
  if (items.length === 0) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = items.map(function(w) {
    return '<a class="archive-item" href="' + w.link + '" target="_blank" rel="noopener">' +
      '<div class="thumb">' +
        '<div class="thumb-bg" style="background-image:url(\'' + w.image + '\');"></div>' +
        '<div class="thumb-gradient"></div>' +
        '<div class="thumb-cap">' +
          '<span class="thumb-date">' + w.date + '</span>' +
          '<span class="thumb-title">' + w.title + '</span>' +
        '</div>' +
      '</div>' +
    '</a>';
  }).join('');
};
