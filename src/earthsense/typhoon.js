import { loadEonet } from '../data/eonet.js';
import { loadGdacs } from '../data/gdacs.js';
import { combineSources } from './sources.js';
import { createCycloneLayer } from './effects/cyclone.js';

function stormName(title) {
  return title.toLowerCase().replace(/tropical|cyclone|hurricane|typhoon|storm|\d{4}|[^a-z]/g, '');
}

export async function loadStorms(options) {
  const result = await combineSources([
    ['GDACS', () => loadGdacs('TC', options)],
    ['NASA EONET', () => loadEonet('severeStorms', options)],
  ]);
  const gdacs = result.events.filter(event => event.source === 'GDACS');
  result.events = result.events.filter(event => event.source === 'GDACS' || !gdacs.some(other => {
    const name = stormName(event.title), otherName = stormName(other.title);
    return name.length > 2 && otherName.length > 2 && (name.includes(otherName) || otherName.includes(name));
  }));
  result.events = result.events.map(event => ({ ...event,
    description: `${event.description || ''} Dải mây xoáy, mắt bão và hiệu ứng động được tạo theo vị trí sự kiện chỉ để minh họa; không phải ảnh mây vệ tinh thực tế hay vùng gió mạnh chính thức.`,
  }));
  return result;
}

export const typhoon = {
  id: 'typhoon', label: 'Bão', color: '#c2a5fb', enabled: true, ttl: 15 * 60_000,
  load: loadStorms,
  createView: createCycloneLayer,
};
