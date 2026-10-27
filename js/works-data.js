
// raetim / raemin2scence 작업물 데이터
// MV, ILLUST 탭과 raemin2scence 메인 페이지 하단 아카이브가 이 파일 하나를 같이 사용합니다.
// 새 작업물을 추가하려면 아래 WORKS 배열에 객체 하나를 더 넣어주세요.
// type: "mv" 또는 "illust"
window.WORKS = [
  {
    type: "mv",
    title: "남겨진 질문 (Unanswered)",
    date: "2026.10.08",
    link: "https://www.youtube.com/watch?v=85y_rj9x7-s",
    image: "images/thumb-unanswered.jpg"
  },
  {
    type: "mv",
    title: "새야 (Birds)",
    date: "2026.10.08",
    link: "https://youtu.be/O1F0fBXNkLs?si=iqzYcG6KrRinkM3H",
    image: "images/thumb-birds.jpg"
  },
  {
    type: "illust",
    title: "수박을 먹자",
    date: "2026.08.04",
    link: "https://www.instagram.com/p/Dbnu_rAu5mn/?stkn=MWwzeTA3ODE4eTlqMw==",
    image: "images/thumb-watermelon.jpg"
  },
  {
    type: "illust",
    title: "잠을 쫓아다니다가",
    date: "2026.09.09",
    link: "https://www.instagram.com/p/DdD-V8dAi6z/?stkn=M2E2MjFvanE1NTg2",
    image: "images/thumb-sleep.jpg"
  }
];

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
