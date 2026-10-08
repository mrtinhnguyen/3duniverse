import { fetchJson } from './http.js';
import { safeUrl } from './normalize.js';
import { gdacsEpisodeUrl, gdacsTimelineResource, parseGdacsTimeline } from './gdacs-track.js';

export async function loadCycloneTrack(event, options = {}) {
  if (options.signal?.aborted) throw new DOMException('Yêu cầu dữ liệu đã bị hủy', 'AbortError');
  const detailsUrl = gdacsEpisodeUrl(event);
  if (!detailsUrl) {
    if (event?.source === 'NASA EONET' && Array.isArray(event.trackData?.history)) return event.trackData;
    return { history: [], forecast: [], current: null, source: event?.source || 'Nguồn công khai',
      sourceUrl: safeUrl(event?.sourceUrl), issuedAt: null, status: 'unavailable',
      message: 'Nguồn hiện tại không cung cấp đường đi chính thức để tải.' };
  }
  const requestOptions = { ttl: 15 * 60 * 1000, ...options };
  const details = await fetchJson(detailsUrl, { ...requestOptions,
    validate: payload => gdacsTimelineResource(payload, event) });
  const resource = gdacsTimelineResource(details, event);
  const sourceUrl = safeUrl(details.properties.url?.report) || safeUrl(event.sourceUrl);
  if (!resource) return { history: [], forecast: [], current: null,
    source: 'GDACS', sourceUrl, issuedAt: null, status: 'unavailable',
    message: 'Bản tin GDACS lần này không cung cấp dữ liệu đường đi chính thức.' };
  const metadata = { eventId: event.gdacs.eventId, source: `GDACS / ${resource.source}`,
    sourceUrl, dataUrl: resource.url };
  const payload = await fetchJson(resource.url, { ...requestOptions,
    validate: value => parseGdacsTimeline(value, metadata) });
  return parseGdacsTimeline(payload, metadata);
}
