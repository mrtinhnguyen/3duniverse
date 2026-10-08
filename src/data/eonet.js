import { fetchJson } from './http.js';
import { cycloneWind, windSpeedKmh } from './cyclone-wind.js';
import { coordinates, geometryCenter, isoTime, metric, safeUrl, text, uniqueEvents } from './normalize.js';

const CATEGORIES = {
  volcanoes: { layer: 'volcano', label: 'Núi lửa' }, wildfires: { layer: 'wildfire', label: 'Cháy rừng' },
  floods: { layer: 'flood', label: 'Lũ lụt' }, severeStorms: { layer: 'typhoon', label: 'Bão' },
};
const ALIASES = { volcano: 'volcanoes', wildfire: 'wildfires', flood: 'floods', typhoon: 'severeStorms' };
export const EONET_LIMIT = 100;
export const EONET_COVERAGE = 'NASA EONET: tối đa 100 sự kiện công khai chưa kết thúc cho mỗi loại; thời gian sự kiện là lần ghi nhận gần nhất của nguồn, chưa kết thúc không có nghĩa là vừa mới xảy ra.';

function categoryId(category) {
  const id = ALIASES[category] || category;
  if (!CATEGORIES[id]) throw new Error(`Loại EONET không được hỗ trợ: ${category}`);
  return id;
}

export function eonetUrl(category) {
  return `https://eonet.gsfc.nasa.gov/api/v3/events?status=open&category=${categoryId(category)}&limit=${EONET_LIMIT}`;
}

export function parseEonet(payload, category) {
  const categoryKey = categoryId(category), config = CATEGORIES[categoryKey];
  if (!Array.isArray(payload?.events)) throw new Error('NASA EONET trả về định dạng dữ liệu không thể nhận dạng');
  return uniqueEvents(payload.events.flatMap(event => {
    const id = text(event?.id);
    if (!id || event.closed || !Array.isArray(event.categories)
      || !event.categories.some(item => item?.id === categoryKey) || !Array.isArray(event.geometry)) return [];
    const observations = event.geometry.flatMap(geometry => {
      const point = geometryCenter(geometry), time = isoTime(geometry?.date);
      return point && time ? [{ point, time, geometry }] : [];
    }).sort((a, b) => a.time.localeCompare(b.time));
    const latest = observations[observations.length - 1];
    if (!latest) return [];
    const sourceUrls = Array.isArray(event.sources) ? event.sources.map(source => safeUrl(source?.url)) : [];
    const track = observations.filter(item => item.geometry.type === 'Point').map(item => coordinates(item.geometry.coordinates));
    const rangeNote = latest.geometry.type === 'Polygon' ? 'Vị trí đánh dấu là tâm minh họa của vùng ảnh hưởng theo nguồn. ' : '';
    const sourceUrl = sourceUrls.find(Boolean) || safeUrl(event.link, 'https://eonet.gsfc.nasa.gov/');
    const cyclone = cycloneWind(latest.geometry.magnitudeValue, latest.geometry.magnitudeUnit, 'observation', latest.time);
    const history = observations.filter(item => item.geometry.type === 'Point').map(item => ({
      lon: item.point[0], lat: item.point[1], time: item.time, validTime: item.time,
      windSpeedKmh: windSpeedKmh(item.geometry.magnitudeValue, item.geometry.magnitudeUnit),
      source: 'NASA EONET', sourceUrl,
    }));
    return [{
      id: `eonet:${id}`, layer: config.layer, title: text(event.title, `Sự kiện ${config.label}`),
      lon: latest.point[0], lat: latest.point[1], time: latest.time, source: 'NASA EONET',
      sourceUrl,
      severity: 'unknown',
      description: `${text(event.description)}${event.description ? ' ' : ''}${rangeNote}${EONET_COVERAGE}`,
      metrics: [
        { label: 'Loại sự kiện', value: config.label }, { label: 'Trạng thái theo nguồn', value: 'Chưa kết thúc' },
        config.layer === 'typhoon' ? metric('Tốc độ gió ghi nhận gần nhất', cyclone.windSpeedKmh, 'km/h')
          : metric('Quy mô theo ghi nhận của nguồn', latest.geometry.magnitudeValue, text(latest.geometry.magnitudeUnit)),
      ].filter(Boolean),
      ...(config.layer === 'typhoon' ? { cyclone, trackData: {
        history, forecast: [], source: 'NASA EONET', sourceUrl, issuedAt: null,
        status: history.length ? 'history-only' : 'unavailable',
        message: 'NASA EONET cung cấp lịch sử vị trí đã ghi nhận, không cung cấp đường đi dự báo chính thức.',
      } } : {}),
      ...(config.layer === 'typhoon' && track.length > 1 ? { track } : {}),
    }];
  }));
}

export async function loadEonet(category, options = {}) {
  return parseEonet(await fetchJson(eonetUrl(category), {
    ttl: 15 * 60 * 1000, ...options, validate: payload => parseEonet(payload, category),
  }), category);
}
