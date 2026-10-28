// Crossfade slider shared by Dashboard and Examples. Styling lives in the markup (data-[active=…] variants);
// this only flips data-active.
// Root: [data-slider] with data-autoplay="true|false" and data-interval (ms). Inside it:
//   [data-slide="i"]  every element that belongs to slide i (screenshot, caption, title…)
//   [data-tab="i"]    optional tab buttons; [data-progress] > div inside a tab is its progress bar
//   [data-prev] [data-next] [data-counter]  optional
// Hover or focus inside pauses autoplay; reduced motion turns it off.
for (const root of document.querySelectorAll<HTMLElement>('[data-slider]')) {
  const slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
  const tabs = [...root.querySelectorAll<HTMLElement>('[data-tab]')];
  const counter = root.querySelector<HTMLElement>('[data-counter]');
  const count = new Set(slides.map((s) => s.dataset.slide)).size;
  const interval = Number(root.dataset.interval) || 6000;
  const autoplay = root.dataset.autoplay === 'true' && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (n: number) => String(n).padStart(2, '0');
  let cur = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let paused = false;

  const bar = () => root.querySelector<HTMLElement>(`[data-tab="${cur}"] [data-progress] > div`);
  const restartBar = () => {
    const b = bar();
    if (!b) return;
    b.style.animation = 'none';
    void b.offsetWidth;
    b.style.animation = '';
  };
  const show = (i: number) => {
    cur = (i + count) % count;
    for (const s of slides) {
      const on = s.dataset.slide === String(cur);
      s.dataset.active = String(on);
      s.inert = !on;
    }
    for (const t of tabs) {
      const on = t.dataset.tab === String(cur);
      t.dataset.active = String(on);
      t.setAttribute('aria-pressed', String(on));
    }
    if (counter) counter.textContent = pad(cur + 1) + ' / ' + pad(count);
    restartBar();
  };
  const schedule = () => {
    clearTimeout(timer);
    if (!autoplay) return;
    timer = setTimeout(() => {
      if (paused) return;
      show(cur + 1);
      schedule();
    }, interval);
  };
  const go = (i: number) => {
    paused = false;
    show(i);
    schedule();
  };
  const pause = () => {
    clearTimeout(timer);
    paused = true;
    const b = bar();
    if (b) b.style.animationPlayState = 'paused';
  };
  const resume = () => {
    paused = false;
    restartBar();
    schedule();
  };

  for (const t of tabs) t.addEventListener('click', () => go(Number(t.dataset.tab)));
  root.querySelector('[data-prev]')?.addEventListener('click', () => go(cur - 1));
  root.querySelector('[data-next]')?.addEventListener('click', () => go(cur + 1));
  root.addEventListener('mouseenter', pause);
  root.addEventListener('mouseleave', resume);
  root.addEventListener('focusin', pause);
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget as Node | null)) resume();
  });
  show(0);
  schedule();
}
