(function(){
  const progressBar = document.getElementById('progressBar');
  function updateProgress(){
    if(!progressBar) return;
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    const scrolled = total > 0 ? (h.scrollTop / total) * 100 : 0;
    progressBar.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateProgress);
  updateProgress();

  const counters = document.querySelectorAll('[data-count]');
  let counterPlayed = false;
  function playCounters(){
    if(counterPlayed || !counters.length) return;
    const hero = document.querySelector('.hero');
    if(!hero) return;
    const rect = hero.getBoundingClientRect();
    if(rect.top < window.innerHeight - 120){
      counters.forEach(el => {
        const target = parseFloat(el.dataset.count);
        const isDecimal = String(el.dataset.count).includes('.');
        let curr = 0;
        const step = target / 30;
        const timer = setInterval(() => {
          curr += step;
          if(curr >= target){
            curr = target;
            clearInterval(timer);
          }
          el.textContent = isDecimal ? curr.toFixed(2) : Math.round(curr);
        }, 25);
      });
      counterPlayed = true;
    }
  }
  window.addEventListener('scroll', playCounters);
  playCounters();

  const reveals = document.querySelectorAll('.reveal');
  if(reveals.length){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('show');
        }
      });
    }, {threshold:0.12});
    reveals.forEach(el => observer.observe(el));
  }

  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const closeModal = document.getElementById('closeModal');
  document.querySelectorAll('[data-preview]').forEach(btn => {
    btn.addEventListener('click', () => {
      if(modal && modalImg){
        modalImg.src = btn.dataset.preview;
        modal.classList.add('show');
      }
    });
  });
  if(closeModal && modal){
    closeModal.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => {
      if(e.target === modal) modal.classList.remove('show');
    });
  }

  const backTop = document.getElementById('backTop');
  function toggleBackTop(){
    if(!backTop) return;
    if(window.scrollY > 380) backTop.classList.add('show');
    else backTop.classList.remove('show');
  }
  window.addEventListener('scroll', toggleBackTop);
  toggleBackTop();
  if(backTop){
    backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }
})();
