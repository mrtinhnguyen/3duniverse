import { fetchJson } from './http.js';
import { coordinates, isoTime, metric, number } from './normalize.js';

export const WEATHER_LOCATIONS = Object.freeze([-60, -30, 0, 30, 60].flatMap(lat =>
  Array.from({ length: 12 }, (_, index) => Object.freeze({ lat, lon: -180 + index * 30 }))));
export const WEATHER_COVERAGE = 'Mô hình thời tiết hiện tại của Open-Meteo · 60 điểm lấy mẫu phân bố đều trên toàn cầu, không phải trường khí tượng liên tục; lượng mưa là tổng tích lũy trong khoảng thời gian của nguồn.';
export const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?${new URLSearchParams({
  latitude: WEATHER_LOCATIONS.map(point => point.lat).join(','),
  longitude: WEATHER_LOCATIONS.map(point => point.lon).join(','),
  current: 'temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m',
  timezone: 'GMT', timeformat: 'unixtime', forecast_days: '1', cell_selection: 'nearest',
})}`;

export function weatherSummary(code) {
  if (code === 0) return 'Trời quang';
  if ([1, 2, 3].includes(code)) return ['Gần như quang đãng', 'Có mây rải rác', 'Nhiều mây u ám'][code - 1];
  if ([45, 48].includes(code)) return 'Sương mù';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Mưa phùn';
  if ([61, 63, 65, 66, 67].includes(code)) return 'Mưa';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Tuyết rơi';
  if ([80, 81, 82].includes(code)) return 'Mưa rào';
  if ([95, 96, 99].includes(code)) return 'Dông';
  return 'Trạng thái thời tiết không xác định';
}

const locationName = (lat, lon) => `${Math.abs(lat)}°${lat < 0 ? 'S' : 'N'} · ${Math.abs(lon)}°${lon < 0 ? 'W' : 'E'}`;
const nonnegative = value => { const n = number(value); return n !== null && n >= 0 ? n : null; };
const percentage = value => { const n = nonnegative(value); return n !== null && n <= 100 ? n : null; };

export function parseWeather(payload, locations = WEATHER_LOCATIONS) {
  const records = Array.isArray(payload) ? payload : payload?.current ? [payload] : null;
  if (!records || records.length !== locations.length) throw new Error('Open-Meteo trả về số điểm lấy mẫu hoặc định dạng không đúng');
  const events = records.flatMap((record, index) => {
    const point = coordinates([record?.longitude, record?.latitude]);
    const current = record?.current;
    const time = isoTime(current?.time, true);
    if (!point || !current || !time) return [];
    const interval = nonnegative(current.interval);
    const weather = {
      temperature: number(current.temperature_2m),
      windSpeed: nonnegative(current.wind_speed_10m),
      windDirection: nonnegative(current.wind_direction_10m),
      precipitation: nonnegative(current.precipitation),
      cloudCover: percentage(current.cloud_cover),
      interval: interval > 0 ? interval : null,
      rain: nonnegative(current.rain),
      humidity: percentage(current.relative_humidity_2m),
      code: number(current.weather_code),
    };
    if (weather.windDirection > 360) weather.windDirection = null;
    const period = weather.interval ? `${weather.interval / 60} phút gần nhất` : 'theo khoảng thời gian của nguồn';
    const requested = locations[index];
    return [{
      id: `weather:${requested.lat}:${requested.lon}`, layer: 'weather',
      title: `${locationName(requested.lat, requested.lon)} · ${weatherSummary(weather.code)}`,
      lon: point[0], lat: point[1], time, source: 'Open-Meteo', sourceUrl: 'https://open-meteo.com/en/docs',
      severity: 'unknown', description: WEATHER_COVERAGE, weather,
      metrics: [
        metric('Nhiệt độ', weather.temperature, '°C'), metric('Tốc độ gió ở độ cao 10 m', weather.windSpeed, 'km/h'),
        metric('Hướng gió (hướng thổi đến)', weather.windDirection, '°', 0), metric('Độ che phủ mây', weather.cloudCover, '%', 0),
        metric(`Lượng mưa (${period})`, weather.precipitation, 'mm'), metric(`Mưa dạng lỏng (${period})`, weather.rain, 'mm'),
        metric('Độ ẩm tương đối', weather.humidity, '%', 0),
      ].filter(Boolean),
    }];
  });
  if (records.length && !events.length) throw new Error('Open-Meteo không trả về vị trí và thời gian lấy mẫu hợp lệ');
  return events;
}

export async function loadWeather(options = {}) {
  return parseWeather(await fetchJson(WEATHER_URL, { ttl: 15 * 60 * 1000, ...options, validate: parseWeather }));
}
