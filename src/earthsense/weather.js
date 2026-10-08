import * as THREE from 'three';
import { loadWeather } from '../data/open-meteo.js';
import { createWeatherView } from './effects/weather-view.js';
import { weatherAppearance } from './effects/weather-state.js';

export function temperatureColor(event) {
  const temperature = event.weather?.temperature;
  if (!Number.isFinite(temperature)) return '#a6bacb';
  return new THREE.Color('#64b8ff').lerp(new THREE.Color('#ffd08b'), THREE.MathUtils.clamp((temperature + 15) / 55, 0, 1));
}

export const weather = {
  id: 'weather', label: 'Thời tiết', color: '#83bded', enabled: true, ttl: 15 * 60_000,
  load: async options => (await loadWeather(options)).map(event => {
    const appearance = weatherAppearance(event);
    return {
    ...event,
    description: `${event.description} Hình dạng mây, vệt mưa và tia chớp dông là hiệu ứng minh họa dựng từ dữ liệu thời tiết lấy mẫu, không phải ảnh mây vệ tinh hay quan sát từng tia sét.`,
    metrics: [...event.metrics, ...(appearance.rainRate === null ? [] : [{ label: 'Cường độ mưa trung bình trong khoảng', value: `${appearance.rainRate.toFixed(2)} mm/h` }]),
      ...(appearance.thunder ? [{ label: 'Chu kỳ chớp dông (minh họa)', value: `Khoảng ${appearance.flashPeriod.toFixed(1)} giây, không phải tần suất sét thực tế` }] : [])],
    };
  }),
  createView: () => createWeatherView({ colorFor: temperatureColor }),
};
