import { createWeatherView } from './effects/weather-view.js';
import { weatherAppearance } from './effects/weather-state.js';

// Replace this provider with a licensed lightning feed when one is available.
// These locations demonstrate interaction only and never represent observed strikes.
export async function loadSimulatedLightning() {
  const rates = [.6, 4, 16, 1.5, 8, 32], intervals = [900, 3600, 1800, 3600, 900, 1800];
  const labels = ['Mưa nhỏ', 'Mưa vừa', 'Mưa to', 'Mưa nhỏ', 'Mưa vừa', 'Mưa to'];
  return [[-3, 24], [-4, -61], [3, 108], [24, -83], [9, 13], [15, 100]].map(([lat, lon], index) => {
    const interval = intervals[index], amount = rates[index] * interval / 3600;
    const event = {
      id: `simulated-lightning-${index}`, layer: 'lightning', title: `Sét mô phỏng · Minh họa ${labels[index].toLowerCase()}`, lat, lon,
      time: null, source: 'Dữ liệu mô phỏng', sourceUrl: null, severity: 'unknown', simulated: true,
      weather: { rain: amount, precipitation: amount, interval, code: 95, cloudCover: 100 },
      description: 'Mây, mưa, ánh sáng trong mây và tia sét phân nhánh là hiệu ứng thời tiết mô phỏng, không có nghĩa là đang có dông tại đây. Giao diện dữ liệu thời gian thực đã được chuẩn bị sẵn.',
    };
    const appearance = weatherAppearance(event, true);
    event.metrics = [
      { label: 'Loại dữ liệu', value: 'Mô phỏng · Không phải quan sát thực' },
      { label: 'Mức mưa mô phỏng', value: `${labels[index]} (minh họa)` },
      { label: 'Cường độ mưa mô phỏng', value: `${appearance.rainRate.toFixed(1)} mm/h` },
      { label: 'Lượng mưa tích lũy mô phỏng', value: `${amount.toFixed(2)} mm / ${interval / 60} phút` },
      { label: 'Nhịp chớp minh họa', value: `Khoảng ${appearance.flashPeriod.toFixed(1)} giây một đợt chớp sáng (không phải tần suất sét thực tế)` },
    ];
    return event;
  });
}

export const lightning = {
  id: 'lightning', label: 'Sét', color: '#f3e7a1', enabled: true, ttl: Infinity,
  load: loadSimulatedLightning,
  createView: () => createWeatherView({ simulatedStorm: true }),
};
