import { fetchJson } from './http.js';
import { cycloneWind } from './cyclone-wind.js';
import { coordinates, featureCollection, isoTime, linePaths, metric, number, safeUrl, severityFromAlert, text } from './normalize.js';

const LAYERS = { TC: 'typhoon', FL: 'flood', VO: 'volcano', WF: 'wildfire', EQ: 'earthquake' };
const ALERT_NAMES = { red: 'Đỏ', orange: 'Cam', yellow: 'Vàng', green: 'Xanh lá' };
export const GDACS_COVERAGE = 'Danh sách thiên tai công khai hiện tại của GDACS; thời gian báo cáo và ngày sự kiện lấy từ nguồn gốc, mức cảnh báo có thể thay đổi theo báo cáo mới.';

function eventType(type) {
  const normalized = String(type).toUpperCase();
  if (!LAYERS[normalized]) throw new Error(`Loại GDACS không được hỗ trợ: ${type}`);
  return normalized;
}

export function gdacsUrl(type = 'TC') {
  return `https://www.gdacs.org/gdacsapi/api/events/geteventlist/MAP?eventtype=${eventType(type)}`;
}

function eventKey(properties, type) {
  const numericId = number(properties?.eventid);
  if (text(properties?.eventtype).toUpperCase() !== type || !Number.isSafeInteger(numericId) || numericId <= 0) return null;
  return `gdacs:${type}:${properties.eventid}`;
}

export function parseGdacs(payload, requestedType = 'TC') {
  const type = eventType(requestedType), features = featureCollection(payload, 'GDACS');
  const centers = new Map();
  for (const feature of features) {
    const props = feature?.properties, id = eventKey(props, type);
    if (!id || feature?.geometry?.type !== 'Point'
      || (props.Class && props.Class !== 'Point_Centroid')) continue;
    const point = coordinates(feature.geometry.coordinates), time = isoTime(props.todate) || isoTime(props.datemodified);
    if (!point || !time) continue;
    const existing = centers.get(id);
    const revision = isoTime(props.datemodified) || time;
    if (!existing || revision > existing.revision || (revision === existing.revision && number(props.episodeid) > number(existing.props.episodeid))) {
      centers.set(id, { id, props, point, time, revision, paths: [], pathKeys: new Set() });
    }
  }
  for (const feature of features) {
    const props = feature?.properties, event = centers.get(eventKey(props, type));
    if (!event || (props.episodeid != null && event.props.episodeid != null && String(props.episodeid) !== String(event.props.episodeid))) continue;
    for (const path of linePaths(feature.geometry)) {
      const key = JSON.stringify(path);
      if (!event.pathKeys.has(key)) { event.paths.push(path); event.pathKeys.add(key); }
    }
  }
  return [...centers.values()].map(({ id, props, point, time, paths }) => {
    const currentAlert = text(props.episodealertlevel, text(props.alertlevel));
    const alertLabel = value => ALERT_NAMES[text(value).toLowerCase()] || text(value, 'Không cung cấp');
    const fallbackUrl = `https://www.gdacs.org/report.aspx?eventtype=${type}&eventid=${props.eventid}`;
    const severity = props.severitydata;
    return {
      id, layer: LAYERS[type], title: text(props.name, text(props.description, text(props.eventname, 'Cảnh báo thiên tai'))),
      lon: point[0], lat: point[1], time, source: 'GDACS', sourceUrl: safeUrl(props.url?.report, fallbackUrl),
      severity: severityFromAlert(currentAlert),
      description: `${text(props.description)}${props.description ? '. ' : ''}${GDACS_COVERAGE}`,
      metrics: [
        { label: 'Mức cảnh báo của báo cáo hiện tại', value: alertLabel(currentAlert) },
        { label: 'Mức cảnh báo chung của sự kiện', value: alertLabel(props.alertlevel) },
        props.country ? { label: 'Quốc gia / vùng lãnh thổ bị ảnh hưởng', value: text(props.country) } : null,
        props.source ? { label: 'Nguồn gốc', value: text(props.source) } : null,
        type === 'TC' ? metric('Tốc độ gió cực đại của sự kiện', severity?.severity, text(severity?.severityunit, 'km/h')) : null,
      ].filter(Boolean),
      ...(type === 'TC' ? {
        cyclone: cycloneWind(severity?.severity, severity?.severityunit, 'event-maximum'),
        gdacs: { eventId: number(props.eventid), episodeId: number(props.episodeid),
          eventType: 'TC', source: text(props.source),
          geometryUrl: safeUrl(props.url?.geometry),
          detailsUrl: `https://www.gdacs.org/gdacsapi/api/events/getepisodedata?eventtype=TC&eventid=${props.eventid}&episodeid=${props.episodeid}` },
      } : {}),
      ...(paths.length ? { paths } : {}),
    };
  }).sort((a, b) => b.time.localeCompare(a.time));
}

export async function loadGdacs(type = 'TC', options = {}) {
  return parseGdacs(await fetchJson(gdacsUrl(type), {
    ttl: 15 * 60 * 1000, ...options, validate: payload => parseGdacs(payload, type),
  }), type);
}
