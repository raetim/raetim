/* 가로 캐러셀: 화살표 버튼 + 하단 인디케이터
   사용법: initCarousel(스크롤영역 id, 점 영역 id)  (index, raemin2scence 에서 사용) */
window.initCarousel = function (scrollId, dashesId) {
  const scroll = document.getElementById(scrollId);
  const dashesWrap = document.getElementById(dashesId);
  if (!scroll) return;
  const items = scroll.querySelectorAll('.gallery-item');
  const prevBtn = document.querySelector('.car-btn.prev[data-target="' + scrollId + '"]');
  const nextBtn = document.querySelector('.car-btn.next[data-target="' + scrollId + '"]');

  if (items.length === 0) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }

  items.forEach((_, i) => {
    const dash = document.createElement('span');
    dash.className = 'dash' + (i === 0 ? ' active' : '');
    dashesWrap.appendChild(dash);
  });
  const dashes = dashesWrap.querySelectorAll('.dash');

  function step() {
    const item = items[0];
    const style = getComputedStyle(scroll);
    const gap = parseFloat(style.columnGap || style.gap || '0');
    return item.getBoundingClientRect().width + gap;
  }

  function updateButtons() {
    const maxScroll = scroll.scrollWidth - scroll.clientWidth - 2;
    if (prevBtn) prevBtn.disabled = scroll.scrollLeft <= 2;
    if (nextBtn) nextBtn.disabled = scroll.scrollLeft >= maxScroll;
  }

  function updateDashes() {
    const s = step();
    const idx = s > 0 ? Math.round(scroll.scrollLeft / s) : 0;
    dashes.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => scroll.scrollBy({ left: -step(), behavior: 'smooth' }));
  if (nextBtn) nextBtn.addEventListener('click', () => scroll.scrollBy({ left: step(), behavior: 'smooth' }));

  scroll.addEventListener('scroll', () => {
    updateButtons();
    updateDashes();
  });

  updateButtons();
  updateDashes();
};
