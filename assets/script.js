const root = document.documentElement;
const cards = document.querySelectorAll('.feature-card, .stat');
const modeToggle = document.getElementById('mode-toggle');
const pulseButton = document.getElementById('pulse');
const previewGlow = document.querySelector('.preview__glow');
let neonMode = false;

function handleTilt(event, card) {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -6;
  const rotateY = ((x - centerX) / centerX) * 6;

  card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  card.style.borderColor = 'rgba(255, 255, 255, 0.3)';
}

function resetTilt(card) {
  card.style.transform = '';
  card.style.borderColor = 'var(--border)';
}

cards.forEach((card) => {
  card.addEventListener('pointermove', (e) => handleTilt(e, card));
  card.addEventListener('pointerleave', () => resetTilt(card));
});

modeToggle?.addEventListener('click', () => {
  neonMode = !neonMode;
  root.style.setProperty('--bg', neonMode ? '#05070f' : '#040510');
  root.style.setProperty('--primary', neonMode ? '#6ef1ff' : '#8c7bff');
  root.style.setProperty('--accent', neonMode ? '#7effc1' : '#f365d5');
  document.body.classList.toggle('neon-mode', neonMode);
  modeToggle.textContent = neonMode ? '返回原始' : '切换能量';
});

pulseButton?.addEventListener('click', () => {
  previewGlow.classList.add('pulse-once');
  setTimeout(() => previewGlow.classList.remove('pulse-once'), 800);
});

const railGlow = document.querySelector('.rail__content');
railGlow?.addEventListener('pointermove', (event) => {
  const rect = railGlow.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  railGlow.style.setProperty('--mouse-x', `${x}%`);
  railGlow.style.background = `linear-gradient(130deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)), radial-gradient(circle at ${x}% 50%, rgba(93, 208, 255, 0.22), rgba(140, 123, 255, 0))`;
});

window.addEventListener('pointermove', (event) => {
  root.style.setProperty('--cursor-x', `${event.clientX}px`);
  root.style.setProperty('--cursor-y', `${event.clientY}px`);
});
