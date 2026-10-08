import { fetchJson } from './http.js';
import { coordinates, featureCollection, isoTime, metric, number, safeUrl, severityFromAlert, text, uniqueEvents } from './normalize.js';

export const USGS_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
export const USGS_COVERAGE = 'Danh mục động đất công khai 24 giờ qua của USGS; độ lớn và vị trí có thể được cập nhật sau khi nguồn thẩm định.';

export function parseEarthquakes(payload) {
  const features = featureCollection(payload, 'USGS');
  const events = features.flatMap(feature => {
    const props = feature?.properties;
    const point = feature?.geometry?.type === 'Point' ? coordinates(feature.geometry.coordinates) : null;
    const time = isoTime(props?.time);
    const id = text(feature?.id);
    if (!props || !point || !time || !id || (props.type && props.type !== 'earthquake')) return [];
    const magnitude = number(props.mag), depth = number(feature.geometry.coordinates[2]);
    const alertSeverity = severityFromAlert(props.alert);
    return [{
      id: `usgs:${id}`, layer: 'earthquake', title: text(props.title, text(props.place, 'Sự kiện động đất')),
      lon: point[0], lat: point[1], time, source: 'USGS',
      sourceUrl: safeUrl(props.url, 'https://earthquake.usgs.gov/earthquakes/map/'),
      severity: alertSeverity !== 'unknown' ? alertSeverity : magnitude === null ? 'unknown'
        : magnitude >= 6 ? 'high' : magnitude >= 4 ? 'medium' : 'low',
      description: `${text(props.place)}${props.place ? '. ' : ''}${USGS_COVERAGE}`,
      metrics: [
        metric(`Độ lớn${props.magType ? ` (${text(props.magType)})` : ''}`, magnitude), metric('Độ sâu chấn tiêu', depth, 'km'),
        props.status ? { label: 'Trạng thái danh mục', value: props.status === 'reviewed' ? 'Đã thẩm định' : props.status === 'automatic' ? 'Xác định tự động' : text(props.status) } : null,
        props.alert ? { label: 'Đánh giá tác động của USGS', value: text(props.alert) } : null,
      ].filter(Boolean),
    }];
  });
  return uniqueEvents(events);
}

export async function loadEarthquakes(options = {}) {
  return parseEarthquakes(await fetchJson(USGS_URL, { ttl: 5 * 60 * 1000, ...options, validate: parseEarthquakes }));
}
