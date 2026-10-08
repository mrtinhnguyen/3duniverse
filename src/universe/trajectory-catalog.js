export const TRAJECTORY_VIEW_DIRECTION = Object.freeze([.6, .45, 1]);

/** A separate, Sun-following demonstration, away from the exploration scene. */
export const trajectoryAnchor = [0, 6000, 0];

export const trajectoryDefinition = {
  id: 'trajectory', kind: 'trajectory', vi: 'Quỹ đạo chuyển động', en: 'SOLAR SYSTEM IN MOTION',
  index: '09', type: 'Hệ Mặt Trời · Minh họa chuyển động', r: 1, viewDistance: 600,
  position: [-150, 5970, -60],
  desc: 'Đi theo Mặt Trời tiến về phía trước, ngắm tám hành tinh để lại vệt quỹ đạo khi chuyển động. Đổi hệ quy chiếu để so sánh những đường cong kéo dài về phía trước với quỹ đạo quanh Mặt Trời.',
  stat1: 'Thiên thể theo dõi', diameter: 'Mặt Trời + 8', unit1: 'hành tinh',
  stat2: 'Tỷ lệ chuyển động', value2: 'Minh họa', unit2: 'không theo tỷ lệ',
  sourceUrl: 'https://science.nasa.gov/solar-system/solar-system-facts/', sourceLabel: 'NASA · Chuyển động hệ Mặt Trời',
};
