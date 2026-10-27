  document.querySelectorAll('.track-head').forEach(head => {
    head.addEventListener('click', () => {
      const credits = document.getElementById(head.dataset.track);
      const isOpen = credits.classList.toggle('open');
      head.classList.toggle('open', isOpen);
    });
  });
