import { TRAJECTORY_DEFINITIONS } from '../universe/motion-trajectories.js';

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/** Controls for the shared Sun/planet trajectory view; no separate simulation. */
export function createTrajectoryPanel({ world, navigation }) {
  const panel = element('section', 'trajectory-panel');
  panel.id = 'trajectory-panel';
  panel.inert = true;
  panel.setAttribute('aria-hidden', 'true');
  panel.setAttribute('aria-label', 'Cài đặt quỹ đạo chuyển động');
  const controls = element('div', 'trajectory-controls');

  function segment(label, options, onChange) {
    const group = element('div', 'trajectory-segment');
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', label);
    const buttons = options.map(([value, text, description]) => {
      const button = element('button', '', text);
      button.type = 'button';
      button.dataset.value = value;
      button.title = description;
      button.setAttribute('aria-pressed', 'false');
      button.onclick = () => {
        onChange(value);
        update();
      };
      group.append(button);
      return button;
    });
    controls.append(group);
    return buttons;
  }

  const referenceButtons = segment('Hệ quy chiếu của quỹ đạo', [
    ['galactic', 'Theo Ngân Hà', 'Quan sát đồng thời chuyển động tổng thể của Hệ Mặt Trời và sự quay quanh của các hành tinh'],
    ['solar', 'Theo Mặt Trời', 'Bám theo Mặt Trời để so sánh chuyển động quay quanh của tám hành tinh'],
  ], value => world.motionTrajectories?.setReferenceFrame(value));
  const lengthButtons = segment('Độ dài vệt quỹ đạo', [
    ['short', 'Vệt ngắn', 'Giữ vệt quỹ đạo ngắn hơn để hình ảnh rõ ràng'],
    ['long', 'Vệt dài', 'Hiển thị một đoạn chuyển động dài hơn'],
  ], value => world.motionTrajectories?.setTrailLength(value));

  const actions = element('div', 'trajectory-actions');
  const reset = element('button', '', 'Đặt lại góc nhìn');
  reset.type = 'button';
  reset.title = 'Quay về toàn cảnh quỹ đạo chuyển động';
  reset.onclick = () => navigation.flyTo('trajectory');
  const back = element('button', 'trajectory-back', 'Quay về Hệ Mặt Trời ↗');
  back.type = 'button';
  back.onclick = () => navigation.flyTo('solar');
  actions.append(reset, back);
  controls.append(actions);

  const legend = element('div', 'trajectory-legend');
  legend.setAttribute('aria-label', 'Màu quỹ đạo của tám hành tinh');
  for (const body of TRAJECTORY_DEFINITIONS.filter(body => body.id !== 'sun')) {
    const item = element('span', 'trajectory-legend-item');
    const swatch = element('i');
    swatch.setAttribute('aria-hidden', 'true');
    swatch.style.setProperty('--trajectory-color', `#${body.color.toString(16).padStart(6, '0')}`);
    item.append(swatch, element('span', '', body.vi));
    legend.append(item);
  }

  const note = element('div', 'trajectory-note');
  const intro = element('p', 'trajectory-intro', 'Chuyển động quay quanh cộng với chuyển động tổng thể của Hệ Mặt Trời · Thời gian và khoảng cách được nén để minh họa');
  const explanation = element('details', 'trajectory-explanation');
  const summary = element('summary', '', 'Giải thích');
  const content = element('div', 'trajectory-explanation-content');
  content.append(element('p', '', 'Hệ quy chiếu Ngân Hà cộng thêm chuyển động tổng thể của Hệ Mặt Trời; hệ quy chiếu Mặt Trời bám theo Mặt Trời, giúp dễ so sánh chuyển động quay quanh của các hành tinh. Tạm dừng và tốc độ thời gian dùng chung các nút điều khiển phía trên.'));
  const source = element('a', '', 'NASA · Quỹ đạo và chuyển động của Mặt Trời ↗');
  source.href = 'https://science.nasa.gov/sun/facts/';
  source.target = '_blank';
  source.rel = 'noopener noreferrer';
  source.setAttribute('aria-label', 'NASA: Quỹ đạo và chuyển động của Mặt Trời (mở trong thẻ mới)');
  content.append(source);
  explanation.append(summary, content);
  note.append(intro, explanation);
  panel.append(controls, legend, note);

  const footer = document.querySelector('.bottom-ui');
  if (footer) footer.append(panel);
  else {
    panel.classList.add('trajectory-panel-floating');
    document.body.append(panel);
  }
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape' && explanation.open) {
      explanation.open = false;
      summary.focus({ preventScroll: true });
      event.stopPropagation();
    }
  });

  const orbitControls = ['toggle-orbits', 'toggle-labels'].map(id => document.getElementById(id))
    .filter(Boolean).map(node => ({ node, inert: node.inert, ariaHidden: node.getAttribute('aria-hidden') }));
  function restoreOrbitControls() {
    for (const { node, inert, ariaHidden } of orbitControls) {
      node.inert = inert;
      if (ariaHidden === null) node.removeAttribute('aria-hidden');
      else node.setAttribute('aria-hidden', ariaHidden);
    }
  }

  let lastActive = null, lastVisible = null, disposed = false;
  function update() {
    if (disposed) return;
    const active = navigation.getState().stage === 'trajectory';
    const observingEarth = document.body.classList.contains('earthsense-active');
    const visible = active && !observingEarth;
    document.body.classList.toggle('trajectory-active', active);
    if (active !== lastActive) {
      lastActive = active;
      if (active) {
        if (orbitControls.some(({ node }) => node.contains(document.activeElement))) {
          document.getElementById('toggle-trajectories')?.focus({ preventScroll: true });
        }
        for (const { node } of orbitControls) {
          node.inert = true;
          node.setAttribute('aria-hidden', 'true');
        }
      } else restoreOrbitControls();
    }
    if (visible !== lastVisible) {
      lastVisible = visible;
      if (!visible && panel.contains(document.activeElement)) {
        const focusTarget = observingEarth
          ? document.querySelector('[data-mode="earthsense"]')
          : document.getElementById('toggle-trajectories');
        focusTarget?.focus({ preventScroll: true });
      }
      panel.inert = !visible;
      panel.setAttribute('aria-hidden', String(!visible));
      if (!visible) explanation.open = false;
    }
    if (!visible) return;
    const controller = world.motionTrajectories;
    const state = controller?.getState() || {};
    for (const button of referenceButtons) {
      button.disabled = !controller;
      button.setAttribute('aria-pressed', String(button.dataset.value === (state.referenceFrame || 'galactic')));
    }
    for (const button of lengthButtons) {
      button.disabled = !controller;
      button.setAttribute('aria-pressed', String(button.dataset.value === (state.trailLength || 'short')));
    }
  }

  update();
  return {
    update,
    dispose() {
      if (disposed) return;
      disposed = true;
      panel.remove();
      document.body.classList.remove('trajectory-active');
      restoreOrbitControls();
    },
  };
}
