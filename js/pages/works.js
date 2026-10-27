/* works.html : 주소의 type 값에 따라 MV 또는 ILLUST 목록을 보여줍니다.
   works.html?type=mv  /  works.html?type=illust  (type 이 없으면 mv) */
(function () {
  var TITLES = { mv: 'MV', illust: 'ILLUST' };
  var type = new URLSearchParams(location.search).get('type');
  if (!TITLES[type]) type = 'mv';
  document.getElementById('worksTitle').textContent = TITLES[type];
  document.title = 'raemin2scence';
  window.renderWorks('archiveGrid', type);
})();
