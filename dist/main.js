const intro = document.getElementById('intro');
const openSurprise = document.getElementById('open-surprise');
const pageBehindIntro = document.querySelectorAll('.site-header, main, footer');
pageBehindIntro.forEach((element) => { element.inert = true; });

openSurprise.addEventListener('click', () => {
  openSurprise.disabled = true;
  intro.classList.add('is-opening');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    intro.classList.add('is-revealing');
    window.setTimeout(() => {
      intro.hidden = true;
      document.body.classList.remove('is-locked');
      pageBehindIntro.forEach((element) => { element.inert = false; });
      window.scrollTo(0, 0);
      document.getElementById('hero-title').focus({ preventScroll: true });
    }, reducedMotion ? 0 : 550);
  }, reducedMotion ? 0 : 850);
});

const photoDialog = document.getElementById('photo-dialog');
const dialogImage = document.getElementById('dialog-image');
const dialogCaption = document.getElementById('dialog-caption');

document.querySelectorAll('[data-photo]').forEach((button) => {
  button.addEventListener('click', () => {
    dialogImage.src = button.dataset.photo;
    dialogImage.alt = button.querySelector('img').alt;
    dialogCaption.textContent = button.dataset.caption;
    photoDialog.showModal();
  });
});

document.getElementById('close-photo').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', (event) => {
  if (event.target === photoDialog) photoDialog.close();
});

document.getElementById('celebrate-button').addEventListener('click', (event) => {
  const box = event.currentTarget.getBoundingClientRect();
  const colors = ['#d86970', '#e9a15b', '#f2c86a', '#bc8ca7', '#f7e8d5'];
  for (let i = 0; i < 42; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${box.left + box.width / 2}px`;
    piece.style.top = `${box.top + box.height / 2}px`;
    piece.style.backgroundColor = colors[i % colors.length];
    piece.style.setProperty('--x', `${(Math.random() - 0.5) * 440}px`);
    piece.style.setProperty('--y', `${-80 - Math.random() * 220}px`);
    piece.style.setProperty('--rotate', `${Math.random() * 720 - 360}deg`);
    piece.style.animationDelay = `${Math.random() * 120}ms`;
    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
  }
});
