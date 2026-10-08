import { loadEonet } from '../data/eonet.js';
import { createMarkerLayer } from './markers.js';

export const volcano = {
  id: 'volcano', label: 'Núi lửa', color: '#f68393', enabled: true, ttl: 15 * 60_000,
  load: options => loadEonet('volcanoes', options),
  createView: () => createMarkerLayer({ color: '#f68393', segments: 3, size: () => 1.15 }),
};
