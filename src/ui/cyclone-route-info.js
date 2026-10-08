const clock = value => {
  const date = new Date(value);
  return value && Number.isFinite(date.getTime())
    ? date.toLocaleString('vi-VN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }) : 'Không có dữ liệu';
};

/** Show the source forecast's dates and provenance alongside its two distinct line styles. */
export function createCycloneRouteInfo() {
  const element = document.createElement('section');
  element.className = 'earthsense-route-info';
  element.setAttribute('aria-label', 'Đường đi và sức gió của bão');

  function line(text, className = '') {
    const item = document.createElement('p');
    item.className = className;
    item.textContent = text;
    element.append(item);
    return item;
  }

  function update(event) {
    element.hidden = event.layer !== 'typhoon';
    element.replaceChildren();
    if (element.hidden) return;
    const wind = event.cyclone;
    if (Number.isFinite(wind?.windSpeedKmh)) {
      const current = wind.windBasis === 'observation';
      line(`${current ? 'Tốc độ gió quan sát theo nguồn' : 'Tốc độ gió cực đại của sự kiện theo nguồn'} · ${wind.windSpeedKmh.toFixed(1)} km/h`, 'earthsense-route-wind');
      if (current && wind.validTime) line(`Thời điểm ghi nhận gió · ${clock(wind.validTime)}`);
    } else line('Nguồn không cung cấp tốc độ gió · Hệ mây dùng kích thước minh họa mặc định');

    const data = event.trackData;
    const history = data?.history || [], forecast = data?.forecast || [];
    const legend = document.createElement('div'); legend.className = 'earthsense-route-legend';
    for (const [kind, name, points] of [['history', 'Đường đi đã qua', history], ['forecast', 'Đường đi dự báo', forecast]]) {
      const item = document.createElement('span');
      item.className = `earthsense-route-${kind}`;
      item.textContent = `${name} ${points.length}`;
      legend.append(item);
    }
    element.append(legend);
    if (!data || data.status === 'loading') line('Đang tải đường đi và dự báo từ nguồn…', 'earthsense-route-status');
    else if (data.status === 'error') line(data.message || 'Tạm thời chưa tải được đường đi, hãy chọn lại cơn bão này để thử lại.', 'earthsense-route-status');
    else if (!forecast.length) line(data.message || 'Nguồn hiện chưa có đường đi dự báo.', 'earthsense-route-status');
    if (data?.issuedAt) line(`Bản tin dự báo · ${clock(data.issuedAt)}`);
    if (forecast.length) {
      const last = forecast.at(-1);
      line(`Dự báo đến · ${clock(last.time || last.validTime)}`);
      if (Date.parse(last.time || last.validTime) < Date.now()) line('Bản dự báo này đã hết hạn · Hiển thị đường đi nguồn còn lưu giữ', 'earthsense-route-status');
    }
    if (event.trackPoint) {
      const point = event.trackPoint;
      line(`${event.trackKind === 'forecast' ? 'Điểm dự báo' : 'Điểm đã qua'} · ${clock(point.time || point.validTime)}`,
        'earthsense-route-point');
      if (Number.isFinite(point.windSpeedKmh)) line(`Tốc độ gió tại điểm này · ${point.windSpeedKmh.toFixed(1)} km/h`);
    }
    if (data?.source) {
      const link = document.createElement('a');
      link.textContent = `Nguồn đường đi · ${data.source}`;
      try {
        const url = new URL(data.sourceUrl);
        if (url.protocol === 'https:' && !url.username && !url.password) {
          link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
        }
      } catch { /* A missing source link remains text. */ }
      element.append(link);
    }
  }

  return { element, update };
}
