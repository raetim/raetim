  // 뉴스 / 디스코그래피 캐러셀: 화살표 버튼 + 하단 인디케이터
  function initCarousel(scrollId, dashesId) {
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
  }

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
