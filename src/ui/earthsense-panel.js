import { displayEventTitle } from './event-title.js';

const statusLabels = {
  idle: 'Chờ tải', loading: 'Đang kết nối', success: 'Đã cập nhật', ready: 'Đã cập nhật', live: 'Đã cập nhật',
  error: 'Tạm không khả dụng', stale: 'Bộ nhớ đệm', partial: 'Một số nguồn không khả dụng', simulated: 'Mô phỏng', empty: 'Chưa có sự kiện',
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function clockTime(value) {
  const date = new Date(value);
  return value && Number.isFinite(date.getTime())
    ? date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'Chưa cập nhật';
}

/** DOM-only observation controls. Data loading and scene visibility belong to EarthSense. */
export function createEarthSensePanel({ layers, onModeChange, onToggle, onRefresh, onSelect, onReturnEarth }) {
  const switcher = element('nav', 'earthsense-mode-switch ui');
  switcher.id = 'earthsense-mode-switch';
  switcher.setAttribute('aria-label', 'Chế độ khám phá');
  const modeButtons = ['universe', 'earthsense'].map((mode, index) => {
    const button = element('button', '', index ? 'Cảm nhận Trái Đất' : 'Du hành vũ trụ');
    button.type = 'button';
    button.dataset.mode = mode;
    button.setAttribute('aria-pressed', String(!index));
    button.onclick = () => onModeChange(mode);
    switcher.append(button);
    return button;
  });
  const panel = element('aside', 'earthsense-panel ui');
  panel.id = 'earthsense-panel';
  panel.inert = true;
  panel.setAttribute('aria-hidden', 'true');
  panel.setAttribute('aria-label', 'Lớp dữ liệu và sự kiện Cảm nhận Trái Đất');
  const eyebrow = element('div', 'eyebrow', '+ EARTHSENSE');
  const titleRow = element('div', 'earthsense-title-row');
  const title = element('h1', '', 'Cảm nhận Trái Đất');
  const refresh = element('button', 'earthsense-refresh', '↻');
  refresh.type = 'button';
  refresh.id = 'earthsense-refresh';
  refresh.setAttribute('aria-label', 'Làm mới dữ liệu Trái Đất');
  refresh.title = 'Làm mới dữ liệu công khai';
  refresh.onclick = () => onRefresh();
  titleRow.append(title, refresh);
  const subtitle = element('p', 'earthsense-intro', 'Lắng nghe nhịp đập của Trái Đất, thấy thế giới đang chuyển động.');
  const layersElement = element('div', 'earthsense-layers');
  layersElement.setAttribute('aria-label', 'Bật/tắt từng lớp dữ liệu');
  const layerControls = new Map();
  let currentState = { layers: {}, events: [] };
  for (const layer of layers) {
    const button = element('button', 'earthsense-layer');
    button.type = 'button';
    button.dataset.layer = layer.id;
    button.style.setProperty('--layer-color', typeof layer.color === 'number' ? `#${layer.color.toString(16).padStart(6, '0')}` : layer.color);
    button.setAttribute('aria-pressed', 'false');
    const dot = element('i', 'earthsense-layer-dot');
    dot.setAttribute('aria-hidden', 'true');
    const label = element('span', 'earthsense-layer-name', layer.label);
    const count = element('span', 'earthsense-layer-count', '—');
    button.append(dot, label, count);
    button.onclick = () => onToggle(layer.id, !currentState.layers[layer.id]?.enabled);
    layerControls.set(layer.id, { button, count, layer });
    layersElement.append(button);
  }
  const sampling = element('p', 'earthsense-sampling', 'Thời tiết là dữ liệu điểm lấy mẫu · Sét là dữ liệu mô phỏng');
  const returnNotice = element('div', 'earthsense-return');
  const returnText = element('p', '', 'Các lớp dữ liệu đã được thu lại, hãy quay về cận cảnh Trái Đất để tiếp tục quan sát.');
  const returnButton = element('button', '', 'Quay về Trái Đất ↗');
  returnButton.type = 'button';
  returnButton.onclick = () => onReturnEarth();
  returnNotice.append(returnText, returnButton);
  const eventSection = element('details', 'earthsense-events-section');
  eventSection.open = !matchMedia('(max-width: 600px)').matches;
  const summary = element('summary', 'earthsense-events-heading');
  const eventHeading = element('span', '', 'Điểm quan sát và sự kiện');
  const eventCount = element('span', 'earthsense-total', '0');
  summary.append(eventHeading, eventCount);
  const events = element('div', 'earthsense-events');
  events.setAttribute('aria-label', 'Sự kiện của các lớp đang bật');
  const search = element('input', 'earthsense-search');
  search.type = 'search';
  search.placeholder = 'Tìm sự kiện, lớp dữ liệu hoặc nguồn';
  search.setAttribute('aria-label', 'Tìm sự kiện trên Trái Đất');
  search.autocomplete = 'off';
  search.maxLength = 150;
  search.oninput = () => renderEvents(currentState);
  const empty = element('p', 'earthsense-empty');
  const listNote = element('p', 'earthsense-list-note');
  eventSection.append(summary, search, events, empty, listNote);
  const updateStatus = element('p', 'earthsense-update-status');
  updateStatus.setAttribute('role', 'status');
  const tagline = element('p', 'earthsense-tagline', 'Du hành vũ trụ. Cảm nhận Trái Đất.');
  panel.append(eyebrow, titleRow, subtitle, layersElement, sampling, returnNotice, eventSection, updateStatus, tagline);
  document.body.append(switcher, panel);
  const gestureHint = document.querySelector('.gesture-hint span:last-child');
  const liveLabel = document.querySelector('.live');
  const originalGesture = gestureHint?.textContent;
  const originalLiveNodes = liveLabel ? [...liveLabel.childNodes].map(child => child.cloneNode(true)) : [];
  const universeControls = [...document.querySelectorAll('.info-panel, .planet-dock, .time-control, .layer-toggles')]
    .map(node => ({ node, inert: node.inert, ariaHidden: node.getAttribute('aria-hidden') }));
  let displayedMode = null;
  let listSignature = '';

  function restoreUniverseControls() {
    for (const { node, inert, ariaHidden } of universeControls) {
      node.inert = inert;
      if (ariaHidden === null) node.removeAttribute('aria-hidden');
      else node.setAttribute('aria-hidden', ariaHidden);
    }
  }

  function renderEvents(state) {
    const query = search.value.trim().toLocaleLowerCase();
    const order = { typhoon: 0, lightning: 1, weather: 2 };
    const enabledEvents = (state.events || []).filter(event => state.layers[event.layer]?.enabled)
      .sort((a, b) => (order[a.layer] ?? 3) - (order[b.layer] ?? 3));
    const visibleEvents = enabledEvents.filter(event => !query || [event.title, displayEventTitle(event.title), event.layer, event.source, layerControls.get(event.layer)?.layer.label].join(' ').toLocaleLowerCase().includes(query));
    const activeLayers = Object.values(state.layers).filter(info => info.enabled);
    const unavailable = activeLayers.length > 0 && activeLayers.every(info => ['error', 'stale', 'partial'].includes(info.status));
    const signature = JSON.stringify([visibleEvents.map(event => [event.id, event.title, event.time, event.severity]), state.loading, query, unavailable]);
    if (signature === listSignature) return;
    listSignature = signature;
    eventCount.textContent = query ? `${visibleEvents.length} / ${enabledEvents.length}` : String(visibleEvents.length);
    events.replaceChildren();
    for (const event of visibleEvents.slice(0, 50)) {
      const row = element('button', 'earthsense-event');
      row.type = 'button';
      row.dataset.eventId = event.id;
      row.title = event.title;
      const layer = layerControls.get(event.layer)?.layer;
      const meta = element('span', 'earthsense-event-meta', `${layer?.label || event.layer} · ${event.source || 'Dữ liệu công khai'}`);
      const name = element('span', 'earthsense-event-name', displayEventTitle(event.title) || 'Sự kiện chưa đặt tên');
      const arrow = element('span', 'earthsense-event-arrow', '↗');
      arrow.setAttribute('aria-hidden', 'true');
      row.append(meta, name, arrow);
      row.onclick = () => onSelect(event);
      events.append(row);
    }
    empty.hidden = visibleEvents.length > 0;
    empty.textContent = state.loading ? 'Đang kết nối với nguồn dữ liệu công khai…' : unavailable && !enabledEvents.length ? 'Dữ liệu hiện tạm không khả dụng, vui lòng làm mới để thử lại.' : query ? 'Không có sự kiện phù hợp. Hãy đổi từ khóa hoặc bật lớp dữ liệu khác.' : 'Các lớp đang bật hiện chưa có sự kiện. Hãy bật lớp khác hoặc làm mới sau.';
    listNote.hidden = visibleEvents.length <= 50;
    listNote.textContent = 'Hiển thị 50 sự kiện đầu tiên · Các sự kiện còn lại có thể xem bằng cách nhấp trên Trái Đất';
  }

  function update(state) {
    currentState = { ...state, layers: state.layers || {}, events: state.events || [] };
    document.body.classList.toggle('earthsense-active', !!state.active);
    if (displayedMode !== !!state.active) {
      displayedMode = !!state.active;
      const outgoing = state.active ? universeControls.map(({ node }) => node) : [panel];
      if (outgoing.some(node => node.contains(document.activeElement))) {
        modeButtons.find(button => (button.dataset.mode === 'earthsense') === !!state.active)
          ?.focus({ preventScroll: true });
      }
      // Keep both trees mounted so CSS can reverse a transition immediately.
      // Inactive trees stop receiving pointer and keyboard input at once.
      panel.inert = !state.active;
      panel.setAttribute('aria-hidden', String(!state.active));
      if (state.active) for (const { node } of universeControls) {
        node.inert = true;
        node.setAttribute('aria-hidden', 'true');
      }
      else restoreUniverseControls();
      if (gestureHint) gestureHint.textContent = state.active ? 'Nhấp vào sự kiện trên Trái Đất' : originalGesture;
      if (liveLabel) {
        liveLabel.replaceChildren(...originalLiveNodes.map(child => child.cloneNode(true)));
        if (state.active) liveLabel.replaceChildren(element('i'), document.createTextNode('Quan sát bề mặt'));
      }
    }
    modeButtons.forEach(button => button.setAttribute('aria-pressed', String((button.dataset.mode === 'earthsense') === !!state.active)));
    if (!state.active) return;
    returnNotice.hidden = state.visible !== false;
    panel.classList.toggle('earthsense-away', state.visible === false);
    refresh.disabled = !!state.loading;
    for (const [id, { button, count, layer }] of layerControls) {
      const info = currentState.layers[id] || {};
      button.setAttribute('aria-pressed', String(!!info.enabled));
      const status = statusLabels[info.status] || info.status || 'Đang tải';
      count.textContent = info.status === 'loading' ? '…' : info.status === 'error' && !info.count ? '!' : String(info.count ?? '—');
      button.classList.toggle('has-error', ['error', 'stale', 'partial'].includes(info.status));
      button.title = `${layer.label} · ${status}${info.error ? ' · ' + info.error : ''}`;
      button.setAttribute('aria-label', `${layer.label}${id === 'lightning' ? ' (mô phỏng)' : ''}: ${info.enabled ? 'đang bật' : 'đang tắt'}, ${status}, ${info.count ?? 0} điểm`);
    }
    const failures = Object.entries(currentState.layers).filter(([, info]) => info.enabled && ['error', 'stale', 'partial'].includes(info.status));
    updateStatus.textContent = state.loading ? 'Đang đồng bộ dữ liệu công khai…' : failures.length ? `${failures.length} lớp dữ liệu chưa đầy đủ hoặc đang dùng bộ nhớ đệm · Có thể làm mới để thử lại` : `Cập nhật lúc ${clockTime(state.updatedAt)} · Nhấp vào mây hoặc danh sách để xem`;
    renderEvents(currentState);
  }
  return { update, dispose() {
    panel.remove(); switcher.remove(); document.body.classList.remove('earthsense-active');
    restoreUniverseControls();
    if (gestureHint) gestureHint.textContent = originalGesture;
    liveLabel?.replaceChildren(...originalLiveNodes);
  } };
}
